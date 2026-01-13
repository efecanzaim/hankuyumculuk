import CategoryPage from "@/components/CategoryPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function ErkekPage() {
  return (
    <>
      <TopBanner
        text={content.topBanner.text}
        visible={content.topBanner.visible}
        topLinks={content.header.topLinks}
      />
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
      />
      <CategoryPage
        category="erkek"
        heroTitle="ERKEKLERE"
        heroSubtitle="ÖZEL"
        heroDescription="Modern erkek için tasarlanmış şık ve sofistike aksesuarlar. Tesbihten bilekliğe, yüzükten kol düğmesine özel koleksiyon."
        heroSubDescription="Kaliteli malzemeler ve usta işçilikle üretilen erkek aksesuarları. Klasik zarafetten modern çizgilere, her tarza uygun seçenekler."
        heroImage1="/images/erkek-menu-hero.jpg"
        heroImage2="/images/erkek-menu-bg.jpg"
        sectionTitle="erkek"
        sectionDescription="Güç, karakter ve zarafeti bir arada sunan erkek koleksiyonu. Her parça, erkek stilinin tamamlayıcısı olarak tasarlandı."
        sectionSubDescription="Tesbihlerimiz geleneksel ustalıkla, bilekliklerimiz modern tasarımlarla ve yüzüklerimiz zamansız şıklıkla öne çıkar."
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

