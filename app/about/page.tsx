export const metadata = { title: "О бренде — ex" };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-[10px] tracking-[0.25em] text-gray-400 mb-4 font-medium">О БРЕНДЕ</p>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 lowercase">ex — бывшие</h1>
      <div className="space-y-5 text-gray-600 text-[15px] leading-relaxed">
        <p>
          «Бывшие» — не про прошлое и не про расставания. Это про честность к
          себе: оставаться собой, без масок и лишнего шума.
        </p>
        <p>
          ex — белорусский бренд одежды. Женская и мужская линейки: спортивные
          костюмы и летняя коллекция. Чистые силуэты, спокойная палитра, посадка,
          в которой комфортно быть.
        </p>
        <p>
          Мы шьём небольшими партиями в Беларуси и внимательно относимся к
          деталям. Часть вещей доступна по предзаказу — так мы делаем ровно
          столько, сколько нужно.
        </p>
      </div>
      <p className="mt-10 text-[11px] text-gray-400 italic">
        Тексты и фото дополним из съёмки. ⬜
      </p>
    </div>
  );
}
