// Cloudflare Worker: принимает заявку с сайта ex и шлёт её боту в Telegram.
//
// Зачем: сайт статичный (GitHub Pages) и не может сам слать сообщения, а токен
// бота нельзя класть в публичный код. Воркер хранит токен как секрет и
// пересылает заявку в Telegram.
//
// КАК ПОДКЛЮЧИТЬ (5 минут):
// 1. Создать бота: написать @BotFather → /newbot → получить TOKEN.
// 2. Узнать свой chat_id: написать боту любое сообщение, затем открыть
//    https://api.telegram.org/bot<TOKEN>/getUpdates и взять "chat":{"id":...}.
//    (или добавить бота в группу и взять id группы — отрицательное число).
// 3. Завести воркер на dash.cloudflare.com → Workers → Create → вставить этот код.
// 4. В настройках воркера добавить переменные окружения (Secrets):
//       BOT_TOKEN  = токен от BotFather
//       CHAT_ID    = твой chat_id
// 5. Скопировать URL воркера (вида https://ex-order-bot.<...>.workers.dev)
//    и вписать его в lib/order.ts → ORDER_WEBHOOK.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: CORS });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response("Bad JSON", { status: 400, headers: CORS });
    }

    const text = data.text || "Новая заявка с сайта ex";

    const tg = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: env.CHAT_ID,
          text,
          disable_web_page_preview: true,
        }),
      }
    );

    if (!tg.ok) {
      return new Response("Telegram error", { status: 502, headers: CORS });
    }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, "content-type": "application/json" },
    });
  },
};
