import { calculateTransferPrice, STANDARD_TARIFF_TIER } from "./pricing.js";

const primary = ["lara","kundu","belek","side","alanya","kemer","beldibi","goynuk","camyuva","tekirova","adrasan","kas"];
const routes = [
  {id:"lara",name:"Lara",image:"/images/places/lower-duden.jpg",minutes:20},
  {id:"kundu",name:"Kundu",image:"/images/chauffeur/beaches.png",minutes:25},
  {id:"belek",name:"Belek",image:"/images/places/belek-beach.jpg",minutes:35},
  {id:"side",name:"Side",image:"/images/destinations/side.jpg",minutes:55},
  {id:"alanya",name:"Alanya",image:"/images/places/alanya-castle.jpg",minutes:110},
  {id:"kemer",name:"Kemer",image:"/images/destinations/kemer.jpg",minutes:55},
  {id:"beldibi",name:"Beldibi",image:"/images/destinations/beldibi.jpg",minutes:45},
  {id:"goynuk",name:"Göynük",image:"/images/destinations/goynuk.jpg",minutes:45},
  {id:"camyuva",name:"Çamyuva",image:"/images/destinations/camyuva.jpg",minutes:60},
  {id:"tekirova",name:"Tekirova",image:"/images/destinations/tekirova.jpg",minutes:65},
  {id:"adrasan",name:"Adrasan",image:"/images/destinations/adrasan.jpg",minutes:100},
  {id:"kas",name:"Kaş",image:"/images/destinations/kas.jpg",minutes:195},
  {id:"konyaalti",name:"Konyaaltı",image:"/images/destinations/konyaalti.jpg",minutes:25},
  {id:"kiris",name:"Kiriş",image:"/images/destinations/kiris.jpg",minutes:60},
  {id:"olympos",name:"Olympos",image:"/images/destinations/olympos.jpg",minutes:90,distance:98},
  {id:"cirali",name:"Çıralı",image:"/images/destinations/cirali.jpg",minutes:85,distance:94.1},
  {id:"kumluca",name:"Kumluca",image:"/images/destinations/kumluca.jpg",minutes:90,distance:110.2},
  {id:"finike",name:"Finike",image:"/images/destinations/finike.jpg",minutes:100,distance:128},
  {id:"demre",name:"Demre",image:"/images/destinations/demre.jpg",minutes:125,distance:154.6},
];

const copy = {
  ru:{eyebrow:"Из аэропорта Анталии",title:"Популярные направления",intro:"Выберите курорт и узнайте расстояние, ориентировочное время в пути и минимальную стоимость частного трансфера.",origin:"Antalya Airport",distance:"Расстояние",time:"В пути",minute:"мин",from:"от",details:"Подробнее",more:"Показать ещё направления",less:"Скрыть дополнительные направления",all:"Все направления",alt:(name)=>`${name} — направление трансфера из аэропорта Анталии`},
  en:{eyebrow:"From Antalya Airport",title:"Popular destinations",intro:"Choose a resort and see the distance, approximate journey time and minimum private transfer price.",origin:"Antalya Airport",distance:"Distance",time:"Journey",minute:"min",from:"from",details:"Details",more:"Show more destinations",less:"Hide additional destinations",all:"All destinations",alt:(name)=>`${name}, a transfer destination from Antalya Airport`},
  tr:{eyebrow:"Antalya Havalimanı'ndan",title:"Popüler rotalar",intro:"Tatil bölgenizi seçin; mesafeyi, tahmini yolculuk süresini ve özel transfer başlangıç fiyatını görün.",origin:"Antalya Havalimanı",distance:"Mesafe",time:"Süre",minute:"dk",from:"başlangıç",details:"Detaylar",more:"Daha fazla rota göster",less:"Ek rotaları gizle",all:"Tüm rotalar",alt:(name)=>`${name}, Antalya Havalimanı'ndan transfer rotası`},
  de:{eyebrow:"Vom Flughafen Antalya",title:"Beliebte Ziele",intro:"Wählen Sie Ihren Urlaubsort und sehen Sie Entfernung, ungefähre Fahrzeit und Mindestpreis des privaten Transfers.",origin:"Flughafen Antalya",distance:"Entfernung",time:"Fahrzeit",minute:"Min.",from:"ab",details:"Mehr erfahren",more:"Weitere Ziele anzeigen",less:"Weitere Ziele ausblenden",all:"Alle Ziele",alt:(name)=>`${name}, Transferziel ab Flughafen Antalya`},
  ar:{eyebrow:"من مطار أنطاليا",title:"الوجهات الشائعة",intro:"اختر وجهتك واطّلع على المسافة والمدة التقريبية والحد الأدنى لسعر النقل الخاص.",origin:"مطار أنطاليا",distance:"المسافة",time:"المدة",minute:"دقيقة",from:"ابتداءً من",details:"التفاصيل",more:"عرض وجهات أخرى",less:"إخفاء الوجهات الإضافية",all:"كل الوجهات",alt:(name)=>`${name}، وجهة نقل من مطار أنطاليا`}
};

function language(){const value=window.GoTransferLocale?.get?.()||document.documentElement.lang||"ru";return copy[value]?value:"ru"}
function localizedPath(lang,path){return `/${lang}${path}`}
function distanceFor(route){return route.distance ?? globalThis.GoTransferRouteCatalog?.getDistanceFromAirport(route.id)}
function render(){
  const section=document.querySelector(".popular-routes");
  const grid=section?.querySelector("[data-popular-routes-grid]");
  if(!section||!grid)return;
  const lang=language(),text=copy[lang],expanded=section.classList.contains("is-expanded");
  section.querySelector(".popular-routes__eyebrow").textContent=text.eyebrow;
  section.querySelector("h2").textContent=text.title;
  section.querySelector(".popular-routes__intro").textContent=text.intro;
  grid.innerHTML=routes.map((route)=>{
    const distance=distanceFor(route);
    if(!Number.isFinite(distance))return "";
    const price=calculateTransferPrice(STANDARD_TARIFF_TIER,distance,2);
    const secondary=!primary.includes(route.id);
    return `<a class="popular-route-card" href="/routes/${route.id}?lang=${lang}"${secondary&&!expanded?" hidden":""}><span class="popular-route-card__visual"><img src="${route.image}" alt="${text.alt(route.name)}" loading="lazy" decoding="async"></span><span class="popular-route-card__body"><span class="popular-route-card__origin">${text.origin} →</span><h3>${route.name}</h3><span class="popular-route-card__facts"><span>${text.distance}<strong>≈ ${distance.toFixed(1)} km</strong></span><span>${text.time}<strong>≈ ${route.minutes} ${text.minute}</strong></span></span><span class="popular-route-card__price">${text.from} €${price}</span><span class="popular-route-card__link">${text.details}<span aria-hidden="true">→</span></span></span></a>`;
  }).join("");
  const more=section.querySelector("[data-popular-routes-more]");
  more.textContent=expanded?text.less:text.more;more.setAttribute("aria-expanded",String(expanded));
  const all=section.querySelector(".popular-routes__all");all.href="/routes";all.firstChild.textContent=`${text.all} `;
}

document.querySelector("[data-popular-routes-more]")?.addEventListener("click",()=>{document.querySelector(".popular-routes")?.classList.toggle("is-expanded");render()});
window.addEventListener("gotransfer:languagechange",render);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render,{once:true});else render();
