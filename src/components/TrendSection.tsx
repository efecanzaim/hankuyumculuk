"use client";

import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

interface TrendSectionProps {
  leftImage: string;
  rightImage: string;
  leftTitle: string;
  rightTitle: string;
  leftLink: string;
  rightLink: string;
  leftTitleLink: string;
  rightTitleLink: string;
}

export default function TrendSection({
  leftImage,
  rightImage,
  leftTitle,
  rightTitle,
  leftLink,
  rightLink,
  leftTitleLink,
  rightTitleLink
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
              <Link href={leftTitleLink}>
                <h2 className="font-title text-[50px] md:text-[70px] leading-[80px] md:leading-[100px] text-primary mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:opacity-80 transition-opacity cursor-pointer">
                  {leftTitle}
                </h2>
              </Link>
            </div>

            {/* Link - Below image */}
            <div className="text-center px-6">
              <Link
                href={leftLink}
                className="inline-block px-8 py-3 text-[13px] tracking-[0.15em] font-medium text-[#2f3237] bg-white border border-[#2f3237] hover:bg-[#2f3237] hover:text-white transition-all duration-300 uppercase"
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
              <Link href={rightTitleLink}>
                <h2 className="font-title text-[50px] md:text-[70px] leading-[80px] md:leading-[100px] text-primary mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] whitespace-pre-line hover:opacity-80 transition-opacity cursor-pointer">
                  {rightTitle}
                </h2>
              </Link>
            </div>

            {/* Link - Below image */}
            <div className="text-center px-6">
              <Link
                href={rightLink}
                className="inline-block px-8 py-3 text-[13px] tracking-[0.15em] font-medium text-[#2f3237] bg-white border border-[#2f3237] hover:bg-[#2f3237] hover:text-white transition-all duration-300 uppercase"
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
