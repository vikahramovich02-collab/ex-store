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
      <p className="font-medium text-black pt-2">Заказ и оплата</p>
      <p>
        Заказы пока оформляются через Telegram: выбираете размер, нажимаете
        «Заказать в Telegram» — открывается чат с готовым сообщением. Там
        подтверждаем наличие, адрес доставки и удобный способ оплаты.
      </p>
      <p className="text-[11px] text-gray-400 italic pt-4">Условия уточним и финализируем. ⬜</p>
    </InfoPage>
  );
}
