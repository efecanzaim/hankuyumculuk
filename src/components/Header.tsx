"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { getAssetPath } from "@/utils/paths";
import { Instagram, X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topBannerVisible, setTopBannerVisible] = useState(bannerVisible);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    if (activeMenu || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMenu, mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeTopBanner = useCallback(() => {
    setTopBannerVisible(false);
  }, []);

  return (
    <>
      {/* Top Banner - Pudra color with black text - Hidden on blog page */}
      {topBannerVisible && !isBlogPage && bannerText && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-primary w-full h-[50px] flex items-center justify-center px-6">
          <p className="text-[15px] text-[#2f3237] text-center font-normal leading-normal">
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
                    href="/randevu"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    RANDEVU OLUŞTURUN
                  </Link>
                </div>

                {/* Center - Logo with Lines - Takes Remaining Space */}
                <div className="flex items-center gap-6 justify-center flex-1">
                  <div className={`flex-1 h-px ${isTransparent && !activeMenu ? 'bg-white opacity-50' : 'bg-primary'}`} />
                  <Link href="/" className="block shrink-0">
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
                    href="/hakkimizda"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    Kurumsal
                  </Link>
                  <Link
                    href="/iletisim"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    İletişim
                  </Link>
                  <Link
                    href="/blog"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    Blog
                  </Link>
                  <button className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}>
                    EN
                  </button>
                  <Link
                    href="https://www.instagram.com/gozumunnuruantalya"
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
                MÜCEVHER
              </span>
              {/* Active Menu Underline */}
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
                KOLEKSİYON
              </span>
              {/* Active Menu Underline */}
              {activeMenu === 'koleksiyon' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[41px] w-[123px] h-[2px] bg-[#2f3237]" />
              )}
            </div>

            <Link
              href="/preloved"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
            >
              PRELOVED
            </Link>

            <Link
              href="/ozel-tasarim"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
            >
              SİZE ÖZEL
            </Link>

            <Link
              href="/hediye"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
            >
              HEDİYE
            </Link>

            {/* ERKEKLERE ÖZEL Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('erkek')}
            >
              <span
                className={`text-[13px] font-normal hover:opacity-70 transition-opacity cursor-default ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
              >
                ERKEKLERE ÖZEL
              </span>
              {/* Active Menu Underline */}
              {activeMenu === 'erkek' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[41px] w-[123px] h-[2px] bg-[#2f3237]" />
              )}
            </div>

            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className={`lg:hidden ${isTransparent ? 'bg-transparent' : 'bg-white'}`}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className={isTransparent ? 'text-white' : 'text-[#2f3237]'}
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <svg className="w-[30px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 30 19">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M0 1h30M0 9.5h30M0 18h30" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src={getAssetPath("/images/han-logo.svg")}
                alt="Han Logo"
                width={80}
                height={30}
                className="h-[30px] w-auto"
                style={isTransparent ? {} : { filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(412%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
              />
            </Link>

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/gozumunnuruantalya"
              target="_blank"
              rel="noopener noreferrer"
              className={isTransparent ? 'text-white' : 'text-[#2f3237]'}
            >
              <Instagram size={20} />
            </Link>
          </div>

        </div>

        {/* Mobile Menu - Slide from left */}
        <div
          className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={toggleMobileMenu}
          />

          {/* Menu Panel */}
          <div
            className={`absolute top-0 left-0 h-full w-full bg-white transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <Link href="/" onClick={toggleMobileMenu}>
                <Image
                  src={getAssetPath("/images/han-logo.svg")}
                  alt="Han Logo"
                  width={80}
                  height={30}
                  className="h-[28px] w-auto"
                  style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(412%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
                />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="text-[#2f3237] p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="overflow-y-auto h-[calc(100%-70px)]">
              <nav className="px-6 py-4">
                {/* MÜCEVHER Dropdown */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'mucevher' ? null : 'mucevher')}
                    className="flex items-center justify-between w-full py-4 text-[15px] font-medium text-[#2f3237]"
                  >
                    MÜCEVHER
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${mobileActiveDropdown === 'mucevher' ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${mobileActiveDropdown === 'mucevher' ? 'max-h-[300px]' : 'max-h-0'}`}>
                    <div className="pb-4 pl-4 flex flex-col gap-3">
                      <Link href="/mucevher/yuzuk" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Yüzük</Link>
                      <Link href="/mucevher/kolye" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Kolye</Link>
                      <Link href="/mucevher/bileklik" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Bileklik</Link>
                      <Link href="/mucevher/kupe" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Küpe</Link>
                      <Link href="/mucevher/set" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Set</Link>
                    </div>
                  </div>
                </div>

                {/* KOLEKSİYON Dropdown */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'koleksiyon' ? null : 'koleksiyon')}
                    className="flex items-center justify-between w-full py-4 text-[15px] font-medium text-[#2f3237]"
                  >
                    KOLEKSİYON
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${mobileActiveDropdown === 'koleksiyon' ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${mobileActiveDropdown === 'koleksiyon' ? 'max-h-[300px]' : 'max-h-0'}`}>
                    <div className="pb-4 pl-4 flex flex-col gap-3">
                      <Link href="/koleksiyon/gozumun-nuru" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Gözümün Nuru</Link>
                    </div>
                  </div>
                </div>

                {/* PRELOVED */}
                <Link
                  href="/preloved"
                  className="block py-4 text-[15px] font-medium text-[#2f3237] border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  PRELOVED
                </Link>

                {/* SİZE ÖZEL */}
                <Link
                  href="/ozel-tasarim"
                  className="block py-4 text-[15px] font-medium text-[#2f3237] border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  SİZE ÖZEL
                </Link>

                {/* HEDİYE */}
                <Link
                  href="/hediye"
                  className="block py-4 text-[15px] font-medium text-[#2f3237] border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  HEDİYE
                </Link>

                {/* ERKEKLERE ÖZEL Dropdown */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'erkek' ? null : 'erkek')}
                    className="flex items-center justify-between w-full py-4 text-[15px] font-medium text-[#2f3237]"
                  >
                    ERKEKLERE ÖZEL
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${mobileActiveDropdown === 'erkek' ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${mobileActiveDropdown === 'erkek' ? 'max-h-[300px]' : 'max-h-0'}`}>
                    <div className="pb-4 pl-4 flex flex-col gap-3">
                      <Link href="/erkek/tesbih" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Tesbih</Link>
                      <Link href="/erkek/bileklik" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Bileklik</Link>
                      <Link href="/erkek/yuzuk" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Yüzük</Link>
                      <Link href="/erkek/kol" className="text-[14px] text-[#2f3237]/80" onClick={toggleMobileMenu}>Kol</Link>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4" />

                {/* Secondary Links */}
                <Link
                  href="/randevu"
                  className="block py-3 text-[13px] text-[#2f3237]/70"
                  onClick={toggleMobileMenu}
                >
                  RANDEVU OLUŞTURUN
                </Link>
                <Link
                  href="/hakkimizda"
                  className="block py-3 text-[13px] text-[#2f3237]/70"
                  onClick={toggleMobileMenu}
                >
                  Kurumsal
                </Link>
                <Link
                  href="/iletisim"
                  className="block py-3 text-[13px] text-[#2f3237]/70"
                  onClick={toggleMobileMenu}
                >
                  İletişim
                </Link>
                <Link
                  href="/blog"
                  className="block py-3 text-[13px] text-[#2f3237]/70"
                  onClick={toggleMobileMenu}
                >
                  Blog
                </Link>

                {/* Instagram */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link
                    href="https://www.instagram.com/gozumunnuruantalya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] text-[#2f3237]/70"
                    onClick={toggleMobileMenu}
                  >
                    <Instagram size={18} />
                    @gozumunnuru.antalyaantalya
                  </Link>
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
          {/* Background Image with Gradient */}
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

          {/* White Content Area */}
          <div className="absolute left-0 top-0 w-full h-full bg-white pointer-events-none" />

          {/* Main Content */}
          <div className="relative max-w-[1728px] mx-auto h-full pointer-events-auto flex items-center">
            {/* Left Menu Section */}
            <div className="w-1/2 pl-[269px]">
              {/* MÜCEVHER Menu */}
              {activeMenu === 'mucevher' && (
                <div className="text-[21px] text-[#2f3237] font-light leading-[51px]">
                  <Link href="/mucevher/yuzuk" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Yüzük
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/mucevher/kolye" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Kolye
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/mucevher/bileklik" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Bileklik
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/mucevher/kupe" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Küpe
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/mucevher/set" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Set
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              )}

              {/* KOLEKSİYON Menu */}
              {activeMenu === 'koleksiyon' && (
                <div className="text-[21px] text-[#2f3237] font-light leading-[51px]">
                  <Link href="/koleksiyon/gozumun-nuru" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Gözümün Nuru
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              )}
              {/* ERKEKLERE ÖZEL Menu */}
              {activeMenu === 'erkek' && (
                <div className="text-[21px] text-[#2f3237] font-light leading-[51px]">
                  <Link href="/erkek/tesbih" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Tesbih
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/erkek/bileklik" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Bileklik
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/erkek/yuzuk" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Yüzük
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/erkek/kol" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Kol
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
