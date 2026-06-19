// Чёрная бегущая строка про предзаказ — зафиксирована ВНИЗУ экрана.
// «10 % СКИДКА ПО ПРЕДЗАКАЗУ» через звёздочку ★, белым по чёрному.
export default function Marquee() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black py-2.5 overflow-hidden">
      <div
        className="flex items-center whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-white text-[10px] tracking-[0.2em] font-medium px-6">
              ex · БЫВШАЯ · БЫВШИЙ · ЗАКАЗ В TELEGRAM
            </span>
            <span className="text-white text-[9px]">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
