import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Таблица размеров — ex" };

const rows = [
  ["XS", "42", "82–85", "62–65", "88–91"],
  ["S", "44", "86–89", "66–69", "92–95"],
  ["M", "46", "90–93", "70–73", "96–99"],
  ["L", "48", "94–97", "74–77", "100–103"],
  ["XL", "50", "98–101", "78–81", "104–107"],
];

export default function SizesPage() {
  return (
    <InfoPage kicker="ПОМОЩЬ" title="Таблица размеров">
      <p>Замеры в сантиметрах. Если между размерами — берите больший.</p>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-400">
              {["Размер", "RU", "Грудь", "Талия", "Бёдра"].map((h) => (
                <th key={h} className="py-2 pr-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-gray-100">
                {r.map((c, i) => (
                  <td key={i} className={`py-2.5 pr-4 ${i === 0 ? "font-medium" : "text-gray-600"}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-gray-400 italic pt-4">
        Сетку уточним под реальные лекала. ⬜
      </p>
    </InfoPage>
  );
}
