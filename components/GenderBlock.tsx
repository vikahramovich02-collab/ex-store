import Link from "next/link";
import ProductMiniCard from "@/components/ProductMiniCard";
import { setOf, piecesOf, type Gender } from "@/lib/data";

// Блок раздела: слева костюм (комплект), справа вещи по отдельности.
// По макету Figma «✕ БЫВШАЯ / БЫВШИЙ».

const heading: Record<Gender, string> = {
  female: "БЫВШАЯ",
  male: "БЫВШИЙ",
};

export default function GenderBlock({ gender }: { gender: Gender }) {
  const set = setOf(gender);
  const pieces = piecesOf(gender);
  if (!set) return null;

  return (
    <section className="px-5 py-14 md:py-20">
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
        <ProductMiniCard product={set} />
        <div className="grid grid-cols-2 gap-4 md:gap-6 content-start">
          {pieces.map((p) => (
            <ProductMiniCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
