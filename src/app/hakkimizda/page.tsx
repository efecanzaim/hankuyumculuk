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
        heroTitle="Zarafetiyle Bir Hikaye"
        heroParagraph1="Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır."
        heroParagraph2="Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür. Anturaj tasarımların en dikkat çekici özelliği, merkez taşın ihtişamını daha büyük ve etkileyici göstermesidir. Çevresini saran pırlantalar, ışığı her açıdan yakalayarak taşın parlaklığını artırır ve mücevhere derinlik kazandırır."
        heroImage="/images/about-hero.jpg"
        valuesTitle="Vizyonumuz"
        values={[
          {
            title: "Zarafet",
            description: "Her tasarımımızda zarafeti ön planda tutuyoruz. İnce işçilik ve detaylara gösterdiğimiz özen, mücevherlerimizin zamansız şıklığını yaratır.",
            image: "/images/about-value-1.jpg"
          },
          {
            title: "Kalite",
            description: "Sertifikalı pırlantalar ve en kaliteli malzemelerle çalışıyoruz. Her ürünümüz, uzun yıllar boyunca değerini koruyacak şekilde üretilir.",
            image: "/images/about-value-2.jpg"
          },
          {
            title: "Özgünlük",
            description: "Her mücevher, kendine özgü bir hikâye taşır. Özel tasarım seçeneklerimizle, hayalinizdeki mücevheri gerçeğe dönüştürüyoruz.",
            image: "/images/about-value-3.jpg"
          },
          {
            title: "Güven",
            description: "Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir. Şeffaflık ve dürüstlük, her adımda rehberimizdir.",
            image: "/images/about-value-4.jpg"
          }
        ]}
      />
      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        description="Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır."
        columns={[
          {
            title: "HAN KUYUMCULUK",
            links: [
              { text: "Hakkımızda", href: "/hakkimizda" },
              { text: "İletişim", href: "/iletisim" },
              { text: "Blog", href: "/blog" }
            ]
          },
          {
            title: "KOLEKSİYON",
            links: [
              { text: "Zenith Koleksiyonu", href: "/koleksiyon/zenith" },
              { text: "Gözümün Nuru", href: "/koleksiyon/gozumun-nuru" },
              { text: "Anturaj Koleksiyonu", href: "/koleksiyon/anturaj" },
              { text: "Tulip Koleksiyonu", href: "/koleksiyon/tulip" },
              { text: "Harmony Koleksiyonu", href: "/koleksiyon/harmony" },
              { text: "İnci Koleksiyonu", href: "/koleksiyon/inci" }
            ]
          },
          {
            title: "MÜŞTERİ HİZMETLERİ",
            links: [
              { text: "Bakım ve Garanti", href: "/bakim-garanti" },
              { text: "İade Koşulları", href: "/iade-kosullari" }
            ]
          },
          {
            title: "YASAL",
            links: [
              { text: "Çerez Politikası", href: "/cerez-politikasi" },
              { text: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
              { text: "KVKK Aydınlatma Metni", href: "/kvkk" }
            ]
          }
        ]}
        copyright={content.footer.copyright}
        socialLinks={{ instagram: "https://www.instagram.com/gozumunnuruantalya" }}
      />
    </>
  );
}
