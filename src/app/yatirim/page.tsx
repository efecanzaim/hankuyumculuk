"use client";

import CategoryPage from "@/components/CategoryPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

export default function YatirimPage() {
  const content = useContent();

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
        isTransparent={false}
      />
      <CategoryPage
        category="yatırım"
        heroTitle="DEĞER"
        heroSubtitle="KORUMA"
        heroDescription="Geleceğe güvenle bakın. Yatırımlık altın ürünlerimizle birikimlerinizi değerli metallere dönüştürün. Güvenilir ve sertifikalı ürünler."
        heroSubDescription="Gram altından tam altına, çeyrekten yarım altına kadar geniş ürün yelpazemizle tasarruflarınızı koruma altına alın. Her ürün, uluslararası standartlarda sertifikalıdır."
        heroImage1="/images/investment.jpg"
        heroImage2="/images/trend-right.jpg"
        sectionTitle="yatırım"
        sectionDescription="Altın, yüzyıllardır değerini koruyan en güvenilir yatırım aracı. Han Kuyumculuk güvencesiyle yatırımlarınızı şekillendirin."
        sectionSubDescription="Uzman danışmanlarımız, yatırım hedeflerinize uygun ürünleri seçmenizde size rehberlik eder. Güvenli saklama ve sigorta seçenekleriyle huzurlu bir yatırım deneyimi."
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
