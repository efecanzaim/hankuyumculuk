"use client";

import { useState, useEffect } from "react";
import ProductDetailPage from "@/components/ProductDetailPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

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
  subtitle: string;
  description: string;
  mainImage: string;
  image: string;
  bannerImage: string;
  banner_image: string;
  galleryImages: string[];
  gallery_images: string[];
  gold_weight?: number | string | null; // API'den number, form'dan string gelebilir
  gold_karat?: number | string | null; // API'den number, form'dan string gelebilir
  stones?: Stone[];
}

interface ProductPageClientProps {
  slug: string;
  initialProduct?: Product | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function ProductPageClient({ slug, initialProduct }: ProductPageClientProps) {
  const content = useContent();
  
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
            // Eğer content.json'da yoksa ve initialProduct varsa onu kullan
            if (initialProduct) {
              setProduct(initialProduct);
              setLoading(false);
            } else {
              setError("Ürün bulunamadı");
              setLoading(false);
            }
          }
        }
      } catch (err) {
        console.error("Ürün yükleme hatası:", err);
        // Hata durumunda initialProduct varsa onu kullan
        if (initialProduct) {
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
        <TopBanner
          text={content.topBanner.text}
          visible={content.topBanner.visible}
        />
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isHero={false}
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
        <TopBanner
          text={content.topBanner.text}
          visible={content.topBanner.visible}
        />
        <Header
          logo={content.header.logo}
          logoAlt={content.header.logoAlt}
          mainNav={content.header.mainNav}
          isHero={false}
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
      <TopBanner
        text={content.topBanner.text}
        visible={content.topBanner.visible}
      />
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
      />
      <ProductDetailPage
        mainImage={product.mainImage || product.image || ""}
        productName={product.name}
        productTitle={product.subtitle}
        description={product.description}
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

