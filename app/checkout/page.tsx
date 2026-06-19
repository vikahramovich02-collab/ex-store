"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { sendOrder } from "@/lib/order";

const DELIVERY = [
  { id: "europochta", label: "Европочта / Белпочта", note: "по всей Беларуси, до отделения", price: 7 },
  { id: "yandex", label: "Яндекс Доставка (Минск)", note: "курьер по городу", price: 10 },
  { id: "pickup", label: "Самовывоз", note: "по согласованию", price: 0 },
];

export default function CheckoutPage() {
  const { items, total, count, clear } = useCart();
  const [delivery, setDelivery] = useState("europochta");
  const [agree, setAgree] = useState(true);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", telegram: "", address: "", comment: "" });

  const deliveryInfo = DELIVERY.find((d) => d.id === delivery);
  const deliveryPrice = deliveryInfo?.price ?? 0;
  const grandTotal = total + (count > 0 ? deliveryPrice : 0);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const canSend = count > 0 && form.name && form.phone && form.telegram && agree;

  const submit = async () => {
    if (!canSend || busy) return;
    setBusy(true);
    const text = [
      "🛍 Новая заявка с сайта ex",
      "",
      ...items.map((i) => `• ${i.name} — размер ${i.size}, ×${i.qty} — ${i.price * i.qty} BYN`),
      "",
      `Имя: ${form.name}`,
      `Телефон: ${form.phone}`,
      `Telegram: ${form.telegram}`,
      `Доставка: ${deliveryInfo?.label}${form.address ? `, ${form.address}` : ""}`,
      form.comment ? `Комментарий: ${form.comment}` : "",
      "",
      `Итого: ${grandTotal} BYN (товары ${total} + доставка ${deliveryPrice})`,
    ].filter(Boolean).join("\n");

    await sendOrder({
      name: form.name,
      phone: form.phone,
      telegram: form.telegram,
      delivery: deliveryInfo?.label ?? "",
      address: form.address,
      comment: form.comment,
      text,
    });
    clear();
    setSent(true);
    setBusy(false);
  };

  if (sent) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Заявка отправлена 🤍
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          Спасибо! Мы свяжемся с тобой в Telegram, подтвердим наличие и размер,
          договоримся об оплате и вызовем доставку.
        </p>
        <Link href="/" className="text-[11px] tracking-[0.15em] font-medium nav-link">
          НА ГЛАВНУЮ
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="text-lg text-gray-400 mb-4">Корзина пуста</p>
        <Link href="/female" className="text-[11px] tracking-[0.15em] font-medium nav-link">
          ВЕРНУТЬСЯ В КАТАЛОГ
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 py-12">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
        Оформление заказа
      </h1>
      <p className="text-[13px] text-gray-500 mb-10 max-w-lg">
        Оставь свои данные и Telegram — мы напишем тебе, подтвердим заказ,
        договоримся об оплате и доставке.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12">
        {/* Left: form */}
        <div className="space-y-10">
          <section>
            <p className="text-[11px] tracking-[0.2em] text-gray-400 font-semibold mb-4">
              1 · КОНТАКТЫ
            </p>
            <div className="space-y-3">
              <Field label="Имя и фамилия *" value={form.name} onChange={(v) => set("name", v)} />
              <Field label="Телефон *" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+375" />
              <Field label="Telegram * (для связи)" value={form.telegram} onChange={(v) => set("telegram", v)} placeholder="@username" />
            </div>
          </section>

          <section>
            <p className="text-[11px] tracking-[0.2em] text-gray-400 font-semibold mb-4">
              2 · ДОСТАВКА
            </p>
            <div className="space-y-2">
              {DELIVERY.map((d) => (
                <label
                  key={d.id}
                  className={`flex items-center justify-between gap-4 p-4 border cursor-pointer transition-colors ${
                    delivery === d.id ? "border-black" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === d.id}
                      onChange={() => setDelivery(d.id)}
                      className="accent-black"
                    />
                    <div>
                      <p className="text-[13px] font-medium">{d.label}</p>
                      <p className="text-[11px] text-gray-400">{d.note}</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-gray-600">
                    {d.price === 0 ? "0 BYN" : `${d.price} BYN`}
                  </span>
                </label>
              ))}
            </div>
            {delivery !== "pickup" && (
              <div className="mt-3">
                <Field
                  label="Адрес / отделение"
                  value={form.address}
                  onChange={(v) => set("address", v)}
                />
              </div>
            )}
          </section>

          <section>
            <p className="text-[11px] tracking-[0.2em] text-gray-400 font-semibold mb-4">
              3 · КОММЕНТАРИЙ
            </p>
            <Field label="Комментарий к заказу" value={form.comment} onChange={(v) => set("comment", v)} />
          </section>
        </div>

        {/* Right: summary */}
        <aside className="md:sticky md:top-20 h-fit border border-gray-200 p-6 space-y-4">
          <p className="text-[11px] tracking-[0.2em] text-gray-400 font-semibold">ВАШ ЗАКАЗ</p>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={`${i.id}-${i.size}`} className="flex justify-between gap-3 text-[13px]">
                <span className="text-gray-700">
                  {i.name} <span className="text-gray-400">· {i.size} · ×{i.qty}</span>
                </span>
                <span className="shrink-0">{i.price * i.qty} BYN</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 pt-3 space-y-1.5 text-[13px]">
            <Row label="Товары" value={`${total} BYN`} />
            <Row label="Доставка" value={`${deliveryPrice} BYN`} />
            <div className="flex justify-between font-semibold pt-1.5 border-t border-gray-100 mt-1.5">
              <span>Итого</span>
              <span>{grandTotal} BYN</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 leading-relaxed bg-gray-50 p-3">
            Оплата и доставка — после того как мы свяжемся с тобой в Telegram и
            подтвердим заказ.
          </p>

          <label className="flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="sr-only peer"
            />
            <span className="mt-0.5 w-4 h-4 border border-gray-400 rounded-[3px] flex items-center justify-center text-black shrink-0">
              {agree && <CheckMark />}
            </span>
            <span>
              Согласен с{" "}
              <Link href="/offer" className="underline">публичной офертой</Link> и{" "}
              <Link href="/privacy" className="underline">обработкой персональных данных</Link>
            </span>
          </label>

          <button
            disabled={!canSend || busy}
            onClick={submit}
            className="btn-glitch w-full justify-center bg-black text-white text-[11px] tracking-[0.2em] font-medium py-4 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors"
          >
            {busy ? "ОТПРАВЛЯЕМ…" : "ОТПРАВИТЬ ЗАЯВКУ"}
          </button>
          <p className="text-[10px] text-gray-400 text-center">
            Мы напишем тебе в Telegram для подтверждения
          </p>
        </aside>
      </div>
    </div>
  );
}

function CheckMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] text-gray-500 tracking-wide">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-gray-200 px-4 py-3 text-[13px] focus:border-black outline-none transition-colors"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-gray-500">
      <span>{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
