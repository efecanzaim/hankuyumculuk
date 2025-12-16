"use client";

import Link from "next/link";
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[710px_350px] gap-[130px] items-start justify-center">
          {/* Left Side - Large Image (710x733) */}
          <div className="relative">
            <div className="aspect-[710/733] relative bg-gray-100 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getAssetPath(leftImage)})` }}
              />
            </div>
            {/* Title overlapping image */}
            <div className="relative z-10 -mt-[-15px] text-center">
              <h2 className="font-display text-[80px] leading-[80px] text-[#dccdbf]">
                {leftTitle}
              </h2>
            </div>
            {/* Category and link below title */}
            <div className="mt-4 text-center">
              <p className="text-[20px] leading-[30px] font-light text-[#2f3237] mb-[17px]">
                {leftCategory}
              </p>
              <Link
                href={leftLink}
                className="text-[15px] leading-[30px] font-bold text-[#2f3237] link-underline inline-block"
              >
                keşfet
              </Link>
            </div>
          </div>

          {/* Right Side - Smaller Image (350x522) - pushed down 211px to align bottom with left image */}
          <div className="relative w-[350px] lg:mt-[211px]">
            <div className="aspect-[350/522] relative bg-gray-100 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getAssetPath(rightImage)})` }}
              />
            </div>
            {/* Title overlapping image - multiline */}
            <div className="relative z-10 -mt-[20px] text-center">
              <h2 className="font-display text-[40px] leading-[60px] text-[#dccdbf] whitespace-pre-line">
                {rightTitle}
              </h2>
            </div>
            {/* Category and link below title */}
            <div className="mt-4 text-center">
              <p className="text-[20px] leading-[30px] font-light text-[#2f3237] mb-[17px]">
                {rightCategory}
              </p>
              <Link
                href={rightLink}
                className="text-[15px] leading-[30px] font-bold text-[#2f3237] link-underline inline-block"
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
