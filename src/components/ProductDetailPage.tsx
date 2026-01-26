"use client";

import Image from "next/image";
import { useState } from "react";
import { getAssetPath } from "@/utils/paths";

interface Stone {
  id?: number;
  stone_type: string;
  carat: number | string | null;
  quantity: number;
  color?: string;
  clarity?: string;
  cut?: string;
}

interface ProductDetailPageProps {
  mainImage: string;
  productName: string;
  productTitle: string;
  description: string;
  bannerImage: string;
  galleryImages: string[];
  goldWeight?: number | string | null;
  goldKarat?: number | string | null;
  stones?: Stone[];
}

export default function ProductDetailPage({
  mainImage,
  productName,
  productTitle,
  description,
  bannerImage,
  galleryImages,
  goldWeight,
  goldKarat,
  stones = [],
}: ProductDetailPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = galleryImages.length;

  // Helper function to safely convert to number
  const toNumber = (value: number | string | null | undefined): number | null => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') return value;
    const parsed = parseFloat(String(value));
    return isNaN(parsed) ? null : parsed;
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white pt-[141px]">
      {/* Main Product Image Section */}
      <section className="relative w-full">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8">
          {/* Main Product Image */}
          <div className="relative w-full h-[400px] md:h-[694px] mx-auto max-w-[1189px]">
            <Image
              src={getAssetPath(mainImage)}
              alt={productName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Product Info Section */}
      <section className="py-[40px] md:py-[60px]">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8 text-center">
          {/* Product Name - Large */}
          <h1 
            className="text-[50px] md:text-[100px] leading-[60px] md:leading-[200px] text-primary mb-0"
            style={{ fontFamily: 'var(--font-faculty-glyphic)' }}
          >
            {productName}
          </h1>
          
          {/* Product Title */}
          <h2 
            className="text-[20px] md:text-[30px] leading-[30px] text-[#2f3237] mb-[20px] md:mb-[30px]"
            style={{ fontFamily: 'var(--font-faculty-glyphic)' }}
          >
            {productTitle}
          </h2>
          
          {/* Description */}
          <p className="font-light text-[16px] md:text-[30px] leading-[24px] md:leading-[40px] text-[#2f3237] max-w-[950px] mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* Banner Image Section */}
      <section className="py-[40px] md:py-[60px]">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8">
          <div className="relative w-full h-[250px] md:h-[505px]">
            <Image
              src={getAssetPath(bannerImage)}
              alt={productName}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Gallery Slider Section */}
      <section className="py-[60px] md:py-[100px] overflow-hidden">
        <div className="relative">
          {/* Slider Container */}
          <div 
            className="relative flex items-center justify-center"
            style={{ height: 'min(950px, 55vw)' }}
          >
            {galleryImages.map((image, index) => {
              // Calculate position relative to current slide
              const position = index - currentSlide;
              // Handle wrap-around for infinite loop effect
              const adjustedPosition = position < -1 
                ? position + totalSlides 
                : position > 1 
                  ? position - totalSlides 
                  : position;
              
              const isCenter = adjustedPosition === 0;
              const isLeft = adjustedPosition === -1;
              const isRight = adjustedPosition === 1;
              const isVisible = isCenter || isLeft || isRight;

              if (!isVisible) return null;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 ease-in-out top-0"
                  style={{
                    width: 'min(950px, 55vw)',
                    height: 'min(950px, 55vw)',
                    left: '50%',
                    transform: isCenter 
                      ? 'translateX(-50%) scale(1)' 
                      : isLeft 
                        ? 'translateX(calc(-50% - min(475px, 27.5vw) - 10px)) scale(0.95)' 
                        : 'translateX(calc(-50% + min(475px, 27.5vw) + 10px)) scale(0.95)',
                    opacity: isCenter ? 1 : 0.5,
                    zIndex: isCenter ? 10 : 5,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={getAssetPath(image)}
                      alt={`${productName} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 md:left-[10%] top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Önceki görsel"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#2f3237" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          <button
            onClick={goToNextSlide}
            className="absolute right-4 md:right-[10%] top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Sonraki görsel"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path 
                d="M9 18L15 12L9 6" 
                stroke="#2f3237" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>

        </div>
      </section>

      {/* Product Specifications Table - Sertifika Bilgileri */}
      {(goldWeight || goldKarat || (stones && stones.length > 0)) && (
        <section className="py-[60px] md:py-[100px]">
          <div className="max-w-[1430px] mx-auto px-6 md:px-8">
            <div className="flex flex-col items-center">
              {/* Başlık */}
              <h2 
                className="text-[30px] leading-[30px] text-[#2f3237] mb-[20px] text-center"
                style={{ fontFamily: 'var(--font-faculty-glyphic)' }}
              >
                Sertifika Bilgileri
              </h2>
              
              {/* Ürün Adı */}
              <p 
                className="text-[29px] leading-[40px] text-[#2f3237] mb-[40px] text-center font-light"
                style={{ fontFamily: 'var(--font-bw-modelica)' }}
              >
                {productTitle}
              </p>

              {/* Tablo Container */}
              <div className="w-full max-w-[710px]">
                {/* Taş Bilgileri Tablosu */}
                {stones && stones.length > 0 && (
                  <div className="mb-[40px]">
                    {/* Tablo Başlıkları */}
                    <div className="grid grid-cols-6 gap-4 mb-[20px]">
                      <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        Taş
                      </div>
                      <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        Karat
                      </div>
                      <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        Adet
                      </div>
                      <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        Renk
                      </div>
                      <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        Berraklık
                      </div>
                      <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        Kesim
                      </div>
                    </div>

                    {/* Ayırıcı Çizgi */}
                    <div className="w-full h-px bg-light mb-[20px]"></div>

                    {/* Taş Satırları */}
                    {stones.map((stone, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-6 gap-4 mb-[20px]">
                          <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                            {stone.stone_type}
                          </div>
                          <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                            {(() => {
                              const caratNum = toNumber(stone.carat);
                              return caratNum !== null ? caratNum.toFixed(2).replace('.', ',') : '-';
                            })()}
                          </div>
                          <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                            {stone.quantity}
                          </div>
                          <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                            {stone.color || '-'}
                          </div>
                          <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                            {stone.clarity || '-'}
                          </div>
                          <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                            {stone.cut || '-'}
                          </div>
                        </div>
                        {index < stones.length - 1 && (
                          <div className="w-full h-px bg-light mb-[20px]"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Altın Bilgileri */}
                {(goldWeight || goldKarat) && (
                  <div>
                    {/* Ayırıcı Çizgi */}
                    {stones && stones.length > 0 && (
                      <div className="w-full h-px bg-light mb-[20px]"></div>
                    )}
                    
                    {/* Altın Başlıkları */}
                    <div className="grid grid-cols-2 gap-4 mb-[20px]">
                      {goldWeight && (
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          Altın Ağırlığı
                        </div>
                      )}
                      {goldKarat && (
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          Altın Ayar
                        </div>
                      )}
                    </div>

                    {/* Ayırıcı Çizgi */}
                    <div className="w-full h-px bg-light mb-[20px]"></div>

                    {/* Altın Değerleri */}
                    <div className="grid grid-cols-2 gap-4">
                      {goldWeight && (() => {
                        const weightNum = toNumber(goldWeight);
                        return weightNum !== null && (
                          <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                            {weightNum.toFixed(0)} Gr
                          </div>
                        );
                      })()}
                      {goldKarat && (
                        <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {goldKarat}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

