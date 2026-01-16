"use client";

import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

export default function CustomDesignPage() {
  return (
    <div className="bg-white">
      {/* Hero Section - Full Height with Elegant Typography */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getAssetPath("/images/categories/ozel-tasarim-card.jpg")}
            alt="Sana Özel Tasarım"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-[1000px] mx-auto">
          <p 
            className="text-[14px] md:text-[16px] tracking-[0.4em] text-white/60 mb-6 uppercase"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Han Kuyumculuk
          </p>
          <h1 
            className="text-[50px] md:text-[80px] lg:text-[100px] leading-[1.05] text-white mb-10"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            Sana Özel
          </h1>
          
          {/* Decorative Line */}
          <div className="w-[80px] h-px bg-primary mx-auto mb-10" />
          
          <p 
            className="text-[18px] md:text-[22px] leading-[1.8] text-white/85 font-light max-w-[700px] mx-auto"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Her şey seni dinlemekle başlar.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span 
            className="text-[11px] tracking-[0.2em] text-white/50 uppercase"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Keşfet
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
              Gerçek değer,<br />
              <span 
                className="text-[32px] md:text-[44px] text-[#2f3237]"
                style={{ fontFamily: 'var(--font-carattere), cursive' }}
              >
                kişiye ait olanda saklıdır.
              </span>
            </p>
          </div>
          
          <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />
          
          <p 
            className="text-[17px] md:text-[19px] leading-loose font-light text-[#2f3237]/75 text-center max-w-[750px] mx-auto"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Sana özel olan,<br />
            hazır kalıplara sığmaz.<br />
            Bir ölçüden fazlasıdır;<br />
            bir duruştur, bir ihtiyaçtır, bir hikâyedir.
          </p>
        </div>
      </section>

      {/* Image + Text Split Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left - Image */}
          <div className="lg:w-1/2 relative h-[450px] lg:h-auto">
            <Image
              src={getAssetPath("/images/trend-left.jpg")}
              alt="Özel Tasarım Süreci"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
              <p 
                className="text-[50px] md:text-[60px] leading-[1.1] text-[#2f3237] mb-8"
                style={{ fontFamily: 'var(--font-carattere), cursive' }}
              >
                Dinlenmeyi<br />beklersin.
              </p>
              
              <p 
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 mb-8"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                Söylediğinin anlaşılmasını,<br />
                anlatmak istediklerinin<br />
                dikkatle ele alınmasını istersin.
              </p>
              
              <p 
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                Detay ararsın.<br />
                Her çizginin, her dokunun<br />
                seninle bir bağ kurmasını beklersin.
              </p>
              
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
              Özgürlük İstersin
            </h2>
            <p 
              className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              Seçeneklerin seni sınırlamamasını,<br />
              aksine sana alan açmasını beklersin.
            </p>
          </div>

          {/* Process Steps - Elegant Timeline */}
          <div className="relative max-w-[1000px] mx-auto">
            {/* Vertical Line - Desktop Only */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/50 -translate-x-1/2" />

            {/* Step 1 - Anlamak */}
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0 mb-20 lg:mb-32">
              <div className="lg:w-1/2 lg:pr-16 lg:text-right order-2 lg:order-1">
                <h3 
                  className="text-[14px] tracking-[0.2em] text-primary mb-3 uppercase"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  İlk Adım
                </h3>
                <h4 
                  className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  Anlamak
                </h4>
                <p 
                  className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  Hayalini, niyetini, anlatmak istediğin duyguyu dinleriz.<br />
                  Söylenen kadar, söylenmeyeni de önemseriz.
                </p>
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

            {/* Step 2 - Şekillendirmek */}
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
                  İkinci Adım
                </h3>
                <h4 
                  className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  Şekillendirmek
                </h4>
                <p 
                  className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  Oranlar, dokular ve detaylar yavaş yavaş belirir.<br />
                  Bu aşama bir karar değil, bir keşiftir.<br />
                  Parça kendini bulana kadar çalışılır.
                </p>
              </div>
            </div>

            {/* Step 3 - Üretmek */}
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0 mb-20 lg:mb-32">
              <div className="lg:w-1/2 lg:pr-16 lg:text-right order-2 lg:order-1">
                <h3 
                  className="text-[14px] tracking-[0.2em] text-primary mb-3 uppercase"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  Üçüncü Adım
                </h3>
                <h4 
                  className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  Üretmek
                </h4>
                <p 
                  className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  Tasarım netleştiğinde,<br />
                  usta ellerde, tek parça olarak hayata geçer.<br />
                  Bu üretim tekrar edilmez;<br />
                  başından sonuna sana özeldir.
                </p>
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

            {/* Step 4 - Tamamlanmak */}
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
                  Son Adım
                </h3>
                <h4 
                  className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  Tamamlanmak
                </h4>
                <p 
                  className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  Ortaya çıkan mücevher,<br />
                  artık yalnızca bir tasarım değil,<br />
                  sana ait bir iz hâline gelir.
                </p>
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
            src={getAssetPath("/images/parallax-bg.jpg")}
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
            Ve Sonunda...
          </h2>
          
          <p 
            className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85 mb-10"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Sana ait olduğunu hissettiren<br />
            <span 
              className="text-[26px] md:text-[34px]"
              style={{ fontFamily: 'var(--font-carattere), cursive' }}
            >
              bir parça beklersin.
            </span>
          </p>
          
          <div className="w-[80px] h-px bg-primary mx-auto my-12" />
          
          <p 
            className="text-[17px] md:text-[18px] leading-loose font-light text-white/60"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Başkasına değil,<br />
            tam olarak sana yakışan.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-[120px] md:py-[180px] bg-[#f5f5f5]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p 
            className="text-[60px] md:text-[80px] leading-none text-[#2f3237] mb-4"
            style={{ fontFamily: 'var(--font-carattere), cursive' }}
          >
            İşte bu yüzden
          </p>
          
          <h2 
            className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            Han &ldquo;Sana Özel&rdquo;
          </h2>
          
          <p 
            className="text-[22px] md:text-[28px] leading-[1.6] font-light text-[#2f3237]/70 mb-14"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Dinleyen, anlayan ve senin için şekillenen<br />
            <strong className="text-[#2f3237]">bir ustalık yaklaşımı sunar.</strong>
          </p>
          
          {/* Decorative Line */}
          <div className="w-[100px] h-[2px] bg-primary mx-auto mb-14" />
          
          {/* CTA Button */}
          <Link
            href="/randevu"
            className="inline-flex items-center justify-center bg-[#2f3237] text-light text-[14px] tracking-[0.15em] font-light px-14 py-5 hover:bg-[#1a1c1f] transition-all duration-300 group"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            RANDEVU OLUŞTUR
            <svg 
              className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <p 
            className="mt-8 text-[14px] text-[#2f3237]/50"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Birlikte başlayalım
          </p>
        </div>
      </section>

      {/* Image Gallery - Three Column */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[550px]">
          <div className="relative h-[350px] md:h-full overflow-hidden group">
            <Image
              src={getAssetPath("/images/products/product-1.jpg")}
              alt="Özel Tasarım 1"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
          <div className="relative h-[350px] md:h-full overflow-hidden group">
            <Image
              src={getAssetPath("/images/products/product-2.jpg")}
              alt="Özel Tasarım 2"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
          <div className="relative h-[350px] md:h-full overflow-hidden group">
            <Image
              src={getAssetPath("/images/products/product-3.jpg")}
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
