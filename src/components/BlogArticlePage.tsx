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
  const [visiblePosts, setVisiblePosts] = useState(9);
  
  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + 9, relatedPosts.length));
  };

  const displayedPosts = relatedPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < relatedPosts.length;

  // Group posts into rows of 3 for the staggered layout
  const groupedPosts: RelatedPost[][] = [];
  for (let i = 0; i < displayedPosts.length; i += 3) {
    groupedPosts.push(displayedPosts.slice(i, i + 3));
  }

  return (
    <div className="bg-white">
      {/* Hero Section - Title over Image */}
      <section className="relative">
        {/* Title - Positioned at top */}
        <div className="pt-[40px] pb-[20px] text-center">
          <h1 
            className="text-[50px] leading-[70px] text-[#2f3237] max-w-[950px] mx-auto font-serif"
          >
            {title.split(',').map((part, index) => (
              <span key={index} className={index > 0 ? "block" : ""}>
                {part.trim()}{index === 0 && title.includes(',') ? ',' : ''}
              </span>
            ))}
          </h1>
        </div>

        {/* Hero Image */}
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
      <section className="relative -mt-[150px] z-10">
        <div className="max-w-[950px] mx-auto bg-white px-[120px] py-[50px]">
          <p className="text-[30px] leading-[40px] font-light text-[#2f3237] text-center">
            {introText}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-[40px]">
        <div className="max-w-[709px] mx-auto px-6">
          <div 
            className="text-[15px] leading-[20px] font-light text-[#2f3237] text-center whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: articleContent.replace(/\n\n/g, '<br/><br/>') }}
          />
        </div>
      </section>

      {/* Previous / Next Navigation with Diamond Images */}
      {(previousPost || nextPost) && (
        <section className="py-[60px]">
          <div className="max-w-[1430px] mx-auto px-6">
            <div className="flex justify-between items-start">
              {/* Previous Post - Left Side */}
              {previousPost ? (
                <Link href={`/blog/${previousPost.slug}`} className="group flex gap-[20px] items-start max-w-[500px]">
                  {/* Small Diamond Image */}
                  <div className="relative w-[230px] h-[269px] shrink-0">
                    <div 
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      }}
                    >
                      <Image
                        src={getAssetPath(previousPost.image)}
                        alt={previousPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="pt-[30px]">
                    <h3 className="text-[20px] leading-[30px] text-[#2f3237] font-serif mb-[20px] whitespace-pre-line">
                      {previousPost.title}
                    </h3>
                    <p className="text-[15px] leading-[25px] font-light text-[#2f3237]">
                      {previousPost.excerpt}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              
              {/* Next Post - Right Side */}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="group flex gap-[20px] items-start max-w-[500px] text-right flex-row-reverse">
                  {/* Small Diamond Image */}
                  <div className="relative w-[230px] h-[269px] shrink-0">
                    <div 
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      }}
                    >
                      <Image
                        src={getAssetPath(nextPost.image)}
                        alt={nextPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="pt-[30px]">
                    <h3 className="text-[20px] leading-[30px] text-[#2f3237] font-serif mb-[20px] whitespace-pre-line">
                      {nextPost.title}
                    </h3>
                    <p className="text-[15px] leading-[25px] font-light text-[#2f3237]">
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
          <div className="relative mb-[20px]">
            {/* Full width line */}
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#efece9]" />
            {/* Center dark line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[470px] h-[2px] bg-[#2f3237] z-10" />
            {/* Title */}
            <div className="relative z-20 flex justify-center">
              <h2 className="text-[20px] leading-[30px] font-light text-[#2f3237] bg-white px-[40px]">
                DİĞER BLOG <span className="font-bold">PAYLAŞIMLARIMIZ</span>
              </h2>
            </div>
          </div>

          {/* Down Arrow Icon */}
          <div className="flex justify-center mb-[60px]">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 4V20M14 20L6 12M14 20L22 12" stroke="#2f3237" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Posts Grid - 3 columns per row */}
          {groupedPosts.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-x-[10px] mb-[80px]">
              {row.map((post, colIndex) => (
                <Link 
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="group flex flex-col items-center"
                >
                  {/* Diamond Mask Image */}
                  <div className="relative w-full max-w-[470px] h-[550px] mb-[30px]">
                    <div 
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      }}
                    >
                      <Image
                        src={getAssetPath(post.image)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Post Title */}
                  <h3 className="text-[20px] leading-[30px] text-[#2f3237] text-center mb-[20px] max-w-[349px] font-serif whitespace-pre-line">
                    {post.title}
                  </h3>
                  
                  {/* Post Excerpt */}
                  <p className="text-[15px] leading-[25px] font-light text-[#2f3237] text-center max-w-[350px]">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          ))}

          {/* Load More Button */}
          {hasMorePosts && (
            <div className="flex justify-center mt-[40px]">
              <button 
                onClick={loadMorePosts}
                className="bg-[#2f3237] text-[#efece9] text-[13px] leading-[15px] font-light px-[60px] py-[18px] hover:bg-[#1f2227] transition-colors"
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
