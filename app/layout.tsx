import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PageOffset from "@/components/PageOffset";
import { CartProvider } from "@/lib/cart-context";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "ex — бренд одежды",
  description:
    "ex — белорусский бренд одежды. Концепция «бывшие». Женская и мужская линейки: спортивные костюмы и летняя коллекция.",
  openGraph: {
    title: "ex — бренд одежды",
    description: "Белорусский бренд одежды. ex female · ex male.",
    locale: "ru_BY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geist.variable}`}>
      <body style={{ paddingBottom: "2.75rem" }}>
        <CartProvider>
          <Navbar />
          <PageOffset>{children}</PageOffset>
          <Footer />
          <CartDrawer />
          <Marquee />
        </CartProvider>
      </body>
    </html>
  );
}
