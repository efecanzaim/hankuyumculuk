"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
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

interface HediyePageContentProps {
  locale: Locale;
}

export default function HediyePageContent({ locale }: HediyePageContentProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);
  const [pageData, setPageData] = useState<Record<string, unknown> | null>(null);

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
        sections = { ...defaultSections, ...JSON.parse(pageData.content as string) };
      }
    } catch { /* use defaults */ }
    return sections;
  }, [pageData]);

  // Text content — TR uses DB sections, EN/RU uses translations
  const txt = locale === 'tr' ? {
    philosophyTitle1: s.philosophyTitle1,
    philosophyTitle2: s.philosophyTitle2,
    philosophyText: s.philosophyText,
    splitTitle: s.splitTitle,
    splitText1: s.splitText1,
    splitText2: s.splitText2,
    categoriesTitle: s.categoriesTitle,
    categoriesSubtitle: s.categoriesSubtitle,
    darkText1: s.darkText1,
    darkText2: s.darkText2,
    darkText3: s.darkText3,
    ctaSmallTitle: s.ctaSmallTitle,
    ctaTitle: s.ctaTitle,
    ctaSubtitle: s.ctaSubtitle,
    heroTitle: (pageData?.heroTitle as string) || "Hediye",
    heroSubtitle: (pageData?.heroSubtitle as string) || "Kalplerde bir iz olarak kalan özel günler vardır",
    catExplore: "Keşfet",
  } : {
    philosophyTitle1: t('gifts.philosophyTitle1'),
    philosophyTitle2: t('gifts.philosophyTitle2'),
    philosophyText: `${t('gifts.philosophySubtitle')}\n\n${t('gifts.philosophyDesc')}`,
    splitTitle: t('gifts.valueTitle'),
    splitText1: t('gifts.valueDesc'),
    splitText2: t('gifts.valueDesc2'),
    categoriesTitle: t('gifts.categoriesTitle'),
    categoriesSubtitle: t('gifts.categoriesSubtitle'),
    darkText1: t('gifts.darkDesc1'),
    darkText2: t('gifts.darkDesc2'),
    darkText3: t('gifts.darkDesc3'),
    ctaSmallTitle: t('gifts.ctaTitle'),
    ctaTitle: t('gifts.ctaSubtitle'),
    ctaSubtitle: t('gifts.ctaDesc'),
    heroTitle: t('gifts.title'),
    heroSubtitle: t('gifts.heroSubtitle'),
    catExplore: t('gifts.catExplore'),
  };

  // Images — always from DB (locale-independent)
  const heroImage = (pageData?.heroImage as string) || "/images/hediye-menu-hero.jpg";
  const splitImage = s.splitImage || "/images/trend-left.jpg";
  const darkBgImage = s.darkBgImage || "/images/parallax-bg.jpg";

  // Categories — TR uses DB sections, EN/RU uses translations + localized paths
  const categories = locale === 'tr'
    ? (s.categories as Array<{ title: string; description: string; image: string; href: string }> || defaultSections.categories)
    : [
        { title: t('gifts.catRing'), description: t('gifts.catRingDesc'), image: "/images/products/product-1.jpg", href: getLocalizedPath('jewelry/rings', locale) },
        { title: t('gifts.catNecklace'), description: t('gifts.catNecklaceDesc'), image: "/images/products/product-2.jpg", href: getLocalizedPath('jewelry/necklaces', locale) },
        { title: t('gifts.catBracelet'), description: t('gifts.catBraceletDesc'), image: "/images/products/product-3.jpg", href: getLocalizedPath('jewelry/bracelets', locale) },
        { title: t('gifts.catEarring'), description: t('gifts.catEarringDesc'), image: "/images/products/product-4.jpg", href: getLocalizedPath('jewelry/earrings', locale) },
      ];

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
            src={getAssetPath(heroImage)}
            alt={txt.heroTitle}
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
            {txt.heroTitle}
          </h1>
          <div className="w-[80px] h-px bg-primary mx-auto mb-10" />
          <p className="text-[18px] md:text-[22px] leading-[1.8] text-white/85 font-light max-w-[700px] mx-auto" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
            {txt.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[26px] md:text-[34px] leading-[1.7] font-light text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
              {txt.philosophyTitle1}
              <br />
              <span className="text-[24px] md:text-[32px] text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
                {txt.philosophyTitle2}
              </span>
            </p>
          </div>
          <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />
          <p
            className="text-[17px] md:text-[19px] leading-loose font-light text-[#2f3237]/75 text-center max-w-[750px] mx-auto whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {renderWithLogo(txt.philosophyText)}
          </p>
        </div>
      </section>

      {/* Image + Text Split Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          <div className="lg:w-1/2 relative h-[450px] lg:h-auto">
            <Image
              src={getAssetPath(splitImage)}
              alt={txt.splitTitle}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
              <p className="text-[32px] md:text-[40px] leading-[1.1] text-[#2f3237] mb-8 whitespace-pre-line" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
                {txt.splitTitle}
              </p>
              <p
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 mb-8 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                {txt.splitText1}
              </p>
              <p
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                {txt.splitText2}
              </p>
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
              {txt.categoriesTitle}
            </h2>
            <p className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70 whitespace-pre-line" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
              {txt.categoriesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className="group">
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
                    {txt.catExplore}
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
            src={getAssetPath(darkBgImage)}
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#2f3237]/90" />
        </div>
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center space-y-8">
          <p
            className="text-[18px] md:text-[20px] leading-[1.9] font-light text-white/85 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {txt.darkText1}
          </p>
          <p
            className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {txt.darkText2}
          </p>
          <div className="w-[80px] h-px bg-primary mx-auto my-12" />
          <p
            className="text-[17px] md:text-[18px] leading-loose font-light text-white/60 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {txt.darkText3}
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-[120px] md:py-[180px] bg-[#f5f5f5]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p className="text-[32px] md:text-[44px] leading-none text-[#2f3237] mb-4" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
            {txt.ctaSmallTitle}
          </p>
          <h2 className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
            {txt.ctaTitle}
          </h2>
          <p className="text-[22px] md:text-[28px] leading-[1.6] font-light text-[#2f3237]/70 mb-14 whitespace-pre-line" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
            {txt.ctaSubtitle}
          </p>
          <div className="w-[100px] h-[2px] bg-primary mx-auto mb-14" />
          <Link
            href={locale === 'tr' ? '/randevu' : getLocalizedPath('appointment', locale)}
            className="inline-flex items-center justify-center bg-[#2f3237] text-white text-[14px] tracking-[0.15em] font-light px-14 py-5 hover:bg-[#1a1c1f] transition-all duration-300 group"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {t('common.makeAppointment')}
            <svg className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        columns={content.footer.columns}
        copyright={content.footer.copyright}
        socialLinks={content.footer.socialLinks}
      />
    </>
  );
}
