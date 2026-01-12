import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ProductDetailPage";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

// Get all products from all categories
function getAllProducts() {
  const allProducts: Record<string, typeof content.productDetails[keyof typeof content.productDetails]> = {};
  
  // Add products from productDetails
  Object.entries(content.productDetails).forEach(([slug, product]) => {
    allProducts[slug] = product;
  });
  
  return allProducts;
}

// Generate static params for all products
export function generateStaticParams() {
  const products = getAllProducts();
  return Object.keys(products).map((slug) => ({
    slug: slug,
  }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = getAllProducts();
  const product = products[slug];

  if (!product) {
    notFound();
  }

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
      <ProductDetailPage
        mainImage={product.mainImage}
        productName={product.productName}
        productTitle={product.productTitle}
        description={product.description}
        bannerImage={product.bannerImage}
        galleryImages={product.galleryImages}
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

