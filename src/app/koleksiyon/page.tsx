import CategoryPage from "@/components/CategoryPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function KoleksiyonPage() {
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
        category="koleksiyon"
        heroTitle="ZAMANSIZ"
        heroSubtitle="KOLEKSİYON"
        heroDescription="Her parça, ustalıkla işlenmiş detayları ve zarif çizgileriyle benzersiz bir hikaye anlatır. Klasik zarafetten modern yorumlara uzanan tasarımlar."
        heroSubDescription="Koleksiyonlarımız, geleneksel zanaatkarlığı çağdaş estetikle buluşturur. Her bir parça, nesiller boyu aktarılacak değerler taşır ve stilinize sofistike bir dokunuş katar."
        heroImage1="/images/trend-left.jpg"
        heroImage2="/images/trend-right.jpg"
        sectionTitle="koleksiyon"
        sectionDescription="Özenle seçilmiş taşlar ve ince işçilikle hayat bulan koleksiyonlarımız, zarafetin ve ihtişamın buluşma noktası."
        sectionSubDescription="Her tasarım, ışığı en güzel şekilde yansıtacak açılarla işlenir. Koleksiyonlarımız, özel anlarınızı taçlandırmak için tasarlanmıştır."
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
