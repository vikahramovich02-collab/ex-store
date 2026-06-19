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
  // ── Спортивные костюмы (есть в наличии) — пока единственная позиция ────
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
];

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
