export const whatsappPhone = "905346801828";

export const places = [
  {
    id: "lower-duden",
    title: "Нижний Дюден",
    category: "Короткая остановка",
    description:
      "Живописный водопад, который впадает прямо в Средиземное море. Подходит для короткой остановки и фотографий недалеко от Лары.",
    image: "/images/places/lower-duden.jpg",
    slug: "lower-duden",
  },
  {
    id: "duden-park",
    title: "Парк Дюден",
    category: "Прогулка",
    description:
      "Прогулочная зона возле моря и водопада с красивыми видами и местами для отдыха. Можно ненадолго задержаться у смотровых площадок.",
    image: "/images/places/duden-park.jpg",
    slug: "duden-park",
  },
  {
    id: "kaleici",
    title: "Калеичи",
    category: "Историческое место",
    description:
      "Исторический центр Антальи со старинными улицами, портом, воротами Адриана и обзорными площадками. Для посещения потребуется дополнительное время.",
    image: "/images/places/kaleici.jpg",
    slug: "kaleici",
  },
  {
    id: "perge",
    title: "Древний город Перге",
    category: "Историческое место",
    description:
      "Один из наиболее известных античных городов региона с древними улицами, колоннами, стадионом и историческими сооружениями.",
    image: "/images/places/perge.jpg",
    slug: "perge",
  },
  {
    id: "kursunlu-waterfall",
    title: "Водопад Куршунлу",
    category: "Прогулка",
    description:
      "Природный парк с водопадом, прогулочными дорожками и зелёной территорией. Требует отклонения от прямого маршрута.",
    image: "/images/places/kursunlu.jpg",
    slug: "kursunlu-waterfall",
  },
  {
    id: "upper-duden",
    title: "Верхний Дюден",
    category: "Прогулка",
    description:
      "Водопад и природная зона в северной части Антальи. Подходит для отдельной дополнительной остановки.",
    image: "/images/places/upper-duden.jpg",
    slug: "upper-duden",
  },
  {
    id: "antalya-museum",
    title: "Археологический музей Антальи",
    category: "Историческое место",
    description:
      "Музей с археологическими находками из Перге, Аспендоса и других древних городов региона.",
    image: "/images/places/antalya-museum.jpg",
    slug: "antalya-museum",
  },
];

export const placesBySlug = Object.fromEntries(places.map((place) => [place.slug, place]));

export const routes = {
  lara: {
    slug: "lara",
    origin: "Аэропорт Антальи",
    destination: "Лара",
    destinationAccusative: "Лару",
    title: "VIP-трансфер из аэропорта Антальи в Лару с остановками",
    description:
      "Обычный трансфер можно превратить в небольшое путешествие — добавить красивое место, прогулку или историческую остановку.",
    seoTitle: "VIP-трансфер из аэропорта Антальи в Лару с остановками",
    seoDescription:
      "Выберите водопады, прогулочные зоны и исторические места для индивидуального VIP-трансфера из аэропорта Антальи в Лару.",
    image: "/assets/antalya-transfer-hero.png",
    directStops: ["lower-duden", "duden-park", "kaleici"],
    extraTrips: ["perge", "kursunlu-waterfall", "upper-duden", "antalya-museum"],
  },
};

