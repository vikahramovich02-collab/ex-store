"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Minus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import ProductMiniCard from "@/components/ProductMiniCard";
import { telegramOrderUrl } from "@/lib/order";
import { asset } from "@/lib/assets";
import { finalPrice, products, type Product } from "@/lib/data";

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const price = finalPrice(product);

  const related = products.filter((p) => p.gender === product.gender && p.id !== product.id);

  const onAdd = () => {
    if (!size) return setError(true);
    add({ id: product.id, slug: product.slug, name: product.name, price, size, qty: 1, preorder: product.preorder });
  };

  const orderInTelegram = () => {
    if (!size) return setError(true);
    const text = `Здравствуйте! Хочу заказать на сайте ex:\n• ${product.name} — размер ${size} — ${price} BYN`;
    window.open(telegramOrderUrl(text), "_blank");
  };

  return (
    <div className="px-5 py-6">
      <Link
        href={product.gender === "female" ? "/female" : "/male"}
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] text-gray-500 hover:text-black mb-5"
      >
        <ArrowLeft size={14} /> НАЗАД
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start">
        {/* Left: фото-галерея (скроллится, клик → увеличить) */}
        <div className="space-y-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="block w-full aspect-[3/4] bg-gray-100 bg-cover bg-center cursor-zoom-in"
              style={{ backgroundImage: `url(${asset(img)})` }}
              aria-label={`Увеличить фото ${i + 1}`}
            />
          ))}
        </div>

        {/* Right: залипающая панель */}
        <div className="md:sticky md:top-6 self-start">
          <p className="text-[11px] tracking-[0.15em] text-gray-400 mb-2">{product.collection}</p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{product.name}</h1>
          <p className="text-xl font-medium mb-6">{price} BYN</p>

          {/* Размеры */}
          <p className="text-[11px] tracking-[0.15em] text-gray-500 mb-3">РАЗМЕР</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => { setSize(s); setError(false); }}
                className={`min-w-12 px-4 py-3 text-[12px] border transition-colors ${
                  size === s ? "bg-black text-white border-black" : "bg-white border-gray-200 hover:border-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {error && <p className="text-[11px] text-red-500 mb-2">Выберите размер</p>}
          <Link href="/sizes" className="inline-block text-[11px] text-gray-400 hover:text-black underline underline-offset-2 mb-6">
            Таблица размеров
          </Link>

          {/* Кнопки */}
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

          {/* Раскрывающиеся плашки */}
          <div className="border-t border-gray-200">
            <Accordion title="ОПИСАНИЕ ТОВАРА" defaultOpen>
              <p>{product.description}</p>
            </Accordion>
            <Accordion title="СОСТАВ И УХОД">
              <p>{product.composition}</p>
              <p className="mt-2 text-gray-400">Стирка при 30°, не отбеливать, гладить при низкой температуре.</p>
            </Accordion>
            <Accordion title="ДОСТАВКА И ОПЛАТА">
              <p>Европочта / Белпочта по всей Беларуси, Яндекс Доставка по Минску, самовывоз.</p>
              <p className="mt-2">Оформление заказа — заявка через сайт, мы свяжемся с вами в Telegram и договоримся об оплате и доставке.</p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Дополните образ */}
      {related.length > 0 && (
        <section className="mt-16 md:mt-24">
          <h2 className="text-lg md:text-xl font-semibold tracking-tight uppercase mb-6">
            Дополните образ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductMiniCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {lightbox !== null && (
        <Lightbox
          images={product.images}
          index={lightbox}
          setIndex={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

function Lightbox({
  images,
  index,
  setIndex,
  onClose,
}: {
  images: string[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const go = (d: number) => setIndex((index + d + images.length) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, setIndex]);

  return (
    <div className="fixed inset-0 z-[60] bg-white flex">
      {/* Превью-плашки слева */}
      {images.length > 1 && (
        <div className="hidden md:flex flex-col gap-2 p-4 overflow-y-auto w-[92px] shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`aspect-[3/4] bg-gray-100 bg-cover bg-center transition-opacity ${
                i === index ? "ring-1 ring-black" : "opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundImage: `url(${asset(img)})` }}
              aria-label={`Фото ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Большое фото */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-10">
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${asset(images[index])})`, backgroundColor: "#f4f4f4" }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-sm"
              aria-label="Предыдущее"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-sm"
              aria-label="Следующее"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Закрыть */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
        aria-label="Закрыть"
      >
        <X size={22} strokeWidth={1.5} />
      </button>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[12px] tracking-[0.12em] font-medium">{title}</span>
        {open ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
      </button>
      {open && (
        <div className="pb-5 text-[13px] text-gray-600 leading-relaxed">{children}</div>
      )}
    </div>
  );
}
