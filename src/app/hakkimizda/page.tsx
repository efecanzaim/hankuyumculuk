import AboutPage from "@/components/AboutPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function HakkimizdaPage() {
  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
        isTransparent={false}
      />
      <AboutPage
        heroTitle="HİKAYEMİZ"
        heroSubtitle="Han Kuyumculuk"
        heroDescription="Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır."
        heroImage="/images/hero-bg.jpg"
        storyTitle="HİKAYEMİZ"
        storyText="Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür.
        Anturaj tasarımların en dikkat çekici özelliği, merkez taşın ihtişamını daha büyük ve etkileyici göstermesidir. Çevresini saran pırlantalar, ışığı chaque açıdan yakalayarak taşın parlaklığını artırır ve mücevhere derinlik kazandırır."
        storyImage="/images/trend-left.jpg"
        valuesTitle="vizyonumuz"
        values={[
          {
            title: "Zarafet",
            description: "Her tasarımımızda zarafeti ön planda tutuyoruz. İnce işçilik ve detaylara gösterdiğimiz özen, mücevherlerimizin zamansız şıklığını yaratır."
          },
          {
            title: "Kalite",
            description: "Sertifikalı pırlantalar ve en kaliteli malzemelerle çalışıyoruz. Her ürünümüz, uzun yıllar boyunca değerini koruyacak şekilde üretilir."
          },
          {
            title: "Özgünlük",
            description: "Her mücevher, kendine özgü bir hikâye taşır. Özel tasarım seçeneklerimizle, hayalinizdeki mücevheri gerçeğe dönüştürüyoruz."
          },
          {
            title: "Güven",
            description: "Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir. Şeffaflık ve dürüstlük, her adımda rehberimizdir."
          }
        ]}
        missionTitle="MİSYONUMUZ"
        missionText="Han Kuyumculuk olarak, her kadının özel anlarını ışığa dönüştürmeyi hedefliyoruz. Zamansız tasarımlarımızla, değer verilen kişilere en güzel hediyeleri sunmak ve unutulmaz anılar yaratmak misyonumuzdur.

        Kaliteli malzemeler ve usta işçilikle ürettiğimiz mücevherler, sadece bir aksesuar değil; duyguların ve anıların somutlaşmış halidir."
        missionImage="/images/trend-right.jpg"
      />
      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        nav={content.footer.nav}
        copyright={content.footer.copyright}
      />
    </>
  );
}
