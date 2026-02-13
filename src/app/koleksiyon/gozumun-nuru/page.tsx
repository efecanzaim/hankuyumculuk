"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

export default function GozumunNuruPage() {
  const content = useContent();
  const category = content.gozumunNuruCategory;
  const products = (category?.products || []) as Array<{ id: number; name: string; subtitle: string; image: string; link?: string; slug?: string }>;

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
            src={getAssetPath("/images/collection-menu-hero.jpg")}
            alt="Gözümün Nuru"
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
            Han Koleksiyonu
          </p>
          <h1
            className="text-[50px] md:text-[80px] lg:text-[100px] leading-[1.05] text-white mb-10"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            Gözümün Nuru
          </h1>

          {/* Decorative Line */}
          <div className="w-[80px] h-px bg-primary mx-auto mb-10" />

          <p
            className="text-[18px] md:text-[22px] leading-[1.8] text-white/85 font-light max-w-[700px] mx-auto"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Değerini yitirmeyen bir yakınlıktan doğdu
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
              "Sen benim hayatımı güzelleştiren biri değilsin;
              <br />
              <span
                className="text-[32px] md:text-[44px] text-[#2f3237]"
                style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
              >
                hayatımı anlamlı kılan yerdesin."
              </span>
            </p>
          </div>

          <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />

          <p
            className="text-[17px] md:text-[19px] leading-loose font-light text-[#2f3237]/75 text-center max-w-[750px] mx-auto"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Gözümün Nuru,
            <br />
            değerini yitirmeyen bir yakınlıktan doğdu.
            <br />
            Ruhun penceresinden süzülen aydınlık bir bağdan…
          </p>
        </div>
      </section>

      {/* Image + Text Split Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left - Image */}
          <div className="lg:w-1/2 relative h-[450px] lg:h-auto">
            <Image
              src={getAssetPath("/images/trend-right.jpg")}
              alt="Gözümün Nuru"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
              <p
                className="text-[50px] md:text-[60px] leading-[1.1] text-[#2f3237] mb-8"
                style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
              >
                Her detay<br />bir bağ
              </p>

              <p
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 mb-8"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                Bu koleksiyondaki her parça,
                <br />
                birine duyulan saf sevginin,
                <br />
                koruma içgüdüsünün
                <br />
                ve vazgeçilmez olma hissinin manevi yansımasıdır.
              </p>

              <p
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                Her dokunuş, her detay;
                <br />
                koruyan, saran, tamamlayan emek harcanmış
                <br />
                bir bağın izini taşır.
              </p>

              <div className="w-[60px] h-[2px] bg-primary mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1300px] mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16 md:mb-20">
            <h2
              className="text-[40px] md:text-[56px] leading-[1.15] text-[#2f3237] mb-8"
              style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
            >
              Koleksiyonu Keşfet
            </h2>
            <p
              className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
                Işık saçmaktan daha çok;<br />
              ait olmak için…
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={product.link || `/urun/${product.slug || product.id}`}
                  className="group"
                >
                  <div className="space-y-6">
                    <div className="relative h-[400px] overflow-hidden">
                      {product.image ? (
                        <Image
                          src={getAssetPath(product.image)}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f5f5f5] flex items-center justify-center text-[#2f3237] opacity-30">
                          Görsel
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>

                    <div>
                      <h3
                        className="text-[18px] text-[#2f3237] mb-2 group-hover:font-bold transition-all"
                        style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="text-[14px] font-light text-[#2f3237]/70 group-hover:text-[#2f3237] transition-colors"
                        style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                      >
                        {product.subtitle || "Özel tasarım"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p
                className="text-[#2f3237] opacity-50"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                Koleksiyonda henüz ürün yok.
              </p>
            </div>
          )}
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
            Gösterişten ziyade,
            <br />
            hissettirmeye odaklı tasarlandı.
          </p>

          <p
            className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Han mücevherleri,
            <br />
            <span
              className="text-[26px] md:text-[34px]"
              style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
            >
              özel hissettirmek için var olur.
            </span>
          </p>

          <div className="w-[80px] h-px bg-primary mx-auto my-12" />

          <p
            className="text-[17px] md:text-[18px] leading-loose font-light text-white/60"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Bu çok özel birinin hikâyesi…
            <br />
            Peki Sen neresindesin?
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-[120px] md:py-[180px] bg-[#f5f5f5]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p
            className="text-[60px] md:text-[80px] leading-none text-[#2f3237] mb-4"
            style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
          >
            Seçilmiş
          </p>

          <h2
            className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            Düşünülmüş ve Uzun Vadeli Bir Değer
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
