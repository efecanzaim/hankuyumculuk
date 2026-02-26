"use client";

import { useState, useEffect } from "react";
import ProductDetailPage from "@/components/ProductDetailPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import type { Locale } from "@/i18n/config";

interface Stone {
  id?: number;
  stone_type: string;
  carat: number | string | null; // API'den number/string gelebilir
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
  description: string;
  description_en?: string;
  description_ru?: string;
  mainImage: string;
  image: string;
  bannerImage: string;
  banner_image: string;
  galleryImages: string[];
  gallery_images: string[];
  gold_weight?: number | string | null;
  gold_karat?: number | string | null;
  stones?: Stone[];
}

interface ProductPageClientProps {
  slug: string;
  initialProduct?: Product | null;
  locale?: Locale;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Demo ürün verisi (development için)
const demoProduct: Product = {
  id: 1,
  slug: "demo-urun",
  name: "Işıltı",
  subtitle: "Pırlanta Tektaş Yüzük",
  description: "Zamansız bir zarafet sunan bu pırlanta tektaş yüzük, özel anlarınızı taçlandırmak için tasarlandı. Her detayında ustalık ve özen barındıran bu parça, sevdiklerinize olan bağlılığınızın en güzel ifadesi.",
  mainImage: "/images/collection-product-1.jpg",
  image: "/images/collection-product-1.jpg",
  bannerImage: "/images/parallax-bg.jpg",
  banner_image: "/images/parallax-bg.jpg",
  galleryImages: [
    "/images/collection-product-2.jpg",
    "/images/collection-product-3.jpg",
    "/images/collection-product-4.jpg",
  ],
  gallery_images: [
    "/images/collection-product-2.jpg",
    "/images/collection-product-3.jpg",
    "/images/collection-product-4.jpg",
  ],
  gold_weight: 4.73,
  gold_karat: "18 Ayar",
  stones: [
    {
      id: 1,
      stone_type: "Pırlanta",
      carat: 0.50,
      quantity: 1,
      color: "F",
      clarity: "VS1",
      cut: "Yuvarlak",
    },
    {
      id: 2,
      stone_type: "Pırlanta",
      carat: 0.10,
      quantity: 12,
      color: "G",
      clarity: "VS2",
      cut: "Trapez",
    },
  ],
};

// Locale'e göre doğru alanı seç
function getLocalizedField(product: Product, field: 'name' | 'subtitle' | 'description', locale: Locale): string {
  if (locale === 'tr') return product[field] || '';
  const localizedKey = `${field}_${locale}` as keyof Product;
  const localizedValue = product[localizedKey];
  if (localizedValue && typeof localizedValue === 'string' && localizedValue.trim() !== '') {
    return localizedValue;
  }
  return product[field] || '';
}

export default function ProductPageClient({ slug, initialProduct, locale = 'tr' }: ProductPageClientProps) {
  const content = useContent(locale);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setError("Ürün bulunamadı");
        setLoading(false);
        return;
      }

      try {
        if (API_URL) {
          // Production: API'den çek (her zaman)
          const response = await fetch(`${API_URL}/api/products.php?slug=${encodeURIComponent(slug)}`, {
            credentials: "include",
          });

          if (!response.ok) {
            if (response.status === 404) {
              setError("Ürün bulunamadı");
            } else {
              setError("Ürün yüklenirken hata oluştu");
            }
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
          setLoading(false);
        } else {
          // Development: content.json'dan çek (fallback)
          const allProducts: Record<string, any> = {};
          
          // content.json'dan ürünleri topla
          if (content.productDetails) {
            Object.entries(content.productDetails).forEach(([key, prod]: [string, any]) => {
              allProducts[key] = prod;
            });
          }

          const foundProduct = allProducts[slug];
          
          if (foundProduct) {
            // content.json formatını API formatına çevir
            setProduct({
              id: 0,
              slug: slug,
              name: foundProduct.productName || foundProduct.name || "",
              subtitle: foundProduct.productTitle || foundProduct.subtitle || "",
              description: foundProduct.description || "",
              mainImage: foundProduct.mainImage || "",
              image: foundProduct.mainImage || "",
              bannerImage: foundProduct.bannerImage || "",
              banner_image: foundProduct.bannerImage || "",
              galleryImages: foundProduct.galleryImages || [],
              gallery_images: foundProduct.galleryImages || [],
            });
            setLoading(false);
          } else {
            // Eğer content.json'da yoksa demo ürünü göster (development)
            console.log("Demo ürün gösteriliyor - slug:", slug);
            setProduct({
              ...demoProduct,
              slug: slug,
            });
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Ürün yükleme hatası:", err);
        // Hata durumunda demo ürünü göster (development)
        if (!API_URL) {
          console.log("Demo ürün gösteriliyor (hata sonrası)");
          setProduct({
            ...demoProduct,
            slug: slug,
          });
        } else if (initialProduct) {
          setProduct(initialProduct);
        } else {
          setError("Ürün yüklenirken hata oluştu");
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]); // content ve initialProduct dependency'den çıkarıldı - sadece slug değiştiğinde fetch et

  if (loading) {
    return (
      <>
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isHero={false}
          bannerText={content.topBanner?.text}
          bannerVisible={content.topBanner?.visible}
        />
        <div className="min-h-screen bg-white pt-[141px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Ürün yükleniyor...</p>
          </div>
        </div>
        <Footer
          logo={content.footer.logo}
          slogan={content.footer.slogan}
          description={content.footer.description}
          columns={content.footer.columns}
          copyright={content.footer.copyright}
          socialLinks={content.footer.socialLinks}
        />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isHero={false}
          bannerText={content.topBanner?.text}
          bannerVisible={content.topBanner?.visible}
        />
        <div className="min-h-screen bg-white pt-[141px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Ürün Bulunamadı</h1>
            <p className="text-gray-600">{error || "Aradığınız ürün bulunamadı."}</p>
          </div>
        </div>
        <Footer
          logo={content.footer.logo}
          slogan={content.footer.slogan}
          description={content.footer.description}
          columns={content.footer.columns}
          copyright={content.footer.copyright}
          socialLinks={content.footer.socialLinks}
        />
      </>
    );
  }

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
        bannerText={content.topBanner?.text}
        bannerVisible={content.topBanner?.visible}
      />
      <ProductDetailPage
        mainImage={product.mainImage || product.image || ""}
        productName={getLocalizedField(product, 'name', locale)}
        productTitle={getLocalizedField(product, 'subtitle', locale)}
        description={getLocalizedField(product, 'description', locale)}
        bannerImage={product.bannerImage || product.banner_image || ""}
        galleryImages={product.galleryImages || product.gallery_images || []}
        goldWeight={product.gold_weight}
        goldKarat={product.gold_karat}
        stones={product.stones}
      />
      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        description={content.footer.description}
        columns={content.footer.columns}
        copyright={content.footer.copyright}
        socialLinks={content.footer.socialLinks}
      />
    </>
  );
}

