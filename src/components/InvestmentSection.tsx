"use client";

import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

interface InvestmentSectionProps {
  title: string;
  leftImage: string;
  rightImage: string;
  description: string;
  ctaText: string;
  link: string;
}

export default function InvestmentSection({ title, leftImage, rightImage, description, ctaText, link }: InvestmentSectionProps) {
  return (
    <section className="py-[60px] md:py-[100px] bg-white relative">
      <div className="container mx-auto px-6 md:px-8">
        {/* Title - Positioned absolutely above images on desktop */}
        <div className="text-center mb-8 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[-60px] md:z-10">
          <h2 className="font-display text-[50px] leading-[60px] md:text-[100px] md:leading-[120px] text-primary whitespace-pre-line">
            {title}
          </h2>
        </div>

        {/* Images Layout */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-[130px] mb-8 md:mb-[60px]">
          {/* Left - Large Image (590x753) */}
          <div className="w-full md:w-[590px] aspect-390/498 md:h-[753px] relative overflow-hidden">
            <Image
              src={getAssetPath(leftImage)}
              alt="Investment jewelry"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Small Image (470x600) */}
          <div className="w-full md:w-[470px] aspect-390/498 md:h-[600px] relative overflow-hidden">
            <Image
              src={getAssetPath(rightImage)}
              alt="Investment product"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Description - Centered below images */}
        <div className="text-center mb-8">
          <p className="text-[15px] leading-[25px] font-light text-[#2f3237] max-w-[350px] md:max-w-[470px] mx-auto">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href={link}
            className="bg-primary text-[#2f3237] text-[13px] leading-[15px] font-light h-[50px] w-[230px] flex items-center justify-center hover:bg-[#c9b9a8] transition-colors duration-300"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
