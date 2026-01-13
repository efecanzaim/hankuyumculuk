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
}

export default function Header({ logo, logoAlt, mainNav, isTransparent = false, isBlogPage = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topBannerVisible, setTopBannerVisible] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMenu]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeTopBanner = useCallback(() => {
    setTopBannerVisible(false);
  }, []);

  return (
    <>
      {/* Top Banner - Pudra color with black text - Hidden on blog page */}
      {topBannerVisible && !isBlogPage && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-primary w-full h-[50px] flex items-center justify-center px-6">
          <p className="text-[15px] text-[#2f3237] text-center font-normal leading-normal">
            Stoklar tükenene kadar çevrimiçi teslimat siparişlerinde özel tatil ambalajlarımızı kaçırmayın
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
      <header className={`${isBlogPage ? 'relative' : 'absolute'} left-0 right-0 z-50 ${isBlogPage ? 'bg-[#f5f5f5]' : 'bg-transparent'} transition-all duration-300 ${!isBlogPage && topBannerVisible ? 'top-[50px]' : isBlogPage ? '' : 'top-0'}`}>
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
                  />
                  <Link
                    href="/randevu"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    RANDEVU OLUŞTUR
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
                      style={isTransparent && !activeMenu ? {} : { filter: 'brightness(0) saturate(100%) invert(89%) sepia(8%) saturate(434%) hue-rotate(345deg) brightness(96%) contrast(88%)' }}
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
              <Link
                href="/mucevher"
                className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
              >
                MÜCEVHER
              </Link>
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
              <Link
                href="/koleksiyon"
                className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
              >
                KOLEKSİYON
              </Link>
              {/* Active Menu Underline */}
              {activeMenu === 'koleksiyon' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[41px] w-[123px] h-[2px] bg-[#2f3237]" />
              )}
            </div>

            <Link
              href="/ozel-tasarim"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
            >
              SANA ÖZEL
            </Link>

            {/* HEDİYE Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('hediye')}
            >
              <Link
                href="/hediye"
                className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
              >
                HEDİYE
              </Link>
              {/* Active Menu Underline */}
              {activeMenu === 'hediye' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[41px] w-[123px] h-[2px] bg-[#2f3237]" />
              )}
            </div>

            {/* ERKEKLERE ÖZEL Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('erkek')}
            >
              <Link
                href="/erkek"
                className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
              >
                ERKEKLERE ÖZEL
              </Link>
              {/* Active Menu Underline */}
              {activeMenu === 'erkek' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[41px] w-[123px] h-[2px] bg-[#2f3237]" />
              )}
            </div>

            <Link
              href="/preloved"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent && !activeMenu ? 'text-white' : 'text-[#2f3237]'}`}
            >
              PRELOVED
            </Link>
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
                style={isTransparent ? {} : { filter: 'brightness(0) saturate(100%) invert(89%) sepia(8%) saturate(434%) hue-rotate(345deg) brightness(96%) contrast(88%)' }}
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`px-6 py-6 ${isTransparent ? 'bg-[rgba(47,50,55,0.95)]' : 'bg-white border-t border-primary'}`}>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/mucevher"
                  className={`text-[15px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  MÜCEVHER
                </Link>
                <Link
                  href="/koleksiyon"
                  className={`text-[15px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  KOLEKSİYON
                </Link>
                <Link
                  href="/ozel-tasarim"
                  className={`text-[15px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  SANA ÖZEL
                </Link>
                <Link
                  href="/hediye"
                  className={`text-[15px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  HEDİYE
                </Link>
                <Link
                  href="/erkek"
                  className={`text-[15px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  ERKEKLERE ÖZEL
                </Link>
                <Link
                  href="/preloved"
                  className={`text-[15px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  PRELOVED
                </Link>
                <div className={`border-t my-4 ${isTransparent ? 'border-white/20' : 'border-primary'}`} />
                <Link
                  href="/randevu"
                  className={`text-[13px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  RANDEVU OLUŞTUR
                </Link>
                <Link
                  href="/hakkimizda"
                  className={`text-[13px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  Kurumsal
                </Link>
                <Link
                  href="/iletisim"
                  className={`text-[13px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  İletişim
                </Link>
                <Link
                  href="/blog"
                  className={`text-[13px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  Blog
                </Link>
              </nav>
            </div>
          )}
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
                  <Link href="/koleksiyon/zenith" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Zenith Koleksiyonu
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/koleksiyon/gozumun-nuru" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Gözümün Nuru
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/koleksiyon/anturaj" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Anturaj Koleksiyonu
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/koleksiyon/tulip" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Tulip Koleksiyonu
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/koleksiyon/harmony" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Harmony Koleksiyonu
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/koleksiyon/inci" className="group flex items-center gap-4 hover:font-bold transition-all">
                    İnci Koleksiyonu
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              )}

              {/* HEDİYE Menu */}
              {activeMenu === 'hediye' && (
                <div className="text-[21px] text-[#2f3237] font-light leading-[51px]">
                  <Link href="/hediye/ozel-gunler" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Özel Günler
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/hediye/dogum-gunu" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Doğum Günü
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/hediye/anneler-gunu" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Anneler Günü
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/hediye/kadinlar-gunu" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Kadınlar Günü
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/hediye/yeni-dogan" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Yeni Doğan
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/hediye/erkek-hediye" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Erkek Hediye
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/hediye/mini-butceli" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Mini Bütçeli
                    <span className="w-[110px] h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/hediye/aksesuar" className="group flex items-center gap-4 hover:font-bold transition-all">
                    Aksesuar
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
