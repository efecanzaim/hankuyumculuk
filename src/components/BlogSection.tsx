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

function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "...";
}

export default function BlogSection({
  title,
  description,
  image,
  linkText,
  linkHref = "#",
}: BlogSectionProps) {
  const truncatedDescription = truncateText(description, 160);

  return (
    <section className="relative py-[40px] md:py-[60px] bg-white overflow-hidden">
      {/* HAN BLOG Heading */}
      <div className="max-w-[1430px] mx-auto px-6 md:px-8 mb-[30px] md:mb-[50px]">
        <div className="text-center mb-[30px] md:mb-[40px]">
          <p className="text-[20px] leading-[30px] font-light text-[#2f3237] mb-4 flex items-center justify-center gap-2">
            <Image
              src={getAssetPath("/images/han-logo.svg")}
              alt="Han"
              width={54}
              height={20}
              style={{ filter: 'brightness(0)' }}
            />
            <span className="font-bold">BLOG</span>
          </p>
          <div className="flex items-center justify-center gap-0">
            <div className="h-px bg-primary flex-1"></div>
            <div className="w-[350px] h-[2.234px] bg-dark"></div>
            <div className="h-px bg-primary flex-1"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1430px] mx-auto px-6 md:px-8">

        {/* Mobile Layout */}
        <div className="block md:hidden">
          {image && (
            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden">
              {image.startsWith('http') ? (
                <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <Image src={getAssetPath(image)} alt={title} fill className="object-cover" sizes="100vw" />
              )}
            </div>
          )}
          <h3 className="font-title text-[24px] leading-[32px] text-[#2f3237] mb-3">{title}</h3>
          <p className="text-[14px] leading-[24px] font-light text-[#2f3237]/70 mb-4">{truncatedDescription}</p>
          <Link href={linkHref} className="inline-block text-[13px] tracking-[0.1em] font-light text-[#2f3237] underline hover:opacity-60 transition-opacity mb-8">
            {linkText}
          </Link>
          <div className="border-t border-primary pt-8 mt-4">
            <p className="text-[14px] leading-[26px] font-light text-[#2f3237]/70 mb-5">
              Her hafta, mücevher dünyasından ilham veren hikâyeler, koleksiyon öyküleri ve özel tasarım serüvenlerimizi sizinle paylaşıyoruz.
            </p>
            <p className="text-[14px] leading-[26px] font-light text-[#2f3237]/70 mb-3">
              Tüm blog yazılarımızı okumak için;
            </p>
            <Link href="/blog" className="inline-flex items-center justify-center bg-dark text-light h-[46px] w-[210px] text-[12px] tracking-[0.12em] font-light hover:bg-[#3d4147] transition-colors">
              TÜM PAYLAŞIMLAR
            </Link>
          </div>
        </div>

        {/* Desktop Layout - 50/50 */}
        <div className="hidden md:flex flex-row items-stretch gap-0">

          {/* Left: Blog intro */}
          <div className="w-1/2 flex flex-col justify-center pr-[60px] lg:pr-[80px] border-r border-primary">
            <p className="text-[16px] lg:text-[18px] leading-[1.9] font-light text-[#2f3237]/75 mb-8">
              Her hafta, mücevher dünyasından ilham veren hikâyeler, koleksiyon öyküleri ve özel tasarım serüvenlerimizi sizinle paylaşıyoruz.
            </p>
            <p className="text-[16px] lg:text-[18px] leading-[1.9] font-light text-[#2f3237]/75 mb-4">
              Tüm blog yazılarımızı okumak için;
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-dark text-light h-[50px] w-[220px] text-[12px] tracking-[0.12em] font-light hover:bg-[#3d4147] transition-colors"
            >
              TÜM PAYLAŞIMLAR
            </Link>
          </div>

          {/* Right: Latest blog post */}
          <div className="w-1/2 pl-[60px] lg:pl-[80px]">
            <Link href={linkHref} className="group block">
              {image && (
                <div className="relative w-full aspect-[4/3] overflow-hidden mb-5">
                  {image.startsWith('http') ? (
                    <img
                      src={image}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={getAssetPath(image)}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1430px) 50vw, 715px"
                    />
                  )}
                </div>
              )}
              <h3 className="font-title text-[24px] lg:text-[28px] leading-[1.3] text-[#2f3237] mb-3 group-hover:opacity-70 transition-opacity">
                {title}
              </h3>
              <p className="text-[14px] lg:text-[15px] leading-[1.8] font-light text-[#2f3237]/70 mb-5">
                {truncatedDescription}
              </p>
              <span className="text-[12px] tracking-[0.12em] font-light text-[#2f3237] underline group-hover:opacity-60 transition-opacity">
                {linkText}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
