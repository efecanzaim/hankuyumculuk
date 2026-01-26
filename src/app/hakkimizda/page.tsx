"use client";

import { useState, useEffect } from "react";
import AboutPage from "@/components/AboutPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

interface AboutPageData {
  heroTitle: string;
  heroParagraph1: string;
  heroParagraph2: string;
  heroImage: string;
  valuesTitle: string;
  values: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  aboutContent?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Varsayılan içerik (fallback)
const defaultAboutContent = `<p>1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaat değil; bir disiplin, bir süreklilik ve bir sorumluluk olarak gören köklü bir üretici kuruluştur.</p>

<p>Kuruluşundan bu yana geçen yıllar boyunca Han Kuyumculuk, tasarımdan üretime uzanan tüm süreçlerde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır. İstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek markanın karakterini oluşturur.</p>

<p>Bugün vitrinlerde görülen, farklı markalar altında sunulan birçok mücevher tasarımının arkasında Han imzası bulunmaktadır. Han Kuyumculuk, çoğu zaman adı görünmeden; ancak işçiliği, oranı ve detay diliyle kendini belli eden bir üretici olarak sektörde güçlü bir yer edinmiştir.</p>

<p>Han, üretici kimliğiyle var olur. Tüm koleksiyonlar; alanında uzun yıllar deneyim kazanmış, her biri kendi uzmanlık alanında söz sahibi ekipler tarafından geliştirilir. Pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip uzman kadro, her parçayı teknik doğruluk kadar estetik dengeyle de ele alır. Bu yaklaşım, Han Kuyumculuk'un pırlantada güvenilen ve referans alınan bir marka olarak konumlanmasını sağlamıştır.</p>

<p>Üretimde süreklilik, Han için yalnızca hacim değil; standartların korunması anlamına gelir. Kullanılan hammaddeden işçilik detaylarına, kalite kontrolden son sunuma kadar tüm aşamalar sistematik bir yapı içinde yürütülür. Bu yapı, yıllar içinde edinilen deneyimin kurumsal hafızaya dönüşmüş halidir.</p>

<p>Han Kuyumculuk, hızlı trendlerin peşinden gitmek yerine zamansızlığı esas alır. Tasarımlar; dönemsel etkilerden bağımsız, uzun yıllar değerini koruyacak bir estetik anlayışla şekillendirilir. Bu yaklaşım, markanın hem üretici hem de tasarımcı kimliğinin doğal bir sonucudur.</p>

<p>Bugün Han Kuyumculuk;</p>
<ul>
<li>Gücünü yıllara dayanan üretim tecrübesinden,</li>
<li>Güvenilirliğini uzman ve istikrarlı ekibinden,</li>
<li>Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.</li>
</ul>

<p>Han, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.</p>`;

export default function HakkimizdaPage() {
  const content = useContent();
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValues = async () => {
      try {
        if (API_URL) {
          const response = await fetch(`${API_URL}/api/about-values.php`);
          if (response.ok) {
            const values = await response.json();
            setAboutData(prev => prev ? { ...prev, values: Array.isArray(values) ? values : [] } : null);
          }
        }
      } catch (error) {
        console.error("Values yükleme hatası:", error);
      }
    };

    const fetchAboutData = async () => {
      try {
        if (API_URL) {
          // API'den sayfa verisini çek
          const response = await fetch(`${API_URL}/api/pages.php?slug=hakkimizda`);
          if (response.ok) {
            const pageData = await response.json();
            setAboutData({
              heroTitle: pageData.heroTitle || "Zarafetiyle Bir Hikaye",
              heroParagraph1: pageData.heroSubtitle || "Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır.",
              heroParagraph2: "Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür.",
              heroImage: pageData.heroImage || "/images/about-hero.jpg",
              valuesTitle: pageData.valuesTitle || "Vizyonumuz",
              values: [], // API'den ayrı çekilecek
              aboutContent: pageData.content || defaultAboutContent
            });
            // Values'ları yükle
            await loadValues();
          } else {
            // Fallback: Varsayılan değerler
            setAboutData({
              heroTitle: "Zarafetiyle Bir Hikaye",
              heroParagraph1: "Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır.",
              heroParagraph2: "Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür.",
              heroImage: "/images/about-hero.jpg",
              valuesTitle: "Vizyonumuz",
              values: [
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
              ],
              aboutContent: defaultAboutContent
            });
          }
        } else {
          // Development: Varsayılan değerler
          setAboutData({
            heroTitle: "Zarafetiyle Bir Hikaye",
            heroParagraph1: "Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır.",
            heroParagraph2: "Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür.",
            heroImage: "/images/about-hero.jpg",
            valuesTitle: "Vizyonumuz",
            values: [
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
            ],
            aboutContent: defaultAboutContent
          });
          // Values'ları yükle
          await loadValues();
        }
      } catch (error) {
        console.error("Hakkımızda sayfası yükleme hatası:", error);
        // Fallback: Varsayılan değerler
        setAboutData({
          heroTitle: "Zarafetiyle Bir Hikaye",
          heroParagraph1: "Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır.",
          heroParagraph2: "Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür.",
          heroImage: "/images/about-hero.jpg",
          valuesTitle: "Vizyonumuz",
          values: [
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
          ],
          aboutContent: defaultAboutContent
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading || !aboutData) {
    return (
      <>
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isHero={false}
          isTransparent={false}
        />
        <div className="min-h-screen bg-white pt-[141px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </div>
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
        heroTitle={aboutData.heroTitle}
        heroParagraph1={aboutData.heroParagraph1}
        heroParagraph2={aboutData.heroParagraph2}
        heroImage={aboutData.heroImage}
        valuesTitle={aboutData.valuesTitle}
        values={aboutData.values}
        aboutContent={aboutData.aboutContent}
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
