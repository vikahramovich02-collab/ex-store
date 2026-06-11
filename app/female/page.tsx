import { Suspense } from "react";
import CatalogView from "@/components/CatalogView";

export const metadata = { title: "ex female — женская линейка" };

export default function FemalePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CatalogView gender="female" />
    </Suspense>
  );
}
