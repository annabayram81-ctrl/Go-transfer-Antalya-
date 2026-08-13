(function(){
const labels={ru:"Назад",en:"Back",tr:"Geri",de:"Zurück",ar:"رجوع"};
function language(){return window.GoTransferLocale?.get?.()||document.documentElement.lang||"ru"}
function isHome(){return location.pathname==="/"||/^\/(?:ru|en|tr|de|ar)\/?$/.test(location.pathname)||/\/index\.html$/.test(location.pathname)}
function apply(){document.documentElement.classList.toggle("site-inner-page",!isHome());document.querySelectorAll('[data-site-navigation] .site-nav-brand').forEach(button=>{if(isHome()){if(button.textContent!=="GoTransfer")button.textContent="GoTransfer";button.removeAttribute("data-site-back");return}const text=`← ${labels[language()]||labels.ru}`;if(button.textContent!==text)button.textContent=text;button.dataset.siteBack="true";button.setAttribute("aria-label",labels[language()]||labels.ru);button.onclick=event=>{event.preventDefault();const referrer=document.referrer?new URL(document.referrer):null;if(referrer?.origin===location.origin||history.length>1)history.back();else location.href=`/?lang=${language()}`}})}
const observer=new MutationObserver(apply);observer.observe(document.documentElement,{childList:true,subtree:true});window.addEventListener("gotransfer:languagechange",()=>setTimeout(apply));if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})();
