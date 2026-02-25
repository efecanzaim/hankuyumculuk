"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const defaultSections = {
  heroSubtitle: "Han Kuyumculuk",
  heroTitle: "Size Özel",
  heroDesc: "Her şey sizi dinlemekle başlıyor.",
  scrollText: "Keşfedin",
  philosophyQuote1: "Gerçek değer,",
  philosophyQuote2: "kişiye ait olanda saklıdır.",
  philosophyText: "Size özel olan,\nhazır kalıplara sığmaz.\nBir ölçüden fazlasıdır;\nbir duruştur, bir ihtiyaçtır, bir hikâyedir.",
  splitImage: "/images/trend-left.jpg",
  splitTitle: "Dinlenmeyi\nbeklersiniz.",
  splitText1: "Söylediklerinizin anlaşılmasını,\nanlatmak istediklerinizin\ndikkatle ele alınmasını istersiniz.",
  splitText2: "Detay ararsınız.\nHer çizginin, her dokunun\nsizinle bir bağ kurmasını beklersiniz.",
  processTitle: "Özgürlük İstersiniz",
  processSubtitle: "Seçeneklerin sizi sınırlamamasını,\naksine size alan açmasını beklersiniz.",
  steps: [
    { label: "İlk Adım", title: "Anlama", desc: "Mücevher, biçim almadan önce sizi anlamakla başlar.\nBeklentiler, duygular ve size ait hikâye bu aşamada netleşir.\nHalinizi, niyenizi, anlatmak istediğinizi duygunuzu dinleriz." },
    { label: "İkinci Adım", title: "Şekillendirme", desc: "Ölçüler, dokular ve detaylar, yavaş yavaş belirir.\nBu aşama bir karar değil, bir keşiftir.\nParça kendini bulana kadar çalışılır.\nBu aşamada, sizin beklentileriniz ile bizim teknik bilgimiz\nve yıllara dayanan üretim tecrübemiz bir araya gelir.\nTasarım, bu evrede gerçek karakterini kazanır." },
    { label: "Üçüncü Adım", title: "Üretim", desc: "Tasarım netleştiğinde, usta ellerde,\neşsiz bir parça olarak hayata geçer.\nBeklenti ve istekleriniz tam olarak karşılık bulana dek\nsüreç titizlikle devam eder." },
    { label: "Son Adım", title: "Tamamlanma", desc: "Ortaya çıkan mücevher, artık yalnızca bir tasarım değil,\nsize ait bir iz haline gelir.\nTamamlanma, beklentileriniz eksiksiz karşılandığında gerçekleşir." },
  ],
  darkBgImage: "/images/parallax-bg.jpg",
  darkTitle: "Ve Sonunda...",
  darkText1: "Size ait olduğunu hissettiren",
  darkText1Cursive: "bir parça beklersiniz.",
  darkText2: "Başkasına değil,\ntam olarak size yakışan.",
  ctaTitle1: "İşte bu yüzden",
  ctaTitle2: 'Han "Size Özel"',
  ctaDesc: "Dinleyen, anlayan ve sizin için şekillenen\nbir ustalık yaklaşımı sunar.",
  ctaButtonText: "RANDEVU OLUŞTURUN",
  ctaButtonLink: "/randevu?subject=size-ozel",
  galleryImages: [
    "/images/products/product-1.jpg",
    "/images/products/product-2.jpg",
    "/images/products/product-3.jpg"
  ],
};

function WhiteSpaceText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return <p className={`whitespace-pre-line ${className || ""}`} style={style}>{text}</p>;
}

export default function CustomDesignPage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (API_URL) {
          const response = await fetch(`${API_URL}/api/pages.php?slug=ozel-tasarim`);
          if (response.ok) {
            const data = await response.json();
            setPageData(data);
          }
        }
      } catch (error) {
        console.error("Size Özel sayfa verisi yükleme hatası:", error);
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

  const heroImage = pageData?.heroImage || "/images/categories/ozel-tasarim-card.jpg";
  const steps = s.steps || defaultSections.steps;
  const galleryImages = s.galleryImages || defaultSections.galleryImages;

  return (
    <div className="bg-white">
      {/* Hero Section - Full Height with Elegant Typography */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getAssetPath(heroImage)}
            alt={s.heroTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-[1000px] mx-auto">
          <div className="mb-6">
            <Image
              src={getAssetPath("/images/han-logo.svg")}
              alt="Han Kuyumculuk"
              width={76}
              height={28}
              className="inline-block"
            />
          </div>
          <h1 
            className="text-[50px] md:text-[80px] lg:text-[100px] leading-[1.05] text-white mb-10"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            {s.heroTitle}
          </h1>
          
          {/* Decorative Line */}
          <div className="w-[80px] h-px bg-primary mx-auto mb-10" />
          
          <p 
            className="text-[18px] md:text-[22px] leading-[1.8] text-white/85 font-light max-w-[700px] mx-auto"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {s.heroDesc}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span 
            className="text-[11px] tracking-[0.2em] text-white/50 uppercase"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {s.scrollText}
          </span>
          <div className="w-px h-[40px] bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Philosophy Section - Elegant Split Layout */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p 
              className="text-[26px] md:text-[34px] leading-[1.7] font-light text-[#2f3237]"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {s.philosophyQuote1}<br />
              <span
                className="text-[24px] md:text-[32px] text-[#2f3237]"
                style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
              >
                {s.philosophyQuote2}
              </span>
            </p>
          </div>
          
          <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />
          
          <WhiteSpaceText 
            text={s.philosophyText}
            className="text-[17px] md:text-[19px] leading-loose font-light text-[#2f3237]/75 text-center max-w-[750px] mx-auto"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
        </div>
      </section>

      {/* Image + Text Split Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left - Image */}
          <div className="lg:w-1/2 relative h-[450px] lg:h-auto">
            <Image
              src={getAssetPath(s.splitImage)}
              alt="Özel Tasarım Süreci"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
              <WhiteSpaceText
                text={s.splitTitle}
                className="text-[32px] md:text-[40px] leading-[1.1] text-[#2f3237] mb-8"
                style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
              />
              
              <WhiteSpaceText 
                text={s.splitText1}
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 mb-8"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              />
              
              <WhiteSpaceText 
                text={s.splitText2}
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              />
              
              <div className="w-[60px] h-[2px] bg-primary mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1300px] mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12 md:mb-20">
            <h2 
              className="text-[40px] md:text-[56px] leading-[1.15] text-[#2f3237] mb-8"
              style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
            >
              {s.processTitle}
            </h2>
            <WhiteSpaceText 
              text={s.processSubtitle}
              className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            />
          </div>

          {/* Process Steps - Elegant Timeline */}
          <div className="relative max-w-[1000px] mx-auto">
            {/* Vertical Line - Desktop Only */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/50 -translate-x-1/2" />

            {/* Step 1 */}
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0 mb-20 lg:mb-32">
              <div className="lg:w-1/2 lg:pr-16 lg:text-right order-2 lg:order-1">
                <h3 
                  className="text-[14px] tracking-[0.2em] text-primary mb-3 uppercase"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  {steps[0]?.label}
                </h3>
                <h4 
                  className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  {steps[0]?.title}
                </h4>
                <WhiteSpaceText 
                  text={steps[0]?.desc || ""}
                  className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                />
              </div>
              
              {/* Center Circle */}
              <div className="relative z-10 order-1 lg:order-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                <div className="w-[70px] h-[70px] rounded-full bg-[#2f3237] flex items-center justify-center">
                  <span 
                    className="text-[22px] text-white"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    01
                  </span>
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-16 order-3" />
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0 mb-20 lg:mb-32">
              <div className="lg:w-1/2 lg:pr-16 order-2" />
              
              {/* Center Circle */}
              <div className="relative z-10 order-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                <div className="w-[70px] h-[70px] rounded-full bg-primary flex items-center justify-center">
                  <span 
                    className="text-[22px] text-[#2f3237]"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    02
                  </span>
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-16 lg:text-left order-3">
                <h3 
                  className="text-[14px] tracking-[0.2em] text-primary mb-3 uppercase"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  {steps[1]?.label}
                </h3>
                <h4 
                  className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  {steps[1]?.title}
                </h4>
                <WhiteSpaceText 
                  text={steps[1]?.desc || ""}
                  className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0 mb-20 lg:mb-32">
              <div className="lg:w-1/2 lg:pr-16 lg:text-right order-2 lg:order-1">
                <h3 
                  className="text-[14px] tracking-[0.2em] text-primary mb-3 uppercase"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  {steps[2]?.label}
                </h3>
                <h4 
                  className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  {steps[2]?.title}
                </h4>
                <WhiteSpaceText 
                  text={steps[2]?.desc || ""}
                  className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                />
              </div>
              
              {/* Center Circle */}
              <div className="relative z-10 order-1 lg:order-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                <div className="w-[70px] h-[70px] rounded-full bg-[#2f3237] flex items-center justify-center">
                  <span 
                    className="text-[22px] text-white"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    03
                  </span>
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-16 order-3" />
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
              <div className="lg:w-1/2 lg:pr-16 order-2" />
              
              {/* Center Circle */}
              <div className="relative z-10 order-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                <div className="w-[70px] h-[70px] rounded-full bg-primary flex items-center justify-center">
                  <span 
                    className="text-[22px] text-[#2f3237]"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    04
                  </span>
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-16 lg:text-left order-3">
                <h3 
                  className="text-[14px] tracking-[0.2em] text-primary mb-3 uppercase"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  {steps[3]?.label}
                </h3>
                <h4 
                  className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  {steps[3]?.title}
                </h4>
                <WhiteSpaceText 
                  text={steps[3]?.desc || ""}
                  className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section - Dark Background with Parallax Feel */}
      <section className="relative py-[120px] md:py-[180px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={getAssetPath(s.darkBgImage)}
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#2f3237]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <h2 
            className="text-[44px] md:text-[60px] leading-[1.15] text-white mb-12"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            {s.darkTitle}
          </h2>
          
          <p 
            className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85 mb-10"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {s.darkText1}<br />
            <span
              className="text-[22px] md:text-[28px]"
              style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
            >
              {s.darkText1Cursive}
            </span>
          </p>
          
          <div className="w-[80px] h-px bg-primary mx-auto my-12" />
          
          <WhiteSpaceText 
            text={s.darkText2}
            className="text-[17px] md:text-[18px] leading-loose font-light text-white/60"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-[120px] md:py-[180px] bg-[#f5f5f5]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p
            className="text-[32px] md:text-[44px] leading-none text-[#2f3237] mb-4"
            style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
          >
            {s.ctaTitle1}
          </p>
          
          <h2
            className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6 flex items-center justify-center gap-2"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            <Image
              src={getAssetPath("/images/han-logo.svg")}
              alt="Han"
              width={90}
              height={34}
              style={{ filter: 'brightness(0)', verticalAlign: 'middle' }}
            />
            <span>{s.ctaTitle2.replace(/^Han\s*/, '')}</span>
          </h2>
          
          <WhiteSpaceText 
            text={s.ctaDesc}
            className="text-[22px] md:text-[28px] leading-[1.6] font-light text-[#2f3237]/70 mb-14"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
          
          {/* Decorative Line */}
          <div className="w-[100px] h-[2px] bg-primary mx-auto mb-14" />
          
          {/* CTA Button */}
          <Link
            href={s.ctaButtonLink}
            className="inline-flex items-center justify-center bg-[#2f3237] text-light text-[14px] tracking-[0.15em] font-light px-14 py-5 hover:bg-[#1a1c1f] transition-all duration-300 group"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {s.ctaButtonText}
            <svg 
              className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Image Gallery - Three Column */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[550px]">
          <div className="relative h-[350px] md:h-full overflow-hidden group">
            <Image
              src={getAssetPath(galleryImages[0] || "/images/products/product-1.jpg")}
              alt="Özel Tasarım 1"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
          <div className="relative h-[350px] md:h-full overflow-hidden group">
            <Image
              src={getAssetPath(galleryImages[1] || "/images/products/product-2.jpg")}
              alt="Özel Tasarım 2"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
          <div className="relative h-[350px] md:h-full overflow-hidden group">
            <Image
              src={getAssetPath(galleryImages[2] || "/images/products/product-3.jpg")}
              alt="Özel Tasarım 3"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
        </div>
      </section>
    </div>
  );
}
