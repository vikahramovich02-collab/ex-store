// Каталог бренда «ex». Пол + тип + коллекция + предзаказ.
// Фото пока заглушки (градиенты) — заменим на реальную съёмку из мудборда.

export type Gender = "female" | "male";

export type ProductType = "suit" | "hoodie" | "pants" | "shorts" | "top";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // BYN, обычная цена
  gender: Gender;
  type: ProductType;
  collection: string;
  description: string;
  composition: string;
  sizes: string[];
  images: string[];
  badge?: string;
  preorder?: boolean; // если true — товар по предзаказу со скидкой
};

// Размер скидки по предзаказу (из макета Figma).
export const PREORDER_DISCOUNT = 0.1; // −10%

// Цена с учётом предзаказа
export const finalPrice = (p: Product) =>
  p.preorder ? Math.round(p.price * (1 - PREORDER_DISCOUNT)) : p.price;

export const typeLabels: Record<ProductType, string> = {
  suit: "Костюмы",
  hoodie: "Худи",
  pants: "Штаны",
  shorts: "Шорты",
  top: "Майки",
};

export const genderLabels: Record<Gender, string> = {
  female: "ex female",
  male: "ex male",
};

// Коллекции (входы на главной)
export const COLLECTION_SPORT = "Спортивные костюмы";
export const COLLECTION_SUMMER = "Лето 2026";

export const products: Product[] = [
  // ── Спортивные костюмы (есть в наличии) ───────────────────────────────
  {
    id: "f-suit-1",
    slug: "sportivnyy-kostyum-grey-female",
    name: "Спортивный костюм",
    price: 220,
    gender: "female",
    type: "suit",
    collection: COLLECTION_SPORT,
    description:
      "Свободный спортивный костюм: худи и джоггеры. Мягкий футер, посадка oversize. Базовая вещь линейки ex female — носится как комплект и по отдельности.",
    composition: "80% хлопок, 20% полиэстер. Производство: Беларусь.",
    sizes: ["XS", "S", "M", "L"],
    images: ["/placeholders/suit-f-1.jpg", "/placeholders/suit-f-1b.jpg"],
    badge: "В НАЛИЧИИ",
  },
  {
    id: "m-suit-1",
    slug: "sportivnyy-kostyum-grey-male",
    name: "Спортивный костюм",
    price: 240,
    gender: "male",
    type: "suit",
    collection: COLLECTION_SPORT,
    description:
      "Мужской спортивный костюм свободного кроя: худи и джоггеры из плотного футера. Чистый силуэт, без лишних деталей. Линейка ex male.",
    composition: "80% хлопок, 20% полиэстер. Производство: Беларусь.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/placeholders/suit-m-1.jpg", "/placeholders/suit-m-1b.jpg"],
    badge: "В НАЛИЧИИ",
  },

  // ── Летняя коллекция (предзаказ) ──────────────────────────────────────
  {
    id: "f-hoodie-1",
    slug: "hudi-leto-female",
    name: "Худи лёгкое",
    price: 130,
    gender: "female",
    type: "hoodie",
    collection: COLLECTION_SUMMER,
    description:
      "Лёгкое летнее худи из тонкого футера. Укороченный силуэт. Часть летней капсулы ex.",
    composition: "100% хлопок. Производство: Беларусь.",
    sizes: ["XS", "S", "M", "L"],
    images: ["/placeholders/hoodie-f-1.jpg", "/placeholders/hoodie-f-1b.jpg"],
    preorder: true,
  },
  {
    id: "f-pants-1",
    slug: "shtany-leto-female",
    name: "Штаны",
    price: 120,
    gender: "female",
    type: "pants",
    collection: COLLECTION_SUMMER,
    description:
      "Свободные летние штаны с высокой посадкой. Лёгкая ткань, комфорт в жару.",
    composition: "70% хлопок, 30% лён. Производство: Беларусь.",
    sizes: ["XS", "S", "M", "L"],
    images: ["/placeholders/pants-f-1.jpg", "/placeholders/pants-f-1b.jpg"],
    preorder: true,
  },
  {
    id: "f-shorts-1",
    slug: "shorty-leto-female",
    name: "Шорты",
    price: 90,
    gender: "female",
    type: "shorts",
    collection: COLLECTION_SUMMER,
    description: "Лёгкие шорты свободного кроя. Летняя капсула ex female.",
    composition: "100% хлопок. Производство: Беларусь.",
    sizes: ["XS", "S", "M", "L"],
    images: ["/placeholders/shorts-f-1.jpg", "/placeholders/shorts-f-1b.jpg"],
    preorder: true,
  },
  {
    id: "f-top-1",
    slug: "mayka-zaklepki-female",
    name: "Майка с заклёпками",
    price: 85,
    gender: "female",
    type: "top",
    collection: COLLECTION_SUMMER,
    description:
      "Летняя майка с металлическими заклёпками — акцентная вещь капсулы. Облегающий силуэт.",
    composition: "95% хлопок, 5% эластан. Фурнитура: металл.",
    sizes: ["XS", "S", "M", "L"],
    images: ["/placeholders/top-f-1.jpg", "/placeholders/top-f-1b.jpg"],
    badge: "NEW",
    preorder: true,
  },
  {
    id: "m-hoodie-1",
    slug: "hudi-leto-male",
    name: "Худи лёгкое",
    price: 140,
    gender: "male",
    type: "hoodie",
    collection: COLLECTION_SUMMER,
    description:
      "Лёгкое летнее худи свободного кроя. Тонкий футер, минималистичный силуэт. Линейка ex male.",
    composition: "100% хлопок. Производство: Беларусь.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/placeholders/hoodie-m-1.jpg", "/placeholders/hoodie-m-1b.jpg"],
    preorder: true,
  },
  {
    id: "m-pants-1",
    slug: "shtany-leto-male",
    name: "Штаны",
    price: 135,
    gender: "male",
    type: "pants",
    collection: COLLECTION_SUMMER,
    description: "Свободные летние штаны из лёгкой ткани. Прямой силуэт.",
    composition: "70% хлопок, 30% лён. Производство: Беларусь.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/placeholders/pants-m-1.jpg", "/placeholders/pants-m-1b.jpg"],
    preorder: true,
  },
  {
    id: "m-shorts-1",
    slug: "shorty-leto-male",
    name: "Шорты",
    price: 100,
    gender: "male",
    type: "shorts",
    collection: COLLECTION_SUMMER,
    description: "Лёгкие шорты свободного кроя. Летняя капсула ex male.",
    composition: "100% хлопок. Производство: Беларусь.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/placeholders/shorts-m-1.jpg", "/placeholders/shorts-m-1b.jpg"],
    preorder: true,
  },
  {
    id: "m-top-1",
    slug: "mayka-zaklepki-male",
    name: "Майка с заклёпками",
    price: 95,
    gender: "male",
    type: "top",
    collection: COLLECTION_SUMMER,
    description:
      "Летняя майка с металлическими заклёпками. Акцентная вещь мужской капсулы.",
    composition: "95% хлопок, 5% эластан. Фурнитура: металл.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/placeholders/top-m-1.jpg", "/placeholders/top-m-1b.jpg"],
    badge: "NEW",
    preorder: true,
  },
];

export const collections = [
  {
    slug: "sport",
    title: COLLECTION_SPORT,
    subtitle: "В наличии",
    note: "Худи и джоггеры. Базовая линейка ex.",
  },
  {
    slug: "summer",
    title: COLLECTION_SUMMER,
    subtitle: "Предзаказ −10%",
    note: "Худи, штаны, шорты и майка с заклёпками.",
  },
];

export const byGender = (g: Gender) => products.filter((p) => p.gender === g);
export const byCollection = (c: string) =>
  products.filter((p) => p.collection === c);
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
