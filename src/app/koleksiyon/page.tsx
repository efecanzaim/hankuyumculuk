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
        heroTitle="KOLEKSİYON"
        heroSubtitle="Biz inanıyoruz ki…"
        heroDescription="Aynı duyguda buluşan, birbiriyle konuşan bir bütündür bir araya gelen parçalar. Bir koleksiyonda tutarlılık beklersiniz. Hatların, ahengin ve çizginin bir dili olmasını istersiniz."
        heroSubDescription="Han koleksiyonları bu dili baştan sona korur. Uyum ararsınız. Tüm parçaların tek başına güçlü, birlikte ise dengeli olmasını beklersiniz."
        heroImage1="/images/trend-left.jpg"
        heroImage2="/images/trend-right.jpg"
        sectionTitle="koleksiyon"
        sectionDescription="Seçmenin kolay olmasını istersiniz. Bir koleksiyon sizi kararsızlığa sürüklememeli; doğru parçayı sezdirerek buldurmalıdır. Zamana karşı duran bir çizgi beklersiniz."
        sectionSubDescription="Ve her koleksiyonun bir karakteri olmasını beklersiniz, kendine ait bir duruş sergiler. İşte tam da bu yüzden Han koleksiyonları, özenin ve ustalığın hissedildiği bir bütünlük sunar."
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
