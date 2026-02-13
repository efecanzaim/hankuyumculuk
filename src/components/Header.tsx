"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { getAssetPath } from "@/utils/paths";
import { Instagram, X } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface HeaderProps {
  logo: string;
  logoAlt: string;
  mainNav: { text: string; href: string }[];
  isHero?: boolean;
  isTransparent?: boolean;
  isBlogPage?: boolean;
  bannerText?: string;
  bannerVisible?: boolean;
}

export default function Header({ logo, logoAlt, mainNav, isTransparent = false, isBlogPage = false, bannerText, bannerVisible = true }: HeaderProps) {
  const locale = useLocale();
  const t = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topBannerVisible, setTopBannerVisible] = useState(bannerVisible);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  const lp = (pageId: string) => getLocalizedPath(pageId, locale);

  useEffect(() => {
    if (activeMenu || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeMenu, mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeTopBanner = useCallback(() => {
    setTopBannerVisible(false);
  }, []);

  return (
    <>
      {/* Top Banner */}
      {topBannerVisible && !isBlogPage && bannerText && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-primary w-full h-[50px] flex items-center justify-center px-6">
          <p className="text-[12px] md:text-[15px] text-[#2f3237] text-center font-normal leading-[13px] md:leading-normal">
          {bannerText}
          </p>
          <button
            onClick={closeTopBanner}
            className="absolute right-6 text-[#2f3237] hover:opacity-70 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className={`${isBlogPage ? 'relative' : 'absolute'} left-0 right-0 z-50 ${isBlogPage ? 'bg-[#f5f5f5]' : isTransparent ? 'bg-transparent' : 'bg-white'} transition-all duration-300 ${!isBlogPage && topBannerVisible && bannerText ? 'top-[50px]' : isBlogPage ? '' : 'top-0'}`}>
        {/* Desktop Header */}
        <div className="hidden lg:block">
          {/* Top Row - Logo and Side Links */}
          <div className={`py-4 ${isTransparent && !activeMenu ? 'bg-transparent' : isBlogPage ? 'bg-[#f5f5f5]' : 'bg-white'}`}>
            <div className="container mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between">
                {/* Left Side Links - Fixed Width */}
                <div className="flex items-center gap-4 w-[240px]">
                  <Image
                    src={getAssetPath("/images/shape.svg")}
                    alt=""
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px] shrink-0"
                    style={isTransparent && !activeMenu ? {} : { filter: 'brightness(0) saturate(100%)' }}
                  />
                  <Link
                    href={lp('appointment')}
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    {t('header.appointment')}
                  </Link>
                </div>

                {/* Center - Logo with Lines */}
                <div className="flex items-center gap-6 justify-center flex-1">
                  <div className={`flex-1 h-px ${isTransparent && !activeMenu ? 'bg-white opacity-50' : 'bg-primary'}`} />
                  <Link href={lp('home')} className="block shrink-0">
                    <Image
                      src={getAssetPath("/images/han-logo.svg")}
                      alt="Han Logo"
                      width={110}
                      height={41}
                      className="h-[41px] w-auto"
                      style={isTransparent && !activeMenu ? {} : { filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(412%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
                    />
                  </Link>
                  <div className={`flex-1 h-px ${isTransparent && !activeMenu ? 'bg-white opacity-50' : 'bg-primary'}`} />
                </div>

                {/* Right Side Links - Fixed Width */}
                <div className="flex items-center gap-4 justify-end w-[240px]">
                  <Link
                    href={lp('about')}
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    {t('header.corporate')}
                  </Link>
                  <Link
                    href={lp('contact')}
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    {t('header.contact')}
                  </Link>
                  <Link
                    href={lp('blog')}
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    {t('header.blog')}
                  </Link>
                  <LanguageSwitcher
                    currentLocale={locale}
                    textClassName={`text-[11px] font-normal whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  />
                  <Link
                    href="https://www.instagram.com/gozumunnuru.antalya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:opacity-70 transition-opacity shrink-0 ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    <Instagram size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Row */}
          <div className={`pb-4 ${isTransparent && !activeMenu ? 'bg-transparent' : isBlogPage ? 'bg-[#f5f5f5]' : 'bg-white'}`}>
            <div className="flex items-center justify-center gap-12">

            {/* MÜCEVHER Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('mucevher')}
            >
              <span
                className={`text-[13px] font-normal hover:opacity-70 transition-opacity cursor-default ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
              >
                {t('header.nav.jewelry')}
              </span>
              {activeMenu === 'mucevher' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[41px] w-[123px] h-[2px] bg-[#2f3237]" />
              )}
            </div>

            {/* KOLEKSİYON Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('koleksiyon')}
            >
              <span
                className={`text-[13px] font-normal hover:opacity-70 transition-opacity cursor-default ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
              >
                {t('header.nav.collection')}
              </span>
              {activeMenu === 'koleksiyon' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[41px] w-[123px] h-[2px] bg-[#2f3237]" />
              )}
            </div>

            <Link
              href={lp('preloved')}
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
            >
              {t('header.nav.preloved')}
            </Link>

            <Link
              href={lp('custom-design')}
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
            >
              {t('header.nav.custom')}
            </Link>

            <Link
              href={lp('gifts')}
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
            >
              {t('header.nav.gifts')}
            </Link>

            {/* ERKEKLERE ÖZEL Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('erkek')}
            >
              <span
                className={`text-[13px] font-normal hover:opacity-70 transition-opacity cursor-default ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
              >
                {t('header.nav.men')}
              </span>
              {activeMenu === 'erkek' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[41px] w-[123px] h-[2px] bg-[#2f3237]" />
              )}
            </div>

            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className={`lg:hidden ${isTransparent ? 'bg-transparent' : 'bg-white'}`}>
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={toggleMobileMenu}
              className={`w-[30px] ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <svg className="w-[21px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 21 15">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M0 1h21M0 7.5h21M0 14h21" />
                </svg>
              )}
            </button>

            <div className="flex items-center gap-4 flex-1 justify-center">
              <div className={`w-[76px] h-px ${isTransparent ? 'bg-white/50' : 'bg-primary'}`} />
              <Link href={lp('home')} className="block">
                <Image
                  src={getAssetPath("/images/han-logo.svg")}
                  alt="Han Logo"
                  width={76}
                  height={28}
                  className="h-[28px] w-auto"
                  style={isTransparent ? {} : { filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(412%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
                />
              </Link>
              <div className={`w-[76px] h-px ${isTransparent ? 'bg-white/50' : 'bg-primary'}`} />
            </div>

            <Link
              href="https://www.instagram.com/gozumunnuru.antalya"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-[30px] flex justify-end ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
            >
              <Instagram size={18} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu - Full Screen */}
        <div
          className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`absolute inset-0 bg-white transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-4 py-5">
              <button onClick={toggleMobileMenu} className="text-[#2f3237] w-[30px]">
                <svg className="w-[21px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 21 15">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M0 1h21M0 7.5h21M0 14h21" />
                </svg>
              </button>

              <div className="flex items-center gap-4 flex-1 justify-center">
                <div className="w-[76px] h-px bg-primary" />
                <Link href={lp('home')} onClick={toggleMobileMenu}>
                  <Image
                    src={getAssetPath("/images/han-logo.svg")}
                    alt="Han Logo"
                    width={76}
                    height={28}
                    className="h-[28px] w-auto"
                    style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(412%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
                  />
                </Link>
                <div className="w-[76px] h-px bg-primary" />
              </div>

              <Link
                href="https://www.instagram.com/gozumunnuru.antalya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2f3237] w-[30px] flex justify-end"
              >
                <Instagram size={18} />
              </Link>
            </div>

            {/* Menu Content */}
            <div className="overflow-y-auto h-[calc(100%-80px)] flex flex-col">
              <nav className="flex-1 px-6 pt-6">
                {/* MÜCEVHER Dropdown */}
                <div className="mb-2">
                  <button
                    onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'mucevher' ? null : 'mucevher')}
                    className="flex items-center justify-between w-full py-2 text-[18px] font-bold text-[#5b5b5b]"
                  >
                    <span className="flex-1 text-center">{t('header.nav.jewelry')}</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${mobileActiveDropdown === 'mucevher' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${mobileActiveDropdown === 'mucevher' ? 'max-h-[300px]' : 'max-h-0'}`}>
                    <div className="flex flex-col items-center py-2">
                      <Link href={lp('jewelry/rings')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.ring')}</Link>
                      <Link href={lp('jewelry/necklaces')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.necklace')}</Link>
                      <Link href={lp('jewelry/bracelets')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.bracelet')}</Link>
                      <Link href={lp('jewelry/earrings')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.earring')}</Link>
                      <Link href={lp('jewelry/sets')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.set')}</Link>
                    </div>
                  </div>
                </div>

                {/* KOLEKSİYON Dropdown */}
                <div className="mb-2">
                  <button
                    onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'koleksiyon' ? null : 'koleksiyon')}
                    className="flex items-center justify-between w-full py-2 text-[18px] font-bold text-[#5b5b5b]"
                  >
                    <span className="flex-1 text-center">{t('header.nav.collection')}</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${mobileActiveDropdown === 'koleksiyon' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${mobileActiveDropdown === 'koleksiyon' ? 'max-h-[300px]' : 'max-h-0'}`}>
                    <div className="flex flex-col items-center py-2">
                      <Link href={lp('collection/light-of-my-eyes')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.lightOfMyEyes')}</Link>
                    </div>
                  </div>
                </div>

                {/* PRELOVED */}
                <div className="mb-2">
                  <Link href={lp('preloved')} onClick={toggleMobileMenu} className="flex items-center justify-center w-full py-2 text-[18px] font-bold text-[#5b5b5b]">
                    <span className="flex-1 text-center">{t('header.nav.preloved')}</span>
                  </Link>
                </div>

                {/* SİZE ÖZEL */}
                <div className="mb-2">
                  <Link href={lp('custom-design')} onClick={toggleMobileMenu} className="flex items-center justify-center w-full py-2 text-[18px] font-bold text-[#5b5b5b]">
                    <span className="flex-1 text-center">{t('header.nav.custom')}</span>
                  </Link>
                </div>

                {/* HEDİYE */}
                <div className="mb-2">
                  <Link href={lp('gifts')} onClick={toggleMobileMenu} className="flex items-center justify-center w-full py-2 text-[18px] font-bold text-[#5b5b5b]">
                    <span className="flex-1 text-center">{t('header.nav.gifts')}</span>
                  </Link>
                </div>

                {/* ERKEKLERE ÖZEL Dropdown */}
                <div className="mb-2">
                  <button
                    onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'erkek' ? null : 'erkek')}
                    className="flex items-center justify-between w-full py-2 text-[18px] font-bold text-[#5b5b5b]"
                  >
                    <span className="flex-1 text-center">{t('header.nav.men')}</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${mobileActiveDropdown === 'erkek' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${mobileActiveDropdown === 'erkek' ? 'max-h-[300px]' : 'max-h-0'}`}>
                    <div className="flex flex-col items-center py-2">
                      <Link href={lp('men/prayer-beads')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.prayerBeads')}</Link>
                      <Link href={lp('men/bracelets')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.bracelet')}</Link>
                      <Link href={lp('men/rings')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.ring')}</Link>
                      <Link href={lp('men/cuff')} className="py-2 text-[18px] text-[#5b5b5b] leading-[45px]" onClick={toggleMobileMenu}>{t('header.submenu.cuff')}</Link>
                    </div>
                  </div>
                </div>

                {/* Reservation Button */}
                <div className="text-center mt-8">
                  <Link
                    href={lp('appointment')}
                    className="inline-flex items-center justify-center gap-2 bg-[#2f3237] text-white h-[50px] w-[248px] text-[11px]"
                    onClick={toggleMobileMenu}
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 0L9.18 5.18L14.5 5.5L10.5 8.82L11.82 14.5L7.5 11.18L3.18 14.5L4.5 8.82L0.5 5.5L5.82 5.18L7.5 0Z" fill="white"/>
                    </svg>
                    {t('header.reservation')}
                  </Link>
                </div>

                {/* Secondary Links */}
                <div className="flex items-center justify-center gap-6 mt-10 text-[13px] text-[#5b5b5b]">
                  <Link href={lp('about')} onClick={toggleMobileMenu}>{t('header.corporate')}</Link>
                  <Link href={lp('contact')} onClick={toggleMobileMenu}>{t('header.contact')}</Link>
                  <Link href={lp('blog')} onClick={toggleMobileMenu}>{t('header.blog')}</Link>
                  <LanguageSwitcher currentLocale={locale} textClassName="text-[13px] text-[#5b5b5b]" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Global Dropdown Menus */}
      {activeMenu && (
        <div
          className="fixed left-0 right-0 z-40 h-[60vh] overflow-y-auto"
          style={{ top: topBannerVisible ? '141px' : '91px' }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
            <Image
              src={getAssetPath(
                activeMenu === 'mucevher' ? "/images/mucevher-menu-bg.jpg" :
                activeMenu === 'koleksiyon' ? "/images/collection-menu-bg.jpg" :
                activeMenu === 'hediye' ? "/images/hediye-menu-bg.jpg" :
                "/images/erkek-menu-bg.jpg"
              )}
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[rgba(47,50,55,0.5)] to-[rgba(47,50,55,0)]" />
          </div>

          <div className="absolute left-0 top-0 w-full h-full bg-white pointer-events-none" />

          <div className="relative max-w-[1728px] mx-auto h-full pointer-events-auto flex items-center">
            <div className="w-1/2 pl-[269px]">
              {/* MÜCEVHER Menu */}
              {activeMenu === 'mucevher' && (
                <div className="text-[21px] text-[#2f3237] font-light leading-[51px]">
                  <Link href={lp('jewelry/rings')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.ring')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href={lp('jewelry/necklaces')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.necklace')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href={lp('jewelry/bracelets')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.bracelet')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href={lp('jewelry/earrings')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.earring')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href={lp('jewelry/sets')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.set')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              )}

              {/* KOLEKSİYON Menu */}
              {activeMenu === 'koleksiyon' && (
                <div className="text-[21px] text-[#2f3237] font-light leading-[51px]">
                  <Link href={lp('collection/light-of-my-eyes')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.lightOfMyEyes')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              )}

              {/* ERKEKLERE ÖZEL Menu */}
              {activeMenu === 'erkek' && (
                <div className="text-[21px] text-[#2f3237] font-light leading-[51px]">
                  <Link href={lp('men/prayer-beads')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.prayerBeads')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href={lp('men/bracelets')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.bracelet')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href={lp('men/rings')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.ring')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href={lp('men/cuff')} className="group flex items-center gap-4 hover:font-bold transition-all">
                    {t('header.submenu.cuff')}
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right Image */}
            <div className="hidden lg:block absolute right-0 top-0 w-[50%] h-full">
              <Image
                src={getAssetPath(
                  activeMenu === 'mucevher' ? "/images/mucevher-menu-hero.jpg" :
                  activeMenu === 'koleksiyon' ? "/images/collection-menu-hero.jpg" :
                  activeMenu === 'hediye' ? "/images/hediye-menu-hero.jpg" :
                  "/images/erkek-menu-hero.jpg"
                )}
                alt="Menu Hero"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
