"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { telegramOrderUrl } from "@/lib/order";
import { finalPrice, type Product } from "@/lib/data";

const typeBg: Record<string, string> = {
  suit: "#c9c4bd",
  hoodie: "#bcb4a8",
  pants: "#b6b1a8",
  shorts: "#c7c0b4",
  top: "#cfc8bd",
};

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);

  const price = finalPrice(product);
  const bg = typeBg[product.type] ?? "#cac4bb";

  const onAdd = () => {
    if (!size) {
      setError(true);
      return;
    }
    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price,
      size,
      qty: 1,
      preorder: product.preorder,
    });
  };

  const orderInTelegram = () => {
    if (!size) {
      setError(true);
      return;
    }
    const text = `Здравствуйте! Хочу заказать на сайте ex:\n• ${product.name} — размер ${size} — ${price} BYN`;
    window.open(telegramOrderUrl(text), "_blank");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <Link
        href={product.gender === "female" ? "/female" : "/male"}
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] text-gray-500 hover:text-black mb-6"
      >
        <ArrowLeft size={14} /> НАЗАД
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
        {/* Gallery */}
        <div>
          <div
            className="aspect-[3/4] w-full"
            style={{ background: `linear-gradient(160deg, ${bg} 0%, #efece7 100%)` }}
          >
            <div className="h-full flex items-end p-5">
              <span className="text-white/40 text-[11px] tracking-[0.2em]">
                ФОТО СКОРО · {active + 1}
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-16 h-20 transition-opacity ${
                  active === i ? "ring-1 ring-black" : "opacity-60"
                }`}
                style={{ background: `linear-gradient(160deg, ${bg} 0%, #efece7 100%)` }}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:pt-2">
          <p className="text-[11px] tracking-[0.15em] text-gray-400 mb-2">
            {product.collection}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-1">
            <span className="text-xl font-medium">{price} BYN</span>
            {product.preorder && (
              <>
                <span className="text-gray-400 line-through">{product.price} BYN</span>
                <span className="bg-black text-white text-[10px] tracking-[0.1em] px-2 py-1">
                  ПРЕДЗАКАЗ −10%
                </span>
              </>
            )}
          </div>
          {product.preorder && (
            <p className="text-[12px] text-gray-500 mb-6">
              Полная оплата со скидкой. Отгрузка после пошива партии.
            </p>
          )}
          {!product.preorder && <div className="mb-6" />}

          {/* Sizes */}
          <p className="text-[11px] tracking-[0.15em] text-gray-500 mb-3">РАЗМЕР</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className={`min-w-12 px-4 py-3 text-[12px] border transition-colors ${
                  size === s
                    ? "bg-black text-white border-black"
                    : "bg-white border-gray-200 hover:border-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p className="text-[11px] text-red-500 mb-2">Выберите размер</p>
          )}

          <Link
            href="/sizes"
            className="inline-block text-[11px] text-gray-400 hover:text-black underline underline-offset-2 mb-6"
          >
            Таблица размеров
          </Link>

          {/* Заказ */}
          <button
            onClick={orderInTelegram}
            className="btn-glitch w-full justify-center bg-black text-white text-[11px] tracking-[0.2em] font-medium py-4 hover:bg-gray-900 transition-colors mb-2"
          >
            ЗАКАЗАТЬ В TELEGRAM
          </button>
          <button
            onClick={onAdd}
            className="btn-glitch w-full justify-center border border-black text-black text-[11px] tracking-[0.2em] font-medium py-4 hover:bg-black hover:text-white transition-colors mb-6"
          >
            ДОБАВИТЬ В КОРЗИНУ
          </button>

          {/* Description */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-start gap-2 text-[12px] text-gray-500">
              <Check size={14} className="mt-0.5 shrink-0 text-gray-400" />
              <span>{product.composition}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
