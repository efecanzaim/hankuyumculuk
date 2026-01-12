"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getAssetPath } from "@/utils/paths";

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
}

export default function ProductListingPage({
  heroImage,
  heroTitle,
  heroSubtitle,
  heroDescription,
  categoryTitle,
  products,
  totalProducts,
}: ProductListingPageProps) {
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
          {/* Hero Title */}
          <h1 className="text-[30px] md:text-[50px] leading-[40px] md:leading-[80px] text-primary text-center mb-4" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
            {heroTitle}
          </h1>
          
          {/* Hero Subtitle */}
          <h2 className="text-[20px] md:text-[30px] leading-[30px] text-[#2f3237] text-center mb-4" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
            {heroSubtitle}
          </h2>
          
          {/* Hero Description */}
          <p className="font-light text-[14px] md:text-[30px] leading-[22px] md:leading-[40px] text-[#2f3237] text-center max-w-[950px] mx-auto">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Category Title Section */}
      <section className="py-[60px] md:py-[80px]">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8">
          {/* Category Title */}
          <h2 className="font-light text-[20px] leading-[30px] text-[#2f3237] text-center mb-[30px]">
            {categoryTitle}
          </h2>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-[20px]">
            {/* Product Count */}
            <p className="text-[13px] font-medium text-[#2f3237]">
              {totalProducts} Ürün bulunmaktadır
            </p>

            {/* Separator Line with Active Indicator */}
            <div className="flex-1 mx-8 relative">
              <div className="w-full h-px bg-[#efece9]" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[350px] h-[2px] bg-[#2f3237]" />
            </div>

            {/* Filter Button */}
            <button className="text-[13px] font-medium text-[#2f3237] hover:opacity-70 transition-opacity">
              Ürünleri filtrele
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
                <div className="relative aspect-square w-full overflow-hidden bg-[#f5f5f5]">
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
                className="bg-[#2f3237] text-[#efece9] font-light text-[13px] leading-[15px] px-[60px] py-[18px] hover:bg-[#3d4147] transition-colors disabled:opacity-50"
              >
                {isLoading ? "YÜKLENİYOR..." : "ÜRÜNLERİ YÜKLE"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

