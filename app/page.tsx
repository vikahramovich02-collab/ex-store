import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import HeroLogo from "@/components/HeroLogo";
import { asset } from "@/lib/assets";
import { byGender, collections } from "@/lib/data";

export default function HomePage() {
  const female = byGender("female").slice(0, 4);
  const male = byGender("male").slice(0, 4);

  return (
    <>
      {/* ─── HERO «бывшие» ───────────────────────────────────── */}
      <section
        className="relative h-screen overflow-hidden bg-cover bg-center"
        style={{
          height: "100dvh",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0) 150px), url(${asset("/hero.jpg")})`,
        }}
      >
        {/* Большой логотип по центру → уезжает в навбар при скролле */}
        <HeroLogo />
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
