(function () {
  const restoredArticleSlugs = new Set(["welcome-to-my-turkey", "our-first-car-gotransfer-story"]);
  if (window.GoTransferEditorial?.articles) {
    window.GoTransferEditorial.articles = window.GoTransferEditorial.articles.filter((article) => restoredArticleSlugs.has(article.slug));
  }
  const copy = {
    ru: {
      kicker: "Личный блог Анны",
      title: "Блог GoTransfer — истории нашей семьи",
      intro: "О Турции, поездках, людях и нашей повседневной работе — тепло и честно, как в разговоре за чашкой кофе.",
      futureTitle: "О чём я расскажу дальше",
      futureIntro: "Это темы следующих публикаций. Я буду добавлять их постепенно — с личными историями, полезными деталями и без рекламных шаблонов.",
      topics: [
        "Как появилась наша семейная компания GoTransfer",
        "Что происходит после того, как клиент заказывает трансфер",
        "Как мы встречаем гостей, которые впервые прилетают в Турцию",
        "Почему знание русского, английского и турецкого так важно в нашей работе",
        "Места в Турции, которые мы любим сами",
        "Истории из нашей работы без раскрытия личных данных клиентов",
        "Полезные советы перед поездкой в Турцию",
        "Как путешествовать с детьми спокойно и комфортно",
        "Что делать, если рейс задержали",
        "Люди GoTransfer: знакомство с нашей семьёй"
      ],
      signature: ["С теплом,", "Анна", "Семья GoTransfer"]
    },
    en: {
      kicker: "Anna’s personal blog",
      title: "The GoTransfer Blog — stories from our family",
      intro: "Turkey, journeys, people and our everyday work — shared warmly and honestly, as if we were talking over coffee.",
      futureTitle: "Stories I’ll share next",
      futureIntro: "These are the next conversations I would like us to have — personal, practical and never written like an advertisement.",
      topics: [
        "How our family company, GoTransfer, began",
        "What happens after a guest books a transfer",
        "How we welcome people arriving in Turkey for the first time",
        "Why speaking Russian, English and Turkish matters so much in our work",
        "The places in Turkey that our own family loves",
        "True stories from our work, always protecting our guests’ privacy",
        "Useful things to know before travelling to Turkey",
        "How to travel calmly and comfortably with children",
        "What to do when your flight is delayed",
        "The people behind GoTransfer: meet our family"
      ],
      signature: ["Warmly,", "Anna", "The GoTransfer family"]
    },
    tr: {
      kicker: "Anna’nın kişisel blogu",
      title: "GoTransfer Blog — ailemizden hikâyeler",
      intro: "Türkiye, yolculuklar, insanlar ve günlük işimiz üzerine; bir kahve sohbeti kadar sıcak ve içten yazılar.",
      futureTitle: "Bundan sonra neler anlatacağım",
      futureIntro: "Sıradaki yazılarımızın konuları bunlar. Her birini kişisel hikâyeler ve işe yarayan ayrıntılarla, reklâm dili kullanmadan paylaşacağım.",
      topics: [
        "Aile şirketimiz GoTransfer nasıl doğdu?",
        "Bir misafir transfer rezervasyonu yaptıktan sonra neler oluyor?",
        "Türkiye’ye ilk kez gelen misafirlerimizi nasıl karşılıyoruz?",
        "Rusça, İngilizce ve Türkçe bilmek işimizde neden bu kadar önemli?",
        "Türkiye’de ailece sevdiğimiz yerler",
        "Misafirlerimizin özel bilgilerini koruyarak işimizden gerçek hikâyeler",
        "Türkiye seyahati öncesinde faydalı bilgiler",
        "Çocuklarla sakin ve konforlu yolculuk nasıl yapılır?",
        "Uçuş gecikirse ne yapmalı?",
        "GoTransfer’ın insanları: ailemizle tanışın"
      ],
      signature: ["Sevgiyle,", "Anna", "GoTransfer ailesi"]
    }
  };

  const welcome = {
    title: {
      ru: "Здравствуйте, я Анна. Добро пожаловать в блог семьи GoTransfer",
      en: "Hello, I’m Anna. Welcome to the GoTransfer family blog",
      tr: "Merhaba, ben Anna. GoTransfer aile bloguna hoş geldiniz"
    },
    description: {
      ru: "Почему мы решили вести этот блог и что для нашей семьи значит встречать гостей в Турции с заботой, вниманием и спокойствием.",
      en: "Why we started this blog, and what it means to our family to welcome people to Turkey with care, attention and calm.",
      tr: "Bu blogu neden açtığımızı ve Türkiye’ye gelen misafirleri özenle, dikkatle ve huzurla karşılamanın ailemiz için ne ifade ettiğini anlatıyorum."
    },
    headings: {
      work: { ru: "Не просто поездка из точки А в точку Б", en: "More than getting from A to B", tr: "A noktasından B noktasına gitmekten daha fazlası" },
      blog: { ru: "О чём будем говорить", en: "What we’ll talk about here", tr: "Burada neler konuşacağız?" }
    },
    intro: {
      ru: [
        "Здравствуйте! Меня зовут Анна. Я давно хотела, чтобы у GoTransfer появилось место для обычного человеческого разговора — не только о ценах, автомобилях и маршрутах, но и о людях, встречах и жизни между поездками.",
        "GoTransfer — наш семейный бизнес. За каждым сообщением, встречей в аэропорту и поездкой стоят настоящие люди: мы сами отвечаем гостям, обсуждаем детали, следим за рейсами и переживаем, чтобы всё прошло спокойно.",
        "Мы говорим на русском, английском и турецком. Это помогает не просто уточнить адрес, а услышать человека — понять, устал ли он после дороги, волнуется ли из-за первого путешествия или едет с детьми и хочет заранее знать каждую мелочь."
      ],
      en: [
        "Hello! My name is Anna. For a long time, I wanted GoTransfer to have a place for a real conversation — not only about prices, vehicles and routes, but about people, meetings and the life that happens between journeys.",
        "GoTransfer is our family business. Real people stand behind every message, airport welcome and drive: we answer guests ourselves, talk through the details, follow flights and genuinely care that everything feels easy.",
        "We speak Russian, English and Turkish. That lets us do more than confirm an address. We can hear when someone is tired after a long journey, nervous about a first visit, or travelling with children and needing every small detail settled in advance."
      ],
      tr: [
        "Merhaba! Benim adım Anna. Uzun zamandır GoTransfer’da gerçek bir sohbet için de bir yer olsun istiyordum. Yalnızca fiyatları, araçları ve rotaları değil; insanları, karşılaşmaları ve yolculukların arasındaki hayatı da konuşalım istedim.",
        "GoTransfer bizim aile işimiz. Her mesajın, havalimanı karşılamasının ve yolculuğun arkasında gerçek insanlar var. Misafirlerimize kendimiz cevap veriyor, ayrıntıları birlikte konuşuyor, uçuşları takip ediyor ve her şeyin huzurlu geçmesini gerçekten önemsiyoruz.",
        "Rusça, İngilizce ve Türkçe konuşuyoruz. Böylece yalnızca adresi doğrulamakla kalmıyor; uzun bir yolculuktan sonra yorulan, Türkiye’ye ilk kez geldiği için heyecanlanan ya da çocuklarıyla seyahat ederken her ayrıntıyı önceden bilmek isteyen misafirimizi anlayabiliyoruz."
      ]
    },
    priorities: {
      ru: ["доверие ещё до первой встречи", "безопасная и спокойная поездка", "понятное общение на русском, английском и турецком", "внимание к детям, багажу и особым просьбам", "человеческое отношение в любой неожиданной ситуации"],
      en: ["trust before we even meet", "a safe and calm journey", "clear communication in Russian, English and Turkish", "care for children, luggage and individual requests", "a human response when plans suddenly change"],
      tr: ["daha buluşmadan güven oluşturmak", "güvenli ve huzurlu bir yolculuk", "Rusça, İngilizce ve Türkçe açık iletişim", "çocuklara, bagaja ve özel isteklere özen", "planlar değiştiğinde insanca ve çözüm odaklı yaklaşım"]
    },
    service: {
      ru: "Для нас доверие начинается с простых вещей: ответить без раздражения, не оставить человека одного с вопросом, вовремя приехать и честно объяснить, если обстоятельства изменились. Безопасность — не красивое слово для сайта, а ежедневная ответственность за тех, кто садится в нашу машину.",
      en: "For us, trust begins with simple things: answering patiently, never leaving someone alone with a question, arriving on time and explaining honestly when circumstances change. Safety is not a polished word for a website; it is our everyday responsibility for the people who step into our car.",
      tr: "Bizim için güven basit şeylerle başlar: sabırla cevap vermek, bir misafiri sorusuyla baş başa bırakmamak, zamanında gelmek ve koşullar değiştiğinde dürüstçe açıklamak. Güvenlik, internet sitesi için seçilmiş güzel bir kelime değil; aracımıza binen herkese karşı günlük sorumluluğumuzdur."
    },
    blogIntro: {
      ru: "Здесь я буду рассказывать о Турции, поездках и нашей повседневной работе — о том, что обычно остаётся за кадром:",
      en: "Here I’ll write about Turkey, travel and our everyday work — including the things guests rarely get to see:",
      tr: "Burada Türkiye’yi, seyahatleri ve günlük işimizi; çoğu zaman perde arkasında kalan ayrıntılarla anlatacağım:"
    },
    topics: {
      ru: ["истории из трансферной работы и неожиданные ситуации", "места в Турции, которые мы любим и советуем друзьям", "разные культуры и маленькие детали, которые помогают понимать друг друга", "практические советы о перелётах, поездках с детьми и первых днях в незнакомой стране"],
      en: ["stories and unexpected moments from transfer work", "places in Turkey we love and recommend to friends", "cultures and small details that help people understand one another", "practical advice about flights, family travel and those first days in a new country"],
      tr: ["transfer işinden hikâyeler ve beklenmedik durumlar", "Türkiye’de sevdiğimiz ve dostlarımıza önerdiğimiz yerler", "birbirimizi anlamamıza yardım eden kültürler ve küçük ayrıntılar", "uçuşlar, çocuklarla seyahat ve yabancı bir ülkedeki ilk günler için pratik öneriler"]
    },
    closing: {
      ru: ["Мы не хотим просто перевозить людей. Нам важно, чтобы в незнакомой стране человек с первых минут чувствовал: его ждут, ему помогут, рядом есть кто-то надёжный.", "Надеюсь, этот блог станет местом, куда вам захочется возвращаться — за полезным советом, знакомой историей или просто тёплым разговором о Турции."],
      en: ["We do not want to simply move people from place to place. We want someone in an unfamiliar country to feel from the first moment that they are expected, supported and not alone.", "I hope this blog becomes somewhere you want to return to — for a useful tip, a familiar story or simply a warm conversation about Turkey."],
      tr: ["Biz insanları yalnızca bir yerden başka bir yere taşımak istemiyoruz. Yabancı bir ülkede ilk dakikadan itibaren beklendiğini, yardım göreceğini ve yanında güvenebileceği birinin olduğunu hissetsin istiyoruz.", "Umarım bu blog; yararlı bir öneri, tanıdık bir hikâye ya da Türkiye üzerine sıcak bir sohbet için yeniden uğramak isteyeceğiniz bir yer olur."]
    },
    author: {
      ru: "Анна — участница семейного бизнеса GoTransfer. Живёт в Турции, общается с гостями и рассказывает о стране и работе так, как рассказала бы хорошему знакомому за чашкой кофе.",
      en: "Anna is part of the family behind GoTransfer. She lives in Turkey, speaks with guests every day and writes about the country and the work as she would talk to a friend over coffee.",
      tr: "Anna, GoTransfer ailesinin bir üyesi. Türkiye’de yaşıyor, her gün misafirlerle konuşuyor; ülkeyi ve işimizi bir dostuyla kahve içerken anlatır gibi paylaşıyor."
    }
  };

  function language() {
    const value = window.GoTransferLocale?.get?.() || new URLSearchParams(location.search).get("lang") || "ru";
    return copy[value] ? value : "ru";
  }

  function configureWelcome() {
    const article = window.GoTransferEditorial?.articles?.find((item) => item.slug === "welcome-to-my-turkey");
    if (!article || article.datasetFamilyConfigured) return;
    Object.assign(article.title, welcome.title);
    Object.assign(article.description, welcome.description);
    Object.assign(article.headings.work, welcome.headings.work);
    Object.assign(article.headings.blog, welcome.headings.blog);
    ["intro", "priorities", "service", "blogIntro", "topics", "closing", "author"].forEach((key) => {
      Object.assign(article[key], welcome[key]);
    });
    article.reading = 6;
    article.datasetFamilyConfigured = true;
  }

  function addSignature() {
    if (document.body.dataset.editorialPage !== "article") return;
    const body = document.querySelector(".article-body");
    if (!body || body.querySelector(".article-signature")) return;
    const lines = copy[language()].signature;
    const signature = document.createElement("p");
    signature.className = "article-signature";
    signature.innerHTML = lines.map((line) => `<span>${line}</span>`).join("");
    const author = body.querySelector(".article-author");
    body.insertBefore(signature, author || null);
  }

  function decorateBlog() {
    configureWelcome();
    const current = copy[language()];
    if (document.body.dataset.editorialPage === "blog") {
      const kicker = document.querySelector("[data-blog-kicker]");
      const title = document.querySelector("[data-blog-title]");
      const intro = document.querySelector("[data-blog-intro]");
      if (kicker) kicker.textContent = current.kicker;
      if (title) title.textContent = current.title;
      if (intro) intro.textContent = current.intro;
      document.title = `${current.title} | Go Transfer Antalya`;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = current.intro;
      const crumb = document.querySelector(".breadcrumbs span:last-child");
      if (crumb) crumb.textContent = current.title;
      const welcomeCard = document.querySelector('.article-card[href*="welcome-to-my-turkey"]');
      if (welcomeCard) {
        const lang = language();
        const cardTitle = welcomeCard.querySelector("h2");
        const cardDescription = welcomeCard.querySelector("p");
        const cardImage = welcomeCard.querySelector("img");
        if (cardTitle) cardTitle.textContent = welcome.title[lang];
        if (cardDescription) cardDescription.textContent = welcome.description[lang];
        if (cardImage) cardImage.alt = welcome.title[lang];
      }
      document.querySelector(".blog-future")?.remove();
      const grid = document.querySelector("[data-article-grid]");
      if (grid) {
        const section = document.createElement("section");
        section.className = "blog-future";
        section.innerHTML = `<div class="blog-future__intro"><span>${current.kicker}</span><h2>${current.futureTitle}</h2><p>${current.futureIntro}</p></div><ol>${current.topics.map((topic, index) => index === 0 ? `<li class="is-published"><a href="/stories/our-first-car-gotransfer-story?lang=${language()}"><span>${String(index + 1).padStart(2, "0")}</span><p>${topic}</p><strong aria-hidden="true">→</strong></a></li>` : `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${topic}</p></li>`).join("")}</ol>`;
        grid.after(section);
      }
    }
    addSignature();
  }

  configureWelcome();
  window.addEventListener("gotransfer:editorialready", () => setTimeout(decorateBlog));
  window.addEventListener("gotransfer:languagechange", () => setTimeout(decorateBlog));
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(decorateBlog));
  else setTimeout(decorateBlog);
})();
