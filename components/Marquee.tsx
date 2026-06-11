// Чёрная бегущая строка про предзаказ. Используется на главной.
export default function Marquee() {
  return (
    <div className="bg-black py-3 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="text-white/85 text-[10px] tracking-[0.3em] font-medium shrink-0 px-8"
          >
            ПРЕДЗАКАЗ ОТКРЫТ &nbsp;·&nbsp; −15% ПО ПРЕДЗАКАЗУ &nbsp;·&nbsp; НОВАЯ
            ЛЕТНЯЯ КОЛЛЕКЦИЯ &nbsp;·&nbsp; ex
          </span>
        ))}
      </div>
    </div>
  );
}
