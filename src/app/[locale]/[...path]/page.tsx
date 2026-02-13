import { getLocaleStaticParams } from "@/i18n/config";
import CatchAllPageClient from "@/components/pages/CatchAllPageClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocaleStaticParams();
}

export default function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; path: string[] }>;
}) {
  return <CatchAllPageClient params={params} />;
}
