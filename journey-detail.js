const slug=location.pathname.split("/").filter(Boolean).pop();
const data=window.VIP_JOURNEYS.find(item=>item.slug===slug);
if(!data){location.replace("/journeys")}else{
document.title=`${data.title} — индивидуальное VIP-путешествие | GoTransfer`;
document.querySelector('meta[name="description"]').content=`${data.title}: однодневное индивидуальное VIP-путешествие по Анталийскому побережью с персональным водителем GoTransfer.`;
document.querySelector("#detailImage").src=data.image;
document.querySelector("#detailImage").alt=data.title;
document.querySelector("#detailKicker").textContent=`ОДНОДНЕВНЫЙ VIP-МАРШРУТ · ${data.duration}`;
document.querySelector("#detailTitle").textContent=data.title;
document.querySelector("#detailLead").textContent=data.description;
document.querySelector("#detailDuration").textContent=data.duration;
document.querySelector("#detailStops").innerHTML=data.stops.map(stop=>`<li>${stop}</li>`).join("");
document.querySelector("#storyTitle").textContent=`Ваш индивидуальный день: ${data.title}`;
document.querySelector("#detailStory").innerHTML=`<p>Это не групповая экскурсия: автомобиль и водитель работают только для вас. Утром мы заберём вас из отеля или по согласованному адресу, а вечером вернём обратно.</p><p>Оператор поможет выбрать удобное время выезда, ресторан и продолжительность остановок. Программа остаётся гибкой, чтобы путешествие соответствовало вашему темпу и интересам.</p>`;
document.querySelector("#detailWhatsapp").textContent="Забронировать VIP-путешествие";
document.querySelector("#detailWhatsapp").href=`https://wa.me/905346801828?text=${encodeURIComponent(`Здравствуйте! Хочу забронировать однодневное VIP-путешествие «${data.title}».`)}`;
}
