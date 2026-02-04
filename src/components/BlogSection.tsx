"use client";

import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

interface BlogSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  linkText: string;
  linkHref: string;
  additionalText?: string;
}

export default function BlogSection({
  title,
  subtitle,
  description,
  image,
  linkText,
  linkHref = "#",
  additionalText
}: BlogSectionProps) {
  return (
    <section className="relative py-[40px] md:py-[60px] bg-white overflow-hidden">
      {/* HAN BLOG Heading */}
      <div className="max-w-[1430px] mx-auto px-6 md:px-8 mb-[30px] md:mb-[40px]">
        <div className="text-center mb-[30px] md:mb-[40px]">
          <p className="text-[20px] leading-[30px] font-light text-[#2f3237] mb-4">
            <span>HAN </span>
            <span className="font-bold">BLOG</span>
          </p>
          
          {/* Decorative line with center bar */}
          <div className="flex items-center justify-center gap-0">
            <div className="h-px bg-primary flex-1"></div>
            <div className="w-[350px] h-[2.234px] bg-dark"></div>
            <div className="h-px bg-primary flex-1"></div>
          </div>
        </div>
      </div>

      {/* Content Area with Navigation Arrows */}
      <div className="relative max-w-[1430px] mx-auto px-[10px] md:px-8">
        {/* Left Arrow - Desktop only */}
        <button className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-[20px] h-[40px] items-center justify-center text-[#2f3237] hover:opacity-70 transition-opacity z-10">
          <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 20L15 35" stroke="#2f3237" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Right Arrow - Desktop only */}
        <button className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-[20px] h-[40px] items-center justify-center text-[#2f3237] hover:opacity-70 transition-opacity z-10">
          <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5L15 20L5 35" stroke="#2f3237" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Mobile Layout - Image first, then content */}
        <div className="block md:hidden">
          {/* Image */}
          <div className="relative w-full aspect-[420/491] mb-8 overflow-hidden">
            {image.startsWith('http') ? (
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={getAssetPath(image)}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            )}
          </div>

          {/* Content */}
          <div className="text-center px-2">
            {/* Title */}
            <h2 className="font-title text-[35px] leading-[45px] text-[#2f3237] mb-6 whitespace-pre-line max-w-[420px] mx-auto">
              {title}
            </h2>

            {/* Description */}
            <p className="text-[23px] leading-[33px] font-light text-[#2f3237] mb-6 max-w-[334px] mx-auto">
              {description}
            </p>

            {/* Additional Text */}
            {additionalText && (
              <p className="text-[15px] leading-[20px] font-light text-[#2f3237] mb-6 max-w-[420px] mx-auto">
                {additionalText}
              </p>
            )}

            {/* Link */}
            <Link
              href={linkHref}
              className="inline-block text-[15px] leading-[30px] font-bold text-[#2f3237] underline hover:opacity-70 transition-opacity"
            >
              {linkText}
            </Link>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden md:flex flex-row items-center gap-[60px] px-[60px]">
          {/* Left Content */}
          <div className="flex-1 text-center max-w-[470px]">
            {/* Title - Faculty Glyphic style */}
            <h2 className="font-title text-[35px] leading-[45px] text-[#2f3237] mb-6 whitespace-pre-line">
              {title}
            </h2>

            {/* Description - 30px */}
            <p className="text-[30px] leading-[40px] font-light text-[#2f3237] mb-6">
              {description}
            </p>

            {/* Additional Text - 15px */}
            {additionalText && (
              <p className="text-[15px] leading-[20px] font-light text-[#2f3237] mb-8">
                {additionalText}
              </p>
            )}

            {/* Link - underlined */}
            <Link
              href={linkHref}
              className="inline-block text-[15px] leading-[30px] font-bold text-[#2f3237] underline hover:opacity-70 transition-opacity"
            >
              {linkText}
            </Link>
          </div>

          {/* Right Image - 590x690 */}
          <div className="flex-1 relative w-full max-w-[590px]">
            <div className="relative aspect-[590/690] w-full overflow-hidden">
              {image.startsWith('http') ? (
                // External URL - use regular img tag
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                // Local image - use Next Image
                <Image
                  src={getAssetPath(image)}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="590px"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button - TÜM PAYLAŞIMLAR */}
      <div className="text-center mt-[40px] md:mt-[60px]">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center bg-dark text-light h-[50px] w-[250px] text-[13px] font-light hover:bg-[#3d4147] transition-colors"
        >
          TÜM PAYLAŞIMLAR
        </Link>
      </div>
    </section>
  );
}
