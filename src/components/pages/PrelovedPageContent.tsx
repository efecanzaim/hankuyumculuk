"use client";

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
      />
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
