import CollectionPage from "@/components/CollectionPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function GozumunNuruPage() {
  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
        isTransparent={false}
      />
      <CollectionPage
        heroImage="/images/collection-gozumunnuru-hero.jpg"
        heroTitle="Gözümün Nuru"
        heroSubtitle="Aşkın en saf hali, zamansız pırlantalarla buluşuyor."
        heroDescription="Gözümün Nuru Koleksiyonu; sevginin, bağlılığın ve zarafetin en değerli haliyle tasarlandı. Her bir parça, özenle seçilmiş pırlantalar ve ustalıkla işlenmiş detaylarla, hayatınızdaki en özel anlara eşlik etmek için üretildi."
        products={[
          { id: 1, image: "/images/collection-product-1.jpg" },
          { id: 2, image: "/images/collection-product-2.jpg" },
          { id: 3, image: "/images/collection-product-3.jpg" },
          { id: 4, image: "/images/collection-product-4.jpg" },
          { id: 5, image: "/images/collection-product-5.jpg" },
          { id: 6, image: "/images/collection-product-6.jpg" },
          { id: 7, image: "/images/collection-product-7.jpg" },
          { id: 8, image: "/images/collection-product-8.jpg" },
          { id: 9, image: "/images/collection-product-9.jpg" }
        ]}
        bottomText="Koleksiyonlarımızın tüm ürünlerini görmek için, mağazamıza bekleriz."
        ctaText="MAĞAZAMIZDA REZERVASYON YAPIN"
        ctaLink="/rezervasyon"
      />
      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        description={content.footer.description}
        columns={content.footer.columns}
        socialLinks={content.footer.socialLinks}
        copyright={content.footer.copyright}
      />
    </>
  );
}
