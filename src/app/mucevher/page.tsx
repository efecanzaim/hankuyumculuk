import CategoryPage from "@/components/CategoryPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function MucevherPage() {
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
        category="mücevher"
        heroTitle="ETKİLEYİCİ"
        heroSubtitle="BİR IŞILTI"
        heroDescription="Anturaj modeller, merkez taşın ihtişamını öne çıkarırken her açıdan ışığı yakalayan detaylarıyla kusursuz bir denge sunar."
        heroSubDescription="İnce işçilikle yerleştirilen pırlantalar, tasarıma derinlik ve hacim kazandırarak zarafeti ön plana çıkarır. Zamansız şıklığı temsil eden bu özel tasarımlar, hem günlük kullanımda hem de özel anlarda stilinizi tamamlayan güçlü bir ifade haline gelir."
        heroImage1="/images/trend-left.jpg"
        heroImage2="/images/trend-right.jpg"
        sectionTitle="mücevher"
        sectionDescription="Merkez taşın zarafetini çevreleyen pırlantalarla tasarlanan anturaj modeller, göz alıcı bir ışıltı sunar. Güçlü ışıltısı ve dengeli tasarımıyla zamansız bir stil."
        sectionSubDescription="Merkez taşı çevreleyen pırlantalarla tasarlanan anturaj modeller, güçlü ışıltısı ve zarif duruşuyla göz alıcı bir şıklık sunar. Çevre pırlantalarla güçlenen, etkileyici bir ışıltı."
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
