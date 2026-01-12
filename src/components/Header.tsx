"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { getAssetPath } from "@/utils/paths";
import { Instagram, X } from "lucide-react";

interface HeaderProps {
  logo: string;
  logoAlt: string;
  mainNav: { text: string; href: string }[];
  isHero?: boolean;
  isTransparent?: boolean;
}

export default function Header({ logo, logoAlt, mainNav, isTransparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topBannerVisible, setTopBannerVisible] = useState(true);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeTopBanner = useCallback(() => {
    setTopBannerVisible(false);
  }, []);

  return (
    <>
      {/* Top Banner - Pudra color with black text */}
      {topBannerVisible && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-[#dccdbf] w-full h-[50px] flex items-center justify-center px-6">
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
      <header className={`absolute left-0 right-0 z-50 bg-transparent transition-all duration-300 ${topBannerVisible ? 'top-[50px]' : 'top-0'}`}>
        {/* Desktop Header */}
        <div className="hidden lg:block">
          {/* Top Row - Logo and Side Links */}
          <div className={`py-4 ${isTransparent ? 'bg-transparent' : 'bg-white'}`}>
            <div className="container mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between">
                {/* Left Side Links - Fixed Width */}
                <div className="flex items-center gap-4 w-[240px]">
                  <Image
                    src={getAssetPath("/images/shape.svg")}
                    alt=""
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px] flex-shrink-0"
                  />
                  <Link
                    href="/rezervasyon"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    REZERVASYON YAP
                  </Link>
                </div>

                {/* Center - Logo with Lines - Takes Remaining Space */}
                <div className="flex items-center gap-6 justify-center flex-1">
                  <div className={`flex-1 h-px ${isTransparent ? 'bg-white opacity-50' : 'bg-[#dccdbf]'}`} />
                  <Link href="/" className="block flex-shrink-0">
                    <Image
                      src={getAssetPath("/images/han-logo.svg")}
                      alt="Han Logo"
                      width={110}
                      height={41}
                      className="h-[41px] w-auto"
                      style={isTransparent ? {} : { filter: 'brightness(0) saturate(100%) invert(89%) sepia(8%) saturate(434%) hue-rotate(345deg) brightness(96%) contrast(88%)' }}
                    />
                  </Link>
                  <div className={`flex-1 h-px ${isTransparent ? 'bg-white opacity-50' : 'bg-[#dccdbf]'}`} />
                </div>

                {/* Right Side Links - Fixed Width */}
                <div className="flex items-center gap-4 justify-end w-[240px]">
                  <Link
                    href="/hakkimizda"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    Kurumsal
                  </Link>
                  <Link
                    href="/iletisim"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    İletişim
                  </Link>
                  <Link
                    href="/blog"
                    className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    Blog
                  </Link>
                  <button className={`text-[11px] font-normal hover:opacity-70 transition-opacity whitespace-nowrap ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}>
                    EN
                  </button>
                  <Link
                    href="https://www.instagram.com/gozumunnuruantalya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:opacity-70 transition-opacity flex-shrink-0 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  >
                    <Instagram size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Row */}
          <div className={`py-4 ${isTransparent ? 'bg-transparent' : 'bg-white'}`}>
            <div className="flex items-center justify-center gap-12">
            <Link
              href="/mucevher"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
            >
              MÜCEVHER
            </Link>
            <Link
              href="/koleksiyon"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
            >
              KOLEKSİYON
            </Link>
            <Link
              href="/ozel-tasarim"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
            >
              SANA ÖZEL
            </Link>
            <Link
              href="/hediye"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
            >
              HEDİYE
            </Link>
            <Link
              href="/erkek"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
            >
              ERKEKLERE ÖZEL
            </Link>
            <Link
              href="/preloved"
              className={`text-[13px] font-normal hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
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
            <div className={`px-6 py-6 ${isTransparent ? 'bg-[rgba(47,50,55,0.95)]' : 'bg-white border-t border-[#dccdbf]'}`}>
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
                <div className={`border-t my-4 ${isTransparent ? 'border-white/20' : 'border-[#dccdbf]'}`} />
                <Link
                  href="/rezervasyon"
                  className={`text-[13px] font-normal py-2 ${isTransparent ? 'text-white' : 'text-[#2f3237]'}`}
                  onClick={toggleMobileMenu}
                >
                  REZERVASYON YAP
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
    </>
  );
}
