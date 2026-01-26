"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

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

interface BlogDetailPageProps {
  slug: string;
}

export default function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl && slug) {
        try {
          // Tek blog yazısını getir
          const response = await fetch(`${apiUrl}/api/blog.php?slug=${slug}`);
          if (response.ok) {
            const data = await response.json();
            if (data && !data.error) {
              setPost(data);

              // Diğer blog yazılarını getir (ilgili yazılar için)
              const allResponse = await fetch(`${apiUrl}/api/blog.php?status=published`);
              if (allResponse.ok) {
                const allData = await allResponse.json();
                // Mevcut yazıyı hariç tut ve en fazla 4 yazı göster
                const filtered = allData.filter((p: BlogPost) => p.slug !== slug).slice(0, 4);
                setRelatedPosts(filtered);
              }
            } else {
              setError(true);
            }
          } else {
            setError(true);
          }
        } catch (err) {
          console.error("Blog yazısı yüklenemedi:", err);
          setError(true);
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Group posts into rows of 2 for the grid layout
  const groupedPosts: BlogPost[][] = [];
  for (let i = 0; i < relatedPosts.length; i += 2) {
    groupedPosts.push(relatedPosts.slice(i, i + 2));
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p
            className="text-[15px] text-[#2f3237]"
            style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
          >
            Yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white min-h-screen">
        <section className="py-[100px]">
          <div className="max-w-[1430px] mx-auto px-6 text-center">
            <h1
              className="text-[50px] leading-[70px] text-[#2f3237] mb-[30px]"
              style={{ fontFamily: "var(--font-faculty-glyphic), serif" }}
            >
              Blog Yazısı Bulunamadı
            </h1>
            <p
              className="text-[18px] leading-[28px] text-[#666] font-light mb-[40px]"
              style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
            >
              Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.
            </p>
            <Link
              href="/blog"
              className="bg-dark text-light text-[13px] leading-[15px] font-light px-[60px] py-[18px] hover:bg-[#1f2227] transition-colors inline-block"
              style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
            >
              TÜM BLOG YAZILARI
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section - Title */}
      <section className="relative">
        {/* Title - Positioned at top */}
        <div className="pt-[30px] md:pt-[40px] pb-[15px] md:pb-[20px] text-center px-4 md:px-6">
          <h1
            className="text-[28px] leading-[38px] md:text-[50px] md:leading-[70px] text-[#2f3237] max-w-[950px] mx-auto"
            style={{ fontFamily: "var(--font-faculty-glyphic), serif" }}
          >
            {post.title}
          </h1>
        </div>

        {/* Hero Image - Rectangular */}
        <div className="relative max-w-[1189px] mx-auto px-4 md:px-0">
          <div className="relative w-full h-[250px] md:h-[669px]">
            {post.image?.startsWith('http') ? (
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={getAssetPath(post.image || "/images/blog/default.jpg")}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
      </section>

      {/* White Box with Intro Text - Overlapping hero image */}
      <section className="relative -mt-[80px] md:-mt-[200px] z-10 px-4 md:px-0">
        <div className="max-w-[950px] mx-auto bg-white px-6 md:px-[120px] py-[30px] md:py-[50px]">
          <p
            className="text-[18px] leading-[28px] md:text-[30px] md:leading-[40px] font-light text-[#2f3237] text-center"
            style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
          >
            {post.excerpt}
          </p>
          <div className="text-center mt-[15px] md:mt-[20px]">
            <span
              className="text-[12px] md:text-[13px] text-[#666] font-light"
              style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
            >
              {formatDate(post.published_at || post.created_at)} • {post.author}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-[30px] md:py-[40px]">
        <div className="max-w-[709px] mx-auto px-4 md:px-6">
          <div
            className="text-[14px] leading-[24px] md:text-[15px] md:leading-[25px] font-light text-[#2f3237] whitespace-pre-line"
            style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
          >
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-[15px] md:mt-[20px]" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Blog Button */}
      <section className="py-[30px] md:py-[40px]">
        <div className="flex justify-center px-4">
          <Link
            href="/blog"
            className="bg-dark text-light text-[12px] md:text-[13px] leading-[15px] font-light px-[40px] md:px-[60px] py-[15px] md:py-[18px] hover:bg-[#1f2227] transition-colors"
            style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
          >
            TÜM BLOG YAZILARI
          </Link>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="pt-[30px] md:pt-[40px] pb-[60px] md:pb-[100px]">
          <div className="max-w-[1430px] mx-auto px-4 md:px-6">
            {/* Section Title with Lines */}
            <div className="relative mb-[30px] md:mb-[50px]">
              {/* Full width line */}
              <div className="absolute left-0 right-0 top-1/2 h-px bg-primary" />
              {/* Center dark line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] md:w-[470px] h-[2px] bg-dark z-10" />
              {/* Title */}
              <div className="relative z-20 flex justify-center">
                <h2
                  className="text-[16px] md:text-[20px] leading-[24px] md:leading-[30px] font-light text-[#2f3237] bg-white px-[20px] md:px-[40px]"
                  style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
                >
                  DİĞER BLOG YAZILARI
                </h2>
              </div>
            </div>

            {/* Posts Grid - 2 columns per row on desktop, 1 column on mobile */}
            {groupedPosts.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-col md:flex-row justify-center gap-[25px] md:gap-[30px] mb-[40px] md:mb-[60px]"
              >
                {row.map((relPost, colIndex) => (
                  <Link
                    href={`/blog/${relPost.slug}`}
                    key={relPost.id}
                    className="group flex-1 max-w-[700px]"
                  >
                    <div
                      className={`flex flex-col md:flex-row gap-[15px] md:gap-[20px] items-start ${
                        colIndex === 1 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Rectangular Image */}
                      <div className="relative w-full md:w-[470px] h-[220px] md:h-[550px] shrink-0 overflow-hidden">
                        {relPost.image?.startsWith('http') ? (
                          <img
                            src={relPost.image}
                            alt={relPost.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <Image
                            src={getAssetPath(relPost.image || "/images/blog/default.jpg")}
                            alt={relPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>

                      {/* Text Content */}
                      <div
                        className={`flex flex-col justify-center py-[10px] md:py-[40px] ${
                          colIndex === 1 ? "md:text-right text-left" : "text-left"
                        }`}
                      >
                        {/* Post Title */}
                        <h3
                          className="text-[18px] leading-[26px] md:text-[20px] md:leading-[30px] text-[#2f3237] mb-[12px] md:mb-[20px] max-w-full md:max-w-[349px] group-hover:text-primary transition-colors"
                          style={{ fontFamily: "var(--font-faculty-glyphic), serif" }}
                        >
                          {relPost.title}
                        </h3>

                        {/* Post Excerpt */}
                        <p
                          className="text-[14px] leading-[22px] md:text-[15px] md:leading-[25px] font-light text-[#2f3237] max-w-full md:max-w-[350px]"
                          style={{ fontFamily: "var(--font-bw-modelica), sans-serif" }}
                        >
                          {relPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
