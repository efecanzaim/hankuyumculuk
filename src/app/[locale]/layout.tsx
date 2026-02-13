import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { PreviewProvider } from "@/contexts/PreviewContext";
import { getDictionary } from "@/i18n/getDictionary";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES
    .filter((locale) => locale !== DEFAULT_LOCALE)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;

  return (
    <LocaleProvider locale={validLocale}>
      <PreviewProvider locale={validLocale}>
        {children}
      </PreviewProvider>
    </LocaleProvider>
  );
}
