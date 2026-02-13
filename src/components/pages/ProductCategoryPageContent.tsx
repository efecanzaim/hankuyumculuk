'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListingPage from "@/components/ProductListingPage";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface ProductCategoryPageContentProps {
  locale: Locale;
  pageId?: string;
}

// Map pageId to category keys in content.json
const categoryContentMap: Record<string, { contentKey: string; appointmentSubject: string }> = {
  'jewelry': { contentKey: 'mucevherCategory', appointmentSubject: 'mucevher' },
  'jewelry/rings': { contentKey: 'mucevherCategories.yuzuk', appointmentSubject: 'mucevher' },
  'jewelry/bracelets': { contentKey: 'mucevherCategories.bileklik', appointmentSubject: 'mucevher' },
  'jewelry/necklaces': { contentKey: 'mucevherCategories.kolye', appointmentSubject: 'mucevher' },
  'jewelry/earrings': { contentKey: 'mucevherCategories.kupe', appointmentSubject: 'mucevher' },
  'jewelry/sets': { contentKey: 'mucevherCategories.set', appointmentSubject: 'mucevher' },
  'men': { contentKey: 'erkekCategory', appointmentSubject: 'erkek' },
  'men/rings': { contentKey: 'erkekCategories.yuzuk', appointmentSubject: 'erkek' },
  'men/bracelets': { contentKey: 'erkekCategories.bileklik', appointmentSubject: 'erkek' },
  'men/prayer-beads': { contentKey: 'erkekCategories.tesbih', appointmentSubject: 'erkek' },
  'men/cuff': { contentKey: 'erkekCategories.kol', appointmentSubject: 'erkek' },
};

function getNestedValue(obj: Record<string, unknown>, path: string): Record<string, unknown> | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current as Record<string, unknown> | undefined;
}

export default function ProductCategoryPageContent({ locale, pageId }: ProductCategoryPageContentProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);

  const categoryConfig = pageId ? categoryContentMap[pageId] : undefined;
  const category = categoryConfig 
    ? getNestedValue(content as unknown as Record<string, unknown>, categoryConfig.contentKey) 
    : undefined;

  if (!category) {
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
        <div className="min-h-screen flex items-center justify-center pt-[200px]">
          <p className="text-xl text-gray-500">{t('common.productNotFound')}</p>
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

  const products = (category.products as Array<{
    id: number;
    image: string;
    name: string;
    subtitle: string;
    link: string;
  }>) || [];

  // Localize product links
  const localizedProducts = products.map(product => ({
    ...product,
    link: locale === 'tr' ? product.link : getLocalizedPath('product', locale) + product.link.replace('/urun', ''),
  }));

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
        heroImage={category.heroImage as string}
        heroTitle={category.heroTitle as string}
        heroSubtitle={category.heroSubtitle as string}
        heroDescription={category.heroDescription as string}
        categoryTitle={category.categoryTitle as string}
        products={localizedProducts}
        totalProducts={localizedProducts.length}
        appointmentSubject={categoryConfig?.appointmentSubject || 'diger'}
        locale={locale}
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
