"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Блок подписки на рассылку перед футером — белый.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;
    setSent(true);
  };

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          {/* Heading */}
          <h2
            className="font-semibold tracking-tight leading-[1.05] max-w-2xl"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)" }}
          >
            Подпишись на рассылку,
            <br className="hidden md:block" /> чтобы узнавать о новых дропах
          </h2>

          {/* Form */}
          <div className="flex items-start">
            <div className="w-full min-w-[260px] max-w-sm">
              {sent ? (
                <p className="text-sm text-gray-600 pt-2">
                  Спасибо! Вы подписаны на новости ex 🤍
                </p>
              ) : (
                <form onSubmit={submit}>
                  <div className="flex items-center border-b border-black pb-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-mail"
                      className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      aria-label="Подписаться"
                      className="text-black hover:translate-x-0.5 transition-transform"
                    >
                      <ArrowUpRight size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="accent-black w-3.5 h-3.5"
                    />
                    <span className="text-[11px] text-gray-500">
                      Согласие на обработку персональных данных
                    </span>
                  </label>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
