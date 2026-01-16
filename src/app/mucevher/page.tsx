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
        heroTitle="MÜCEVHER"
        heroSubtitle="Biz biliyoruz ki…"
        heroDescription="Güvene önem verirsiniz… Bu yüzden Han'da her parça, ustasının sözüyle ve sorumluluğuyla hayat bulur. Bir duruş ararsınız; kendini anlatabilen bir sadelik…"
        heroSubDescription="Yüzüklerimiz, küpelerimiz, bileklik ve setlerimiz kimliğinize sessizce eşlik eder. Detay önemlidir… İlk bakışta değil, dokundukça fark edilen bir ustalıkla."
        heroImage1="/images/trend-left.jpg"
        heroImage2="/images/trend-right.jpg"
        sectionTitle="mücevher"
        sectionDescription="Zamana direnen bir anlam ararsınız… Bugün takılan, yıllar sonra da aynı duyguyu taşıyan. Değer duygunuz vazgeçilmezdir… Gösterişten uzak, özel hissettiren bir seçimle."
        sectionSubDescription="Ve her mücevherde bir hikâye anlam kazanır. Han mücevherleri yalnızca takılmaz; yaşanır, bağ kurulur, hatırlanır. Çünkü sizi tam anlamıyla tatmin edecek bilgi, hassasiyet, el emeği ve ustalık… Hepsi Han imzasında buluşur."
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
