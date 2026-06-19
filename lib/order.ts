// Куда ведём заказы. Поток: клиент заполняет форму → жмёт «Отправить заявку» →
// нам приходит уведомление в Telegram → мы пишем клиенту → оплата → доставка.

// Аккаунт-менеджер бренда ex (фолбэк, если бот ещё не подключён).
export const TELEGRAM_USER = "exxxxby";

// Адрес мини-сервера (Cloudflare Worker), который шлёт заявку боту в Telegram.
// Пока пусто — заявка уходит фолбэком в чат @exxxxby. Когда подключим бота —
// сюда впишем URL воркера, и заявки начнут приходить автоматически.
export const ORDER_WEBHOOK = "";

// Ссылка на Telegram с готовым текстом (фолбэк-режим).
export function telegramOrderUrl(text: string) {
  return `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(text)}`;
}

export type OrderPayload = {
  name: string;
  phone: string;
  telegram: string;
  delivery: string;
  address: string;
  comment: string;
  text: string; // полностью собранный текст заявки
};

// Отправляет заявку. Возвращает "bot" если ушло через бота, "fallback" если
// открыли чат вручную.
export async function sendOrder(payload: OrderPayload): Promise<"bot" | "fallback"> {
  if (ORDER_WEBHOOK) {
    try {
      const r = await fetch(ORDER_WEBHOOK, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (r.ok) return "bot";
    } catch {
      /* падаем в фолбэк */
    }
  }
  window.open(telegramOrderUrl(payload.text), "_blank");
  return "fallback";
}
