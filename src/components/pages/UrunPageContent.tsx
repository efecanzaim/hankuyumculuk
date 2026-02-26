"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ProductPageClient from "@/components/ProductPageClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface UrunPageContentProps {
  locale: Locale;
}

export default function UrunPageContent({ locale }: UrunPageContentProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    // Get the product base path for the current locale (e.g. "/urun", "/en/product", "/ru/tovar")
    const productBasePath = getLocalizedPath('product', locale);
    // If the current path is longer than the product base, extract the slug
    if (pathname.startsWith(productBasePath + '/')) {
      const remainder = pathname.slice(productBasePath.length + 1);
      if (remainder) {
        setSlug(remainder);
      } else {
        setSlug(null);
      }
    } else {
      setSlug(null);
    }
  }, [pathname, locale]);

  // If no slug, show product not found message
  if (!slug) {
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
        <div className="min-h-screen bg-white pt-[191px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('common.productNotFound')}</h1>
            <p className="text-gray-600">{t('common.productNotFoundDesc')}</p>
          </div>
        </div>
        <Footer
          logo={content.footer.logo}
          slogan={content.footer.slogan}
          description={content.footer.description}
          columns={content.footer.columns}
          copyright={content.footer.copyright}
          socialLinks={content.footer.socialLinks}
        />
      </>
    );
  }

  return <ProductPageClient slug={slug} initialProduct={null} locale={locale} />;
}
