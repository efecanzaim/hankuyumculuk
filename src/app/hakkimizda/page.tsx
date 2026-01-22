"use client";

import AboutPage from "@/components/AboutPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

export default function HakkimizdaPage() {
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
      <AboutPage
        heroTitle="Zarafetiyle Bir Hikaye"
        heroParagraph1="Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır."
        heroParagraph2="Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür."
        heroImage="/images/about-hero.jpg"
        valuesTitle="Vizyonumuz"
        values={[
          {
            title: "Zarafet",
            description: "Her tasarımımızda zarafeti ön planda tutuyoruz.",
            image: "/images/about-value-1.jpg"
          },
          {
            title: "Kalite",
            description: "Sertifikalı pırlantalar ve en kaliteli malzemelerle çalışıyoruz.",
            image: "/images/about-value-2.jpg"
          },
          {
            title: "Özgünlük",
            description: "Her mücevher, kendine özgü bir hikâye taşır.",
            image: "/images/about-value-3.jpg"
          },
          {
            title: "Güven",
            description: "Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir.",
            image: "/images/about-value-4.jpg"
          }
        ]}
      />
      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        description={content.footer.description}
        columns={content.footer.columns}
        copyright={content.footer.copyright}
        socialLinks={content.footer.socialLinks}
      />
    </>
  );
}
