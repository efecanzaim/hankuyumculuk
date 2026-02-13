"use client";

import { useState, useEffect } from "react";
import AboutPage from "@/components/AboutPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import type { Locale } from "@/i18n/config";

interface AboutPageData {
  heroTitle: string;
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

// Varsayilan icerik (fallback)
const defaultAboutContent = `<p>1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaat değil; bir disiplin, bir süreklilik ve bir sorumluluk olarak gören köklü bir üretici kuruluştur.</p>

<p>Kuruluşundan bu yana geçen yıllar boyunca Han Kuyumculuk, tasarımdan üretime uzanan tüm süreçlerde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır. İstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek markanın karakterini oluşturur.</p>

<p>Han, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir. Her tasarımında zarafeti ön planda tutarken, sertifikalı pırlantalar ve en kaliteli malzemelerle çalışır.</p>

<p>Her mücevher, kendine özgü bir hikâye taşır. Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir. Tasarımlar; dönemsel etkilerden bağımsız, uzun yıllar değerini koruyacak bir estetik anlayışla şekillendirilir.</p>

<p>Zamansızlığı esas alan Han, her parçada duyguyu detaya çevirir. Gösterişten ziyade, hissettirmeyi merkeze alan bir yaklaşımla, her ışıltının arkasında bir bağlantı, bir anlam, bir sevgi saklı olmasını sağlar.</p>

<p>Han Kuyumculuk, değerini yitirmeyen yakınlıklardan doğan koleksiyonlarıyla, seçilmiş, düşünülmüş ve uzun vadeli bir değerin sembolü olarak sanat ve zanaatle hizmet vermektedir.</p>`;

interface HakkimizdaPageContentProps {
  locale: Locale;
}

export default function HakkimizdaPageContent({ locale }: HakkimizdaPageContentProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);
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
              heroTitle: pageData.heroTitle || t('about.title'),
              heroParagraph2: pageData.heroParagraph2 || "1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaatten öte; disiplin, süreklilik ve sorumluluk anlayışıyla ele alan köklü bir üreticidir. Kuruluşundan bu yana tasarımdan üretime uzanan tüm süreçlerinde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır.\n\nİstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek Han'ın karakterini oluşturur. Bugün farklı markalar altında vitrinlerde yer alan birçok mücevher tasarımının arkasında Han imzası bulunur; çoğu zaman adı görünmeden, işçiliği ve detay diliyle kendini belli eder.\n\nTüm koleksiyonlar; pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip, alanında uzman ve istikrarlı ekipler tarafından geliştirilir. Üretimde süreklilik, Han için yalnızca hacim değil; hammaddeden son sunuma kadar standartların titizlikle korunması anlamına gelir.\n\nBugün Han Kuyumculuk;\n• Gücünü yıllara dayanan üretim tecrübesinden,\n• Güvenilirliğini uzman ve istikrarlı ekibinden,\n• Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.\n\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.",
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
              heroTitle: t('about.title'),
              heroParagraph2: "1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaatten öte; disiplin, süreklilik ve sorumluluk anlayışıyla ele alan köklü bir üreticidir. Kuruluşundan bu yana tasarımdan üretime uzanan tüm süreçlerinde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır.\n\nİstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek Han'ın karakterini oluşturur. Bugün farklı markalar altında vitrinlerde yer alan birçok mücevher tasarımının arkasında Han imzası bulunur; çoğu zaman adı görünmeden, işçiliği ve detay diliyle kendini belli eder.\n\nTüm koleksiyonlar; pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip, alanında uzman ve istikrarlı ekipler tarafından geliştirilir. Üretimde süreklilik, Han için yalnızca hacim değil; hammaddeden son sunuma kadar standartların titizlikle korunması anlamına gelir.\n\nBugün Han Kuyumculuk;\n• Gücünü yıllara dayanan üretim tecrübesinden,\n• Güvenilirliğini uzman ve istikrarlı ekibinden,\n• Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.\n\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.",
              heroImage: "/images/about-hero.jpg",
              valuesTitle: "Vizyonumuz",
              values: [
                {
                  title: t('about.values.elegance.title'),
                  description: t('about.values.elegance.desc'),
                  image: "/images/about-value-1.jpg"
                },
                {
                  title: t('about.values.quality.title'),
                  description: t('about.values.quality.desc'),
                  image: "/images/about-value-2.jpg"
                },
                {
                  title: t('about.values.originality.title'),
                  description: t('about.values.originality.desc'),
                  image: "/images/about-value-3.jpg"
                },
                {
                  title: t('about.values.trust.title'),
                  description: t('about.values.trust.desc'),
                  image: "/images/about-value-4.jpg"
                }
              ],
              aboutContent: defaultAboutContent
            });
          }
        } else {
          // Development: Varsayılan değerler
          setAboutData({
            heroTitle: t('about.title'),
            heroParagraph2: "1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaatten öte; disiplin, süreklilik ve sorumluluk anlayışıyla ele alan köklü bir üreticidir. Kuruluşundan bu yana tasarımdan üretime uzanan tüm süreçlerinde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır.\n\nİstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek Han'ın karakterini oluşturur. Bugün farklı markalar altında vitrinlerde yer alan birçok mücevher tasarımının arkasında Han imzası bulunur; çoğu zaman adı görünmeden, işçiliği ve detay diliyle kendini belli eder.\n\nTüm koleksiyonlar; pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip, alanında uzman ve istikrarlı ekipler tarafından geliştirilir. Üretimde süreklilik, Han için yalnızca hacim değil; hammaddeden son sunuma kadar standartların titizlikle korunması anlamına gelir.\n\nBugün Han Kuyumculuk;\n• Gücünü yıllara dayanan üretim tecrübesinden,\n• Güvenilirliğini uzman ve istikrarlı ekibinden,\n• Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.\n\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.",
            heroImage: "/images/about-hero.jpg",
            valuesTitle: "Vizyonumuz",
            values: [
              {
                title: t('about.values.elegance.title'),
                description: t('about.values.elegance.desc'),
                image: "/images/about-value-1.jpg"
              },
              {
                title: t('about.values.quality.title'),
                description: t('about.values.quality.desc'),
                image: "/images/about-value-2.jpg"
              },
              {
                title: t('about.values.originality.title'),
                description: t('about.values.originality.desc'),
                image: "/images/about-value-3.jpg"
              },
              {
                title: t('about.values.trust.title'),
                description: t('about.values.trust.desc'),
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
          heroTitle: t('about.title'),
          heroParagraph2: "1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaatten öte; disiplin, süreklilik ve sorumluluk anlayışıyla ele alan köklü bir üreticidir. Kuruluşundan bu yana tasarımdan üretime uzanan tüm süreçlerinde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır.\n\nİstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek Han'ın karakterini oluşturur. Bugün farklı markalar altında vitrinlerde yer alan birçok mücevher tasarımının arkasında Han imzası bulunur; çoğu zaman adı görünmeden, işçiliği ve detay diliyle kendini belli eder.\n\nTüm koleksiyonlar; pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip, alanında uzman ve istikrarlı ekipler tarafından geliştirilir. Üretimde süreklilik, Han için yalnızca hacim değil; hammaddeden son sunuma kadar standartların titizlikle korunması anlamına gelir.\n\nBugün Han Kuyumculuk;\n• Gücünü yıllara dayanan üretim tecrübesinden,\n• Güvenilirliğini uzman ve istikrarlı ekibinden,\n• Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.\n\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.",
          heroImage: "/images/about-hero.jpg",
          valuesTitle: "Vizyonumuz",
          values: [
            {
              title: t('about.values.elegance.title'),
              description: t('about.values.elegance.desc'),
              image: "/images/about-value-1.jpg"
            },
            {
              title: t('about.values.quality.title'),
              description: t('about.values.quality.desc'),
              image: "/images/about-value-2.jpg"
            },
            {
              title: t('about.values.originality.title'),
              description: t('about.values.originality.desc'),
              image: "/images/about-value-3.jpg"
            },
            {
              title: t('about.values.trust.title'),
              description: t('about.values.trust.desc'),
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  if (loading || !aboutData) {
    return (
      <>
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isHero={false}
          isTransparent={false}
          bannerText={content.topBanner?.text}
        />
        <div className="min-h-screen bg-white pt-[191px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">{t('common.loading')}</p>
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
        bannerText={content.topBanner?.text}
      />
      <AboutPage
        heroTitle={aboutData.heroTitle}
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
