"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
import { useLocale } from "@/i18n/LocaleContext";
import useContent from "@/hooks/useContent";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function renderWithLogo(text: string | undefined, logoHeight: number = 18) {
  if (!text) return text;
  const logoWidth = Math.round(logoHeight * (110 / 41));
  const parts = text.split(/Han[\s\u00A0]+Kuyumculuk/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <Image
          src={getAssetPath("/images/han-logo.svg")}
          alt="Han Kuyumculuk"
          width={logoWidth}
          height={logoHeight}
          style={{ filter: 'brightness(0)', display: 'inline', verticalAlign: 'middle', margin: '0 3px' }}
        />
      )}
    </span>
  ));
}

interface FooterColumn {
  title: string;
  links: { text: string; href: string }[];
}

interface FooterProps {
  logo: string;
  slogan: string;
  description?: string;
  columns: FooterColumn[];
  copyright: string;
  socialLinks?: { instagram?: string };
}

export default function Footer({ logo, slogan, description, columns, copyright, socialLinks }: FooterProps) {
  const locale = useLocale();
  const content = useContent(locale);

  const defaultSloganSvg = locale === 'en'
    ? '/footer-slogan-en.svg'
    : locale === 'ru'
      ? '/footer-slogan-ru.svg'
      : '/footer-slogan.svg';

  const [sloganSvg, setSloganSvg] = useState(defaultSloganSvg);
  const [collectionCats, setCollectionCats] = useState<Array<{ id: number; name: string; slug: string; content?: string }>>([]);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/api/categories.php?parentType=koleksiyon&_t=${Date.now()}`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .then((data: Array<{ id: number; name: string; slug: string; content?: string }>) => {
        setCollectionCats(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Önce useContent'ten kontrol et
    const fromContent = (content.footer as Record<string, unknown>)?.sloganSvg as string;
    if (fromContent) {
      setSloganSvg(fromContent);
      return;
    }
    // Doğrudan API'den çek
    if (API_URL) {
      const langParam = locale !== 'tr' ? `?locale=${locale}` : '';
      fetch(`${API_URL}/api/content.php${langParam}`)
        .then(r => r.json())
        .then(data => {
          const svg = data?.footer?.sloganSvg;
          if (svg) setSloganSvg(svg);
        })
        .catch(() => {});
    }
  }, [content, locale]);

  return (
    <>
      {/* Separator Line with Logo - Outside footer */}
      <div className="relative bg-white">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8 py-8">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-primary" />
            <div className="px-8">
              {/* Han Logo - #2F3237 color */}
              <Image
                src={getAssetPath("/images/han-logo.svg")}
                alt="Han Logo"
                width={110}
                height={41}
                className="mx-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(412%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
              />
            </div>
            <div className="flex-1 h-px bg-primary" />
            {/* Instagram Icon - Right next to the line */}
            {socialLinks?.instagram && (
              <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="ml-4">
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10C12.2386 10 10 12.2386 10 15C10 17.7614 12.2386 20 15 20C17.7614 20 20 17.7614 20 15C20 12.2386 17.7614 10 15 10ZM15 18.125C13.2759 18.125 11.875 16.7241 11.875 15C11.875 13.2759 13.2759 11.875 15 11.875C16.7241 11.875 18.125 13.2759 18.125 15C18.125 16.7241 16.7241 18.125 15 18.125ZM21.1875 9.78125C21.1875 10.4062 20.6875 10.9062 20.0625 10.9062C19.4375 10.9062 18.9375 10.4062 18.9375 9.78125C18.9375 9.15625 19.4375 8.65625 20.0625 8.65625C20.6875 8.65625 21.1875 9.15625 21.1875 9.78125ZM24.9062 10.9062C24.8437 9.5 24.5312 8.25 23.5 7.21875C22.4687 6.1875 21.2187 5.875 19.8125 5.8125C18.375 5.71875 11.625 5.71875 10.1875 5.8125C8.78125 5.875 7.53125 6.1875 6.5 7.21875C5.46875 8.25 5.15625 9.5 5.09375 10.9062C5 12.3437 5 19.0937 5.09375 20.5312C5.15625 21.9375 5.46875 23.1875 6.5 24.2187C7.53125 25.25 8.78125 25.5625 10.1875 25.625C11.625 25.7187 18.375 25.7187 19.8125 25.625C21.2187 25.5625 22.4687 25.25 23.5 24.2187C24.5312 23.1875 24.8437 21.9375 24.9062 20.5312C25 19.0937 25 12.3437 24.9062 10.9062ZM22.9687 22.0625C22.6562 22.9062 22 23.5625 21.1562 23.875C20 24.2187 17.5937 24.125 15 24.125C12.4062 24.125 10 24.2187 8.84375 23.875C8 23.5625 7.34375 22.9062 7.03125 22.0625C6.6875 20.9062 6.78125 18.5 6.78125 15.9062C6.78125 13.3125 6.6875 10.9062 7.03125 9.75C7.34375 8.90625 8 8.25 8.84375 7.9375C10 7.59375 12.4062 7.6875 15 7.6875C17.5937 7.6875 20 7.59375 21.1562 7.9375C22 8.25 22.6562 8.90625 22.9687 9.75C23.3125 10.9062 23.2187 13.3125 23.2187 15.9062C23.2187 18.5 23.3125 20.9062 22.9687 22.0625Z" fill="#2F3237"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-primary overflow-hidden">
        {/* Decorative Stripes - Background, positioned from columns section */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse pointer-events-none" style={{ top: '280px' }}>
          {/* Stripe 1 (bottom) - Most opaque */}
          <div className="h-[26px] bg-dark/20 shrink-0" />
          {/* Gap */}
          <div className="h-[21px] shrink-0" />
          {/* Stripe 2 */}
          <div className="h-[26px] bg-dark/15 shrink-0" />
          {/* Gap */}
          <div className="h-[25px] shrink-0" />
          {/* Stripe 3 */}
          <div className="h-[23px] bg-dark/10 shrink-0" />
          {/* Gap */}
          <div className="h-[27px] shrink-0" />
          {/* Stripe 4 */}
          <div className="h-[22px] bg-dark/6 shrink-0" />
          {/* Gap */}
          <div className="h-[25px] shrink-0" />
          {/* Stripe 5 (top) - Most transparent */}
          <div className="h-[23px] bg-dark/3 shrink-0" />
          {/* Remaining space fills with primary color */}
          <div className="flex-1" />
        </div>

        <div className="relative z-10 max-w-[1430px] mx-auto px-4 md:px-8 pt-[60px] md:pt-[100px]">
          {/* Slogan */}
          <div className="text-center mt-[20px] md:mt-[10px]">
            <Image
              src={getAssetPath(sloganSvg)}
              alt={slogan}
              width={600}
              height={90}
              className="inline-block"
            />
          </div>

          {/* Footer Columns */}
          {(() => {
            const collectionBasePath = locale === 'en' ? '/en/collection' : locale === 'ru' ? '/ru/kollektsiya' : '/koleksiyon';

            const getHeroTitleImage = (content?: string): string | null => {
              try {
                if (!content) return null;
                const parsed = typeof content === 'string' ? JSON.parse(content) : content;
                const p = parsed as Record<string, unknown>;
                return (p?.footerTitleImage as string) || (p?.heroTitleImage as string) || null;
              } catch { return null; }
            };

            const enhancedColumns = columns.map(col => {
              const isCollectionCol = col.links.some(l =>
                l.href.includes('/koleksiyon') || l.href.includes('/collection') || l.href.includes('/kollektsiya')
              );
              if (isCollectionCol && collectionCats.length > 0) {
                return { ...col, _isDynamic: true };
              }
              return { ...col, _isDynamic: false };
            });

            return (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-16 mt-[50px] md:mt-[100px] max-w-[900px] mx-auto px-4 md:px-6">
                {enhancedColumns.map((column, index) => (
                  <div key={index} className="text-center">
                    <h3 className="font-bold text-[13px] leading-[normal] text-[#2f3237] mb-[12px] md:mb-[16px]">
                      {column.title}
                    </h3>
                    <ul className="space-y-[8px] md:space-y-[10px]">
                      {column._isDynamic ? (
                        collectionCats.map(cat => {
                          const href = cat.slug === 'gozumun-nuru'
                            ? `${collectionBasePath}/gozumun-nuru`
                            : `${collectionBasePath}/${cat.slug}`;
                          const heroTitleImg = getHeroTitleImage(cat.content);
                          const isGozumun = cat.slug === 'gozumun-nuru';
                          return (
                            <li key={cat.id}>
                              <Link href={href} className="inline-flex items-center justify-center hover:opacity-70 transition-opacity">
                                {heroTitleImg ? (
                                  <Image
                                    src={getAssetPath(heroTitleImg)}
                                    alt={cat.name}
                                    width={160}
                                    height={22}
                                    className="h-[22px] w-auto object-contain"
                                  />
                                ) : (
                                  <span
                                    className={`font-normal text-[13px] leading-[26px] text-[#2f3237] ${isGozumun ? 'lowercase' : ''}`}
                                    style={isGozumun ? { fontFamily: 'Buljirya, cursive' } : { fontFamily: 'var(--font-faculty-glyphic), serif' }}
                                  >
                                    {cat.name}
                                  </span>
                                )}
                              </Link>
                            </li>
                          );
                        })
                      ) : (
                        column.links.map((link, linkIndex) => {
                          const isGozumun = link.href.includes('gozumun-nuru') || link.href.includes('light-of-my-eyes') || link.href.includes('svet-moikh-glaz');
                          return (
                            <li key={linkIndex}>
                              <Link
                                href={link.href}
                                className={`font-normal text-[13px] leading-[26px] text-[#2f3237] hover:opacity-70 transition-opacity ${isGozumun ? 'lowercase' : ''}`}
                                style={isGozumun ? { fontFamily: 'Buljirya, cursive' } : undefined}
                              >
                                {isGozumun ? 'Gözümün Nuru' : link.text}
                              </Link>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })()}


          {/* Copyright */}
          <div className="text-center mt-[40px] md:mt-[60px] pb-[30px] md:pb-[40px]">
            <p className="font-normal text-[10px] leading-[normal] text-[#2f3237]">
              {renderWithLogo(copyright, 9)}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
