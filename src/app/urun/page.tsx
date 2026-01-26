"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ProductPageClient from "@/components/ProductPageClient";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

export default function UrunPage() {
  const content = useContent();
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    // URL'den slug'ı çıkar: /urun/YZK-180001 -> YZK-180001
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length > 1 && pathParts[0] === "urun") {
      setSlug(pathParts[1]);
    } else {
      setSlug(null);
    }
  }, [pathname]);

  // Eğer slug yoksa, ürün listesi göster (gelecekte eklenebilir)
  if (!slug) {
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
            <p className="text-gray-600">Lütfen geçerli bir ürün URL'si girin.</p>
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

  return <ProductPageClient slug={slug} initialProduct={null} />;
}

