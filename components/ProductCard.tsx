import Link from "next/link";
import type { Product } from "@/lib/data";
import { finalPrice } from "@/lib/data";

const typeBg: Record<string, string> = {
  suit: "#c9c4bd",
  hoodie: "#bcb4a8",
  pants: "#b6b1a8",
  shorts: "#c7c0b4",
  top: "#cfc8bd",
};

export default function ProductCard({ product }: { product: Product }) {
  const bg = typeBg[product.type] ?? "#cac4bb";
  const price = finalPrice(product);
  const badge = product.preorder ? "ПРЕДЗАКАЗ −10%" : product.badge;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 product-hover-wrap">
        {/* Primary placeholder */}
        <div
          className="absolute inset-0 transition-opacity duration-400 group-hover:opacity-0"
          style={{ background: `linear-gradient(160deg, ${bg} 0%, #efece7 100%)` }}
        >
          <div className="absolute inset-0 flex items-end p-4">
            <span className="text-white/40 text-[10px] tracking-[0.2em] font-medium">
              {product.name.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Secondary placeholder (hover) */}
        <div
          className="img-secondary absolute inset-0"
          style={{ background: `linear-gradient(160deg, #e6e3de 0%, ${bg} 100%)` }}
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 bg-black text-white text-[9px] tracking-[0.15em] px-2 py-1 font-medium">
            {badge}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-[11px] text-gray-400 tracking-[0.12em] font-medium">
          {product.collection}
        </p>
        <p className="text-[13px] font-medium leading-snug">{product.name}</p>
        <p className="text-[13px] text-gray-700">
          {price} BYN
          {product.preorder && (
            <span className="text-gray-400 line-through ml-2">{product.price}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
