(function () {
  const story = {
    slug: "what-happens-after-booking-transfer",
    image: "/assets/antalya-transfer-hero.png",
    published: "2026-08-09",
    modified: "2026-08-09",
    reading: 6,
    category: { ru: "Работа GoTransfer" },
    title: { ru: "Что происходит после того, как клиент заказывает трансфер" },
    description: { ru: "Как GoTransfer проверяет заказ, отслеживает рейс, организует встречу в аэропорту Анталии и помогает пассажирам до начала поездки." },
    alt: { ru: "Трансфер из аэропорта Анталии с GoTransfer" },
    sections: [
      { paragraphs: [
        "Многие думают, что после нажатия кнопки «Заказать трансфер» остаётся только дождаться автомобиля. Но для нас в этот момент работа только начинается.",
        "Когда мы получаем заказ, мы проверяем все данные: дату и время прилёта, номер рейса, аэропорт, место назначения, количество пассажиров и выбранный автомобиль. Если чего-то не хватает или мы замечаем возможную ошибку, мы связываемся с клиентом заранее."
      ]},
      { heading: "Мы следим за вашим рейсом", paragraphs: [
        "Если вы заказали трансфер из аэропорта Анталии, мы проверяем фактическое время прибытия рейса. Самолёт может прилететь раньше или задержаться — это обычная ситуация.",
        "При изменении времени рейса клиенту не нужно переживать, что автомобиль уедет без него. Наша задача — встретить вас тогда, когда вы действительно прилетите."
      ]},
      { heading: "Пока вы получаете багаж, мы уже ждём вас", paragraphs: [
        "После приземления необходимо пройти паспортный контроль и получить багаж. Особенно летом это может занять некоторое время, и мы это понимаем.",
        "Когда вы готовы выходить из терминала, начинается следующий этап — встреча."
      ]},
      { heading: "Как найти встречающего", paragraphs: [
        "Перед поездкой мы отправляем клиенту информацию о встрече. После выхода из терминала найдите табличку со своим именем.",
        "Если вы сразу не нашли своё имя, не переживайте. Свяжитесь с нами по WhatsApp, и мы поможем вам сориентироваться."
      ]},
      { heading: "Водитель поможет с багажом", paragraphs: [
        "После встречи водитель проводит вас к автомобилю и поможет разместить багаж.",
        "Вам не нужно искать такси, объяснять адрес отеля или договариваться о стоимости поездки: маршрут и цена трансфера известны заранее."
      ]},
      { heading: "Почему мы уделяем этому столько внимания", paragraphs: [
        "Для нас трансфер начинается не тогда, когда автомобиль тронулся с места, а с момента, когда мы получили ваш заказ.",
        "Мы понимаем, что человек может впервые прилететь в Турцию, не знать аэропорт Анталии и переживать, сможет ли он найти встречающего.",
        "Поэтому наша задача — сделать так, чтобы от бронирования до двери вашего отеля вы понимали, что происходит дальше и к кому обратиться, если понадобится помощь.",
        "Именно так мы сами хотели бы, чтобы встречали нашу семью в незнакомой стране."
      ]}
    ]
  };

  story.body = { ru: story.sections.flatMap((section) => section.paragraphs) };

  function install() {
    if (!window.GoTransferEditorial) return false;
    if (!window.GoTransferEditorial.articles.some((article) => article.slug === story.slug)) {
      window.GoTransferEditorial.articles.splice(1, 0, story);
      window.dispatchEvent(new CustomEvent("gotransfer:editorialready"));
    }
    return true;
  }

  function isCurrentStory() {
    const parts = location.pathname.split("/").filter(Boolean);
    const slug = parts.at(-1) === "blog-article.html" ? new URLSearchParams(location.search).get("slug") : parts.at(-1);
    return slug === story.slug;
  }

  function render() {
    if (!isCurrentStory()) return;
    const body = document.querySelector(".article-body");
    if (!body) return;
    body.innerHTML = story.sections.map((section) => `${section.heading ? `<h2>${section.heading}</h2>` : ""}${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}`).join("");
  }

  if (!install()) window.addEventListener("gotransfer:editorialready", install, { once: true });
  window.addEventListener("gotransfer:editorialready", () => setTimeout(render, 50));
  window.addEventListener("gotransfer:languagechange", () => setTimeout(render, 50));
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(render, 50));
  else setTimeout(render, 50);
})();
