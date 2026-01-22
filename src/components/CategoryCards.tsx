"use client";

import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

interface Category {
  id: number;
  image: string;
  title: string;
  link: string;
}

interface CategoryCardsProps {
  categories: Category[];
}

export default function CategoryCards({ categories }: CategoryCardsProps) {
  return (
    <section className="py-10 md:py-20 bg-white">
      {/* Mobile: Horizontal Scroll */}
      <div className="block md:hidden">
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.link} 
              className="group shrink-0 snap-center"
            >
              <div className="w-[290px] h-[370px] relative bg-gray-100 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${getAssetPath(category.image)})` }}
                />
              </div>
              <div className="text-center mt-[30px]">
                <h3 className="text-[20px] leading-[30px] font-bold text-[#2f3237] mb-[13px]">
                  {category.title}
                </h3>
                <p className="text-[15px] leading-[30px] font-light text-[#2f3237] link-underline inline-block">
                  keşfedin
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:block max-w-[1430px] mx-auto px-4">
        <div className="flex gap-[10px] justify-center">
          {categories.map((category, index) => {
            // Figma'da farklı y pozisyonları var: 0, -100, -50
            const yOffset = index === 0 ? 0 : index === 1 ? -100 : -50;
            return (
              <Link 
                key={category.id} 
                href={category.link} 
                className="group"
                style={{ marginTop: `${yOffset}px` }}
              >
                <div className="w-[470px] h-[600px] relative bg-gray-100 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${getAssetPath(category.image)})` }}
                  />
                </div>
                <div className="text-center mt-[40px]">
                  <h3 className="text-[20px] leading-[30px] font-bold text-[#2f3237] mb-[13px]">
                    {category.title}
                  </h3>
                  <p className="text-[15px] leading-[30px] font-light text-[#2f3237] link-underline inline-block">
                    keşfedin
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
