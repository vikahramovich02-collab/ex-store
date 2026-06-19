import Link from "next/link";
import HeroLogo from "@/components/HeroLogo";
import { asset } from "@/lib/assets";

export default function HomePage() {
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

      {/* ─── ДВЕ ФОТО: костюмы ж/м (во всю ширину, без отступов) ── */}
      <section className="grid grid-cols-2 gap-0">
        {[
          { href: "/female", label: "ex female", sub: "ЖЕНСКИЙ КОСТЮМ", img: "/collection-female.jpg" },
          { href: "/male", label: "ex male", sub: "МУЖСКОЙ КОСТЮМ", img: "/collection-male.jpg" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative h-[78vh] min-h-[440px] overflow-hidden flex items-end bg-gray-200"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ backgroundImage: `url(${asset(c.img)})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="relative z-10 p-6 md:p-8 text-white">
              <p className="text-[10px] tracking-[0.2em] text-white/70 mb-1">{c.sub}</p>
              <p className="text-2xl md:text-3xl font-semibold tracking-tight lowercase">
                {c.label}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
