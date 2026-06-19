"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import {
  byGender,
  typeLabels,
  genderLabels,
  COLLECTION_SPORT,
  COLLECTION_SUMMER,
  type Gender,
  type ProductType,
} from "@/lib/data";

const collectionMap: Record<string, string> = {
  sport: COLLECTION_SPORT,
  summer: COLLECTION_SUMMER,
};

export default function CatalogView({ gender }: { gender: Gender }) {
  const params = useSearchParams();
  const collectionParam = params.get("collection");
  const initialCollection = collectionParam ? collectionMap[collectionParam] ?? null : null;

  const [type, setType] = useState<ProductType | null>(null);
  const [collection, setCollection] = useState<string | null>(initialCollection);

  const all = byGender(gender);
  const types = Array.from(new Set(all.map((p) => p.type))) as ProductType[];
  const cols = Array.from(new Set(all.map((p) => p.collection)));

  const filtered = all.filter(
    (p) => (!type || p.type === type) && (!collection || p.collection === collection)
  );

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight lowercase">
          {genderLabels[gender]}
        </h1>
        <p className="text-[12px] text-gray-400 mt-2 tracking-wide">
          {filtered.length} вещей
        </p>
      </div>

      {/* Filters: collection (только если коллекций больше одной) */}
      {cols.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          <Chip active={!collection} onClick={() => setCollection(null)}>
            Все коллекции
          </Chip>
          {cols.map((c) => (
            <Chip key={c} active={collection === c} onClick={() => setCollection(c)}>
              {c}
            </Chip>
          ))}
        </div>
      )}

      {/* Filters: type (только если типов больше одного) */}
      {types.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <Chip active={!type} onClick={() => setType(null)}>
            Всё
          </Chip>
          {types.map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(t)}>
              {typeLabels[t]}
            </Chip>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400 py-20 text-center">
          Пока ничего нет в этой подборке.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] tracking-[0.1em] px-4 py-2 border transition-colors ${
        active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}
