"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { getAssetPath } from "@/utils/paths";
import CollectionPage from "@/components/pages/CollectionPage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const DEFAULT_TITLE = "Koleksiyonlar";
const DEFAULT_DESCRIPTION = "Her Han koleksiyonu, bir duygunun mücevhere dönüşmüş halidir.\nTasarladığımız her parça; bir anı, bir bağı, bir yakınlığı taşır.\nGösterişten uzak, kalıcı olan için…";

interface CategoryCard {
  id: string;
  href: string;
  image: string | null;
  title: string;
  titleFont: string;
  heroTitleImage?: string | null;
}

export default function KoleksiyonPage() {
  const pathname = usePathname();
  const content = useContent();
  const [dynamicCards, setDynamicCards] = useState<CategoryCard[]>([]);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/api/categories.php?parentType=koleksiyon`)
      .then(r => r.ok ? r.json() : [])
      .then((data: Array<{ id: number; name: string; slug: string; heroImage?: string; content?: string }>) => {
        if (!Array.isArray(data)) return;
        const mapped: CategoryCard[] = data.map(col => {
          let heroTitleImage: string | null = null;
          try {
            if (col.content) {
              const parsed = typeof col.content === 'string' ? JSON.parse(col.content) : col.content;
              heroTitleImage = (parsed as Record<string, unknown>)?.heroTitleImage as string || null;
            }
          } catch { /* ignore */ }
          return {
            id: col.slug,
            href: col.slug === 'gozumun-nuru' ? '/koleksiyon/gozumun-nuru' : `/koleksiyon/${col.slug}`,
            image: col.heroImage || null,
            title: col.name,
            titleFont: col.slug === 'gozumun-nuru' ? 'Buljirya, cursive' : 'var(--font-faculty-glyphic), serif',
            heroTitleImage,
          };
        });
        setDynamicCards(mapped);
      })
      .catch(() => {});
  }, []);

  // Eğer URL'de slug varsa (ör: /koleksiyon/yeni-koleksiyon), koleksiyon detay sayfasını göster
  const slug = useMemo(() => {
    const base = '/koleksiyon';
    if (pathname && pathname.startsWith(base + '/')) {
      const s = pathname.slice(base.length + 1).replace(/\/$/, '');
      if (s && s !== 'gozumun-nuru') return s;
    }
    return null;
  }, [pathname]);

  if (slug) {
    return <CollectionPage locale="tr" slug={slug} />;
  }

  const sayfasi = (content as Record<string, unknown>).koleksiyonSayfasi as Record<string, unknown> | undefined;
  const pageTitle = (sayfasi?.title as string) || DEFAULT_TITLE;
  const pageDescription = (sayfasi?.description as string) || DEFAULT_DESCRIPTION;
  const ksCards = (sayfasi?.cards as CategoryCard[]) || [];

  let cards: CategoryCard[];
  if (dynamicCards.length > 0 || ksCards.length > 0) {
    // Admin "Koleksiyon Kartları"ndaki değerler önceliklidir; boş bırakılırsa API verisine düşer
    const mergedCards = dynamicCards.map(card => {
      const ksCard = ksCards.find(k => k.href === card.href);
      if (!ksCard) return card;
      return {
        ...card,
        title: ksCard.title || card.title,
        image: ksCard.image || card.image || null,
        heroTitleImage: ksCard.heroTitleImage || card.heroTitleImage || null,
      };
    });
    // API'de olmayan ama admin içerik kartlarında olan kartları ekle
    const dynamicHrefs = new Set(dynamicCards.map(c => c.href));
    const extraCards = ksCards.filter(k => !dynamicHrefs.has(k.href));
    cards = [...mergedCards, ...extraCards];
  } else {
    cards = [{ id: "gozumun-nuru", href: "/koleksiyon/gozumun-nuru", image: "/images/collection-menu-hero.jpg", title: "Gözümün Nuru", titleFont: "Buljirya, cursive" }];
  }

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
                    <div className="w-full h-full flex items-center justify-center px-6">
                      <span
                        className="text-[32px] md:text-[40px] text-[#2f3237]/40 lowercase text-center leading-tight"
                        style={{ fontFamily: col.titleFont }}
                      >
                        {col.title}
                      </span>
                    </div>
                  )}
                  {/* Hover iç gölge */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0)] group-hover:shadow-[inset_0_0_60px_rgba(0,0,0,0.45)] transition-shadow duration-500" />
                </div>
                {/* Yazı alanı */}
                <div className="pt-4 pb-2">
                  {col.heroTitleImage ? (
                    <Image
                      src={getAssetPath(col.heroTitleImage)}
                      alt={col.title}
                      width={300}
                      height={48}
                      className="h-[48px] w-auto object-contain"
                    />
                  ) : (
                    <h2
                      className="text-[26px] lowercase text-[#2f3237]"
                      style={{ fontFamily: col.titleFont }}
                    >
                      {col.title}
                    </h2>
                  )}
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
