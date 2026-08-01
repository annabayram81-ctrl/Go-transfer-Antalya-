(function(){
function current(){return window.GoTransferLocale?.get?.()||"ru"}
function controls(){return `<div class="site-languages" aria-label="Language">${["ru","en","tr","de","ar"].map(l=>`<button type="button" data-site-language="${l}" aria-pressed="${current()===l}">${l==="ar"?"ع":l.toUpperCase()}</button>`).join("")}</div>`}
function enhance(){document.querySelectorAll('[data-site-navigation]').forEach(root=>{root.querySelectorAll('.site-nav-desktop,.site-mobile-menu').forEach(host=>{if(!host.querySelector('.site-languages'))host.insertAdjacentHTML('beforeend',controls())});root.querySelectorAll('[data-site-language]').forEach(button=>button.onclick=()=>window.GoTransferLocale?.set?.(button.dataset.siteLanguage))})}
const observer=new MutationObserver(enhance);observer.observe(document.documentElement,{childList:true,subtree:true});window.addEventListener('gotransfer:languagechange',()=>setTimeout(enhance));if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance,{once:true});else enhance();
})();
