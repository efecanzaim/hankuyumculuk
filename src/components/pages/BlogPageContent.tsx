"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BlogListPage from "@/components/BlogListPage";
import BlogDetailPage from "@/components/BlogDetailPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface BlogPageContentProps {
  locale: Locale;
}

export default function BlogPageContent({ locale }: BlogPageContentProps) {
  const content = useContent(locale);
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    // Get the blog base path for the current locale (e.g. "/blog", "/en/blog", "/ru/blog")
    const blogBasePath = getLocalizedPath('blog', locale);
    // If the current path is longer than the blog base, extract the slug
    if (pathname.startsWith(blogBasePath + '/')) {
      const remainder = pathname.slice(blogBasePath.length + 1);
      if (remainder) {
        setSlug(remainder);
      } else {
        setSlug(null);
      }
    } else {
      setSlug(null);
    }
  }, [pathname, locale]);

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
