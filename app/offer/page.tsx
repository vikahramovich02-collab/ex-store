import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Публичная оферта — ex" };

export default function OfferPage() {
  return (
    <InfoPage kicker="ДОКУМЕНТЫ" title="Публичная оферта">
      <p>
        Здесь будет размещён договор публичной оферты: предмет, цена и порядок
        оплаты, доставка, права и обязанности сторон, реквизиты продавца.
      </p>
      <p className="text-[11px] text-gray-400 italic pt-4">
        Текст оферты подготовим под зарегистрированное ИП/ООО. ⬜
      </p>
    </InfoPage>
  );
}
