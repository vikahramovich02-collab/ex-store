// Куда ведём заказы (пока вместо онлайн-оплаты — в Telegram).
// ⬜ ЗАМЕНИТЬ на реальный @username бренда (без @).
export const TELEGRAM_USER = "ex_brand";

// Собирает ссылку на Telegram с готовым текстом заказа.
export function telegramOrderUrl(text: string) {
  return `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(text)}`;
}
