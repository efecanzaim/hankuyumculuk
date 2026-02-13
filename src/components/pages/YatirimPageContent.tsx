"use client";

import CategoryPage from "@/components/CategoryPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import type { Locale } from "@/i18n/config";

interface YatirimPageContentProps {
  locale: Locale;
}

export default function YatirimPageContent({ locale }: YatirimPageContentProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
        isTransparent={false}
        bannerText={content.topBanner?.text}
        bannerVisible={content.topBanner?.visible}
      />
      <CategoryPage
        category={t('investment.title')}
        heroTitle={t('investment.heroTitle1')}
        heroSubtitle={t('investment.heroTitle2')}
        heroDescription={t('investment.heroDesc')}
        heroSubDescription={t('investment.sectionDesc')}
        heroImage1="/images/investment.jpg"
        heroImage2="/images/trend-right.jpg"
        sectionTitle={t('investment.sectionTitle')}
        sectionDescription={t('investment.infoDesc1')}
        sectionSubDescription={t('investment.infoDesc2')}
        sectionImage1="/images/hero-bg.jpg"
        sectionImage2="/images/parallax-bg.jpg"
      />
      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        description={content.footer.description}
        columns={content.footer.columns}
        socialLinks={content.footer.socialLinks}
        copyright={content.footer.copyright}
      />
    </>
  );
}
