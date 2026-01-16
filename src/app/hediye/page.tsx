import CategoryPage from "@/components/CategoryPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function HediyePage() {
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
        category="hediye"
        heroTitle="HEDİYE"
        heroSubtitle="Bazı şeyler anlatılmaz, verilir."
        heroDescription="Bir kelimenin yetmediği yerde hediye konuşur. Düşünülmüş bir seçim, sessiz ama net bir mesaj taşır."
        heroSubDescription="Hediye seçerken şunu ararsın: karşındakini gerçekten tanıyor mu? Sıradan mı, yoksa özenli mi?"
        heroImage1="/images/trend-left.jpg"
        heroImage2="/images/trend-right.jpg"
        sectionTitle="hediye"
        sectionDescription="Değer beklersin. Gösterişten değil, anlamdan gelen bir değer. Zamana eşlik etmesini istersin. Bir günle sınırlı kalmasın, her bakıldığında aynı duyguyu hatırlatsın."
        sectionSubDescription="Ve verdiğin şeyin, aceleyle değil, bilerek seçildiğini hissettirmesini beklersin. Han'da hediye, bir zorunluluk değil; düşüncenin zarif bir karşılığıdır."
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
