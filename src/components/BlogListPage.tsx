"use client";

import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  status: "draft" | "published";
  created_at: string;
  published_at: string;
}

function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "...";
}

interface BlogListPageProps {
  locale?: Locale;
}

export default function BlogListPage({ locale = 'tr' }: BlogListPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const t = useTranslation(locale);

  useEffect(() => {
    const fetchPosts = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl) {
        try {
          const langParam = locale !== 'tr' ? `&lang=${locale}` : '';
          const response = await fetch(`${apiUrl}/api/blog.php?status=published${langParam}`);
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          }
        } catch (error) {
          console.warn("Blog yazıları yüklenemedi:", error);
        }
      }
      setLoading(false);
    };
    fetchPosts();
  }, [locale]);

  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 6, posts.length));
  };

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, visiblePosts);
  const hasMorePosts = visiblePosts < posts.length;

  const groupedPosts: BlogPost[][] = [];
  for (let i = 0; i < otherPosts.length; i += 2) {
    groupedPosts.push(otherPosts.slice(i, i + 2));
  }

  const dateLocale = locale === 'en' ? 'en-GB' : locale === 'ru' ? 'ru-RU' : 'tr-TR';
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" });
  };

  const blogBasePath = getLocalizedPath('blog', locale);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-[15px] text-[#2f3237]" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
            {t('common.loading')}
          </p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <section className="py-[100px]">
          <div className="max-w-[1430px] mx-auto px-6 text-center">
            <h1 className="text-[50px] leading-[70px] text-[#2f3237] mb-[30px]" style={{ fontFamily: "var(--font-faculty-glyphic), serif" }}>
              Blog
            </h1>
            <p className="text-[18px] leading-[28px] text-[#666] font-light" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
              {t('blog.noPosts')}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {featuredPost && (
        <section className="relative">
          <div className="pt-[40px] md:pt-[40px] pb-[20px] text-center px-4 md:px-6">
            <Link href={`${blogBasePath}/${featuredPost.slug}`}>
              <h1 className="text-[30px] leading-[40px] md:text-[50px] md:leading-[70px] text-[#2f3237] max-w-[950px] mx-auto hover:text-primary transition-colors cursor-pointer" style={{ fontFamily: "var(--font-faculty-glyphic), serif" }}>
                {featuredPost.title}
              </h1>
            </Link>
          </div>

          <Link href={`${blogBasePath}/${featuredPost.slug}`} className="block">
            <div className="relative max-w-[1189px] mx-auto px-4 md:px-0">
              <div className="relative w-full h-[300px] md:h-[669px] overflow-hidden group">
                {featuredPost.image?.startsWith('http') ? (
                  <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <Image src={getAssetPath(featuredPost.image || "/images/blog/default.jpg")} alt={featuredPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
                )}
              </div>
            </div>
          </Link>

          <div className="relative -mt-[100px] md:-mt-[200px] z-10 px-4 md:px-0">
            <div className="max-w-[950px] mx-auto bg-white px-6 md:px-[120px] py-[30px] md:py-[50px]">
              <p className="text-[18px] leading-[28px] md:text-[30px] md:leading-[40px] font-light text-[#2f3237] text-center mb-[20px] md:mb-[30px]" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
                {truncateText(featuredPost.excerpt, 150)}
              </p>
              <div className="flex flex-col items-center gap-[15px]">
                <span className="text-[12px] md:text-[13px] text-[#666] font-light" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
                  {formatDate(featuredPost.published_at || featuredPost.created_at)} • {featuredPost.author}
                </span>
                <Link href={`${blogBasePath}/${featuredPost.slug}`} className="bg-dark text-light text-[12px] md:text-[13px] leading-[15px] font-light px-[40px] md:px-[60px] py-[15px] md:py-[18px] hover:bg-[#1f2227] transition-colors" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
                  {t('common.readMore').toUpperCase()}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {otherPosts.length > 0 && (
        <section className="pt-[40px] md:pt-[60px] pb-[60px] md:pb-[100px]">
          <div className="max-w-[1430px] mx-auto px-4 md:px-6">
            <div className="relative mb-[30px] md:mb-[50px]">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-primary" />
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] md:w-[470px] h-[2px] bg-dark z-10" />
              <div className="relative z-20 flex justify-center">
                <h2 className="text-[16px] md:text-[20px] leading-[24px] md:leading-[30px] font-light text-[#2f3237] bg-white px-[20px] md:px-[40px]" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
                  {t('blog.otherPosts').toUpperCase()}
                </h2>
              </div>
            </div>

            {groupedPosts.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col md:flex-row justify-center gap-[30px] md:gap-[30px] mb-[40px] md:mb-[60px]">
                {row.map((post, colIndex) => (
                  <Link href={`${blogBasePath}/${post.slug}`} key={post.id} className="group flex-1 max-w-[700px]">
                    <div className={`flex flex-col md:flex-row gap-[15px] md:gap-[20px] items-start ${colIndex === 1 ? "md:flex-row-reverse" : ""}`}>
                      <div className="relative w-full md:w-[470px] h-[250px] md:h-[550px] shrink-0 overflow-hidden">
                        {post.image?.startsWith('http') ? (
                          <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <Image src={getAssetPath(post.image || "/images/blog/default.jpg")} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                      </div>
                      <div className={`flex flex-col justify-center py-[10px] md:py-[40px] ${colIndex === 1 ? "md:text-right text-left" : "text-left"}`}>
                        <span className="text-[11px] md:text-[12px] text-[#666] font-light mb-[8px] md:mb-[10px]" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                        <h3 className="text-[18px] leading-[26px] md:text-[20px] md:leading-[30px] text-[#2f3237] mb-[12px] md:mb-[20px] max-w-full md:max-w-[349px] group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-faculty-glyphic), serif" }}>
                          {post.title}
                        </h3>
                        <p className="text-[14px] leading-[22px] md:text-[15px] md:leading-[25px] font-light text-[#2f3237] max-w-full md:max-w-[350px] mb-[15px] md:mb-[20px]" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
                          {truncateText(post.excerpt, 100)}
                        </p>
                        <span className="text-[12px] md:text-[13px] font-light text-primary group-hover:underline" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
                          {t('common.readMore')} →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}

            {hasMorePosts && (
              <div className="flex justify-center mt-[30px] md:mt-[40px]">
                <button onClick={loadMorePosts} className="bg-dark text-light text-[12px] md:text-[13px] leading-[15px] font-light px-[40px] md:px-[60px] py-[15px] md:py-[18px] hover:bg-[#1f2227] transition-colors" style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}>
                  {t('blog.loadMore').toUpperCase()}
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
