import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Политика конфиденциальности — ex" };

export default function PrivacyPage() {
  return (
    <InfoPage kicker="ДОКУМЕНТЫ" title="Политика конфиденциальности">
      <p>
        Мы обрабатываем персональные данные (имя, телефон, email, адрес доставки)
        только для оформления и доставки заказа, в соответствии с Законом
        Республики Беларусь «О защите персональных данных».
      </p>
      <p>Данные не передаются третьим лицам, кроме служб доставки и оплаты.</p>
      <p className="text-[11px] text-gray-400 italic pt-4">Полный текст согласуем. ⬜</p>
    </InfoPage>
  );
}
