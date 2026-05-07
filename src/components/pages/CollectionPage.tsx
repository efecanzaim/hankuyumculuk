"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
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

interface CollectionPageProps {
  locale: Locale;
  slug?: string;
}

interface CollectionProduct {
  id: number;
  name: string;
  nameEn?: string;
  nameRu?: string;
  subtitle: string;
  subtitleEn?: string;
  subtitleRu?: string;
  image: string;
  link?: string;
  slug?: string;
}

interface CollectionData {
  id: number;
  name: string;
  slug: string;
  heroImage?: string;
  heroTitle?: string;
  content?: string | Record<string, unknown>;
  products?: CollectionProduct[];
}

const defaultSections = {
  heroSvg: "/gozumunnuru-hero.svg",
  heroSvgEn: "",
  heroSvgRu: "",
  philosophyQuote1: "\"Sen benim hayatımı güzelleştiren biri değilsin;",
  philosophyQuote2: "hayatımı anlamlı kılan yerdesin.\"",
  philosophyText: "Bu koleksiyon,\ndeğerini yitirmeyen bir yakınlıktan doğdu.\nRuhun penceresinden süzülen aydınlık bir bağdan…",
  splitImage: "/images/trend-right.jpg",
  splitImagePosition: "50% 50%",
  splitImageScale: 1,
  splitTitle: "Her detay\nbir bağ",
  splitText1: "Bu koleksiyondaki her parça,\nbirine duyulan saf sevginin,\nkoruma içgüdüsünün\nve vazgeçilmez olma hissinin manevi yansımasıdır.",
  splitText2: "Her dokunuş, her detay;\nkoruyan, saran, tamamlayan emek harcanmış\nbir bağın izini taşır.",
  collectionTitle: "Koleksiyonu Keşfet",
  collectionSubtitle: "Işık saçmaktan daha çok;\nait olmak için…",
  darkBgImage: "/images/parallax-bg.jpg",
  darkBgImagePosition: "50% 50%",
  darkBgImageScale: 1,
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

export default function CollectionPage({ locale, slug: slugProp }: CollectionPageProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);
  const pathname = usePathname();

  const slug = useMemo(() => {
    if (slugProp) return slugProp;
    const basePath = getLocalizedPath('collection', locale);
    if (pathname && pathname.startsWith(basePath + '/')) {
      return pathname.slice(basePath.length + 1);
    }
    return null;
  }, [slugProp, pathname, locale]);

  const [category, setCategory] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [listingCards, setListingCards] = useState<Array<{ id: number; name: string; slug: string; heroImage?: string; content?: string }>>([]);

  useEffect(() => {
    if (slug) return;
    if (!API_URL) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`${API_URL}/api/categories.php?parentType=koleksiyon&_t=${Date.now()}`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (cancelled) return;
        if (Array.isArray(data)) setListingCards(data);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    if (!API_URL) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`${API_URL}/api/categories.php?slug=${encodeURIComponent(slug)}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (cancelled) return;
        if (data && !data.error) setCategory(data as CollectionData);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  const s = useMemo(() => {
    let sections = { ...defaultSections } as typeof defaultSections & Record<string, unknown>;
    try {
      if (category?.content) {
        const parsed = typeof category.content === 'string' ? JSON.parse(category.content) : category.content;
        sections = { ...defaultSections, ...(parsed as Record<string, unknown>) };
      }
    } catch { /* use defaults */ }
    return sections;
  }, [category]);

  const get = (key: string): string => {
    const suffix = locale === 'en' ? 'En' : locale === 'ru' ? 'Ru' : '';
    if (suffix) {
      const localeVal = (s as Record<string, unknown>)[`${key}${suffix}`] as string;
      if (localeVal) return localeVal;
    }
    return (s as Record<string, unknown>)[key] as string || '';
  };

  const products = (category?.products || []) as CollectionProduct[];
  const collectionName = category?.name || '';

  if (loading) {
    return (
      <>
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isTransparent={false}
          bannerText={content.topBanner?.text}
          bannerVisible={content.topBanner?.visible}
        />
        <main className="min-h-screen flex items-center justify-center pt-[170px]">
          <div className="w-8 h-8 border-4 border-[#2f3237] border-t-transparent rounded-full animate-spin"></div>
        </main>
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

  if (!slug) {
    const sayfasi = (content as Record<string, unknown>).koleksiyonSayfasi as Record<string, unknown> | undefined;
    const pageTitle = (sayfasi?.title as string) || t('collection.title') || 'Koleksiyonlar';
    const pageDescription = (sayfasi?.description as string) || '';
    const collectionBasePath = getLocalizedPath('collection', locale);
    // Admin "Koleksiyon Kartları"ndaki değerler önceliklidir; boş bırakılırsa API verisine düşer
    const ksCards = (sayfasi?.cards as Array<{ href: string; image?: string; heroTitleImage?: string }>) || [];
    const mergedListingCards = listingCards.map(col => {
      const trHref = col.slug === 'gozumun-nuru' ? '/koleksiyon/gozumun-nuru' : `/koleksiyon/${col.slug}`;
      const ksCard = ksCards.find(k => k.href === trHref);
      if (!ksCard) return col;
      // ksCard.heroTitleImage'i col.content içine enjekte et ki aşağıdaki render kullansın
      let mergedContent = col.content;
      if (ksCard.heroTitleImage) {
        try {
          const parsed = col.content ? (typeof col.content === 'string' ? JSON.parse(col.content) : col.content) : {};
          mergedContent = JSON.stringify({ ...parsed, heroTitleImage: ksCard.heroTitleImage });
        } catch {
          mergedContent = JSON.stringify({ heroTitleImage: ksCard.heroTitleImage });
        }
      }
      return {
        ...col,
        heroImage: ksCard.image || col.heroImage,
        content: mergedContent,
      };
    });
    return (
      <>
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isTransparent={false}
          bannerText={content.topBanner?.text}
          bannerVisible={content.topBanner?.visible}
        />
        <section className="pt-[141px] pb-[80px] bg-white">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <p className="text-[11px] tracking-[0.3em] text-[#2f3237]/50 uppercase mb-6">
              Han Kuyumculuk
            </p>
            <h1 className="text-[40px] md:text-[56px] text-[#2f3237] mb-8" style={{ fontFamily: "var(--font-faculty-glyphic), serif" }}>
              {pageTitle}
            </h1>
            <div className="w-[60px] h-[1px] bg-primary mx-auto mb-10" />
            {pageDescription && (
              <p className="text-[16px] md:text-[18px] font-light text-[#2f3237]/70 leading-[1.9] whitespace-pre-line">
                {pageDescription}
              </p>
            )}
          </div>
        </section>
        <section className="pb-[120px] bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
              {mergedListingCards.map((col) => {
                let heroTitleImage: string | null = null;
                try {
                  if (col.content) {
                    const parsed = typeof col.content === 'string' ? JSON.parse(col.content) : col.content;
                    heroTitleImage = (parsed as Record<string, unknown>)?.heroTitleImage as string || null;
                  }
                } catch { /* ignore */ }
                const href = col.slug === 'gozumun-nuru'
                  ? getLocalizedPath('collection/light-of-my-eyes', locale)
                  : `${collectionBasePath}/${col.slug}`;
                const titleFont = col.slug === 'gozumun-nuru' ? 'Buljirya, cursive' : 'var(--font-faculty-glyphic), serif';
                return (
                  <Link key={col.id} href={href} className="group block">
                    <div className="relative aspect-[3/4] w-full bg-[#f0efed] overflow-hidden">
                      {col.heroImage ? (
                        <Image src={getAssetPath(col.heroImage)} alt={col.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center px-6">
                          <span className="text-[32px] md:text-[40px] text-[#2f3237]/40 lowercase text-center leading-tight" style={{ fontFamily: titleFont }}>
                            {col.name}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0)] group-hover:shadow-[inset_0_0_60px_rgba(0,0,0,0.45)] transition-shadow duration-500" />
                    </div>
                    <div className="pt-4 pb-2">
                      {heroTitleImage ? (
                        <Image src={getAssetPath(heroTitleImage)} alt={col.name} width={300} height={48} className="h-[48px] w-auto object-contain" />
                      ) : (
                        <h2 className="text-[26px] lowercase text-[#2f3237]" style={{ fontFamily: titleFont }}>
                          {col.name}
                        </h2>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
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

  if (!category) {
    return (
      <>
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isTransparent={false}
          bannerText={content.topBanner?.text}
          bannerVisible={content.topBanner?.visible}
        />
        <main className="min-h-screen flex items-center justify-center pt-[170px]">
          <p className="text-xl text-gray-500">404 - Koleksiyon bulunamadı</p>
        </main>
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
            src={getAssetPath(category.heroImage || "/images/collection-menu-hero.jpg")}
            alt={collectionName}
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
            <span>{t('collection.collectionLabel')}</span>
          </p>
          {s.heroTitleImage ? (
            <div className="flex justify-center mb-10">
              <Image
                src={getAssetPath(s.heroTitleImage as string)}
                alt={collectionName}
                width={600}
                height={120}
                className="max-w-full h-auto"
                style={{ maxHeight: '140px', objectFit: 'contain' }}
                priority
              />
            </div>
          ) : (
            <h1 className="text-[28px] md:text-[40px] lg:text-[52px] leading-[1.05] text-white mb-10 lowercase" style={{ fontFamily: 'Buljirya, cursive' }}>
              {collectionName}
            </h1>
          )}
        </div>
        {/* Hero SVG */}
        {(s.heroSvg || s.heroSvgEn || s.heroSvgRu) && (() => {
          const svgSrc = locale === 'en' ? (s.heroSvgEn || s.heroSvg) :
                         locale === 'ru' ? (s.heroSvgRu || s.heroSvg) :
                         s.heroSvg;
          return svgSrc ? (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
              <Image
                src={getAssetPath(svgSrc)}
                alt={collectionName}
                width={480}
                height={60}
                style={{ opacity: 0.85, filter: 'brightness(0) invert(1)' }}
              />
            </div>
          ) : null;
        })()}
      </section>

      {/* Philosophy Section */}
      <section className="py-[100px] md:py-[160px] bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[26px] md:text-[34px] leading-[1.7] font-light text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
              {get('philosophyQuote1')}
              <br />
              <span className="text-[32px] md:text-[44px] text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
                {get('philosophyQuote2')}
              </span>
            </p>
          </div>
          <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />
          <WhiteSpaceText
            text={get('philosophyText')}
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
              alt={collectionName}
              fill
              className="object-cover"
              style={{
                objectPosition: s.splitImagePosition,
                transform: s.splitImageScale !== 1 ? `scale(${s.splitImageScale})` : undefined,
              }}
            />
          </div>
          <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
              <WhiteSpaceText
                text={get('splitTitle')}
                className="text-[50px] md:text-[60px] leading-[1.1] text-[#2f3237] mb-8 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
              />
              <WhiteSpaceText
                text={get('splitText1')}
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 mb-8 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              />
              <WhiteSpaceText
                text={get('splitText2')}
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              />
              <WhiteSpaceText
                text={get('darkText3')}
                className="text-[16px] md:text-[17px] leading-loose font-light text-[#2f3237]/75 whitespace-pre-line mt-8"
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
              {get('collectionTitle')}
            </h2>
            <WhiteSpaceText
              text={get('collectionSubtitle')}
              className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            />
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={product.link ? (locale === 'tr' ? product.link : getLocalizedPath('product', locale) + product.link.replace('/urun', '')) : `${getLocalizedPath('product', locale)}/${product.slug || product.id}`}
                  className="group block"
                >
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
                  <div className="pt-[20px] pb-[30px] text-center">
                    <h3 className="text-[20px] leading-[20px] text-[#2f3237] mb-[10px]" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
                      {(locale === 'en' ? product.nameEn : locale === 'ru' ? product.nameRu : null) || product.name}
                    </h3>
                    <p className="font-light text-[13px] leading-[26px] text-[#2f3237]">
                      {(locale === 'en' ? product.subtitleEn : locale === 'ru' ? product.subtitleRu : null) || product.subtitle || "Özel tasarım"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#2f3237] opacity-50" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
                {t('common.noProductsYet')}
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
            style={{
              objectPosition: s.darkBgImagePosition,
              transform: s.darkBgImageScale !== 1 ? `scale(${s.darkBgImageScale})` : undefined,
            }}
          />
          <div className="absolute inset-0 bg-[#2f3237]/90" />
        </div>
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center space-y-8">
          <p className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85" style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}>
            <Image
              src={getAssetPath("/images/han-logo.svg")}
              alt="Han"
              width={56}
              height={21}
              style={{ opacity: 0.85, display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}
            />
            {' '}{get('darkText2').replace(/^Han\s*/, '')}
            <br />
            <span className="text-[26px] md:text-[34px]" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
              {get('darkText2Cursive')}
            </span>
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-[120px] md:py-[180px] bg-[#f5f5f5]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p className="text-[60px] md:text-[80px] leading-none text-[#2f3237] mb-4" style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}>
            {get('ctaSmallTitle')}
          </p>
          <h2 className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}>
            {get('ctaTitle')}
          </h2>
          <WhiteSpaceText
            text={get('ctaSubtitle')}
            className="text-[22px] md:text-[28px] leading-[1.6] font-light text-[#2f3237]/70 mb-14 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          />
          <div className="w-[100px] h-[2px] bg-primary mx-auto mb-14" />
          <Link
            href={getLocalizedPath('appointment', locale)}
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
