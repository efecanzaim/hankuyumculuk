"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, routeMap, getPageIdFromPath, getSlugFromPath, getLocaleFromPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  textClassName?: string;
}

const localeLabels: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  ru: "RU",
};

export default function LanguageSwitcher({ currentLocale, className = "", textClassName = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Mevcut sayfanın pageId'sini bul
  const pageId = getPageIdFromPath(pathname);
  const currentPathLocale = getLocaleFromPath(pathname);
  // Dinamik sayfalardaki slug'ı koru (örn: /urun/YZK-180001 -> YZK-180001)
  const slug = pageId ? getSlugFromPath(pathname, pageId, currentPathLocale) : null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {LOCALES.map((locale, index) => {
        const isActive = locale === currentLocale;
        // Bu dil için hedef URL'yi hesapla
        let targetPath = pageId ? (routeMap[locale]?.[pageId] || '/') : (locale === DEFAULT_LOCALE ? '/' : `/${locale}`);
        // Slug varsa hedef URL'ye ekle
        if (slug && pageId) {
          targetPath = targetPath + '/' + slug;
        }

        return (
          <span key={locale} className="flex items-center">
            {index > 0 && <span className={`mx-1 ${textClassName}`}>|</span>}
            {isActive ? (
              <span className={`font-bold ${textClassName}`}>{localeLabels[locale]}</span>
            ) : (
              <Link
                href={targetPath}
                className={`hover:opacity-70 transition-opacity ${textClassName}`}
              >
                {localeLabels[locale]}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
