"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getAssetPath } from "@/utils/paths";
import type { Locale } from "@/i18n/config";

interface Stone {
  id?: number;
  stone_type: string;
  product_type?: string | null;
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
  bannerImagePosition?: string;
  bannerImageScale?: number;
  galleryImages: string[];
  goldWeight?: number | string | null;
  goldKarat?: number | string | null;
  stones?: Stone[];
  locale?: Locale;
}

// Sertifika bölümü çevirileri
const certLabels: Record<string, Record<Locale, string>> = {
  title: { tr: 'Sertifika Bilgileri', en: 'Certificate Details', ru: 'Сертификат' },
  stone: { tr: 'Taş', en: 'Stone', ru: 'Камень' },
  carat: { tr: 'Karat', en: 'Carat', ru: 'Карат' },
  quantity: { tr: 'Adet', en: 'Qty', ru: 'Кол-во' },
  color: { tr: 'Renk', en: 'Color', ru: 'Цвет' },
  clarity: { tr: 'Berraklık', en: 'Clarity', ru: 'Чистота' },
  cut: { tr: 'Kesim', en: 'Cut', ru: 'Огранка' },
  goldWeight: { tr: 'Altın Ağırlığı', en: 'Gold Weight', ru: 'Вес золота' },
  goldKarat: { tr: 'Altın Ayar', en: 'Gold Karat', ru: 'Проба золота' },
  productType: { tr: 'Tip', en: 'Type', ru: 'Тип' },
};

// Taş türü çevirileri
const stoneTypeMap: Record<string, Record<Locale, string>> = {
  'Pırlanta': { tr: 'Pırlanta', en: 'Diamond', ru: 'Бриллиант' },
  'Yakut': { tr: 'Yakut', en: 'Ruby', ru: 'Рубин' },
  'Safir': { tr: 'Safir', en: 'Sapphire', ru: 'Сапфир' },
  'Zümrüt': { tr: 'Zümrüt', en: 'Emerald', ru: 'Изумруд' },
  'Tanzanit': { tr: 'Tanzanit', en: 'Tanzanite', ru: 'Танзанит' },
  'Turmalin': { tr: 'Turmalin', en: 'Tourmaline', ru: 'Турмалин' },
};

// Ürün tipi çevirileri (product_type kolonundaki Türkçe değerler)
const productTypeMap: Record<string, Record<Locale, string>> = {
  'Kolye': { tr: 'Kolye', en: 'Necklace', ru: 'Ожерелье' },
  'Yüzük': { tr: 'Yüzük', en: 'Ring', ru: 'Кольцо' },
  'Bileklik': { tr: 'Bileklik', en: 'Bracelet', ru: 'Браслет' },
  'Küpe': { tr: 'Küpe', en: 'Earring', ru: 'Серьга' },
  'Set': { tr: 'Set', en: 'Set', ru: 'Набор' },
  'Broş': { tr: 'Broş', en: 'Brooch', ru: 'Брошь' },
  'Toka': { tr: 'Toka', en: 'Buckle', ru: 'Пряжка' },
};

// Kesim çevirileri
const cutMap: Record<string, Record<Locale, string>> = {
  'Yuvarlak': { tr: 'Yuvarlak', en: 'Round', ru: 'Круглая' },
  'Zümrüt': { tr: 'Zümrüt', en: 'Emerald', ru: 'Изумрудная' },
  'Markiz': { tr: 'Markiz', en: 'Marquise', ru: 'Маркиз' },
  'Kalp': { tr: 'Kalp', en: 'Heart', ru: 'Сердце' },
  'Armut': { tr: 'Armut', en: 'Pear', ru: 'Грушевидная' },
  'Damla': { tr: 'Damla', en: 'Pear', ru: 'Грушевидная' },
  'Yastık': { tr: 'Yastık', en: 'Cushion', ru: 'Кушон' },
  'Radyan': { tr: 'Radyan', en: 'Radiant', ru: 'Радиант' },
  'Işıltılı': { tr: 'Işıltılı', en: 'Radiant', ru: 'Радиант' },
  'Oval': { tr: 'Oval', en: 'Oval', ru: 'Овальная' },
  'Prenses': { tr: 'Prenses', en: 'Princess', ru: 'Принцесса' },
  'Trapez': { tr: 'Trapez', en: 'Trapezoid', ru: 'Трапеция' },
  'Baget': { tr: 'Baget', en: 'Baguette', ru: 'Багет' },
};

// Altın ayar çevirileri
const goldKaratMap: Record<string, Record<Locale, string>> = {
  '8 Ayar': { tr: '8 Ayar', en: '8K', ru: '8 карат' },
  '14 Ayar': { tr: '14 Ayar', en: '14K', ru: '14 карат' },
  '18 Ayar': { tr: '18 Ayar', en: '18K', ru: '18 карат' },
  '21 Ayar': { tr: '21 Ayar', en: '21K', ru: '21 карат' },
  '22 Ayar': { tr: '22 Ayar', en: '22K', ru: '22 карата' },
  '24 Ayar': { tr: '24 Ayar', en: '24K', ru: '24 карата' },
};

export default function ProductDetailPage({
  mainImage,
  productName,
  productTitle,
  description,
  bannerImage,
  bannerImagePosition,
  bannerImageScale,
  galleryImages,
  goldWeight,
  goldKarat,
  stones = [],
  locale = 'tr',
}: ProductDetailPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgColor, setBgColor] = useState("#ffffff");
  const totalSlides = galleryImages.length;

  // Görselin kenar rengini algıla
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = getAssetPath(mainImage);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Görselin kenarlarından renk örnekleri al
      const samples: number[][] = [];
      const sampleSize = 10;

      // Üst kenar
      for (let x = 0; x < img.width; x += Math.floor(img.width / sampleSize)) {
        const pixel = ctx.getImageData(x, 0, 1, 1).data;
        samples.push([pixel[0], pixel[1], pixel[2]]);
      }

      // Alt kenar
      for (let x = 0; x < img.width; x += Math.floor(img.width / sampleSize)) {
        const pixel = ctx.getImageData(x, img.height - 1, 1, 1).data;
        samples.push([pixel[0], pixel[1], pixel[2]]);
      }

      // Ortalama rengi hesapla
      const avgR = Math.round(samples.reduce((sum, p) => sum + p[0], 0) / samples.length);
      const avgG = Math.round(samples.reduce((sum, p) => sum + p[1], 0) / samples.length);
      const avgB = Math.round(samples.reduce((sum, p) => sum + p[2], 0) / samples.length);

      setBgColor(`rgb(${avgR}, ${avgG}, ${avgB})`);
    };
  }, [mainImage]);

  // Helper function to safely convert to number
  const toNumber = (value: number | string | null | undefined): number | null => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') return value;
    const parsed = parseFloat(String(value));
    return isNaN(parsed) ? null : parsed;
  };

  const getCutName = (cut: string | undefined): string => {
    if (!cut) return '';
    return cutMap[cut]?.[locale] || cut;
  };

  const getStoneName = (stoneType: string): string => {
    return stoneTypeMap[stoneType]?.[locale] || stoneType;
  };

  const getProductTypeName = (productType: string | null | undefined): string => {
    if (!productType) return '';
    return productTypeMap[productType]?.[locale] || productType;
  };

  const getGoldKarat = (karat: number | string | null | undefined): string => {
    if (!karat) return '';
    const karatStr = String(karat);
    return goldKaratMap[karatStr]?.[locale] || karatStr;
  };

  const label = (key: string): string => certLabels[key]?.[locale] || key;

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white pt-[141px]">
      {/* Main Product Image Section */}
      <section
        className="relative w-full transition-colors duration-500"
        style={{ backgroundColor: bgColor }}
      >
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          {/* Main Product Image */}
          <div className="relative w-full">
            <Image
              src={getAssetPath(mainImage)}
              alt={productName}
              width={1000}
              height={1000}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Product Info Section */}
      <section className="relative -mt-[30px] md:-mt-[60px] pt-0 pb-[40px] md:pb-[60px]">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8 text-center">
          {/* Product Name - Large */}
          <h1
            className="text-[50px] md:text-[100px] leading-[60px] md:leading-[120px] text-primary mb-0"
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
      {bannerImage && (
        <section className="py-[40px] md:py-[60px]">
          <div className="max-w-[1430px] mx-auto px-6 md:px-8">
            <div className="relative w-full h-[250px] md:h-[505px]">
              <Image
                src={getAssetPath(bannerImage)}
                alt={productName}
                fill
                className="object-cover"
                style={{
                  objectPosition: bannerImagePosition || '50% 50%',
                  transform: bannerImageScale && bannerImageScale !== 1 ? `scale(${bannerImageScale})` : undefined,
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Gallery Slider Section */}
      <section className="py-[60px] md:py-[100px] overflow-hidden">
        <div className="relative">
          {/* Slider Container */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: 'min(950px, 55vw)' }}
          >
            {galleryImages.map((image, index) => {
              const isActive = index === currentSlide;

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out top-0 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  style={{
                    width: 'min(950px, 55vw)',
                    height: 'min(950px, 55vw)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: isActive ? 10 : 0,
                  }}
                >
                  <div
                    className="relative w-full h-full bg-white overflow-hidden"
                    style={{
                      boxShadow: 'inset 0 0 40px 20px rgba(252, 252, 252, 0.8)'
                    }}
                  >
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
                {label('title')}
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
                    {/* Desktop: Grid tablo */}
                    <div className="hidden md:block">
                      {/* Tablo Başlıkları */}
                      <div className={`grid ${stones.some(s => s.product_type) ? 'grid-cols-7' : 'grid-cols-6'} gap-4 mb-[20px]`}>
                        {stones.some(s => s.product_type) && <div />}
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {label('stone')}
                        </div>
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {label('carat')}
                        </div>
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {label('quantity')}
                        </div>
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {label('color')}
                        </div>
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {label('clarity')}
                        </div>
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {label('cut')}
                        </div>
                      </div>

                      {/* Ayırıcı Çizgi */}
                      <div className="w-full h-px bg-light mb-[20px]"></div>

                      {/* Taş Satırları */}
                      {stones.map((stone, index) => (
                        <div key={index}>
                          <div className={`grid ${stones.some(s => s.product_type) ? 'grid-cols-7' : 'grid-cols-6'} gap-4 mb-[20px]`}>
                            {stones.some(s => s.product_type) && (
                              <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                                {getProductTypeName(stone.product_type)}
                              </div>
                            )}
                            <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                              {getStoneName(stone.stone_type)}
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
                              {getCutName(stone.cut)}
                            </div>
                          </div>
                          {index < stones.length - 1 && (
                            <div className="w-full h-px bg-light mb-[20px]"></div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Mobile: Kart yapısı (label: değer satırları) */}
                    <div className="md:hidden space-y-4">
                      {stones.map((stone, index) => {
                        const caratNum = toNumber(stone.carat);
                        const rows: Array<[string, string | number]> = [];
                        if (stone.product_type) rows.push([label('productType'), getProductTypeName(stone.product_type)]);
                        rows.push([label('stone'), getStoneName(stone.stone_type)]);
                        rows.push([label('carat'), caratNum !== null ? caratNum.toFixed(2).replace('.', ',') : '-']);
                        rows.push([label('quantity'), stone.quantity ?? '-']);
                        rows.push([label('color'), stone.color || '-']);
                        rows.push([label('clarity'), stone.clarity || '-']);
                        rows.push([label('cut'), getCutName(stone.cut)]);
                        return (
                          <div key={index} className="border border-light rounded-md p-4">
                            <p className="text-[13px] font-bold text-[#2f3237] mb-3 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                              {stones.length > 1 ? `${label('stone')} ${index + 1}` : label('stone')}
                            </p>
                            <dl className="grid grid-cols-1 gap-y-2">
                              {rows.map(([k, v], i) => (
                                <div key={i} className="flex justify-between gap-3 text-[14px] leading-[20px]" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                                  <dt className="text-[#2f3237] font-bold shrink-0">{k}</dt>
                                  <dd className="text-[#2f3237] font-light text-right break-words">{v}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        );
                      })}
                    </div>
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
                          {label('goldWeight')}
                        </div>
                      )}
                      {goldKarat && (
                        <div className="text-[15px] leading-[25px] text-[#2f3237] font-bold text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {label('goldKarat')}
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
                            {weightNum.toFixed(2).replace('.', ',')} Gr
                          </div>
                        );
                      })()}
                      {goldKarat && (
                        <div className="text-[15px] leading-[45px] text-[#2f3237] font-light text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                          {getGoldKarat(goldKarat)}
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

