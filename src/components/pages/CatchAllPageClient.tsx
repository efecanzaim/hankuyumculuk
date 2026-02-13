"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { resolvePageId } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { use } from "react";

// Page components
import IletisimPageContent from "@/components/pages/IletisimPageContent";
import HakkimizdaPageContent from "@/components/pages/HakkimizdaPageContent";
import OzelTasarimPageContent from "@/components/pages/OzelTasarimPageContent";
import HediyePageContent from "@/components/pages/HediyePageContent";
import PrelovedPageContent from "@/components/pages/PrelovedPageContent";
import YatirimPageContent from "@/components/pages/YatirimPageContent";
import BlogPageContent from "@/components/pages/BlogPageContent";
import UrunPageContent from "@/components/pages/UrunPageContent";
import RandevuPageContent from "@/components/pages/RandevuPageContent";
import GozumunNuruPageContent from "@/components/pages/GozumunNuruPageContent";
import BakimGarantiPageContent from "@/components/pages/BakimGarantiPageContent";
import CerezPolitikasiPageContent from "@/components/pages/CerezPolitikasiPageContent";
import ProductCategoryPageContent from "@/components/pages/ProductCategoryPageContent";

interface PageComponentProps {
  locale: Locale;
  pageId?: string;
}

// Page ID -> Component mapping
const pageComponents: Record<string, React.ComponentType<PageComponentProps>> = {
  'contact': IletisimPageContent,
  'about': HakkimizdaPageContent,
  'custom-design': OzelTasarimPageContent,
  'gifts': HediyePageContent,
  'preloved': PrelovedPageContent,
  'investment': YatirimPageContent,
  'blog': BlogPageContent,
  'product': UrunPageContent,
  'appointment': RandevuPageContent,
  'collection/light-of-my-eyes': GozumunNuruPageContent,
  'customer-service/care-warranty': BakimGarantiPageContent,
  'legal/cookie-policy': CerezPolitikasiPageContent,
  // Product categories
  'jewelry': ProductCategoryPageContent,
  'jewelry/rings': ProductCategoryPageContent,
  'jewelry/bracelets': ProductCategoryPageContent,
  'jewelry/necklaces': ProductCategoryPageContent,
  'jewelry/earrings': ProductCategoryPageContent,
  'jewelry/sets': ProductCategoryPageContent,
  'men': ProductCategoryPageContent,
  'men/rings': ProductCategoryPageContent,
  'men/bracelets': ProductCategoryPageContent,
  'men/prayer-beads': ProductCategoryPageContent,
  'men/cuff': ProductCategoryPageContent,
};

export default function CatchAllPageClient({
  params,
}: {
  params: Promise<{ locale: string; path: string[] }>;
}) {
  const { locale: localeParam, path } = use(params);
  const locale = useLocale();
  const pageId = resolvePageId(localeParam as Locale, path);

  if (!pageId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">404 - Page not found</p>
      </div>
    );
  }

  const PageComponent = pageComponents[pageId];

  if (!PageComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">404 - Page not found</p>
      </div>
    );
  }

  return <PageComponent locale={locale} pageId={pageId} />;
}
