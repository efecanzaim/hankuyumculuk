"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useMemo, useRef } from "react";
import { getAssetPath } from "@/utils/paths";

interface SubMenuItem {
  text: string;
  href: string;
}

interface HeaderProps {
  logo: string;
  logoAlt: string;
  mainNav: { text: string; href: string }[];
  isHero?: boolean;
}

// Mega menu verileri
const megaMenuData: Record<string, { items: SubMenuItem[]; image: string }> = {
  "KOLEKSİYON": {
    items: [
      { text: "Klasikler", href: "/koleksiyon/klasikler" },
      { text: "Atölye", href: "/koleksiyon/atolye" },
      { text: "Yeni Nesil", href: "/koleksiyon/yeni-nesil" },
    ],
    image: "/images/hero-bg.jpg"
  },
  "MÜCEVHER": {
    items: [
      { text: "Klasik Pırlanta", href: "/mucevher/klasik-pirlanta" },
      { text: "Özel Üretim Pırlanta", href: "/mucevher/ozel-uretim-pirlanta" },
      { text: "Klasik Altın", href: "/mucevher/klasik-altin" },
      { text: "Özgün Tasarım", href: "/mucevher/ozgun-tasarim" },
      { text: "Preloved", href: "/mucevher/preloved" },
    ],
    image: "/images/trend-left.jpg"
  },
  "ÖZEL TASARIM": {
    items: [
      { text: "Bize Tasarlatın", href: "/ozel-tasarim/bize-tasarlatin" },
      { text: "Kendin Yarat", href: "/ozel-tasarim/kendin-yarat" },
      { text: "Nişan-Evlilik", href: "/ozel-tasarim/nisan-evlilik" },
      { text: "Kişiye Özel Hediye", href: "/ozel-tasarim/kisiye-ozel-hediye" },
    ],
    image: "/images/trend-right.jpg"
  },
  "HEDİYE": {
    items: [
      { text: "Özel Günler", href: "/hediye/ozel-gunler" },
      { text: "Doğum Günü", href: "/hediye/dogum-gunu" },
      { text: "Anneler Günü", href: "/hediye/anneler-gunu" },
      { text: "Kadınlar Günü", href: "/hediye/kadinlar-gunu" },
      { text: "Yeni Doğan", href: "/hediye/yeni-dogan" },
      { text: "Erkek Hediye", href: "/hediye/erkek-hediye" },
      { text: "Mini Bütçeli", href: "/hediye/mini-butceli" },
      { text: "Aksesuar", href: "/hediye/aksesuar" },
    ],
    image: "/images/parallax-bg.jpg"
  },
  "YATIRIM": {
    items: [
      { text: "Yatırımlık Altın", href: "/yatirim/yatirimlik-altin" },
      { text: "Gram Altın", href: "/yatirim/gram-altin" },
      { text: "Çeyrek Altın", href: "/yatirim/ceyrek-altin" },
      { text: "Yarım Altın", href: "/yatirim/yarim-altin" },
      { text: "Tam Altın", href: "/yatirim/tam-altin" },
    ],
    image: "/images/investment.jpg"
  },
};

// Menu keys for iteration
const menuKeys = Object.keys(megaMenuData);

// CSS filter for #DCCDBF color
const primaryColorFilter = 'brightness(0) saturate(100%) invert(89%) sepia(8%) saturate(434%) hue-rotate(345deg) brightness(96%) contrast(88%)';

export default function Header({ logo, logoAlt, mainNav, isHero = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMenuAreaHovered, setIsMenuAreaHovered] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any pending close timeout
  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Handle menu enter - immediate
  const handleMenuEnter = useCallback((menuText: string) => {
    clearCloseTimeout();
    setActiveMenu(menuText);
    setIsMenuAreaHovered(true);
  }, [clearCloseTimeout]);

  // Handle menu area enter (mega menu itself)
  const handleMegaMenuEnter = useCallback(() => {
    clearCloseTimeout();
    setIsMenuAreaHovered(true);
  }, [clearCloseTimeout]);

  // Handle menu leave - with small delay to allow transition between items
  const handleMenuLeave = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      if (!isMenuAreaHovered) {
        setActiveMenu(null);
      }
    }, 100);
  }, [clearCloseTimeout, isMenuAreaHovered]);

  // Handle leaving the entire menu area
  const handleMegaMenuLeave = useCallback(() => {
    setIsMenuAreaHovered(false);
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, [clearCloseTimeout]);

  // Close menu immediately when hovering non-nav areas
  const closeMenu = useCallback(() => {
    clearCloseTimeout();
    setIsMenuAreaHovered(false);
    setActiveMenu(null);
  }, [clearCloseTimeout]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Memoized style calculations
  const isMenuOpen = activeMenu !== null;
  const showWhiteHeader = isMenuOpen || !isHero;

  const headerStyles = useMemo(() => ({
    textColor: showWhiteHeader ? "text-[#2f3237]" : "text-white",
    lineColor: showWhiteHeader ? "bg-primary" : "bg-white/50",
    headerBg: showWhiteHeader ? "bg-white" : "bg-transparent",
    logoFilter: showWhiteHeader ? { filter: primaryColorFilter } : {},
    mainLogoClass: showWhiteHeader ? 'invert' : ''
  }), [showWhiteHeader]);

  return (
    <header 
      className={`absolute top-[41px] left-0 right-0 z-50 transition-all duration-200 ease-out ${headerStyles.headerBg}`}
    >
      {/* Main Header */}
      <div className="container mx-auto px-8">
        {/* Top row with logos - closes menu on hover */}
        <div className="flex items-center justify-between py-4" onMouseEnter={closeMenu}>
          {/* Left - Han Logo */}
          <div className="hidden lg:flex items-center w-[200px]">
            <Image
              src="/images/han-logo.svg"
              alt="Han Logo"
              width={60}
              height={28}
              className="h-7 w-auto transition-[filter] duration-200 ease-out"
              style={headerStyles.logoFilter}
            />
          </div>

          {/* Center - Logo with side lines */}
          <div className="flex-1 flex items-center justify-center gap-6">
            {/* Left Line */}
            <div className={`hidden lg:block flex-1 h-px transition-colors duration-200 ease-out ${headerStyles.lineColor}`} />
            
            <Link href="/" className="block">
              <Image
                src="/images/logo.svg"
                alt={logoAlt}
                width={280}
                height={55}
                priority={isHero}
                className={`h-[55px] w-auto transition-[filter] duration-200 ease-out ${headerStyles.mainLogoClass}`}
              />
            </Link>
            
            {/* Right Line */}
            <div className={`hidden lg:block flex-1 h-px transition-colors duration-200 ease-out ${headerStyles.lineColor}`} />
          </div>

          {/* Right - 1818 Logo */}
          <div className="hidden lg:flex items-center w-[200px] justify-end">
            <Image
              src="/images/1818-logo.svg"
              alt="1818 Logo"
              width={44}
              height={28}
              className="h-7 w-auto transition-[filter] duration-200 ease-out"
              style={headerStyles.logoFilter}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden transition-colors duration-200 ${headerStyles.textColor}`}
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main Navigation Row - outer area closes menu */}
        <div className="hidden lg:block py-4" onMouseEnter={closeMenu}>
          <nav className="flex justify-center gap-8">
            {mainNav.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  handleMenuEnter(item.text);
                }}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={item.href}
                  className={`text-[13px] ${activeMenu === item.text ? 'font-bold' : 'font-medium'} ${headerStyles.textColor} hover:opacity-70 transition-all duration-200 tracking-wide`}
                >
                  {item.text}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Header bottom line - visible when menu is open */}
      <div 
        className={`h-px bg-[#806754] transition-all duration-200 ease-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mega Menu Container - Always rendered */}
      <div
        className={`absolute left-0 right-0 bg-white shadow-lg z-100 overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen 
            ? 'max-h-[500px] opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}
        onMouseEnter={handleMegaMenuEnter}
        onMouseLeave={handleMegaMenuLeave}
      >
        <div className="container mx-auto px-8 py-8">
          <div className="flex gap-16">
            {/* Left - Menu Items - All menus rendered, visibility controlled */}
            <div className="flex-1 relative min-h-[320px]">
              {menuKeys.map((menuKey) => (
                <div
                  key={menuKey}
                  className={`absolute inset-0 grid grid-cols-2 gap-x-8 gap-y-2 content-start transition-all duration-300 ease-out ${
                    activeMenu === menuKey 
                      ? 'opacity-100 visible translate-x-0' 
                      : 'opacity-0 invisible translate-x-4 pointer-events-none'
                  }`}
                >
                  {megaMenuData[menuKey].items.map((subItem, idx) => (
                    <Link
                      key={idx}
                      href={subItem.href}
                      className="text-[20px] leading-[40px] font-light text-[#2f3237] hover:opacity-70 transition-all duration-150"
                      style={{ 
                        transitionDelay: activeMenu === menuKey ? `${idx * 30}ms` : '0ms',
                        opacity: activeMenu === menuKey ? 1 : 0,
                        transform: activeMenu === menuKey ? 'translateY(0)' : 'translateY(10px)'
                      }}
                    >
                      {subItem.text}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* Right - Image - All images rendered, visibility controlled */}
            <div className="w-[590px] h-[400px] relative shrink-0 overflow-hidden">
              {menuKeys.map((menuKey) => (
                <div
                  key={menuKey}
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out ${
                    activeMenu === menuKey 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                  style={{ backgroundImage: `url(${getAssetPath(megaMenuData[menuKey].image)})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden bg-white absolute top-full left-0 right-0 shadow-lg transition-all duration-200 ease-out ${
          mobileMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-8 py-4">
          {mainNav.map((item, index) => (
            <div key={index}>
              <Link
                href={item.href}
                className="block py-3 text-[13px] font-medium text-[#2f3237] border-b border-gray-100"
              >
                {item.text}
              </Link>
              {megaMenuData[item.text] && (
                <div className="pl-4 bg-gray-50">
                  {megaMenuData[item.text].items.map((subItem, idx) => (
                    <Link
                      key={idx}
                      href={subItem.href}
                      className="block py-2 text-[12px] font-light text-[#2f3237]"
                    >
                      {subItem.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
