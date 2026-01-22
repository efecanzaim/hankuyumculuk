"use client";

import ProductListingPage from "@/components/ProductListingPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

export default function AnnelerGunuPage() {
  const content = useContent();
  const category = content.hediyeCategories?.["anneler-gunu"] || content.annelerGunuCategory;

  return (
    <>
      <TopBanner
        text={content.topBanner.text}
        visible={content.topBanner.visible}
      />
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
      />
      <ProductListingPage
        heroImage={category.heroImage}
        heroTitle={category.heroTitle}
        heroSubtitle={category.heroSubtitle}
        heroDescription={category.heroDescription}
        categoryTitle={category.categoryTitle}
        products={category.products}
        totalProducts={category.products.length}
        appointmentSubject="hediye"
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
