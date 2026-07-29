package com.gotransfer.antalya

import android.annotation.SuppressLint
import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.net.http.SslError
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.view.WindowManager
import android.window.OnBackInvokedDispatcher
import android.webkit.SslErrorHandler
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {
    private lateinit var webView: WebView
    private lateinit var errorView: View

    private val siteUri: Uri by lazy { Uri.parse(getString(R.string.site_url)) }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        keepSystemBarsVisible()

        val root = FrameLayout(this).apply {
            setBackgroundColor(getColorCompat(R.color.gotransfer_background))
            setOnApplyWindowInsetsListener { view, insets ->
                applySafeAreaPadding(view, insets)
                insets
            }
        }
        webView = WebView(this).apply {
            layoutParams = FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT,
            )
            setBackgroundColor(getColorCompat(R.color.gotransfer_background))
            overScrollMode = View.OVER_SCROLL_NEVER
            isHorizontalScrollBarEnabled = false
            webViewClient = GoTransferWebViewClient()
            configureSettings(settings)
        }

        errorView = buildErrorView()
        root.addView(webView)
        root.addView(errorView)
        setContentView(root)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            onBackInvokedDispatcher.registerOnBackInvokedCallback(
                OnBackInvokedDispatcher.PRIORITY_DEFAULT,
            ) {
                handleBackPress()
            }
        }

        if (savedInstanceState == null) {
            webView.loadUrl(siteUri.toString())
        } else {
            webView.restoreState(savedInstanceState)
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    @Deprecated("Required for devices below Android 13.")
    override fun onBackPressed() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            handleBackPress()
        }
    }

    override fun onDestroy() {
        if (::webView.isInitialized) {
            webView.destroy()
        }
        super.onDestroy()
    }

    private fun configureSettings(settings: WebSettings) {
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.loadsImagesAutomatically = true
        settings.mediaPlaybackRequiresUserGesture = true
        settings.userAgentString = "${settings.userAgentString} GoTransferAndroid/1.0"
        settings.allowFileAccess = false
        settings.allowContentAccess = false
        settings.setSupportMultipleWindows(false)
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.safeBrowsingEnabled = true
        }
    }

    private fun handleBackPress() {
        if (::webView.isInitialized && webView.canGoBack()) {
            webView.goBack()
            return
        }

        finish()
    }

    private fun applySafeAreaPadding(view: View, insets: WindowInsets) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val systemBars = insets.getInsets(WindowInsets.Type.systemBars() or WindowInsets.Type.displayCutout())
            view.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            return
        }

        @Suppress("DEPRECATION")
        view.setPadding(
            insets.systemWindowInsetLeft,
            insets.systemWindowInsetTop,
            insets.systemWindowInsetRight,
            insets.systemWindowInsetBottom,
        )
    }

    private fun keepSystemBarsVisible() {
        window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(true)
            window.insetsController?.apply {
                show(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
                systemBarsBehavior = WindowInsetsController.BEHAVIOR_DEFAULT
            }
            return
        }

        @Suppress("DEPRECATION")
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_VISIBLE
    }

    private fun buildErrorView(): View {
        val container = LinearLayout(this).apply {
            layoutParams = FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT,
            )
            gravity = Gravity.CENTER
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(getColorCompat(R.color.gotransfer_background))
            setPadding(dp(32), dp(32), dp(32), dp(32))
            visibility = View.GONE
        }

        val title = TextView(this).apply {
            gravity = Gravity.CENTER
            text = getString(R.string.loading_error_title)
            setTextColor(getColorCompat(R.color.gotransfer_ink))
            textSize = 22f
            setTypeface(typeface, android.graphics.Typeface.BOLD)
        }

        val message = TextView(this).apply {
            gravity = Gravity.CENTER
            text = getString(R.string.loading_error_message)
            setTextColor(getColorCompat(R.color.gotransfer_muted))
            textSize = 16f
            setPadding(0, dp(12), 0, dp(24))
        }

        val retry = Button(this).apply {
            text = getString(R.string.retry)
            setTextColor(Color.WHITE)
            setBackgroundColor(getColorCompat(R.color.gotransfer_ink))
            setOnClickListener {
                hideLoadError()
                webView.loadUrl(siteUri.toString())
            }
        }

        container.addView(title)
        container.addView(message)
        container.addView(retry)

        return container
    }

    private fun shouldOpenInsideApp(uri: Uri): Boolean {
        val scheme = uri.scheme?.lowercase()
        val host = uri.host?.lowercase()
        return scheme == "https" && host == siteUri.host?.lowercase()
    }

    private fun openExternally(uri: Uri): Boolean {
        val intent = Intent(Intent.ACTION_VIEW, uri).apply {
            addCategory(Intent.CATEGORY_BROWSABLE)
        }

        return try {
            startActivity(intent)
            true
        } catch (_: ActivityNotFoundException) {
            false
        }
    }

    private fun showLoadError() {
        webView.visibility = View.GONE
        errorView.visibility = View.VISIBLE
    }

    private fun hideLoadError() {
        errorView.visibility = View.GONE
        webView.visibility = View.VISIBLE
    }

    private fun dp(value: Int): Int {
        return (value * resources.displayMetrics.density).toInt()
    }

    private fun getColorCompat(colorRes: Int): Int {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            getColor(colorRes)
        } else {
            @Suppress("DEPRECATION")
            resources.getColor(colorRes)
        }
    }

    private inner class GoTransferWebViewClient : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
            val uri = request.url

            if (shouldOpenInsideApp(uri)) {
                return false
            }

            return openExternally(uri)
        }

        @Deprecated("Deprecated in Android API 24")
        override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
            val uri = Uri.parse(url)

            if (shouldOpenInsideApp(uri)) {
                return false
            }

            return openExternally(uri)
        }

        override fun onPageStarted(view: WebView, url: String, favicon: android.graphics.Bitmap?) {
            hideLoadError()
        }

        override fun onReceivedError(
            view: WebView,
            request: WebResourceRequest,
            error: WebResourceError,
        ) {
            if (request.isForMainFrame) {
                showLoadError()
            }
        }

        override fun onReceivedHttpError(
            view: WebView,
            request: WebResourceRequest,
            errorResponse: WebResourceResponse,
        ) {
            if (request.isForMainFrame) {
                showLoadError()
            }
        }

        override fun onReceivedSslError(view: WebView, handler: SslErrorHandler, error: SslError) {
            handler.cancel()
            showLoadError()
        }
    }
}
