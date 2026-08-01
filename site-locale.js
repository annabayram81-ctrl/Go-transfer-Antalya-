(function(){
  function addAsset(tag,attrs){if(document.querySelector(`${tag}[data-site-asset="${attrs["data-site-asset"]}"]`))return null;const node=document.createElement(tag);Object.assign(node,attrs);document.head.appendChild(node);return node}
  addAsset("link",{rel:"stylesheet",href:"/site-navigation.css?v=20260801-nav-1","data-site-asset":"navigation-style"});
  addAsset("link",{rel:"stylesheet",href:"/site-navigation-overrides.css?v=20260801-nav-2","data-site-asset":"navigation-overrides"});
  addAsset("link",{rel:"stylesheet",href:"/site-desktop-compact.css?v=20260801-nav-3","data-site-asset":"desktop-compact"});
  addAsset("script",{src:"/editorial-data.js?v=20260801-editorial-1",async:false,"data-site-asset":"editorial-data"});
  addAsset("script",{src:"/site-navigation.js?v=20260801-nav-1",async:false,"data-site-asset":"navigation-script"});
  addAsset("script",{src:"/site-navigation-enhancements.js?v=20260801-nav-3",async:false,"data-site-asset":"navigation-enhancements"});
  if(!document.querySelector('link[href^="/rtl.css"]')){
    const stylesheet=document.createElement("link");stylesheet.rel="stylesheet";stylesheet.href="/rtl.css?v=20260729-i18n-1";document.head.appendChild(stylesheet);
  }
  const key="gotransfer-language";
  const supported=["ru","tr","en","de","ar"];
  const labels={ru:"RU",tr:"TR",en:"EN",de:"DE",ar:"العربية"};
  const params=new URLSearchParams(location.search);
  const requested=(params.get("lang")||localStorage.getItem(key)||"ru").toLowerCase();
  let current=supported.includes(requested)?requested:"ru";

  function applyDocument(language){
    document.documentElement.lang=language;
    document.documentElement.dir=language==="ar"?"rtl":"ltr";
    document.documentElement.dataset.language=language;
    document.querySelectorAll("[data-ltr],a[href^='tel:'],a[href^='mailto:'],a[href*='wa.me'],a[href*='t.me'],.price,.booking-price").forEach(element=>element.setAttribute("dir","ltr"));
    document.querySelectorAll(".language-menu__button span:first-child").forEach(span=>span.textContent=language.toUpperCase());
    document.querySelectorAll(".language-menu__option").forEach(button=>{
      const value=button.dataset.languageOption||button.dataset.servicesLanguage||button.dataset.language;
      const active=value===language;
      button.classList.toggle("is-active",active);
      button.setAttribute("aria-selected",String(active));
    });
  }

  function addAlternates(){
    const canonical=document.querySelector('link[rel="canonical"]')||document.head.appendChild(Object.assign(document.createElement("link"),{rel:"canonical"}));
    const clean=new URL(location.href);
    clean.searchParams.delete("lang");
    canonical.href=clean.href;
    supported.forEach(language=>{
      let link=document.querySelector(`link[rel="alternate"][hreflang="${language}"]`);
      if(!link)link=document.head.appendChild(Object.assign(document.createElement("link"),{rel:"alternate",hreflang:language}));
      const url=new URL(clean.href);url.searchParams.set("lang",language);link.href=url.href;
    });
    let fallback=document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if(!fallback)fallback=document.head.appendChild(Object.assign(document.createElement("link"),{rel:"alternate",hreflang:"x-default"}));
    fallback.href=clean.href;
  }

  function addOption(list,language){
    if(list.querySelector(`[data-language="${language}"],[data-language-option="${language}"],[data-services-language="${language}"]`))return;
    const sample=list.querySelector(".language-menu__option");
    const attribute=sample?.hasAttribute("data-language-option")?"data-language-option":sample?.hasAttribute("data-services-language")?"data-services-language":"data-language";
    const button=document.createElement("button");
    button.className="language-menu__option";
    button.type="button";
    button.setAttribute("role","option");
    button.setAttribute(attribute,language);
    button.dataset.localeGenerated="true";
    button.setAttribute("aria-selected","false");
    button.textContent=labels[language];
    list.appendChild(button);
  }

  function ensureMenu(){
    if(!document.querySelector(".language-menu")){
      const host=document.querySelector("header nav")||document.querySelector("header");
      if(host){
        const menu=document.createElement("div");
        menu.className="language-menu universal-language-menu";
        menu.innerHTML='<button class="language-menu__button" type="button" aria-label="Language" aria-expanded="false"><span>RU</span><span aria-hidden="true">⌄</span></button><div class="language-menu__list" role="listbox" aria-label="Language"></div>';
        host.appendChild(menu);
      }
    }
    document.querySelectorAll(".language-menu__list").forEach(list=>{
      supported.forEach(language=>addOption(list,language));
      if(list.dataset.localeBound)return;
      list.dataset.localeBound="true";
      list.addEventListener("click",event=>{
        const button=event.target.closest(".language-menu__option");
        if(!button)return;
        const menu=list.closest(".language-menu");
        const globallyManaged=menu?.classList.contains("universal-language-menu")||menu?.hasAttribute("data-global-locale-menu");
        if(!globallyManaged&&!button.dataset.localeGenerated)return;
        const language=button.dataset.languageOption||button.dataset.servicesLanguage||button.dataset.language;
        if(supported.includes(language))set(language);
      });
    });
    document.querySelectorAll(".language-menu__button").forEach(button=>{
      const menu=button.closest(".language-menu");
      const globallyManaged=menu?.classList.contains("universal-language-menu")||menu?.hasAttribute("data-global-locale-menu");
      if(!globallyManaged)return;
      if(button.dataset.localeBound)return;
      button.dataset.localeBound="true";
      button.addEventListener("click",()=>{
        const open=menu.classList.toggle("is-open");
        button.setAttribute("aria-expanded",String(open));
      });
    });
  }

  function set(language,{updateUrl=true,notify=true}={}){
    if(!supported.includes(language))return;
    current=language;
    localStorage.setItem(key,language);
    if(updateUrl){
      const url=new URL(location.href);url.searchParams.set("lang",language);history.replaceState(null,"",url);
    }
    applyDocument(language);
    addAlternates();
    if(notify)window.dispatchEvent(new CustomEvent("gotransfer:languagechange",{detail:{language}}));
  }

  function init(){ensureMenu();set(current,{updateUrl:Boolean(params.get("lang")),notify:false});}
  window.GoTransferLocale={supported,get:()=>current,set,applyDocument,labels};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
