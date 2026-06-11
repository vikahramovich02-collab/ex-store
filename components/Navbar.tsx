"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { asset } from "@/lib/assets";

export default function Navbar() {
  const { count, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const leftLinks = [
    { href: "/female", label: "БЫВШАЯ" },
    { href: "/male", label: "БЫВШИЙ" },
  ];

  const linkCls =
    "nav-link text-[11px] tracking-[0.18em] font-medium text-black";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 h-[68px] grid grid-cols-3 items-center">
        {/* LEFT: бывшая / бывший (desktop) · burger (mobile) */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {leftLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls}>
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
          <Link href="/" aria-label="ex — на главную" className="block">
            <img
              src={asset("/logo.png")}
              alt="ex"
              className="h-11 w-auto select-none"
              draggable={false}
            />
          </Link>
        </div>

        {/* RIGHT: корзина / связаться */}
        <div className="flex items-center justify-end gap-8">
          <button onClick={open} className={`${linkCls} relative`}>
            КОРЗИНА
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </button>
          <Link href="/contacts" className={`hidden md:block ${linkCls}`}>
            СВЯЗАТЬСЯ
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
          {[...leftLinks, { href: "/contacts", label: "СВЯЗАТЬСЯ" }].map((l) => (
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
