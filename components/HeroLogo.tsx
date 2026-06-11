"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/assets";

// Большой логотип по центру баннера. При скролле поднимается наверх и
// уменьшается, вставая на место в навигации. Blend-эффект как у текста
// (mix-blend difference) — поэтому без transform, центрируем расчётом.

const RATIO = 216 / 240; // высота/ширина логотипа

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HeroLogo() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const NAV_CENTER = 34; // центр навбара по вертикали (h-68 / 2)
    const NAV_LOGO_W = 44; // ширина лого в навбаре (≈ h-11)

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const y = window.scrollY;
      const threshold = window.innerHeight * 0.55;
      const raw = Math.min(1, Math.max(0, y / threshold));
      const p = easeInOut(raw);

      const startW = Math.min(window.innerWidth * 0.42, 380);
      const width = lerp(startW, NAV_LOGO_W, p);
      const height = width * RATIO;

      const startCenterY = window.innerHeight * 0.5;
      const centerY = lerp(startCenterY, NAV_CENTER, p);

      el.style.width = `${width}px`;
      el.style.left = `${window.innerWidth / 2 - width / 2}px`;
      el.style.top = `${centerY - height / 2}px`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <Link
      ref={ref}
      href="/"
      aria-label="ex — на главную"
      className="absolute select-none"
      style={{
        top: "50vh",
        left: "50%",
        width: "380px",
        willChange: "top, left, width",
        mixBlendMode: "difference",
      }}
    >
      <img
        src={asset("/logo.png")}
        alt="ex"
        className="w-full h-auto"
        style={{ filter: "invert(1)" }}
        draggable={false}
      />
    </Link>
  );
}
