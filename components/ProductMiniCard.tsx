"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { asset } from "@/lib/assets";
import { finalPrice, type Product } from "@/lib/data";

// Карточка товара: клик по фото/названию → внутрь товара,
// кнопка «в корзину» → выбор размера прямо на месте и добавление.
export default function ProductMiniCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [pickOpen, setPickOpen] = useState(false);
  const price = finalPrice(product);

  const addSize = (size: string) => {
    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price,
      size,
      qty: 1,
      preorder: product.preorder,
    });
    setPickOpen(false);
  };

  return (
    <div>
      <Link href={`/product/${product.slug}`} className="group block">
        <div
          className="relative aspect-[3/4] overflow-hidden bg-gray-100 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset(product.images[0])})` }}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors" />
        </div>
        <p className="mt-3 text-[11px] tracking-[0.12em] uppercase text-gray-700">
          {product.name}
        </p>
        <p className="text-[12px] text-gray-500 mt-0.5">{price} BYN</p>
      </Link>

      {/* Быстрое добавление в корзину */}
      <div className="mt-2">
        {!pickOpen ? (
          <button
            onClick={() => setPickOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 text-[10px] tracking-[0.18em] font-medium border border-black py-2.5 hover:bg-black hover:text-white transition-colors"
          >
            <Plus size={12} strokeWidth={2} /> В КОРЗИНУ
          </button>
        ) : (
          <div>
            <p className="text-[9px] tracking-[0.15em] text-gray-400 mb-1.5">ВЫБЕРИ РАЗМЕР</p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => addSize(s)}
                  className="min-w-9 text-[11px] border border-gray-300 px-2.5 py-1.5 hover:bg-black hover:text-white hover:border-black transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
