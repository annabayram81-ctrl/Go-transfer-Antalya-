plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.gotransfer.antalya"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.gotransfer.antalya"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        buildConfig = true
    }

    signingConfigs {
        create("release") {
            val storeFilePath = providers.gradleProperty("GOTRANSFER_STORE_FILE").orNull
                ?: System.getenv("GOTRANSFER_STORE_FILE")
            val storePasswordValue = providers.gradleProperty("GOTRANSFER_STORE_PASSWORD").orNull
                ?: System.getenv("GOTRANSFER_STORE_PASSWORD")
            val keyAliasValue = providers.gradleProperty("GOTRANSFER_KEY_ALIAS").orNull
                ?: System.getenv("GOTRANSFER_KEY_ALIAS")
            val keyPasswordValue = providers.gradleProperty("GOTRANSFER_KEY_PASSWORD").orNull
                ?: System.getenv("GOTRANSFER_KEY_PASSWORD")

            if (!storeFilePath.isNullOrBlank()) {
                storeFile = file(storeFilePath)
            }
            storePassword = storePasswordValue
            keyAlias = keyAliasValue
            keyPassword = keyPasswordValue
        }
    }

    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
            versionNameSuffix = "-debug"
        }

        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}
