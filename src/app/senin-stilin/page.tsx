import ProductListingPage from "@/components/ProductListingPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function SeninStilinPage() {
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
        heroImage="/images/trend-right.jpg"
        heroTitle="Bu Senin Stilin"
        heroSubtitle="Kendine has bir duruş, sana özel bir seçim."
        heroDescription="Herkesin beğendiği değil,\nsana yakışan önemlidir.\nBu Senin Stilin koleksiyonu,\nkişiliğini yansıtan parçalarla\nkendi tarzını oluşturmanı sağlar."
        categoryTitle="SENİN STİLİN"
        totalProducts={6}
        products={[
          { id: 1, image: "/images/products/style-1.jpg", name: "Kişisel Pırlanta Yüzük", subtitle: "0,45 Karat Tektaş", link: "/urun/kisisel-pirlanta-yuzuk" },
          { id: 2, image: "/images/products/style-2.jpg", name: "Karakter Kolye", subtitle: "18 Ayar Altın", link: "/urun/karakter-kolye" },
          { id: 3, image: "/images/products/style-3.jpg", name: "İmza Küpe", subtitle: "0,30 Karat Pırlanta", link: "/urun/imza-kupe" },
          { id: 4, image: "/images/products/style-4.jpg", name: "Özgün Bileklik", subtitle: "14 Ayar Altın", link: "/urun/ozgun-bileklik" },
          { id: 5, image: "/images/products/style-5.jpg", name: "Tarz Set", subtitle: "1,00 Karat Pırlanta", link: "/urun/tarz-set" },
          { id: 6, image: "/images/products/style-6.jpg", name: "Stil Yüzük", subtitle: "22 Ayar Altın", link: "/urun/stil-yuzuk" }
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
