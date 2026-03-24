"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import { getAssetPath } from "@/utils/paths";
import type { Locale } from "@/i18n/config";

interface Stone {
  stone_type: string;
  carat: number | string | null;
  quantity: number;
  color?: string;
  clarity?: string;
  cut?: string;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  name_en?: string;
  name_ru?: string;
  subtitle: string;
  subtitle_en?: string;
  subtitle_ru?: string;
  mainImage: string;
  image: string;
  gold_weight?: number | string | null;
  gold_karat?: number | string | null;
  stones?: Stone[];
}

interface CertificatePageClientProps {
  slug: string;
  locale?: Locale;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Taş türü çevirileri
const stoneTypeMap: Record<string, Record<Locale, string>> = {
  'Pırlanta': { tr: 'Pırlanta', en: 'Diamond', ru: 'Бриллиант' },
  'Yakut': { tr: 'Yakut', en: 'Ruby', ru: 'Рубин' },
  'Safir': { tr: 'Safir', en: 'Sapphire', ru: 'Сапфир' },
  'Zümrüt': { tr: 'Zümrüt', en: 'Emerald', ru: 'Изумруд' },
  'Tanzanit': { tr: 'Tanzanit', en: 'Tanzanite', ru: 'Танзанит' },
  'Turmalin': { tr: 'Turmalin', en: 'Tourmaline', ru: 'Турмалин' },
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
  'Oval': { tr: 'Oval', en: 'Oval', ru: 'Овальная' },
  'Prenses': { tr: 'Prenses', en: 'Princess', ru: 'Принцесса' },
  'Trapez': { tr: 'Trapez', en: 'Trapezoid', ru: 'Трапеция' },
  'Baget': { tr: 'Baget', en: 'Baguette', ru: 'Багет' },
};

function getLocalizedField(product: Product, field: 'name' | 'subtitle', locale: Locale): string {
  if (locale === 'tr') return product[field] || '';
  const localizedKey = `${field}_${locale}` as keyof Product;
  const localizedValue = product[localizedKey];
  if (localizedValue && typeof localizedValue === 'string' && localizedValue.trim() !== '') {
    return localizedValue;
  }
  return product[field] || '';
}

function toNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return value;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? null : parsed;
}

export default function CertificatePageClient({ slug, locale = 'tr' }: CertificatePageClientProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setError(t('certificate.notFound'));
        setLoading(false);
        return;
      }
      try {
        if (API_URL) {
          const response = await fetch(`${API_URL}/api/products.php?slug=${encodeURIComponent(slug)}`, {
            credentials: "include",
          });
          if (!response.ok) {
            setError(t('certificate.notFound'));
            setLoading(false);
            return;
          }
          const data = await response.json();
          if (data.error) {
            setError(data.error);
            setLoading(false);
            return;
          }
          setProduct(data);
        } else {
          setError(t('certificate.notFound'));
        }
        setLoading(false);
      } catch {
        setError(t('certificate.notFound'));
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const getStoneName = (stoneType: string): string => stoneTypeMap[stoneType]?.[locale] || stoneType;
  const getCutName = (cut: string | undefined): string => {
    if (!cut) return '-';
    return cutMap[cut]?.[locale] || cut;
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error / Not found
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('certificate.notFound')}</h1>
          <p className="text-gray-600">{t('certificate.notFoundDesc')}</p>
        </div>
      </div>
    );
  }

  const productName = getLocalizedField(product, 'name', locale);
  const productCode = getLocalizedField(product, 'subtitle', locale);
  const weightNum = toNumber(product.gold_weight);
  const mainImg = product.mainImage || product.image || '';

  return (
    <div className="min-h-screen bg-white">
      {/* Yazdırılabilir Sertifika */}
      <div className="max-w-[800px] mx-auto px-6 py-10 print:px-4 print:py-6">

        {/* Firma Başlık */}
        <div className="flex flex-col items-center mb-10 print:mb-6">
          <Image
            src={getAssetPath("/images/han-logo.svg")}
            alt="Han Kuyumculuk"
            width={120}
            height={60}
            className="mb-3 print:w-[80px]"
            style={{ filter: 'brightness(0)' }}
          />
          <h1
            className="text-[13px] tracking-[3px] text-[#2f3237] uppercase mb-1"
            style={{ fontFamily: 'var(--font-bw-modelica)' }}
          >
            Han Kuyumculuk
          </h1>
          <p className="text-[11px] text-gray-500 text-center">
            {t('contact.addressLine1')}, {t('contact.addressLine2')}, {t('contact.addressLine3')}
          </p>
          <p className="text-[11px] text-gray-500">
            {t('contact.phone')}: +90 (242) 335 07 00
          </p>
        </div>

        {/* Sertifika Başlığı */}
        <div className="border-t border-b border-[#d4af37] py-3 mb-8 print:mb-5">
          <h2
            className="text-[24px] leading-[30px] text-[#2f3237] text-center"
            style={{ fontFamily: 'var(--font-faculty-glyphic)' }}
          >
            {t('certificate.title')}
          </h2>
        </div>

        {/* Ürün Bilgileri */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 print:flex-row print:gap-6 print:mb-6">
          {/* Ürün Görseli */}
          {mainImg && (
            <div className="w-full md:w-[200px] shrink-0 print:w-[150px]">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={getAssetPath(mainImg)}
                  alt={productName}
                  fill
                  className="object-contain p-2"
                  sizes="200px"
                />
              </div>
            </div>
          )}

          {/* Ürün Detayları */}
          <div className="flex-1">
            <h3
              className="text-[22px] text-[#2f3237] mb-1"
              style={{ fontFamily: 'var(--font-faculty-glyphic)' }}
            >
              {productName}
            </h3>
            {productCode && (
              <p className="text-[14px] text-gray-500 mb-4" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                {t('certificate.productCode')}: {productCode}
              </p>
            )}

            {/* Altın Bilgileri */}
            <div className="space-y-2">
              {weightNum !== null && (
                <div className="flex">
                  <span className="text-[13px] font-semibold text-[#2f3237] w-[140px]" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {t('certificate.goldWeight')}:
                  </span>
                  <span className="text-[13px] text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {weightNum.toFixed(2).replace('.', ',')} {t('certificate.grams')}
                  </span>
                </div>
              )}
              {product.gold_karat && (
                <div className="flex">
                  <span className="text-[13px] font-semibold text-[#2f3237] w-[140px]" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {t('certificate.goldPurity')}:
                  </span>
                  <span className="text-[13px] text-[#2f3237]" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {product.gold_karat}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Taş Bilgileri Tablosu */}
        {product.stones && product.stones.length > 0 && (
          <div className="mb-10 print:mb-6">
            <h3
              className="text-[18px] text-[#2f3237] mb-4"
              style={{ fontFamily: 'var(--font-faculty-glyphic)' }}
            >
              {t('certificate.stoneDetails')}
            </h3>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#d4af37]">
                  <th className="text-[12px] font-bold text-[#2f3237] py-2 text-left" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {t('certificate.stone')}
                  </th>
                  <th className="text-[12px] font-bold text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {t('certificate.carat')}
                  </th>
                  <th className="text-[12px] font-bold text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {t('certificate.quantity')}
                  </th>
                  <th className="text-[12px] font-bold text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {t('certificate.color')}
                  </th>
                  <th className="text-[12px] font-bold text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {t('certificate.clarity')}
                  </th>
                  <th className="text-[12px] font-bold text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                    {t('certificate.cut')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.stones.map((stone, index) => {
                  const caratNum = toNumber(stone.carat);
                  return (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="text-[12px] text-[#2f3237] py-2" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        {getStoneName(stone.stone_type)}
                      </td>
                      <td className="text-[12px] text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        {caratNum !== null ? caratNum.toFixed(2).replace('.', ',') : '-'}
                      </td>
                      <td className="text-[12px] text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        {stone.quantity}
                      </td>
                      <td className="text-[12px] text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        {stone.color || '-'}
                      </td>
                      <td className="text-[12px] text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        {stone.clarity || '-'}
                      </td>
                      <td className="text-[12px] text-[#2f3237] py-2 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
                        {getCutName(stone.cut)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Alt Bilgi */}
        <div className="border-t border-[#d4af37] pt-4 mt-auto">
          <p className="text-[10px] text-gray-400 text-center" style={{ fontFamily: 'var(--font-bw-modelica)' }}>
            www.hankuyumculuk.com
          </p>
        </div>

        {/* Yazdır Butonu - print'te gizlenir */}
        <div className="mt-8 flex justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-[#d4af37] text-white text-[14px] tracking-[1px] rounded-lg hover:bg-[#c4a030] transition-colors"
            style={{ fontFamily: 'var(--font-bw-modelica)' }}
          >
            {t('certificate.printCertificate')}
          </button>
        </div>
      </div>
    </div>
  );
}
