"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getAssetPath } from "@/utils/paths";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface Product {
  id: number;
  image: string;
  name: string;
  subtitle: string;
  link: string;
}

interface ProductListingPageProps {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  categoryTitle: string;
  products: Product[];
  totalProducts: number;
  appointmentSubject?: string;
  locale?: Locale;
}

export default function ProductListingPage({
  heroImage,
  heroTitle,
  heroSubtitle,
  heroDescription,
  categoryTitle,
  products,
  totalProducts,
  appointmentSubject = "diger",
  locale = 'tr',
}: ProductListingPageProps) {
  const t = useTranslation(locale);
  const [visibleProducts, setVisibleProducts] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => Math.min(prev + 9, products.length));
      setIsLoading(false);
    }, 500);
  };

  const displayedProducts = products.slice(0, visibleProducts);

  return (
    <div className="min-h-screen bg-white pt-[141px]">
      {/* Hero Section with Full Width Image */}
      <section className="relative w-full">
        {/* Hero Image - Full Width */}
        <div className="relative w-full h-[400px] md:h-[624px]">
          <Image
            src={getAssetPath(heroImage)}
            alt={categoryTitle}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* White Info Box - Overlapping the image */}
        <div className="relative mx-auto w-[calc(100%-48px)] md:w-full max-w-[1190px] bg-white px-6 md:px-[120px] py-[40px] md:py-[80px] -mt-[200px] md:-mt-[200px] z-10">
          {/* Hero Subtitle */}
          <h2 className="text-[20px] md:text-[30px] leading-[30px] text-[#2f3237] text-center mb-4" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
            {heroSubtitle}
          </h2>
          
          {/* Hero Description */}
          <p className="font-light text-[14px] md:text-[24px] leading-[22px] md:leading-[38px] text-[#2f3237] text-center max-w-[950px] mx-auto whitespace-pre-line">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-[60px] md:py-[80px]">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-[20px]">
            {/* Product Count */}
            <p className="text-[13px] font-medium text-[#2f3237] shrink-0">
              {t('common.productsFound', { count: String(totalProducts) })}
            </p>

            {/* Separator Line with Active Indicator - Hidden on mobile */}
            <div className="hidden md:block flex-1 mx-8 relative">
              <div className="w-full h-px bg-primary" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[350px] h-[2px] bg-[#2f3237]" />
            </div>

            {/* Filter Button */}
            <button className="text-[13px] font-medium text-[#2f3237] hover:opacity-70 transition-opacity shrink-0">
              {t('common.filterProducts')}
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-[60px] md:pb-[100px]">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {displayedProducts.map((product) => (
              <Link
                key={product.id}
                href={product.link}
                className="group block"
              >
                {/* Product Image */}
                <div 
                  className="relative aspect-square w-full overflow-hidden bg-[#ffffff]"
                  style={{
                    boxShadow: 'inset 0 0 40px 20px rgba(252, 252, 252, 0.8)'
                  }}
                >
                  <Image
                    src={getAssetPath(product.image)}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="pt-[20px] pb-[30px] text-center">
                  {/* Product Name */}
                  <h3 className="text-[20px] leading-[20px] text-[#2f3237] mb-[10px]" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
                    {product.name}
                  </h3>
                  
                  {/* Product Subtitle */}
                  <p className="font-light text-[13px] leading-[26px] text-[#2f3237]">
                    {product.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {visibleProducts < products.length && (
            <div className="flex justify-center mt-[60px]">
              <button
                onClick={loadMoreProducts}
                disabled={isLoading}
                className="bg-dark text-light font-light text-[13px] leading-[15px] px-[60px] py-[18px] hover:bg-[#3d4147] transition-colors disabled:opacity-50"
              >
                {isLoading ? t('common.loadingProducts') : t('common.loadProducts')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Appointment CTA Section */}
      <section className="py-[80px] md:py-[120px] bg-[#2f3237]">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 
            className="text-[28px] md:text-[40px] leading-[36px] md:leading-[50px] text-white mb-6"
            style={{ fontFamily: 'var(--font-faculty-glyphic)' }}
          >
            {t('productListing.appointmentTitle')}
          </h2>
          <p className="text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-white/70 mb-10 max-w-[600px] mx-auto">
            {t('productListing.appointmentDesc')}
          </p>
          <Link
            href={`${getLocalizedPath('appointment', locale)}?subject=${appointmentSubject}`}
            className="inline-block bg-white text-[#2f3237] text-[13px] tracking-[0.15em] font-medium px-12 py-5 hover:bg-[#f5f5f5] transition-colors uppercase"
          >
            {t('productListing.appointmentButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}

