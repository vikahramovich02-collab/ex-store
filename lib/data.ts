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
  // ── ЖЕНСКОЕ: костюм (комплект) + худи + штаны по отдельности ───────────
  {
    id: "f-suit",
    slug: "kostyum-female",
    name: "Спортивный костюм",
    price: 222,
    gender: "female",
    type: "suit",
    collection: COLLECTION_SPORT,
    description:
      "Женский спортивный костюм: худи и штаны. Мягкий футер, посадка oversize. Можно взять комплектом или каждую вещь отдельно.",
    composition: "80% хлопок, 20% полиэстер. Производство: Беларусь.",
    sizes: ["XS", "S", "M", "L"],
    images: ["/products/female-suit.jpg"],
  },
  {
    id: "f-hoodie",
    slug: "hudi-female",
    name: "Спортивное худи",
    price: 111,
    gender: "female",
    type: "hoodie",
    collection: COLLECTION_SPORT,
    description:
      "Женское спортивное худи из мягкого футера, посадка oversize. Часть костюма — носится отдельно.",
    composition: "80% хлопок, 20% полиэстер. Производство: Беларусь.",
    sizes: ["XS", "S", "M", "L"],
    images: ["/products/female-hoodie.jpg"],
  },
  {
    id: "f-pants",
    slug: "shtany-female",
    name: "Спортивные штаны",
    price: 111,
    gender: "female",
    type: "pants",
    collection: COLLECTION_SPORT,
    description:
      "Женские спортивные штаны, свободный крой. Часть костюма — носятся отдельно.",
    composition: "80% хлопок, 20% полиэстер. Производство: Беларусь.",
    sizes: ["XS", "S", "M", "L"],
    images: ["/products/female-pants.jpg"],
  },

  // ── МУЖСКОЕ: костюм (комплект) + худи + штаны по отдельности ───────────
  {
    id: "m-suit",
    slug: "kostyum-male",
    name: "Спортивный костюм",
    price: 240,
    gender: "male",
    type: "suit",
    collection: COLLECTION_SPORT,
    description:
      "Мужской спортивный костюм: худи и штаны из плотного футера. Чистый силуэт. Можно взять комплектом или отдельно.",
    composition: "80% хлопок, 20% полиэстер. Производство: Беларусь.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/products/male-suit.jpg"],
  },
  {
    id: "m-hoodie",
    slug: "hudi-male",
    name: "Спортивное худи",
    price: 120,
    gender: "male",
    type: "hoodie",
    collection: COLLECTION_SPORT,
    description:
      "Мужское спортивное худи из плотного футера. Часть костюма — носится отдельно.",
    composition: "80% хлопок, 20% полиэстер. Производство: Беларусь.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/products/male-hoodie.jpg"],
  },
  {
    id: "m-pants",
    slug: "shtany-male",
    name: "Спортивные штаны",
    price: 120,
    gender: "male",
    type: "pants",
    collection: COLLECTION_SPORT,
    description:
      "Мужские спортивные штаны, прямой силуэт. Часть костюма — носятся отдельно.",
    composition: "80% хлопок, 20% полиэстер. Производство: Беларусь.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/products/male-pants.jpg"],
  },
];

// Хелперы для блоков «бывшая/бывший»: комплект + отдельные вещи
export const setOf = (g: Gender) =>
  products.find((p) => p.gender === g && p.type === "suit");
export const piecesOf = (g: Gender) =>
  products.filter((p) => p.gender === g && p.type !== "suit");

export const collections = [
  {
    slug: "sport",
    title: COLLECTION_SPORT,
    subtitle: "В наличии",
    note: "Худи и джоггеры. Базовая линейка ex.",
  },
];

export const byGender = (g: Gender) => products.filter((p) => p.gender === g);
export const byCollection = (c: string) =>
  products.filter((p) => p.collection === c);
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
