"use client";

import ProductListingPage from "@/components/ProductListingPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

export default function ErkekBileklikPage() {
  const content = useContent();
  const category = content.erkekCategories?.bileklik || content.erkekBileklikCategory;

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
        appointmentSubject="erkeklere-ozel"
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
