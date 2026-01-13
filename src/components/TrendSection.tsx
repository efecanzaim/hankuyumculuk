"use client";

import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

interface TrendSectionProps {
  leftImage: string;
  rightImage: string;
  leftTitle: string;
  rightTitle: string;
  leftCategory: string;
  rightCategory: string;
  leftLink: string;
  rightLink: string;
}

export default function TrendSection({
  leftImage,
  rightImage,
  leftTitle,
  rightTitle,
  leftCategory,
  rightCategory,
  leftLink,
  rightLink
}: TrendSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 max-w-[1220px] mx-auto">
          {/* Left Card */}
          <div className="relative">
            {/* Image */}
            <div className="relative w-full aspect-590/609 overflow-hidden">
              <Image
                src={getAssetPath(leftImage)}
                alt={leftTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Title - Overlapping bottom of image */}
            <div className="relative -mt-16 z-10 text-center px-6">
              <h2 className="font-title text-[50px] md:text-[70px] leading-[80px] md:leading-[100px] text-primary mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                {leftTitle}
              </h2>
            </div>

            {/* Category and Link - Below image */}
            <div className="text-center px-6">
              <p className="text-[18px] md:text-[20px] leading-[30px] font-light text-[#2f3237] mb-3 tracking-wide">
                {leftCategory}
              </p>
              <Link
                href={leftLink}
                className="text-[15px] leading-[30px] font-bold text-[#2f3237] underline hover:opacity-70 transition-opacity inline-block"
              >
                keşfet
              </Link>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative">
            {/* Image */}
            <div className="relative w-full aspect-590/609 overflow-hidden">
              <Image
                src={getAssetPath(rightImage)}
                alt={rightTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Title - Overlapping bottom of image */}
            <div className="relative -mt-16 z-10 text-center px-6">
              <h2 className="font-title text-[50px] md:text-[70px] leading-[80px] md:leading-[100px] text-primary mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] whitespace-pre-line">
                {rightTitle}
              </h2>
            </div>

            {/* Category and Link - Below image */}
            <div className="text-center px-6">
              <p className="text-[18px] md:text-[20px] leading-[30px] font-light text-[#2f3237] mb-3 tracking-wide">
                {rightCategory}
              </p>
              <Link
                href={rightLink}
                className="text-[15px] leading-[30px] font-bold text-[#2f3237] underline hover:opacity-70 transition-opacity inline-block"
              >
                keşfet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
