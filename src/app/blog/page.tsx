import BlogArticlePage from "@/components/BlogArticlePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

// Blog article data matching Figma design
const articleData = {
  title: "Pırlantanın Hikâyesi, Zarafetin İlhamı",
  introText: "Pırlantanın anlamını, zarafetin detaylarını ve özel anlara ilham veren hikâyeleri keşfedin. Yüzük seçiminden bakım önerilerine, aşkın en değerli sembollerine dair her şey Gözümün Nuru Blog'da.",
  heroImage: "/images/products/featured-large-1.jpg",
  articleContent: `Pırlanta, yalnızca bir mücevher değil; bir duygunun, bir kararın ve bir hikâyenin sembolüdür. Gözümün Nuru Blog'da, pırlantanın zamansız ışıltısının ardındaki anlamı ve zarafetin ilham veren detaylarını keşfedeceksiniz. Bu alanda; yüzük seçerken dikkat edilmesi gerekenlerden pırlanta bakımına, evlilik tekliflerine ilham veren fikirlerden özel günlere anlam katan zarif dokunuşlara kadar pek çok içeriği bulabilirsiniz. Her yazı, estetik anlayışımız ve uzman bakış açımızla hazırlanarak sizlere sunulur.

Amacımız yalnızca bilgi vermek değil; doğru seçimi yapmanızı sağlamak, duyguyu hissettirmek ve her pırlantanın ardındaki hikâyeyi görünür kılmaktır. Çünkü bazı ışıltılar sadece parlamakla kalmaz, bir ömür anlatır.

Pırlanta, yalnızca bir mücevher değil; bir duygunun, bir kararın ve bir hikâyenin sembolüdür. Gözümün Nuru Blog'da, pırlantanın zamansız ışıltısının ardındaki anlamı ve zarafetin ilham veren detaylarını keşfedeceksiniz. Bu alanda; yüzük seçerken dikkat edilmesi gerekenlerden pırlanta bakımına, evlilik tekliflerine ilham veren fikirlerden özel günlere anlam katan zarif dokunuşlara kadar pek çok içeriği bulabilirsiniz. Her yazı, estetik anlayışımız ve uzman bakış açımızla hazırlanarak sizlere sunulur.

Amacımız yalnızca bilgi vermek değil; doğru seçimi yapmanızı sağlamak, duyguyu hissettirmek ve her pırlantanın ardındaki hikâyeyi görünür kılmaktır. Çünkü bazı ışıltılar sadece parlamakla kalmaz, bir ömür anlatır.`,
  previousPost: {
    title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
    excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
    image: "/images/products/product-1.jpg",
    slug: "isiltinin-ardindaki-anlam",
  },
  nextPost: {
    title: "Pırlantanın Hikâyesi:\nZamanı Aşan Bir Işıltı",
    excerpt: "Pırlanta, yalnızca bir mücevher değil; duyguların, anıların ve zamansız zarafetin sembolüdür. Yüzyıllardır aşkı, bağlılığı ve özel anları temsil eden bu eşsiz taş, doğanın milyonlarca yılda",
    image: "/images/products/product-2.jpg",
    slug: "pirlantanin-hikayesi",
  },
  relatedPosts: [
    {
      id: "1",
      title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
      image: "/images/products/product-1.jpg",
      slug: "isiltinin-ardindaki-anlam",
    },
    {
      id: "2",
      title: "Pırlantanın Hikâyesi:\nZamanı Aşan Bir Işıltı",
      excerpt: "Pırlanta, yalnızca bir mücevher değil; duyguların, anıların ve zamansız zarafetin sembolüdür. Yüzyıllardır aşkı, bağlılığı ve özel anları temsil eden bu eşsiz taş, doğanın milyonlarca yılda",
      image: "/images/products/product-2.jpg",
      slug: "pirlantanin-hikayesi",
    },
    {
      id: "3",
      title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
      image: "/images/products/product-3.jpg",
      slug: "isiltinin-ardindaki-anlam-2",
    },
    {
      id: "4",
      title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
      image: "/images/products/product-4.jpg",
      slug: "isiltinin-ardindaki-anlam-3",
    },
    {
      id: "5",
      title: "Pırlantanın Hikâyesi:\nZamanı Aşan Bir Işıltı",
      excerpt: "Pırlanta, yalnızca bir mücevher değil; duyguların, anıların ve zamansız zarafetin sembolüdür. Yüzyıllardır aşkı, bağlılığı ve özel anları temsil eden bu eşsiz taş, doğanın milyonlarca yılda",
      image: "/images/products/featured-large-1.jpg",
      slug: "pirlantanin-hikayesi-2",
    },
    {
      id: "6",
      title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
      image: "/images/products/featured-large-2.jpg",
      slug: "isiltinin-ardindaki-anlam-4",
    },
    {
      id: "7",
      title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
      image: "/images/products/product-1.jpg",
      slug: "isiltinin-ardindaki-anlam-5",
    },
    {
      id: "8",
      title: "Pırlantanın Hikâyesi:\nZamanı Aşan Bir Işıltı",
      excerpt: "Pırlanta, yalnızca bir mücevher değil; duyguların, anıların ve zamansız zarafetin sembolüdür. Yüzyıllardır aşkı, bağlılığı ve özel anları temsil eden bu eşsiz taş, doğanın milyonlarca yılda",
      image: "/images/products/product-2.jpg",
      slug: "pirlantanin-hikayesi-3",
    },
    {
      id: "9",
      title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
      image: "/images/products/product-3.jpg",
      slug: "isiltinin-ardindaki-anlam-6",
    },
    {
      id: "10",
      title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
      image: "/images/products/product-4.jpg",
      slug: "isiltinin-ardindaki-anlam-7",
    },
    {
      id: "11",
      title: "Pırlantanın Hikâyesi:\nZamanı Aşan Bir Işıltı",
      excerpt: "Pırlanta, yalnızca bir mücevher değil; duyguların, anıların ve zamansız zarafetin sembolüdür. Yüzyıllardır aşkı, bağlılığı ve özel anları temsil eden bu eşsiz taş, doğanın milyonlarca yılda",
      image: "/images/products/featured-large-1.jpg",
      slug: "pirlantanin-hikayesi-4",
    },
    {
      id: "12",
      title: "Işıltının Ardındaki Anlam\nHan Kuyumculuk",
      excerpt: "Bir pırlanta, ışığı yansıtmakla kalmaz; hisleri de taşır. İlk bakışta parlayan bir detay gibi görünse de, aslında her pırlanta bir yolculuğun izlerini taşır. Karar anlarını, beklenen soruları ve kalpten gelen",
      image: "/images/products/featured-large-2.jpg",
      slug: "isiltinin-ardindaki-anlam-8",
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      {/* Top Banner is hidden on blog page per Figma design */}
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
