import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Контакты — ex" };

export default function ContactsPage() {
  return (
    <InfoPage kicker="СВЯЗЬ" title="Контакты">
      <p>
        Пишите нам в Instagram или Telegram — отвечаем по вопросам заказов,
        размеров и предзаказов.
      </p>
      <div className="flex gap-4 pt-2">
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="nav-link font-medium text-black">Instagram</a>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="nav-link text-gray-500">Telegram</a>
        <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" className="nav-link text-gray-500">TikTok</a>
      </div>
      <p className="text-[11px] text-gray-400 italic pt-6">
        Реквизиты продавца (ИП, УНП, адрес) добавим после регистрации. ⬜
      </p>
    </InfoPage>
  );
}
