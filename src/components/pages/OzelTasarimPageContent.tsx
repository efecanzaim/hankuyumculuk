"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath, routeMap } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// TR href'ini locale'e çevir: /urun/SLUG → /en/product/SLUG
function localizeHref(href: string, locale: Locale): string {
  if (!href || locale === 'tr') return href;
  const trRoutes = routeMap['tr'];
  for (const [pageId, trPath] of Object.entries(trRoutes)) {
    if (href === trPath) {
      return getLocalizedPath(pageId, locale);
    }
    if (href.startsWith(trPath + '/')) {
      const suffix = href.slice(trPath.length);
      return getLocalizedPath(pageId, locale) + suffix;
    }
  }
  return href;
}
import { getAssetPath } from "@/utils/paths";

interface OzelTasarimPageContentProps {
  locale: Locale;
}

export default function OzelTasarimPageContent({ locale }: OzelTasarimPageContentProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);
  const [galleryImages, setGalleryImages] = useState<Array<{ image: string; href: string }>>([]);
  const [sections, setSections] = useState<Record<string, unknown>>({});
  const [pageData, setPageData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/api/pages.php?slug=ozel-tasarim`)
      .then(r => r.json())
      .then(data => {
        setPageData(data || {});
        if (data?.content) {
          const parsed = JSON.parse(data.content) as Record<string, unknown>;
          setSections(parsed);
          const imgs = ((parsed?.galleryImages as unknown[]) || []).map((item: unknown) =>
            typeof item === 'string'
              ? { image: item, href: '' }
              : (item as { image: string; href: string })
          );
          if (imgs.length > 0) setGalleryImages(imgs);
        }
      })
      .catch(() => {});
  }, []);

  // DB → TR DB → dictionary fallback zinciri
  const suffix = locale === 'en' ? 'En' : locale === 'ru' ? 'Ru' : '';
  const pick = (base: string, fallback: string): string => {
    if (suffix) {
      const v = sections[`${base}${suffix}`];
      if (v && String(v).trim()) return String(v);
    }
    const tr = sections[base];
    if (tr && String(tr).trim()) return String(tr);
    return fallback;
  };
  const pickStep = (idx: number, field: 'label' | 'title' | 'desc', fallback: string): string => {
    const steps = (sections.steps as Array<Record<string, string>>) || [];
    const step = steps[idx] || {};
    if (suffix && step[`${field}${suffix}`]?.trim()) return step[`${field}${suffix}`];
    if (step[field]?.trim()) return step[field];
    return fallback;
  };
  const heroImage = (pageData.heroImage as string) || "/images/categories/ozel-tasarim-card.jpg";
  const darkBgImage = (sections.darkBgImage as string) || "/images/parallax-bg.jpg";
  const splitImage = (sections.splitImage as string) || "/images/trend-left.jpg";

  // Lokalize metinler
  const txt = {
    heroSubtitle: pick('heroSubtitle', t('customDesign.brand')),
    heroTitle: pick('heroTitle', t('customDesign.title')),
    heroDesc: pick('heroDesc', t('customDesign.heroSubtitle')),
    // philosophyTitle dictionary'de tek string, virgülle bölünüyor; admin'de 2 ayrı satır var
    philosophyQuote1: pick('philosophyQuote1', t('customDesign.philosophyTitle').split(',')[0]),
    philosophyQuote2: pick('philosophyQuote2', t('customDesign.philosophyTitle').split(',').slice(1).join(',').trim()),
    philosophyText: pick('philosophyText', t('customDesign.philosophyDesc')),
    splitTitle: pick('splitTitle', t('customDesign.processIntro1')),
    splitText1: pick('splitText1', t('customDesign.processIntro2')),
    splitText2: pick('splitText2', t('customDesign.processIntro3')),
    processTitle: pick('processTitle', t('customDesign.freedomTitle')),
    processSubtitle: pick('processSubtitle', t('customDesign.freedomDesc')),
    darkTitle: pick('darkTitle', t('customDesign.darkTitle')),
    darkText1: pick('darkText1', t('customDesign.darkDesc1')),
    darkText2: pick('darkText2', t('customDesign.darkDesc2')),
    ctaTitle1: pick('ctaTitle1', t('customDesign.ctaTitle')),
    ctaTitle2: pick('ctaTitle2', t('customDesign.ctaSubtitle')),
    ctaDesc: pick('ctaDesc', t('customDesign.ctaDesc')),
    ctaButtonText: pick('ctaButtonText', t('common.makeAppointment')),
    step1Label: pickStep(0, 'label', t('customDesign.step1Title')),
    step1Title: pickStep(0, 'title', t('customDesign.step1Name')),
    step1Desc: pickStep(0, 'desc', t('customDesign.step1Desc')),
    step2Label: pickStep(1, 'label', t('customDesign.step2Title')),
    step2Title: pickStep(1, 'title', t('customDesign.step2Name')),
    step2Desc: pickStep(1, 'desc', t('customDesign.step2Desc')),
    step3Label: pickStep(2, 'label', t('customDesign.step3Title')),
    step3Title: pickStep(2, 'title', t('customDesign.step3Name')),
    step3Desc: pickStep(2, 'desc', t('customDesign.step3Desc')),
    step4Label: pickStep(3, 'label', t('customDesign.step4Title')),
    step4Title: pickStep(3, 'title', t('customDesign.step4Name')),
    step4Desc: pickStep(3, 'desc', t('customDesign.step4Desc')),
  };
  const ctaButtonLink = (sections.ctaButtonLink as string) || `${getLocalizedPath('appointment', locale)}?subject=size-ozel`;

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

      <div className="bg-white">
        {/* Hero Section - Full Height with Elegant Typography */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
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

          {/* Hero Content */}
          <div className="relative z-10 text-center px-6 max-w-[1000px] mx-auto">
            <p
              className="text-[14px] md:text-[16px] tracking-[0.4em] text-white/60 mb-6 uppercase"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {txt.heroSubtitle}
            </p>
            <h1
              className="text-[50px] md:text-[80px] lg:text-[100px] leading-[1.05] text-white mb-10"
              style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
            >
              {txt.heroTitle}
            </h1>

            {/* Decorative Line */}
            <div className="w-[80px] h-px bg-primary mx-auto mb-10" />

            <p
              className="text-[18px] md:text-[22px] leading-[1.8] text-white/85 font-light max-w-[700px] mx-auto"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {txt.heroDesc}
            </p>
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
                {txt.philosophyQuote1}<br />
                <span
                  className="text-[24px] md:text-[32px] text-[#2f3237]"
                  style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
                >
                  {txt.philosophyQuote2}
                </span>
              </p>
            </div>

            <div className="w-[120px] h-[2px] bg-primary mx-auto mb-16" />

            <p
              className="text-[17px] md:text-[19px] leading-loose font-light text-[#2f3237]/75 text-center max-w-[750px] mx-auto whitespace-pre-line"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {txt.philosophyText}
            </p>
          </div>
        </section>

        {/* Image + Text Split Section */}
        <section className="relative">
          <div className="flex flex-col lg:flex-row min-h-[700px]">
            {/* Left - Image */}
            <div className="lg:w-1/2 relative h-[450px] lg:h-auto">
              <Image
                src={getAssetPath(splitImage)}
                alt={txt.splitTitle}
                fill
                className="object-cover"
              />
            </div>

            {/* Right - Content */}
            <div className="lg:w-1/2 bg-[#f5f5f5] flex items-center">
              <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-0 max-w-[550px] mx-auto lg:mx-0">
                <p
                  className="text-[32px] md:text-[40px] leading-[1.1] text-[#2f3237] mb-8 whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-bw-modelica), cursive' }}
                >
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

        {/* Process Section */}
        <section className="py-[100px] md:py-[160px] bg-white">
          <div className="max-w-[1300px] mx-auto px-6">
            {/* Section Title */}
            <div className="text-center mb-12 md:mb-20">
              <h2
                className="text-[40px] md:text-[56px] leading-[1.15] text-[#2f3237] mb-8"
                style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
              >
                {txt.processTitle}
              </h2>
              <p
                className="text-[18px] md:text-[20px] leading-[1.7] font-light text-[#2f3237]/70"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                {txt.processSubtitle}
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
                    {txt.step1Label}
                  </h3>
                  <h4
                    className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    {txt.step1Title}
                  </h4>
                  <p
                    className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70 whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                  >
                    {txt.step1Desc}
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
                    {txt.step2Label}
                  </h3>
                  <h4
                    className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    {txt.step2Title}
                  </h4>
                  <p
                    className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70 whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                  >
                    {txt.step2Desc}
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
                    {txt.step3Label}
                  </h3>
                  <h4
                    className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    {txt.step3Title}
                  </h4>
                  <p
                    className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70 whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                  >
                    {txt.step3Desc}
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
                    {txt.step4Label}
                  </h3>
                  <h4
                    className="text-[28px] md:text-[32px] text-[#2f3237] mb-5"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    {txt.step4Title}
                  </h4>
                  <p
                    className="text-[16px] leading-[1.9] font-light text-[#2f3237]/70 whitespace-pre-line"
                    style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                  >
                    {txt.step4Desc}
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
              src={getAssetPath(darkBgImage)}
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
              {txt.darkTitle}
            </h2>

            <p
              className="text-[20px] md:text-[26px] leading-[1.8] font-light text-white/85 mb-10 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {txt.darkText1}
            </p>

            <div className="w-[80px] h-px bg-primary mx-auto my-12" />

            <p
              className="text-[17px] md:text-[18px] leading-loose font-light text-white/60 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {txt.darkText2}
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
              {txt.ctaTitle1}
            </p>

            <h2
              className="text-[28px] md:text-[40px] leading-[1.4] text-[#2f3237] mb-6"
              style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
            >
              {txt.ctaTitle2}
            </h2>

            <p
              className="text-[22px] md:text-[28px] leading-[1.6] font-light text-[#2f3237]/70 mb-14 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {txt.ctaDesc}
            </p>

            {/* Decorative Line */}
            <div className="w-[100px] h-[2px] bg-primary mx-auto mb-14" />

            {/* CTA Button */}
            <Link
              href={ctaButtonLink}
              className="inline-flex items-center justify-center bg-[#2f3237] text-light text-[14px] tracking-[0.15em] font-light px-14 py-5 hover:bg-[#1a1c1f] transition-all duration-300 group"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {txt.ctaButtonText}
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
        {(() => {
          const defaultImgs = ["/images/products/product-1.jpg", "/images/products/product-2.jpg", "/images/products/product-3.jpg"];
          const gallery = [0, 1, 2].map((i) => {
            const item = galleryImages[i];
            return {
              image: item?.image || defaultImgs[i],
              href: item?.href ? localizeHref(item.href, locale) : "",
            };
          });
          return (
            <section className="bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[550px]">
                {gallery.map((item, i) => {
                  const inner = (
                    <>
                      <Image
                        src={getAssetPath(item.image)}
                        alt={`${txt.heroTitle} ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </>
                  );
                  return item.href ? (
                    <Link key={i} href={item.href} className="relative h-[350px] md:h-full overflow-hidden group block">
                      {inner}
                    </Link>
                  ) : (
                    <div key={i} className="relative h-[350px] md:h-full overflow-hidden group">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })()}
      </div>

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
