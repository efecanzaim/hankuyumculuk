"use client";

import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

interface PromoSection {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  link: string;
}

interface PromoSectionsProps {
  sections: PromoSection[];
}

export default function PromoSections({ sections }: PromoSectionsProps) {
  return (
    <section className="pt-[80px] pb-30 bg-white">
      <div className="max-w-[1430px] mx-auto px-4">
        <div className="flex gap-[10px] justify-center">
          {sections.map((section, index) => {
            // Figma'da ikinci bölüm 100px yukarıda
            const yOffset = index === 1 ? -100 : 0;
            return (
              <div 
                key={section.id} 
                className="flex flex-col"
                style={{ marginTop: `${yOffset}px` }}
              >
                <div className="w-[590px] h-[590px] relative bg-gray-100 overflow-hidden mb-[50px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getAssetPath(section.image)})` }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-[20px] leading-[30px] font-bold text-[#2f3237] mb-[30px]">
                    {section.title}
                  </h3>
                  <p className="text-[25px] leading-[30px] font-light text-[#2f3237] mb-[50px] whitespace-pre-line">
                    {section.description}
                  </p>
                  <div className="flex justify-center">
                    <Link
                      href={section.link}
                      className="block w-[250px] h-[50px] bg-[#2f3237] text-light text-[13px] leading-[50px] font-light text-center"
                    >
                      {section.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
