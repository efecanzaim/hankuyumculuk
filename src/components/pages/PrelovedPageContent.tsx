"use client";

import { useMemo } from "react";
import ProductListingPage from "@/components/ProductListingPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import type { Locale } from "@/i18n/config";

interface PrelovedPageContentProps {
  locale: Locale;
}

export default function PrelovedPageContent({ locale }: PrelovedPageContentProps) {
  const content = useContent(locale);
  const category = content.prelovedCategory;

  const extraContent = useMemo(() => {
    const raw = category.content;
    if (!raw) return {} as Record<string, string>;
    try {
      const parsed: Record<string, string> = typeof raw === 'string' ? JSON.parse(raw) : (raw as Record<string, string>);
      const suffix = locale === 'tr' ? '' : `_${locale}`;
      const pick = (key: string) => parsed[`${key}${suffix}`] || (suffix ? parsed[key] : undefined) || undefined;
      return {
        appointmentTitle: pick('appointmentTitle'),
        appointmentDesc: pick('appointmentDesc'),
        appointmentButtonText: pick('appointmentButtonText'),
        productsFoundText: pick('productsFoundText'),
        loadMoreText: pick('loadMoreText'),
      } as Record<string, string | undefined>;
    } catch {
      return {} as Record<string, string>;
    }
  }, [category.content, locale]);

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
        bannerText={content.topBanner?.text}
        bannerVisible={content.topBanner?.visible}
      />
      <ProductListingPage
        heroImage={category.heroImage}
        heroTitle={category.heroTitle}
        heroSubtitle={category.heroSubtitle}
        heroDescription={category.heroDescription}
        categoryTitle={category.categoryTitle}
        products={category.products}
        totalProducts={category.products.length}
        appointmentSubject="preloved"
        locale={locale}
        appointmentTitle={extraContent.appointmentTitle}
        appointmentDesc={extraContent.appointmentDesc}
        appointmentButtonText={extraContent.appointmentButtonText}
        productsFoundText={extraContent.productsFoundText}
        loadMoreText={extraContent.loadMoreText}
      />
      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        columns={content.footer.columns}
        copyright={content.footer.copyright}
        socialLinks={content.footer.socialLinks}
      />
    </>
  );
}
