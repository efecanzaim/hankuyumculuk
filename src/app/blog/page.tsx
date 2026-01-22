"use client";

import BlogArticlePage from "@/components/BlogArticlePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

// Blog article data matching Figma design
const articleData = {
  title: "Pırlantanın Hikâyesi, Zarafetin İlhamı",
  introText: "Pırlantanın anlamını, zarafetin detaylarını ve özel anlara ilham veren hikâyeleri keşfedin. Yüzük seçiminden bakım önerilerine, aşkın en değerli sembollerine dair her şey Gözümün Nuru Blog'da.",
  heroImage: "/images/products/featured-large-1.jpg",
  articleContent: `Pırlanta, yalnızca bir mücevher değil; bir duygunun, bir kararın ve bir hikâyenin sembolüdür. Gözümün Nuru Blog'da, pırlantanın zamansız ışıltısının ardındaki anlamı ve zarafetin ilham veren detaylarını keşfedeceksiniz.

Amacımız yalnızca bilgi vermek değil; doğru seçimi yapmanızı sağlamak, duyguyu hissettirmek ve her pırlantanın ardındaki hikâyeyi görünür kılmaktır. Çünkü bazı ışıltılar sadece parlamakla kalmaz, bir ömür anlatır.`,
  previousPost: {
    title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
    excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır.",
    image: "/images/products/product-1.jpg",
    slug: "isiltinin-ardindaki-anlam",
  },
  nextPost: {
    title: "Pırlantanın Hikâyesi:\nZamanı Aşan Bir Işıltı",
    excerpt: "Pırlanta, yalnızca bir mücevher değil; duyguların sembolüdür.",
    image: "/images/products/product-2.jpg",
    slug: "pirlantanin-hikayesi",
  },
  relatedPosts: [
    {
      id: "1",
      title: "Işıltının Ardındaki Anlam",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır.",
      image: "/images/products/product-1.jpg",
      slug: "isiltinin-ardindaki-anlam",
    },
    {
      id: "2",
      title: "Pırlantanın Hikâyesi",
      excerpt: "Pırlanta, yalnızca bir mücevher değil.",
      image: "/images/products/product-2.jpg",
      slug: "pirlantanin-hikayesi",
    },
  ],
};

export default function BlogPage() {
  const content = useContent();

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isBlogPage={true}
      />
      <main>
        <BlogArticlePage {...articleData} />
      </main>
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
