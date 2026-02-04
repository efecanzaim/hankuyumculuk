"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

export default function HediyePage() {
  const content = useContent();

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
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getAssetPath("/images/hediye-menu-hero.jpg")}
            alt="Hediye"
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
            Hediye
          </h1>

          {/* Decorative Line */}
          <div className="w-[80px] h-px bg-primary mx-auto mb-10" />

          <p
            className="text-[18px] md:text-[22px] leading-[1.8] text-white/85 font-light max-w-[700px] mx-auto"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Kalplerde bir iz olarak kalan özel günler vardır
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span
            className="text-[11px] tracking-[0.2em] text-white/50 uppercase"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Keşfedin
          </span>
          <div className="w-px h-[40px] bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="text-[26px] md:text-[34px] leading-[1.7] font-light text-[#2f3237]"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              Bir teşekkür,
              <br />
              <span
                className="text-[24px] md:text-[32px] text-[#2f3237]"
                style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
              >
                bir kutlama
              </span>
            </p>
          </div>

          <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />

          <p
            className="text-[17px] md:text-[19px] leading-loose font-light text-[#2f3237]/75 text-center max-w-[750px] mx-auto"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            "iyi ki varsın" demenin en kalıcı hâli…
            <br />
            <br />
            Han'da hediye,
            <br />
            yalnızca bir mücevher seçimi değil;
            <br />
            duyulmuş, düşünülmüş ve anlam yüklenmiş bir jesttir.
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
              alt="Hediye Seçimi"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
              <p
                className="text-[32px] md:text-[40px] leading-[1.1] text-[#2f3237] mb-8"
                style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
              >
                Değer<br />verdiğini göster
              </p>

              <p
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 mb-8"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                Değer verdiğini, düşündüğünü
                <br />
                ve özen gösterdiğini göstermenin
                <br />
                en açık yoludur.
              </p>

              <p
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                Anneler Günü'nde minneti,
                <br />
                Kadınlar Günü'nde zarafeti,
                <br />
                Sevgililer Günü'nde bağı,
                <br />
                yıl dönümlerinde ortak bir hikâyeyi anlatır.
              </p>

              <div className="w-[60px] h-[2px] bg-primary mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1300px] mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16 md:mb-20">
            <h2
              className="text-[40px] md:text-[56px] leading-[1.15] text-[#2f3237] mb-8"
              style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
            >
              Kategorilerimiz
            </h2>
            <p
              className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              Seçilmiş, düşünülmüş ve<br />
              uzun vadeli bir değerin ifadesi
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {[
              {
                title: "Yüzük",
                description: "Biçiminin içinde anlam",
                image: "/images/products/product-1.jpg",
                href: "/mucevher/yuzuk"
              },
              {
                title: "Kolye",
                description: "Göğsüne yakın sevgi",
                image: "/images/products/product-2.jpg",
                href: "/mucevher/kolye"
              },
              {
                title: "Bileklik",
                description: "Hareketiyle hikâye",
                image: "/images/products/product-3.jpg",
                href: "/mucevher/bileklik"
              },
              {
                title: "Küpe",
                description: "Yüze yakın söz",
                image: "/images/products/product-4.jpg",
                href: "/mucevher/kupe"
              },
            ].map((category, index) => (
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

                  <h3
                    className="text-[32px] text-[#2f3237] mb-3 group-hover:font-bold transition-all"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    {category.title}
                  </h3>
                  <p
                    className="text-[16px] font-light text-[#2f3237]/70 group-hover:text-[#2f3237] transition-colors"
                    style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                  >
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
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center space-y-8">
          <p
            className="text-[18px] md:text-[20px] leading-[1.9] font-light text-white/85"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Her parça;
            <br />
            zamansız tasarımı, dengeli oranları ve ustalıklı işçiliğiyle
            <br />
            verildiği ana değer katar.
          </p>

          <p
            className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Gösterişten çok dengeye,
            <br />
            <span
              className="text-[22px] md:text-[28px]"
              style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
            >
              abartıdan çok ustalığa,
            </span>
            <br />
            geçicilikten çok kalıcılığa odaklanır.
          </p>

          <div className="w-[80px] h-px bg-primary mx-auto my-12" />

          <p
            className="text-[17px] md:text-[18px] leading-loose font-light text-white/60"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Çünkü bazı hediyeler,
            <br />
            kutudan çıktığı an değil,
            <br />
            yıllar sonra bile hatırlandığında anlam kazanır…
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-[120px] md:py-[180px] bg-[#f5f5f5]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p
            className="text-[32px] md:text-[44px] leading-none text-[#2f3237] mb-4"
            style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
          >
            Peki Sen?
          </p>

          <h2
            className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            Kimin hayatında iz bırakmak istiyorsun
          </h2>

          <p
            className="text-[22px] md:text-[28px] leading-[1.6] font-light text-[#2f3237]/70 mb-14"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Seçilmiş, düşünülmüş ve
            <br />
            <strong className="text-[#2f3237]">uzun vadeli bir değerin ifadesi</strong>
          </p>

          {/* Decorative Line */}
          <div className="w-[100px] h-[2px] bg-primary mx-auto mb-14" />

          {/* CTA Button */}
          <Link
            href="/randevu"
            className="inline-flex items-center justify-center bg-[#2f3237] text-white text-[14px] tracking-[0.15em] font-light px-14 py-5 hover:bg-[#1a1c1f] transition-all duration-300 group"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            RANDEVU OLUŞTURUN
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
