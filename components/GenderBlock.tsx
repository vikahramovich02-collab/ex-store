import Link from "next/link";
import { asset } from "@/lib/assets";
import { setOf, piecesOf, type Gender, type Product } from "@/lib/data";

// Блок раздела: слева костюм (комплект), справа вещи по отдельности.
// По макету Figma «✕ БЫВШАЯ / БЫВШИЙ».

const heading: Record<Gender, string> = {
  female: "БЫВШАЯ",
  male: "БЫВШИЙ",
};

function Item({ product, big = false }: { product: Product; big?: boolean }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div
        className={`relative overflow-hidden bg-gray-100 bg-cover bg-center ${
          big ? "aspect-[3/4]" : "aspect-[3/4]"
        }`}
        style={{ backgroundImage: `url(${asset(product.images[0])})` }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors" />
      </div>
      <div className="mt-3">
        <p className="text-[11px] tracking-[0.12em] uppercase text-gray-700">
          {product.name}
        </p>
        <p className="text-[12px] text-gray-500 mt-0.5">{product.price} BYN</p>
      </div>
    </Link>
  );
}

export default function GenderBlock({ gender }: { gender: Gender }) {
  const set = setOf(gender);
  const pieces = piecesOf(gender);
  if (!set) return null;

  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-10 py-14 md:py-20">
      {/* Заголовок */}
      <div className="flex items-end justify-between mb-8">
        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold tracking-tight uppercase">
          <span className="text-gray-300 font-normal">✕</span> {heading[gender]}
        </h2>
        <Link
          href={gender === "female" ? "/female" : "/male"}
          className="text-[11px] tracking-[0.15em] font-medium text-gray-500 hover:text-black nav-link"
        >
          СМОТРЕТЬ ВСЁ
        </Link>
      </div>

      {/* Слева комплект, справа отдельные вещи */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Item product={set} big />
        <div className="grid grid-cols-2 gap-4 md:gap-6 content-start">
          {pieces.map((p) => (
            <Item key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
