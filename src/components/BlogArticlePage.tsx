"use client";

import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
import { useState } from "react";

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

interface NavigationPost {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

interface BlogArticlePageProps {
  // Hero Section
  title: string;
  introText: string;
  heroImage: string;
  
  // Article Content
  articleContent: string;
  
  // Navigation Posts
  previousPost?: NavigationPost;
  nextPost?: NavigationPost;
  
  // Related Posts
  relatedPosts: RelatedPost[];
}

export default function BlogArticlePage({
  title,
  introText,
  heroImage,
  articleContent,
  previousPost,
  nextPost,
  relatedPosts,
}: BlogArticlePageProps) {
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + 6, relatedPosts.length));
  };

  const displayedPosts = relatedPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < relatedPosts.length;

  // Group posts into rows of 2 for the grid layout (matching Figma)
  const groupedPosts: RelatedPost[][] = [];
  for (let i = 0; i < displayedPosts.length; i += 2) {
    groupedPosts.push(displayedPosts.slice(i, i + 2));
  }

  return (
    <div className="bg-white">
      {/* Hero Section - Title */}
      <section className="relative">
        {/* Title - Positioned at top */}
        <div className="pt-[40px] pb-[20px] text-center">
          <h1 
            className="text-[50px] leading-[70px] text-[#2f3237] max-w-[950px] mx-auto"
            style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
          >
            {title.split(',').map((part, index) => (
              <span key={index} className={index > 0 ? "block" : ""}>
                {part.trim()}{index === 0 && title.includes(',') ? ',' : ''}
              </span>
            ))}
          </h1>
        </div>

        {/* Hero Image - Rectangular */}
        <div className="relative max-w-[1189px] mx-auto">
          <div className="relative w-full h-[669px]">
            <Image
              src={getAssetPath(heroImage)}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* White Box with Intro Text - Overlapping hero image */}
      <section className="relative -mt-[200px] z-10">
        <div className="max-w-[950px] mx-auto bg-white px-[120px] py-[50px]">
          <p 
            className="text-[30px] leading-[40px] font-light text-[#2f3237] text-center"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {introText}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-[40px]">
        <div className="max-w-[709px] mx-auto px-6">
          <div 
            className="text-[15px] leading-[20px] font-light text-[#2f3237] text-center whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {articleContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-[20px]" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Previous / Next Navigation with Rectangular Images */}
      {(previousPost || nextPost) && (
        <section className="py-[60px]">
          <div className="max-w-[1430px] mx-auto px-6">
            <div className="flex justify-between items-start">
              {/* Previous Post - Left Side */}
              {previousPost ? (
                <Link href={`/blog/${previousPost.slug}`} className="group flex gap-[20px] items-start max-w-[600px]">
                  {/* Rectangular Image */}
                  <div className="relative w-[230px] h-[269px] shrink-0 overflow-hidden">
                    <Image
                      src={getAssetPath(previousPost.image)}
                      alt={previousPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Text Content */}
                  <div className="pt-[30px] flex-1">
                    <h3 
                      className="text-[20px] leading-[30px] text-[#2f3237] mb-[20px] whitespace-pre-line"
                      style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                    >
                      {previousPost.title}
                    </h3>
                    <p 
                      className="text-[15px] leading-[25px] font-light text-[#2f3237]"
                      style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                    >
                      {previousPost.excerpt}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              
              {/* Next Post - Right Side */}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="group flex gap-[20px] items-start max-w-[600px] text-right flex-row-reverse">
                  {/* Rectangular Image */}
                  <div className="relative w-[230px] h-[269px] shrink-0 overflow-hidden">
                    <Image
                      src={getAssetPath(nextPost.image)}
                      alt={nextPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Text Content */}
                  <div className="pt-[30px] flex-1">
                    <h3 
                      className="text-[20px] leading-[30px] text-[#2f3237] mb-[20px] whitespace-pre-line"
                      style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                    >
                      {nextPost.title}
                    </h3>
                    <p 
                      className="text-[15px] leading-[25px] font-light text-[#2f3237]"
                      style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                    >
                      {nextPost.excerpt}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts Section */}
      <section className="pt-[40px] pb-[100px]">
        <div className="max-w-[1430px] mx-auto px-6">
          {/* Section Title with Lines */}
          <div className="relative mb-[50px]">
            {/* Full width line */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-primary" />
            {/* Center dark line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[470px] h-[2px] bg-dark z-10" />
            {/* Title */}
            <div className="relative z-20 flex justify-center">
              <h2 
                className="text-[20px] leading-[30px] font-light text-[#2f3237] bg-white px-[40px]"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                DİĞER BLOG PAYLAŞIMLARIMIZ
              </h2>
            </div>
          </div>

          {/* Posts Grid - 2 columns per row matching Figma layout */}
          {groupedPosts.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row justify-center gap-[30px] mb-[60px]">
              {row.map((post, colIndex) => (
                <Link 
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="group flex-1 max-w-[700px]"
                >
                  <div className={`flex gap-[20px] items-start ${colIndex === 1 ? 'flex-row-reverse' : ''}`}>
                    {/* Rectangular Image */}
                    <div className="relative w-[470px] h-[550px] shrink-0 overflow-hidden">
                      <Image
                        src={getAssetPath(post.image)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Text Content */}
                    <div className={`flex flex-col justify-center py-[40px] ${colIndex === 1 ? 'text-right' : 'text-left'}`}>
                      {/* Post Title */}
                      <h3 
                        className="text-[20px] leading-[30px] text-[#2f3237] mb-[20px] max-w-[349px] whitespace-pre-line"
                        style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                      >
                        {post.title}
                      </h3>
                      
                      {/* Post Excerpt */}
                      <p 
                        className="text-[15px] leading-[25px] font-light text-[#2f3237] max-w-[350px]"
                        style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}

          {/* Load More Button */}
          {hasMorePosts && (
            <div className="flex justify-center mt-[40px]">
              <button 
                onClick={loadMorePosts}
                className="bg-dark text-light text-[13px] leading-[15px] font-light px-[60px] py-[18px] hover:bg-[#1f2227] transition-colors"
                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
              >
                BLOGLARI YÜKLE
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
