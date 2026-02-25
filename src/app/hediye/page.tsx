"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const defaultSections = {
  philosophyTitle1: "Bir teşekkür,",
  philosophyTitle2: "bir kutlama",
  philosophyText: "\"iyi ki varsın\" demenin en kalıcı hâli…\n\nHan'da hediye,\nyalnızca bir mücevher seçimi değil;\nduyulmuş, düşünülmüş ve anlam yüklenmiş bir jesttir.",
  splitImage: "/images/trend-left.jpg",
  splitTitle: "Değer\nverdiğini göster",
  splitText1: "Değer verdiğini, düşündüğünü\nve özen gösterdiğini göstermenin\nen açık yoludur.",
  splitText2: "Anneler Günü'nde minneti,\nKadınlar Günü'nde zarafeti,\nSevgililer Günü'nde bağı,\nyıl dönümlerinde ortak bir hikâyeyi anlatır.",
  categoriesTitle: "Kategorilerimiz",
  categoriesSubtitle: "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
  categories: [
    { title: "Yüzük", description: "Biçiminin içinde anlam", image: "/images/products/product-1.jpg", href: "/mucevher/yuzuk" },
    { title: "Kolye", description: "Göğsüne yakın sevgi", image: "/images/products/product-2.jpg", href: "/mucevher/kolye" },
    { title: "Bileklik", description: "Hareketiyle hikâye", image: "/images/products/product-3.jpg", href: "/mucevher/bileklik" },
    { title: "Küpe", description: "Yüze yakın söz", image: "/images/products/product-4.jpg", href: "/mucevher/kupe" },
  ],
  darkBgImage: "/images/parallax-bg.jpg",
  darkText1: "Her parça;\nzamansız tasarımı, dengeli oranları ve ustalıklı işçiliğiyle\nverildiği ana değer katar.",
  darkText2: "Gösterişten çok dengeye,\nabartıdan çok ustalığa,\ngeçicilikten çok kalıcılığa odaklanır.",
  darkText3: "Çünkü bazı hediyeler,\nkutudan çıktığı an değil,\nyıllar sonra bile hatırlandığında anlam kazanır…",
  ctaSmallTitle: "Peki Sen?",
  ctaTitle: "Kimin hayatında iz bırakmak istiyorsun",
  ctaSubtitle: "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
};

function WhiteSpaceText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return <p className={className} style={style}>{text}</p>;
}

function renderWithLogo(text: string, logoHeight: number = 17) {
  const logoWidth = Math.round(logoHeight * (110 / 41));
  const parts = text.split(/(Han(?:[\s\u00A0]+Kuyumculuk|'))/);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          const isKuyumculuk = /[\s\u00A0]+Kuyumculuk$/.test(part);
          const displaySuffix = isKuyumculuk ? '' : part.slice(3);
          return (
            <span key={i}>
              <Image
                src={getAssetPath("/images/han-logo.svg")}
                alt="Han"
                width={logoWidth}
                height={logoHeight}
                style={{ filter: 'brightness(0)', display: 'inline', verticalAlign: 'middle', margin: '0 2px' }}
              />
              {displaySuffix}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function HediyePage() {
  const content = useContent();
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (API_URL) {
          const response = await fetch(`${API_URL}/api/pages.php?slug=hediye`);
          if (response.ok) {
            const data = await response.json();
            setPageData(data);
          }
        }
      } catch (error) {
        console.error("Hediye sayfa verisi yükleme hatası:", error);
      }
    };
    fetchData();
  }, []);

  const s = useMemo(() => {
    let sections = defaultSections;
    try {
      if (pageData?.content) {
        sections = { ...defaultSections, ...JSON.parse(pageData.content) };
      }
    } catch { /* use defaults */ }
    return sections;
  }, [pageData]);

  const categories = s.categories || defaultSections.categories;

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isTransparent={true}
        bannerText={content.topBanner?.text}
        bannerVisible={content.topBanner?.visible}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getAssetPath(pageData?.heroImage || "/images/hediye-menu-hero.jpg")}
            alt="Hediye"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-[1000px] mx-auto">
          <p className="text-[14px] md:text-[16px] tracking-[0.4em] text-white/60 mb-6 uppercase flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
            <Image
              src={getAssetPath("/images/han-logo.svg")}
              alt="Han Kuyumculuk"
              width={76}
              height={28}
              style={{ opacity: 0.6, verticalAlign: 'middle' }}
            />
          </p>
          <h1 className="text-[50px] md:text-[80px] lg:text-[100px] leading-[1.05] text-white mb-10" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
            {pageData?.heroTitle || "Hediye"}
          </h1>
          <div className="w-[80px] h-px bg-primary mx-auto mb-10" />
          <p className="text-[18px] md:text-[22px] leading-[1.8] text-white/85 font-light max-w-[700px] mx-auto" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
            {pageData?.heroSubtitle || "Kalplerde bir iz olarak kalan özel günler vardır"}
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[11px] tracking-[0.2em] text-white/50 uppercase" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>Keşfedin</span>
          <div className="w-px h-[40px] bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[26px] md:text-[34px] leading-[1.7] font-light text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
              {s.philosophyTitle1}
              <br />
              <span className="text-[24px] md:text-[32px] text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
                {s.philosophyTitle2}
              </span>
            </p>
          </div>
          <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />
          <p
            className="text-[17px] md:text-[19px] leading-loose font-light text-[#2f3237]/75 text-center max-w-[750px] mx-auto whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {renderWithLogo(s.philosophyText)}
          </p>
        </div>
      </section>

      {/* Image + Text Split Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          <div className="lg:w-1/2 relative h-[450px] lg:h-auto">
            <Image
              src={getAssetPath(s.splitImage)}
              alt="Hediye Seçimi"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
              <p className="text-[32px] md:text-[40px] leading-[1.1] text-[#2f3237] mb-8 whitespace-pre-line" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
                {s.splitTitle}
              </p>
              <WhiteSpaceText
                text={s.splitText1}
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 mb-8 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              />
              <WhiteSpaceText
                text={s.splitText2}
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              />
              <div className="w-[60px] h-[2px] bg-primary mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[40px] md:text-[56px] leading-[1.15] text-[#2f3237] mb-8" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
              {s.categoriesTitle}
            </h2>
            <p className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70 whitespace-pre-line" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
              {s.categoriesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {categories.map((category: any, index: number) => (
              <Link key={index} href={category.href || "#"} className="group">
                <div className="overflow-hidden">
                  <div className="relative h-[400px] mb-6">
                    <Image
                      src={getAssetPath(category.image)}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <h3 className="text-[32px] text-[#2f3237] mb-3 group-hover:font-bold transition-all" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
                    {category.title}
                  </h3>
                  <p className="text-[16px] font-light text-[#2f3237]/70 group-hover:text-[#2f3237] transition-colors" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
                    {category.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-light text-[#2f3237] group-hover:translate-x-1 transition-transform">
                    Keşfet
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section - Dark Background */}
      <section className="relative py-[120px] md:py-[180px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getAssetPath(s.darkBgImage)}
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#2f3237]/90" />
        </div>
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center space-y-8">
          <WhiteSpaceText
            text={s.darkText1}
            className="text-[18px] md:text-[20px] leading-[1.9] font-light text-white/85 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
          <WhiteSpaceText
            text={s.darkText2}
            className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
          <div className="w-[80px] h-px bg-primary mx-auto my-12" />
          <WhiteSpaceText
            text={s.darkText3}
            className="text-[17px] md:text-[18px] leading-loose font-light text-white/60 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-[120px] md:py-[180px] bg-[#f5f5f5]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p className="text-[32px] md:text-[44px] leading-none text-[#2f3237] mb-4" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
            {s.ctaSmallTitle}
          </p>
          <h2 className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
            {s.ctaTitle}
          </h2>
          <p className="text-[22px] md:text-[28px] leading-[1.6] font-light text-[#2f3237]/70 mb-14 whitespace-pre-line" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
            {s.ctaSubtitle}
          </p>
          <div className="w-[100px] h-[2px] bg-primary mx-auto mb-14" />
          <Link
            href="/randevu"
            className="inline-flex items-center justify-center bg-[#2f3237] text-white text-[14px] tracking-[0.15em] font-light px-14 py-5 hover:bg-[#1a1c1f] transition-all duration-300 group"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            RANDEVU OLUŞTURUN
            <svg className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

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
