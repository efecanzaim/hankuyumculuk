"use client";

import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

const defaultSections = {
  philosophyQuote1: "\"Sen benim hayatımı güzelleştiren biri değilsin;",
  philosophyQuote2: "hayatımı anlamlı kılan yerdesin.\"",
  philosophyText: "Gözümün Nuru,\ndeğerini yitirmeyen bir yakınlıktan doğdu.\nRuhun penceresinden süzülen aydınlık bir bağdan…",
  splitImage: "/images/trend-right.jpg",
  splitTitle: "Her detay\nbir bağ",
  splitText1: "Bu koleksiyondaki her parça,\nbirine duyulan saf sevginin,\nkoruma içgüdüsünün\nve vazgeçilmez olma hissinin manevi yansımasıdır.",
  splitText2: "Her dokunuş, her detay;\nkoruyan, saran, tamamlayan emek harcanmış\nbir bağın izini taşır.",
  collectionTitle: "Koleksiyonu Keşfet",
  collectionSubtitle: "Işık saçmaktan daha çok;\nait olmak için…",
  darkBgImage: "/images/parallax-bg.jpg",
  darkText1: "Gösterişten ziyade,\nhissettirmeye odaklı tasarlandı.",
  darkText2: "Han mücevherleri,",
  darkText2Cursive: "özel hissettirmek için var olur.",
  darkText3: "Bu çok özel birinin hikâyesi…\nPeki Sen neresindesin?",
  ctaSmallTitle: "Seçilmiş",
  ctaTitle: "Düşünülmüş ve Uzun Vadeli Bir Değer",
  ctaSubtitle: "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
};

function WhiteSpaceText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return <p className={className} style={style}>{text}</p>;
}

export default function GozumunNuruPage() {
  const content = useContent();
  const category = content.gozumunNuruCategory;
  const products = (category?.products || []) as Array<{ id: number; name: string; subtitle: string; image: string; link?: string; slug?: string }>;

  const s = useMemo(() => {
    let sections = defaultSections;
    try {
      if (category?.content) {
        const parsed = typeof category.content === 'string' ? JSON.parse(category.content) : category.content;
        sections = { ...defaultSections, ...parsed };
      }
    } catch { /* use defaults */ }
    return sections;
  }, [category]);

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
            src={getAssetPath(category?.heroImage || "/images/collection-menu-hero.jpg")}
            alt="Gözümün Nuru"
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
              alt="Han"
              width={38}
              height={14}
              style={{ opacity: 0.6, verticalAlign: 'middle' }}
            />
            <span>Koleksiyonu</span>
          </p>
          <h1 className="text-[50px] md:text-[80px] lg:text-[100px] leading-[1.05] text-white mb-10" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
            {category?.heroTitle || "Gözümün Nuru"}
          </h1>
          <div className="w-[80px] h-px bg-primary mx-auto mb-10" />
          <p className="text-[18px] md:text-[22px] leading-[1.8] text-white/85 font-light max-w-[700px] mx-auto" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
            {category?.heroSubtitle || "Değerini yitirmeyen bir yakınlıktan doğdu"}
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
              {s.philosophyQuote1}
              <br />
              <span className="text-[32px] md:text-[44px] text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
                {s.philosophyQuote2}
              </span>
            </p>
          </div>
          <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />
          <WhiteSpaceText
            text={s.philosophyText}
            className="text-[17px] md:text-[19px] leading-loose font-light text-[#2f3237]/75 text-center max-w-[750px] mx-auto whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
        </div>
      </section>

      {/* Image + Text Split Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          <div className="lg:w-1/2 relative h-[450px] lg:h-auto">
            <Image
              src={getAssetPath(s.splitImage)}
              alt="Gözümün Nuru"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
              <WhiteSpaceText
                text={s.splitTitle}
                className="text-[50px] md:text-[60px] leading-[1.1] text-[#2f3237] mb-8 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
              />
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

      {/* Collection Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1430px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[40px] md:text-[56px] leading-[1.15] text-[#2f3237] mb-8" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
              {s.collectionTitle}
            </h2>
            <WhiteSpaceText
              text={s.collectionSubtitle}
              className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            />
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={product.link || `/urun/${product.slug || product.id}`}
                  className="group block"
                >
                  {/* Product Image */}
                  <div 
                    className="relative aspect-square w-full overflow-hidden bg-[#ffffff]"
                    style={{
                      boxShadow: 'inset 0 0 40px 20px rgba(252, 252, 252, 0.8)'
                    }}
                  >
                    {product.image ? (
                      <Image
                        src={getAssetPath(product.image)}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f5f5f5] flex items-center justify-center text-[#2f3237] opacity-30">
                        Görsel
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="pt-[20px] pb-[30px] text-center">
                    <h3 className="text-[20px] leading-[20px] text-[#2f3237] mb-[10px]" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
                      {product.name}
                    </h3>
                    <p className="font-light text-[13px] leading-[26px] text-[#2f3237]">
                      {product.subtitle || "Özel tasarım"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#2f3237] opacity-50" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
                Koleksiyonda henüz ürün yok.
              </p>
            </div>
          )}
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
          <p className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
            <Image
              src={getAssetPath("/images/han-logo.svg")}
              alt="Han"
              width={56}
              height={21}
              style={{ opacity: 0.85, display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}
            />
            {' '}{s.darkText2.replace(/^Han\s*/, '')}
            <br />
            <span className="text-[26px] md:text-[34px]" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
              {s.darkText2Cursive}
            </span>
          </p>
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
          <p className="text-[60px] md:text-[80px] leading-none text-[#2f3237] mb-4" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
            {s.ctaSmallTitle}
          </p>
          <h2 className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
            {s.ctaTitle}
          </h2>
          <WhiteSpaceText
            text={s.ctaSubtitle}
            className="text-[22px] md:text-[28px] leading-[1.6] font-light text-[#2f3237]/70 mb-14 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
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
