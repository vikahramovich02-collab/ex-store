"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { count, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/female", label: "ЖЕНСКОЕ" },
    { href: "/male", label: "МУЖСКОЕ" },
    { href: "/about", label: "О БРЕНДЕ" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 h-14 grid grid-cols-3 items-center">
        {/* LEFT: nav (desktop) / burger (mobile) */}
        <div className="flex items-center gap-7">
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link text-[11px] tracking-[0.15em] font-medium text-black"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-black"
            aria-label="Меню"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {/* CENTER: logo */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.35em] lowercase select-none"
            style={{ textDecoration: "none" }}
          >
            ex
          </Link>
        </div>

        {/* RIGHT: cart */}
        <div className="flex items-center justify-end gap-7">
          <button
            onClick={open}
            className="relative flex items-center text-black"
            aria-label="Корзина"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-[12px] tracking-[0.2em] font-medium text-black"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
