import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Доставка и оплата — ex" };

export default function DeliveryPage() {
  return (
    <InfoPage kicker="ИНФОРМАЦИЯ" title="Доставка и оплата">
      <p className="font-medium text-black">Доставка</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Европочта / Белпочта — по всей Беларуси, до отделения. 7 BYN.</li>
        <li>Яндекс Доставка — курьер по Минску. 10 BYN.</li>
        <li>Самовывоз — по согласованию.</li>
      </ul>
      <p className="font-medium text-black pt-2">Оплата</p>
      <p>
        Картой Visa / Mastercard / Белкарт или через ЕРИП. Оплата проходит на
        защищённой странице платёжного сервиса.
      </p>
      <p className="font-medium text-black pt-2">Предзаказ</p>
      <p>
        Часть вещей доступна по предзаказу со скидкой −15%. Оплата полная сейчас,
        отгрузка — после пошива партии.
      </p>
      <p className="text-[11px] text-gray-400 italic pt-4">Условия уточним и финализируем. ⬜</p>
    </InfoPage>
  );
}
