(function(){
const images={
"demre-myra-st-nicholas":["/images/places/saint-nicholas-demre.png","/images/places/myra.jpg","/images/places/myra.jpg","/images/places/finike-marina.jpg"],
"demre-myra-kekova":["/images/places/myra.jpg","/images/places/saint-nicholas-demre.png","/images/places/andriake.png","/images/places/kekova.png"],
"kas":["/images/places/kaputas.png","/images/places/kas-old-town.jpg","/images/places/antiphellos.png","/images/places/finike-marina.jpg"],
"kas-kaputas":["/images/places/kaputas.png","/images/places/kaputas.png","/images/places/kas-old-town.jpg","/images/places/antiphellos.png"],
"kas-patara":["/images/places/kas-old-town.jpg","/images/places/kaputas.png","/images/places/patara.png","/images/places/patara.png"],
"patara-ancient-city":["/images/places/patara.png","/images/places/patara.png","/images/places/patara.png","/images/places/kaputas.png"],
"olympos-cirali-yanartas":["/images/places/olympos-ancient-city.jpg","/images/places/cirali-beach.jpg","/images/places/ulupinar.png","/images/places/yanartas.png"],
"phaselis-tekirova":["/images/places/phaselis.png","/images/places/phaselis.png","/images/places/alacasu-bay.png","/images/places/tekirova-coast.png"],
"kemer-tahtali":["/images/places/tahtali-cable-car.png","/images/places/tahtali-cable-car.png","/images/places/kemer-clock-tower.png","/images/places/kemer-marina-moonlight.png"],
"side-manavgat":["/images/places/manavgat-waterfall.png","/images/places/side-ancient-city.png","/images/places/side-ancient-city.png","/images/places/side-museum.png"],
"aspendos-perge":["/images/places/aspendos.png","/images/places/aspendos.png","/images/places/perge-panorama.jpg","/images/places/perge.jpg"],
"side-aspendos":["/images/places/aspendos.png","/images/places/side-ancient-city.png","/images/places/side-ancient-city.png","/images/places/side-museum.png"],
"green-canyon":["/images/journeys/green-canyon.png","/images/journeys/green-canyon.png","/images/journeys/green-canyon.png","/images/places/koprulu-canyon.png"],
"sapadere-canyon":["/images/journeys/sapadere-canyon.png","/images/journeys/sapadere-canyon.png","/images/journeys/sapadere-canyon.png","/images/places/alanya-dim-river.jpg"],
"alanya":["/images/places/alanya-cable-car.jpg","/images/places/alanya-aya-yorgi.jpg","/images/places/alanya-red-tower.jpg","/images/places/alanya-castle.jpg"],
"orthodox-antalya":["/images/places/kaleici.jpg","/images/places/kaleici.jpg","/images/places/kemer-marina-moonlight.png","/images/places/lower-duden.jpg"],
"st-nicholas-pilgrimage":["/images/places/patara.png","/images/places/myra.jpg","/images/places/myra.jpg","/images/places/saint-nicholas-demre.png"],
"orthodox-alanya":["/images/places/alanya-aya-yorgi.jpg","/images/places/alanya-castle.jpg","/images/places/alanya-cable-car.jpg","/images/places/alanya-red-tower.jpg"],
"termessos-duden":["/images/places/termessos.png","/images/places/termessos.png","/images/places/termessos.png","/images/places/lower-duden.jpg"],
"koprulu-aspendos":["/images/places/koprulu-canyon.png","/images/places/koprulu-canyon.png","/images/places/koprulu-canyon.png","/images/places/aspendos.png"],
"antalya-waterfalls-old-town":["/images/places/lower-duden.jpg","/images/places/upper-duden.jpg","/images/places/kaleici.jpg","/images/places/kemer-marina-moonlight.png"],
"lycian-way-gelidonya":["/images/places/gelidonya-lighthouse.png","/images/places/gelidonya-lighthouse.png","/images/places/three-islands.png","/images/places/adrasan-bay.jpg"],
"lycian-way-cirali-olympos":["/images/places/cirali-beach.jpg","/images/places/olympos-ancient-city.jpg","/images/places/olympos-ancient-city.jpg","/images/places/cirali-beach.jpg"],
"adrasan-suluada":["/images/places/adrasan-bay.jpg","/images/places/suluada.png","/images/places/suluada.png","/images/places/adrasan-bay.jpg"],
"goynuk-canyon-lycian-way":["/images/places/goynuk-canyon.jpg","/images/places/goynuk-canyon.jpg","/images/places/goynuk-canyon.jpg","/images/places/kemer-marina-moonlight.png"],
"arykanda-limyra-finike":["/images/places/arykanda.png","/images/places/limyra.png","/images/places/finike-marina.jpg","/images/places/finike-marina.jpg"],
"alanya-dim-river-cave":["/images/places/alanya-dim-cave.jpg","/images/places/alanya-castle.jpg","/images/places/alanya-dim-river.jpg","/images/places/alanya-red-tower.jpg"],
"syedra-alanya":["/images/places/alanya-syedra.jpg","/images/places/alanya-syedra.jpg","/images/places/alanya-syedra.jpg","/images/places/alanya-castle.jpg"],
"karain-cave-termessos":["/images/places/karain-cave.png","/images/places/termessos.png","/images/places/termessos.png","/images/places/termessos.png"],
"perge-kursunlu-museum":["/images/places/perge.jpg","/images/places/kursunlu.jpg","/images/places/antalya-museum.jpg","/images/places/konyaalti-beach.png"],
"antalya-museum-kaleici":["/images/places/antalya-museum.jpg","/images/places/kaleici.jpg","/images/places/kaleici.jpg","/images/places/kaleici.jpg"],
"alanya-cleopatra-damlatas":["/images/places/alanya-cleopatra-beach.jpg","/images/places/alanya-cleopatra-beach.jpg","/images/places/alanya-cable-car.jpg","/images/places/alanya-castle.jpg"],
"tekirova-three-islands":["/images/places/tekirova-coast.png","/images/places/three-islands.png","/images/places/three-islands.png","/images/places/tekirova-coast.png"],
"phaselis-tahtali":["/images/places/phaselis.png","/images/places/alacasu-bay.png","/images/places/tahtali-cable-car.png","/images/places/tahtali-cable-car.png"],
"beldibi-goynuk-kemer":["/images/places/beldibi-cave.png","/images/places/goynuk-canyon.jpg","/images/places/goynuk-canyon.jpg","/images/places/kemer-marina-moonlight.png"],
"zeytintasi-aspendos":["/images/places/zeytintasi-cave.png","/images/places/zeytintasi-cave.png","/images/places/aspendos.png","/images/places/aspendos.png"],
"rhodiapolis-finike-limyra":["/images/places/rhodiapolis.png","/images/places/limyra.png","/images/places/finike-marina.jpg","/images/places/finike-marina.jpg"],
"kekova-kalekoy-ucagiz":["/images/places/kekova.png","/images/places/kekova.png","/images/places/andriake.png","/images/places/kekova.png"],
"land-of-legends-belek":["/images/places/land-legends-castle-day.jpg","/images/places/land-of-legends.jpg","/images/places/land-legends-park.jpg","/images/places/belek-beach.jpg"]
};

const specificRu=[
[/Церковь Святого Николая|Храм Святого Николая|храм Святого Николая/i,"Вы увидите древнюю базилику, связанную со служением святителя Николая, сохранившиеся фрески, мозаичные полы и саркофаги. Для посещения оставляем достаточно времени без спешки."],
[/Античн.*Мир|скальные гробницы/i,"В Мире особенно впечатляют ликийские гробницы, высеченные высоко в скале, и большой греко-римский театр. Это одна из самых выразительных археологических остановок Ликийского побережья."],
[/Кеков|лодочн.*Кеков/i,"Из тихой гавани начинается лодочная прогулка вдоль острова Кекова. С воды видны стены, лестницы и фундаменты античного поселения, частично ушедшего под воду после землетрясений."],
[/Патар/i,"Патара объединяет монументальные ворота, восстановленный парламент Ликийского союза, театр, колоннадную улицу и длинный песчаный пляж. Здесь история естественно переходит в отдых у моря."],
[/Капуташ/i,"Капуташ — небольшая бирюзовая бухта между высокими скалами. Можно остановиться на панорамной площадке, спуститься к пляжу и оставить время для купания."],
[/Каш|Антифеллос/i,"В Каше вас ждут белые дома с бугенвиллиями, камерные улицы, гавань и античный театр Антифеллос с видом на море. Свободное время можно посвятить прогулке, бутикам или ресторану."],
[/Олимпос|Olympos/i,"Руины Олимпоса скрыты среди сосен и лавровых деревьев у реки. На прогулке встречаются саркофаги, остатки храмов, термы и проход к широкому пляжу."],
[/Химер|Янарташ/i,"На склоне Янарташа природный газ веками выходит из расщелин и горит прямо между камнями. Особенно атмосферно подняться к огням ближе к сумеркам."],
[/Фазелис/i,"Фазелис расположен среди сосен и трёх античных гаваней. Вы увидите акведук, главную улицу, театр и сможете совместить археологическую прогулку с отдыхом в бухте."],
[/Тахтал|канатн/i,"Канатная дорога поднимает к вершине Тахталы высотой 2365 метров. Наверху открывается круговая панорама Таврских гор, Кемера и Средиземного моря."],
[/Манавгат/i,"Широкий водопад Манавгат окружён тенистыми площадками у воды. Здесь удобно сделать спокойную остановку для фотографий, кофе или раннего обеда."],
[/Сиде|Аполлон/i,"В историческом центре Сиде античные колонны и театр соседствуют с набережной. Главный кадр маршрута — храм Аполлона у моря, особенно красивый во второй половине дня."],
[/Аспендос/i,"Римский театр Аспендоса известен исключительной сохранностью и акустикой. Рядом можно увидеть части древнего акведука и представить масштаб города Памфилии."],
[/Перге/i,"Перге впечатляет стадионом, эллинистическими воротами, банями и длинной колоннадной улицей. Персональный формат позволяет спокойно пройти главные кварталы древнего города."],
[/Зелён|плотин|водохранилищ/i,"Изумрудное водохранилище окружено высокими склонами Тавра. В программу можно включить обзорные площадки, лодочную прогулку и обед в ресторане у воды."],
[/Сападере/i,"По деревянной тропе вы пройдёте в прохладное ущелье к прозрачным природным бассейнам и водопаду. Маршрут особенно приятен в жаркие летние дни."],
[/Алань|крепост|Красн.*башн/i,"Историческая Аланья раскрывается с высоты крепости и канатной дороги. Внизу находятся Красная башня, сельджукская судоверфь и атмосферный старый порт."],
[/Святого Георг|Алипия|православ/i,"Предусмотрено спокойное посещение православной святыни с возможностью поставить свечу и осмотреть храм. Водитель ожидает столько времени, сколько потребуется."],
[/Термессос/i,"Термессос расположен высоко в горах национального парка. Тропа ведёт к театру с панорамой вершин, некрополю и руинам города, который не покорился Александру Македонскому."],
[/Дюден|водопад/i,"У Дюдена можно увидеть мощный поток воды, зелёный парк и смотровые площадки. Нижний водопад особенно эффектен там, где он падает со скалы прямо в Средиземное море."],
[/Кёпрюл|Каньон|каньон/i,"Каньон предлагает бирюзовую реку, хвойные склоны и древний мост Олук. Можно выбрать панорамную прогулку, спокойный обед у воды или активную программу по согласованию."],
[/Калеичи|стар.*порт/i,"Калеичи — старый город Анталии с османскими домами, римскими воротами, узкими улицами и портом. Здесь оставляем свободное время для прогулки, музеев, кафе и красивых фотографий."],
[/Учагыз|Порт/i,"Учагыз — небольшая тихая гавань, откуда отправляются лодки к Кекове. Перед посадкой можно прогуляться у воды, выпить кофе и увидеть спокойную жизнь ликийского побережья."],
[/обед|ресторан|ужин/i,"Ресторан выбирается с учётом ваших пожеланий: местная кухня, рыба, панорамный вид или спокойная семейная атмосфера. Время обеда не ограничено расписанием группы."],
[/пляж|бухт|купани/i,"На морской остановке можно искупаться, отдохнуть и сделать фотографии побережья. Продолжительность водитель согласует с вами, чтобы день оставался комфортным."],
[/панорам|смотров/i,"Водитель остановится на удобной панорамной площадке, где можно без спешки полюбоваться побережьем и сделать фотографии."],
[/марин|гаван/i,"Прогулка у марины знакомит с современной приморской атмосферой, яхтами, кафе и видами на горы. Здесь удобно завершить маршрут ужином или кофе."],
[/^/,"Эта остановка раскрывает характер маршрута и дополняет день новыми впечатлениями. Водитель заранее согласует удобное время прибытия и будет ждать во время прогулки."]
];

function category(ru){
 if(/Свят|храм|церк|православ/i.test(ru))return"heritage";
 if(/антич|театр|руин|крепост|башн|Перге|Патар|Фазелис|Термессос|Олимпос|Мир/i.test(ru))return"history";
 if(/лодоч|марин|порт|гаван|Кеков/i.test(ru))return"sea";
 if(/пляж|бухт|купани/i.test(ru))return"beach";
 if(/водопад|каньон|река|плотин|горы|Химер|Янарташ/i.test(ru))return"nature";
 if(/обед|ресторан|ужин/i.test(ru))return"food";
 return"experience";
}
const generic={
en:{heritage:"A meaningful heritage stop with time to explore the sacred space, its history and surviving details without rushing.",history:"Explore the principal monuments, architecture and stories of this historic site at a comfortable private pace.",sea:"Enjoy the harbour or sea route, coastal views and the freedom to adapt the stop to weather and your preferences.",beach:"Relax by the Mediterranean, swim if conditions allow and enjoy unhurried time for photographs.",nature:"Experience the landscape from its best viewpoints, with enough time for a walk, photographs and a refreshing pause.",food:"Choose a restaurant to suit your taste. Lunch timing stays flexible because there is no group timetable.",experience:"This carefully planned stop adds a distinctive experience to the day, with your chauffeur waiting nearby."},
tr:{heritage:"Kutsal mekânı, tarihini ve günümüze ulaşan ayrıntıları acele etmeden keşfedebileceğiniz anlamlı bir miras durağı.",history:"Bu tarihî yerin başlıca anıtlarını, mimarisini ve hikâyelerini kişisel temponuzda keşfedin.",sea:"Limanı veya deniz rotasını, kıyı manzaralarını ve hava koşullarına göre esnek programı deneyimleyin.",beach:"Akdeniz kıyısında dinlenin, koşullar uygunsa yüzün ve fotoğraf için rahatça zaman ayırın.",nature:"En güzel seyir noktalarından manzarayı görün; yürüyüş, fotoğraf ve dinlenme için yeterli zamanınız olsun.",food:"Zevkinize uygun restoranı seçin. Grup programı olmadığı için yemek saati esnek kalır.",experience:"Özenle planlanan bu durak güne farklı bir deneyim katar; şoförünüz yakında bekler."},
de:{heritage:"Ein besonderer Kulturerbe-Stopp mit Zeit, den heiligen Ort, seine Geschichte und erhaltene Details in Ruhe zu entdecken.",history:"Entdecken Sie die wichtigsten Monumente, Architektur und Geschichten dieses historischen Ortes in Ihrem privaten Tempo.",sea:"Genießen Sie Hafen oder Seeroute, Küstenblicke und einen Ablauf, der an Wetter und Wünsche angepasst wird.",beach:"Entspannen Sie am Mittelmeer, schwimmen Sie bei passenden Bedingungen und nehmen Sie sich Zeit für Fotos.",nature:"Erleben Sie die Landschaft von ihren schönsten Aussichtspunkten mit Zeit für Spaziergang, Fotos und Erholung.",food:"Wählen Sie ein Restaurant nach Ihrem Geschmack. Ohne Gruppenplan bleibt die Mittagspause flexibel.",experience:"Dieser sorgfältig geplante Stopp bereichert den Tag; Ihr Chauffeur wartet in der Nähe."},
ar:{heritage:"محطة تراثية مميزة تتيح لكم اكتشاف المكان المقدس وتاريخه وتفاصيله الباقية بهدوء ومن دون استعجال.",history:"اكتشفوا أهم المعالم والعمارة والقصص في هذا الموقع التاريخي وفق وتيرتكم الخاصة.",sea:"استمتعوا بالميناء أو المسار البحري وإطلالات الساحل مع برنامج مرن يناسب الطقس ورغباتكم.",beach:"استرخوا على شاطئ المتوسط، واسبحوا عندما تسمح الظروف، وخذوا وقتكم لالتقاط الصور.",nature:"شاهدوا المناظر من أفضل نقاط الإطلالة مع وقت كافٍ للمشي والتصوير والاستراحة.",food:"اختاروا المطعم الذي يناسب ذوقكم؛ ويبقى وقت الغداء مرناً لعدم وجود برنامج جماعي.",experience:"تضيف هذه المحطة المختارة بعناية تجربة خاصة إلى اليوم، بينما ينتظركم السائق في مكان قريب."}
};
function details(slug,ruStops,localizedStops,language){
 const routeImages=images[slug]||[];
 return localizedStops.map((title,index)=>{
   const ru=ruStops[index]||title;
   const description=language==="ru"?(specificRu.find(([pattern])=>pattern.test(ru))?.[1]||specificRu.at(-1)[1]):generic[language]?.[category(ru)]||generic.en.experience;
   return{title,description,image:routeImages[index]||routeImages[0]||"/assets/antalya-transfer-hero.png"};
 });
}
window.JourneyShowcases={details};
})();
