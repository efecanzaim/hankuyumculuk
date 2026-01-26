"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BlogListPage from "@/components/BlogListPage";
import BlogDetailPage from "@/components/BlogDetailPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

export default function BlogPage() {
  const content = useContent();
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    // URL'den slug'ı çıkar: /blog/pirlanta-nedir -> pirlanta-nedir
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length > 1 && pathParts[0] === "blog") {
      setSlug(pathParts[1]);
    } else {
      setSlug(null);
    }
  }, [pathname]);

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isBlogPage={true}
      />
      <main>
        {slug ? <BlogDetailPage slug={slug} /> : <BlogListPage />}
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
