"use client";

import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

interface Value {
  title: string;
  description: string;
  image: string;
}

interface AboutPageProps {
  heroTitle: string;
  heroParagraph2: string;
  heroImage: string;
  heroImagePosition?: string;
  heroImageScale?: number;
  valuesTitle: string;
  values: Value[];
  aboutContent?: string; // Yeni eklenen Hakkımızda metni
}

export default function AboutPage({
  heroTitle,
  heroParagraph2,
  heroImage,
  heroImagePosition = "50% 50%",
  heroImageScale = 1,
  valuesTitle,
  values,
  aboutContent,
}: AboutPageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-[230px] md:pt-[191px] pb-0 bg-white overflow-hidden">
        <div className="w-full mx-auto px-0">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Beige Background with Text */}
            <div className="relative bg-primary w-full md:flex-1 px-6 md:px-0 pt-8 md:pt-10 pb-32 md:pb-0 flex flex-col items-center justify-start md:h-[800px]">
              {/* Title */}
              <h1 className="font-title text-[40px] md:text-[50px] leading-[60px] md:leading-[80px] text-[#2f3237] text-center mb-8 md:mb-12 mt-0 md:mt-0">
                {heroTitle}
              </h1>

              {/* Main Content */}
              <div className="text-[14px] md:text-[15px] leading-[24px] md:leading-[28px] font-light text-[#2f3237] text-justify max-w-[700px] mx-auto px-4 md:px-8 mb-12 md:mb-16">
                {heroParagraph2.split('\n\n').filter(p => p.trim()).map((para, idx) => (
                  <p key={idx} className="mb-5 last:mb-0">{para}</p>
                ))}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative w-full md:w-[750px] ml-auto aspect-[390/500] md:aspect-auto md:h-[800px]">
              <Image
                src={getAssetPath(heroImage)}
                alt={heroTitle}
                fill
                className="object-cover"
                style={{
                  objectPosition: heroImagePosition,
                  transform: `scale(${heroImageScale})`
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="font-title text-[40px] md:text-[50px] leading-[50px] md:leading-[66px] text-[#2f3237] text-center mb-12 md:mb-20">
            {valuesTitle}
          </h2>

          {/* Values Grid - Zigzag Layout */}
          <div className="max-w-[1430px] mx-auto px-4">
            <div className="flex flex-col gap-0">
              {/* Row 1: Zarafet (Left Text) + Image (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[10px] mb-0">
                <div className="flex items-center justify-center text-center px-6 md:px-0">
                  <div className="max-w-[426px]">
                    <h3 className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-8">
                      {values[0]?.title}
                    </h3>
                    <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                      {values[0]?.description}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[300px] md:h-[400px] relative">
                  <Image
                    src={getAssetPath(values[0]?.image)}
                    alt={values[0]?.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Row 2: Image (Left) + Kalite (Right Text) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[10px] mb-0">
                <div className="w-full h-[300px] md:h-[400px] relative order-2 md:order-1">
                  <Image
                    src={getAssetPath(values[1]?.image)}
                    alt={values[1]?.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center text-center px-6 md:px-0 order-1 md:order-2">
                  <div className="max-w-[426px]">
                    <h3 className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-8">
                      {values[1]?.title}
                    </h3>
                    <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                      {values[1]?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 3: Özgünlük (Left Text) + Image (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[10px] mb-0">
                <div className="flex items-center justify-center text-center px-6 md:px-0">
                  <div className="max-w-[426px]">
                    <h3 className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-8">
                      {values[2]?.title}
                    </h3>
                    <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                      {values[2]?.description}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[300px] md:h-[400px] relative">
                  <Image
                    src={getAssetPath(values[2]?.image)}
                    alt={values[2]?.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Row 4: Image (Left) + Güven (Right Text) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[10px]">
                <div className="w-full h-[300px] md:h-[400px] relative order-2 md:order-1">
                  <Image
                    src={getAssetPath(values[3]?.image)}
                    alt={values[3]?.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center text-center px-6 md:px-0 order-1 md:order-2">
                  <div className="max-w-[426px]">
                    <h3 className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-8">
                      {values[3]?.title}
                    </h3>
                    <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                      {values[3]?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
