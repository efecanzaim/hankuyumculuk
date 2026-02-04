"use client";

import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

interface TopCard {
  title: string;
  image: string;
  link: string;
  buttonText: string;
}

interface BottomCard {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  buttonText: string;
}

interface SpecialDesignSectionProps {
  topCards: TopCard[];
  bottomCards: BottomCard[];
  titlePart1?: string;
  titlePart2?: string;
}

export default function SpecialDesignSection({ 
  topCards, 
  bottomCards,
  titlePart1 = "KENDİNİZİ",
  titlePart2 = "ÖZEL HİSSEDİN"
}: SpecialDesignSectionProps) {
  return (
    <section className="bg-white">
      {/* Section Heading */}
      <div className="max-w-[1430px] mx-auto px-6 md:px-8 pt-[40px] md:pt-[60px]">
        <div className="text-center mb-[30px] md:mb-[40px]">
          <p className="text-[20px] leading-[30px] font-light text-[#2f3237] mb-4">
            <span>{titlePart1} </span>
            <span className="font-bold">{titlePart2}</span>
          </p>
          
          {/* Decorative line with center bar */}
          <div className="flex items-center justify-center gap-0">
            <div className="h-px bg-primary flex-1"></div>
            <div className="w-[350px] h-[2.234px] bg-dark"></div>
            <div className="h-px bg-primary flex-1"></div>
          </div>
        </div>
      </div>

      {/* Top Row - 3 Cards: Mücevher, Koleksiyonlar, Özel Tasarım */}
      <div className="pb-[40px] md:pb-[60px] bg-white">
        {/* Mobile Layout - Horizontal Scrollable */}
        <div className="block md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-[10px]">
            {topCards.map((card, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] snap-center flex flex-col">
                {/* Image - 280x357 on mobile */}
                <div className="relative w-full aspect-[248/317] overflow-hidden mb-6">
                  <Image
                    src={getAssetPath(card.image)}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[20px] leading-[30px] font-bold text-[#2f3237] text-center mb-4">
                  {card.title}
                </h3>

                {/* Button */}
                <Link
                  href={card.link || "#"}
                  className="bg-dark text-light text-[13px] leading-[15px] font-light h-[50px] w-[230px] mx-auto flex items-center justify-center hover:bg-[#1a1c1f] transition-colors duration-300"
                >
                  {card.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-[1430px] mx-auto px-8">
          <div className="grid grid-cols-3 gap-[15px]">
            {topCards.map((card, index) => (
              <div key={index} className="flex flex-col">
                {/* Image - 470x600 */}
                <div className="relative w-full aspect-[470/600] mb-6 overflow-hidden">
                  <Image
                    src={getAssetPath(card.image)}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[20px] leading-[30px] font-bold text-[#2f3237] text-center mb-6">
                  {card.title}
                </h3>

                {/* Button */}
                <Link
                  href={card.link || "#"}
                  className="bg-dark text-light text-[13px] leading-[15px] font-light h-[50px] w-[230px] mx-auto flex items-center justify-center hover:bg-[#1a1c1f] transition-colors duration-300"
                >
                  {card.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - 2 Cards: Göz Alıcı Takılar, Yeni Gelenler */}
      <div className="py-[40px] md:py-[60px] bg-white">
        <div className="max-w-[1430px] mx-auto px-[10px] md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[10px] justify-items-center">
            {bottomCards.map((card, index) => (
              <div key={index} className="flex flex-col w-full md:w-auto">
                {/* Image - Square on mobile, 590x590 on desktop */}
                <div className="relative w-full md:w-[590px] aspect-square mb-6 overflow-hidden">
                  <Image
                    src={getAssetPath(card.image)}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[20px] leading-[30px] font-bold text-[#2f3237] text-center mb-4">
                  {card.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[25px] leading-[30px] font-light text-[#2f3237] text-center mb-6 whitespace-pre-line px-4 md:px-0">
                  {card.subtitle}
                </p>

                {/* Button */}
                <Link
                  href={card.link || "#"}
                  className="bg-dark text-light text-[13px] leading-[15px] font-light h-[50px] w-[250px] mx-auto flex items-center justify-center hover:bg-[#1a1c1f] transition-colors duration-300"
                >
                  {card.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="max-w-[1430px] mx-auto px-6 md:px-8">
        <div className="w-full h-px bg-primary" />
      </div>
    </section>
  );
}
