export default function InfoPage({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-[10px] tracking-[0.25em] text-gray-400 mb-4 font-medium">{kicker}</p>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">{title}</h1>
      <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}
