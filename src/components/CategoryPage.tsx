"use client";

import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

interface CategoryPageProps {
  category: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroSubDescription: string;
  heroImage1: string;
  heroImage2: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionSubDescription: string;
  sectionImage1: string;
  sectionImage2: string;
}

export default function CategoryPage({
  category,
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroSubDescription,
  heroImage1,
  heroImage2,
  sectionTitle,
  sectionDescription,
  sectionSubDescription,
  sectionImage1,
  sectionImage2,
}: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Extended to cover part of images */}
      <section className="pt-[280px] pb-0 bg-primary">
        <div className="container mx-auto px-8">
          {/* Titles */}
          <div className="max-w-[800px] mx-auto mb-[20px]">
            <h1 className="text-[80px] leading-[90px] font-bold text-[#2f3237] mb-0 text-left">
              {heroTitle}
            </h1>
            <h2 className="text-[120px] leading-[110px] font-light text-[#2f3237] text-right">
              {heroSubtitle}
            </h2>
          </div>

          {/* Description */}
          <div className="text-center max-w-[950px] mx-auto mb-[160px]">
            <p className="text-[30px] leading-[40px] font-light text-[#2f3237] mb-[10px]">
              {heroDescription}
            </p>
            <p className="text-[15px] leading-[20px] font-light text-[#2f3237] max-w-[710px] mx-auto">
              {heroSubDescription}
            </p>
          </div>

          {/* Images - Inside hero, bottom part overflows */}
          <div className="flex justify-center gap-[130px] -mb-[600px]">
            {/* Left Image */}
            <div className="w-[590px] h-[609px] relative">
              <Image
                src={heroImage1}
                alt={heroTitle}
                fill
                className="object-cover"
              />
            </div>
            {/* Right Image - 80px higher than left */}
            <div className="w-[590px] h-[865px] relative -mt-[80px]">
              <Image
                src={heroImage2}
                alt={heroTitle}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="pt-[700px] pb-[100px] bg-white">
        <div className="container mx-auto px-8">
          {/* Section Title */}
          <div className="text-center mb-[40px]">
            <h3 className="text-[40px] leading-[80px] font-display text-[#2f3237]">
              {sectionTitle}
            </h3>
          </div>

          {/* Section Description */}
          <div className="text-center max-w-[950px] mx-auto mb-[80px]">
            <p className="text-[30px] leading-[40px] font-light text-[#2f3237] mb-[20px]">
              {sectionDescription}
            </p>
            <p className="text-[15px] leading-[20px] font-light text-[#2f3237] max-w-[710px] mx-auto">
              {sectionSubDescription}
            </p>
          </div>

          {/* Section Images */}
          <div className="flex justify-center gap-[130px]">
            {/* Left Image - square */}
            <div className="w-[590px] h-[590px] relative">
              <Image
                src={sectionImage1}
                alt={sectionTitle}
                fill
                className="object-cover"
              />
            </div>
            {/* Right Image - portrait */}
            <div className="w-[470px] h-[600px] relative mt-[70px]">
              <Image
                src={sectionImage2}
                alt={sectionTitle}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
