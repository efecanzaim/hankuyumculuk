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
        heroTitle="ERKEKLERE ÖZEL"
        heroSubtitle="Güçlü olan, kendini anlatmak zorunda kalmaz."
        heroDescription="Erkeklere özel seçimler, fazlalıktan arınmış bir çizgi ister. Netlik, denge ve karakter. Göze sokulan değil, fark edilen parçalar beklersin."
        heroSubDescription="İşlev ararsın. Ama yalnızca işe yaramasını değil, doğru hissettirmesini istersin."
        heroImage1="/images/erkek-menu-hero.jpg"
        heroImage2="/images/erkek-menu-bg.jpg"
        sectionTitle="erkek"
        sectionDescription="Detaylar önemlidir. Çizginin keskinliği, malzemenin ağırlığı, dokunuşun hissi. Zamana dayanmasını beklersin. Bugün olduğu kadar, yıllar sonra da yerini korumasını."
        sectionSubDescription="Han Erkeklere Özel, sessiz bir güç taşıyan, karakteri net seçimlerden oluşur."
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

