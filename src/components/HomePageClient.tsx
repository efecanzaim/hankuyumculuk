"use client";

import { usePreviewContent } from "@/contexts/PreviewContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrendSection from "@/components/TrendSection";
import ParallaxSection from "@/components/ParallaxSection";
import StorySection from "@/components/StorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import SpecialDesignSection from "@/components/SpecialDesignSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function HomePageClient() {
  const content = usePreviewContent();

  return (
    <main>
      {/* Header (includes TopBanner) */}
      <Header
        logo={content.header?.logo}
        logoAlt={content.header?.logoAlt}
        mainNav={content.header?.mainNav || []}
        isHero={true}
        isTransparent={true}
        bannerText={content.topBanner?.text}
        bannerVisible={content.topBanner?.visible}
      />

      {/* Hero Section */}
      <Hero slides={content.hero?.slides || []} />

      {/* Trend Section */}
      <TrendSection
        leftImage={content.trendSection?.leftImage}
        rightImage={content.trendSection?.rightImage}
        leftTitle={content.trendSection?.leftTitle}
        rightTitle={content.trendSection?.rightTitle}
        leftLink={content.trendSection?.leftLink}
        rightLink={content.trendSection?.rightLink}
        leftTitleLink={content.trendSection?.leftTitleLink}
        rightTitleLink={content.trendSection?.rightTitleLink}
      />

      {/* Parallax Section */}
      <ParallaxSection backgroundImage={content.parallaxSection?.backgroundImage} />

      {/* Story Section */}
      <StorySection
        title={content.storySection?.title}
        mainText={content.storySection?.mainText}
        subText={content.storySection?.subText}
        linkText={content.storySection?.linkText}
        linkHref={content.storySection?.linkHref}
      />

      {/* Featured Products */}
      <FeaturedProducts 
        products={content.featuredProducts || []}
        titlePart1={content.featuredProductsSection?.titlePart1}
        titlePart2={content.featuredProductsSection?.titlePart2}
        bannerImage1={content.featuredProductsSection?.bannerImage1}
        bannerImage2={content.featuredProductsSection?.bannerImage2}
      />

      {/* Special Design Section */}
      <SpecialDesignSection 
        topCards={content.specialDesignSection?.topCards || []}
        bottomCards={content.specialDesignSection?.bottomCards || []}
        titlePart1={content.specialDesignSection?.titlePart1}
        titlePart2={content.specialDesignSection?.titlePart2}
      />

      {/* Blog Section */}
      <BlogSection
        title={content.blogSection?.title}
        subtitle={content.blogSection?.subtitle}
        description={content.blogSection?.description}
        image={content.blogSection?.image}
        linkText={content.blogSection?.linkText}
        linkHref={content.blogSection?.linkHref}
        additionalText={content.blogSection?.additionalText}
      />

      {/* Footer */}
      <Footer
        logo={content.footer?.logo}
        slogan={content.footer?.slogan}
        description={content.footer?.description}
        columns={content.footer?.columns || []}
        socialLinks={content.footer?.socialLinks || []}
        copyright={content.footer?.copyright}
      />
    </main>
  );
}

