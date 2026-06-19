"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { asset } from "@/lib/assets";
import { products } from "@/lib/data";

const imageOf = (id: string) => products.find((p) => p.id === id)?.images[0] ?? "";

function plural(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "предмет";
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return "предмета";
  return "предметов";
}

export default function CartDrawer() {
  const { items, isOpen, close, total, setQty, remove, count } = useCart();

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={close} />}
      <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-7 h-16 shrink-0">
          <p className="text-[11px] tracking-[0.15em] text-gray-500 uppercase">
            {count} {plural(count)} в корзине
          </p>
          <button
            onClick={close}
            className="text-[11px] tracking-[0.15em] text-gray-500 hover:text-black nav-link"
          >
            [ ЗАКРЫТЬ ]
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <p className="text-sm text-gray-400">Корзина пуста</p>
              <button
                onClick={close}
                className="text-[11px] tracking-[0.15em] font-medium nav-link"
              >
                ПРОДОЛЖИТЬ ПОКУПКИ
              </button>
            </div>
          ) : (
            <ul className="space-y-7 py-2">
              {items.map((i) => (
                <li key={`${i.id}-${i.size}`} className="flex gap-5">
                  <div
                    className="w-[70px] h-[88px] shrink-0 bg-gray-100 bg-cover bg-center"
                    style={{ backgroundImage: `url(${asset(imageOf(i.id))})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <p className="text-[12px] tracking-[0.08em] uppercase text-gray-800">
                        {i.name}{" "}
                        <span className="text-gray-400 normal-case">· {i.size}</span>
                      </p>
                      <p className="text-[12px] text-gray-800 shrink-0">{i.price * i.qty} BYN</p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2 text-[12px] text-gray-500">
                        <span>[ {i.qty} ] ШТ</span>
                        <button
                          onClick={() => setQty(i.id, i.size, i.qty - 1)}
                          className="px-1.5 hover:text-black"
                          aria-label="Меньше"
                        >
                          −
                        </button>
                        <button
                          onClick={() => setQty(i.id, i.size, i.qty + 1)}
                          className="px-1.5 hover:text-black"
                          aria-label="Больше"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(i.id, i.size)}
                        className="text-[11px] tracking-[0.1em] text-gray-400 hover:text-black"
                      >
                        [ УДАЛИТЬ ]
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom button */}
        {items.length > 0 && (
          <Link
            href="/checkout"
            onClick={close}
            className="shrink-0 bg-black text-white flex items-center justify-between px-7 py-7 hover:bg-gray-900 transition-colors"
          >
            <span className="text-2xl md:text-3xl font-semibold tracking-tight">
              Оформить заказ
            </span>
            <span className="flex items-center gap-4">
              <span className="text-sm text-white/70">{total} BYN</span>
              <ArrowRight size={26} strokeWidth={1.5} />
            </span>
          </Link>
        )}
      </aside>
    </>
  );
}
