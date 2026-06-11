"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, close, total, setQty, remove, count } = useCart();

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={close} />}
      <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 shrink-0">
          <p className="text-[12px] tracking-[0.2em] font-semibold">
            КОРЗИНА {count > 0 && `(${count})`}
          </p>
          <button onClick={close} aria-label="Закрыть">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6 gap-3">
              <p className="text-sm text-gray-400">Корзина пуста</p>
              <button
                onClick={close}
                className="text-[11px] tracking-[0.15em] font-medium nav-link"
              >
                ПРОДОЛЖИТЬ ПОКУПКИ
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((i) => (
                <li key={`${i.id}-${i.size}`} className="flex gap-4 p-5">
                  <div
                    className="w-16 h-20 shrink-0 bg-gray-100"
                    style={{ background: "linear-gradient(160deg, #cac4bb 0%, #efece7 100%)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium leading-snug">{i.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Размер: {i.size}
                      {i.preorder && " · предзаказ"}
                    </p>
                    <p className="text-[12px] text-gray-700 mt-1">{i.price} BYN</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => setQty(i.id, i.size, i.qty - 1)}
                          className="px-2 py-1 text-gray-600 hover:text-black"
                          aria-label="Меньше"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-[12px] tabular-nums">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.id, i.size, i.qty + 1)}
                          className="px-2 py-1 text-gray-600 hover:text-black"
                          aria-label="Больше"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(i.id, i.size)}
                        className="text-gray-300 hover:text-black transition-colors"
                        aria-label="Удалить"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 shrink-0 space-y-4">
            <div className="flex justify-between text-[13px]">
              <span className="text-gray-500">Итого</span>
              <span className="font-semibold">{total} BYN</span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="btn-glitch w-full justify-center bg-black text-white text-[11px] tracking-[0.2em] font-medium py-4 hover:bg-gray-900 transition-colors"
            >
              ОФОРМИТЬ ЗАКАЗ
            </Link>
            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              Оплата картой или ЕРИП. Предзаказ — полная оплата со скидкой.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
