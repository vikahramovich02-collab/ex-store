// Куда ведём заказы (пока вместо онлайн-оплаты — в Telegram).
// Аккаунт-менеджер бренда ex.
export const TELEGRAM_USER = "exxxxby";

// Собирает ссылку на Telegram с готовым текстом заказа.
export function telegramOrderUrl(text: string) {
  return `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(text)}`;
}
