import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { byGender, collections } from "@/lib/data";

export default function HomePage() {
  const female = byGender("female").slice(0, 4);
  const male = byGender("male").slice(0, 4);

  return (
    <>
      {/* ─── HERO «бывшие» ───────────────────────────────────── */}
      <section className="relative h-[88vh] min-h-[520px] flex items-end overflow-hidden">
        {/* Banner image placeholder (muted «бывшие» palette) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(150deg, #b8b2a8 0%, #d8d3ca 40%, #c4beb4 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />

        {/* Big brand title centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-white/90 font-semibold lowercase select-none leading-none"
            style={{ fontSize: "clamp(5rem, 22vw, 18rem)", letterSpacing: "0.05em" }}
          >
            ex
          </span>
        </div>

        {/* Bottom-left subtitle + CTA */}
        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 pb-14">
          <p className="text-white/80 text-sm italic mb-4">бывшие</p>
          <p className="text-white/60 text-[12px] leading-relaxed mb-7 max-w-[280px]">
            Белорусский бренд одежды. Женская и мужская линейки — спортивные
            костюмы и летняя коллекция.
          </p>
          <Link
            href="/female"
            className="btn-glitch border border-white/60 text-white text-[11px] tracking-[0.22em] font-medium px-7 py-4 hover:bg-white hover:text-black transition-colors"
          >
            СМОТРЕТЬ КОЛЛЕКЦИЮ <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── КОЛЛЕКЦИИ ───────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.25em] text-gray-400 mb-2 font-medium">
            КОЛЛЕКЦИИ
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Выбери своё
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {collections.map((c, i) => {
            const bgs = [
              "linear-gradient(160deg, #2a2722 0%, #45403a 100%)",
              "linear-gradient(160deg, #cbc4b8 0%, #a59d90 100%)",
            ];
            return (
              <Link
                key={c.slug}
                href={`/female?collection=${c.slug}`}
                className="group relative aspect-[16/10] overflow-hidden flex items-end"
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ background: bgs[i] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                <div className="relative z-10 p-6 text-white">
                  <p className="text-[10px] tracking-[0.2em] text-white/60 mb-1">
                    {c.subtitle}
                  </p>
                  <p className="text-2xl font-semibold tracking-wide">{c.title}</p>
                  <p className="text-sm text-white/65 mt-1">{c.note}</p>
                  <div className="flex items-center gap-2 mt-4 text-[11px] tracking-[0.15em] font-medium text-white/70 group-hover:text-white transition-colors">
                    СМОТРЕТЬ <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── ex female ───────────────────────────────────────── */}
      <CollectionRow
        title="ex female"
        subtitle="ЖЕНСКОЕ"
        href="/female"
        products={female}
      />

      {/* ─── ex male ─────────────────────────────────────────── */}
      <CollectionRow
        title="ex male"
        subtitle="МУЖСКОЕ"
        href="/male"
        products={male}
      />
    </>
  );
}

import type { Product } from "@/lib/data";

function CollectionRow({
  title,
  subtitle,
  href,
  products,
}: {
  title: string;
  subtitle: string;
  href: string;
  products: Product[];
}) {
  return (
    <section className="max-w-screen-xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-gray-400 mb-2 font-medium">
            {subtitle}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight lowercase">
            {title}
          </h2>
        </div>
        <Link
          href={href}
          className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.15em] font-medium nav-link"
        >
          СМОТРЕТЬ ВСЁ <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] font-medium border border-black px-6 py-3"
        >
          СМОТРЕТЬ ВСЁ <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}
