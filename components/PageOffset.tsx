"use client";

import { usePathname } from "next/navigation";

// На главной баннер уходит под прозрачную навигацию (без отступа).
// На остальных страницах добавляем отступ сверху на высоту навбара.
export default function PageOffset({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return <main className={isHome ? "" : "pt-[68px]"}>{children}</main>;
}
