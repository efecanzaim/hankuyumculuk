"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { getAssetPath } from "@/utils/paths";

const DEFAULT_TITLE = "Koleksiyonlar";
const DEFAULT_DESCRIPTION = "Her Han koleksiyonu, bir duygunun mücevhere dönüşmüş halidir.\nTasarladığımız her parça; bir anı, bir bağı, bir yakınlığı taşır.\nGösterişten uzak, kalıcı olan için…";
const DEFAULT_CARDS = [
  {
    id: "gozumun-nuru",
    href: "/koleksiyon/gozumun-nuru",
    image: "/images/collection-menu-hero.jpg",
    title: "Gözümün Nuru",
    titleFont: "Buljirya, cursive",
  },
];

export default function KoleksiyonPage() {
  const content = useContent();
  const sayfasi = (content as Record<string, unknown>).koleksiyonSayfasi as Record<string, unknown> | undefined;

  const pageTitle = (sayfasi?.title as string) || DEFAULT_TITLE;
  const pageDescription = (sayfasi?.description as string) || DEFAULT_DESCRIPTION;
  const cards = ((sayfasi?.cards as unknown[])?.length ? sayfasi?.cards as typeof DEFAULT_CARDS : DEFAULT_CARDS);

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isTransparent={false}
        bannerText={content.topBanner?.text}
        bannerVisible={content.topBanner?.visible}
      />

      {/* Sayfa Yazısı */}
      <section className="pt-[141px] pb-[80px] bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] text-[#2f3237]/50 uppercase mb-6">
            Han Kuyumculuk
          </p>
          <h1
            className="text-[40px] md:text-[56px] text-[#2f3237] mb-8"
            style={{ fontFamily: "var(--font-faculty-glyphic), serif" }}
          >
            {pageTitle}
          </h1>
          <div className="w-[60px] h-[1px] bg-primary mx-auto mb-10" />
          <p className="text-[16px] md:text-[18px] font-light text-[#2f3237]/70 leading-[1.9] whitespace-pre-line">
            {pageDescription}
          </p>
        </div>
      </section>

      {/* Koleksiyon Kutuları */}
      <section className="pb-[120px] bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
            {cards.map((col) => (
              <Link key={col.id} href={col.href} className="group block">
                {/* Fotoğraf */}
                <div className="relative aspect-[3/4] w-full bg-[#f0efed] overflow-hidden">
                  {col.image ? (
                    <Image
                      src={getAssetPath(col.image)}
                      alt={col.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2f3237]/20 text-[13px] tracking-widest uppercase">
                      Görsel Ekle
                    </div>
                  )}
                  {/* Hover iç gölge */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0)] group-hover:shadow-[inset_0_0_60px_rgba(0,0,0,0.45)] transition-shadow duration-500" />
                </div>
                {/* Yazı alanı */}
                <div className="pt-4 pb-2">
                  <h2
                    className="text-[26px] lowercase text-[#2f3237]"
                    style={{ fontFamily: col.titleFont }}
                  >
                    {col.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        columns={content.footer.columns}
        copyright={content.footer.copyright}
        socialLinks={content.footer.socialLinks}
      />
    </>
  );
}
