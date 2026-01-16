import ProductListingPage from "@/components/ProductListingPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function YeniTrendPage() {
  return (
    <>
      <TopBanner
        text={content.topBanner.text}
        visible={content.topBanner.visible}
        topLinks={content.header.topLinks}
      />
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
      />
      <ProductListingPage
        heroImage="/images/trend-left.jpg"
        heroTitle="Yeni Trend"
        heroSubtitle="Sezonun en çok aranan parçaları."
        heroDescription="Moda değişir, tarz kalır.\nHan'ın yeni trend koleksiyonu,\nşıklığı zamansız çizgilerle buluşturuyor.\nHer parça, güncel esintileri\nklasik zarafetle harmanlıyor."
        categoryTitle="YENİ TREND"
        totalProducts={6}
        products={[
          { id: 1, image: "/images/products/trend-1.jpg", name: "Trend Pırlanta Kolye", subtitle: "0,35 Karat Pırlanta", link: "/urun/trend-pirlanta-kolye" },
          { id: 2, image: "/images/products/trend-2.jpg", name: "Modern Altın Yüzük", subtitle: "18 Ayar Altın", link: "/urun/modern-altin-yuzuk" },
          { id: 3, image: "/images/products/trend-3.jpg", name: "Geometrik Küpe", subtitle: "14 Ayar Altın", link: "/urun/geometrik-kupe" },
          { id: 4, image: "/images/products/trend-4.jpg", name: "Minimalist Bileklik", subtitle: "18 Ayar Altın", link: "/urun/minimalist-bileklik" },
          { id: 5, image: "/images/products/trend-5.jpg", name: "Statement Kolye", subtitle: "0,50 Karat Pırlanta", link: "/urun/statement-kolye" },
          { id: 6, image: "/images/products/trend-6.jpg", name: "Trend Set", subtitle: "Pırlanta Set", link: "/urun/trend-set" }
        ]}
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
