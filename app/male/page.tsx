import { Suspense } from "react";
import CatalogView from "@/components/CatalogView";

export const metadata = { title: "ex male — мужская линейка" };

export default function MalePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CatalogView gender="male" />
    </Suspense>
  );
}
