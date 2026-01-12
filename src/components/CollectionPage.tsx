"use client";

import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

interface Product {
  id: number;
  image: string;
  tall?: boolean;
}

interface CollectionPageProps {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  products: Product[];
  bottomText: string;
  ctaText: string;
  ctaLink: string;
}

export default function CollectionPage({
  heroImage,
  heroTitle,
  heroSubtitle,
  heroDescription,
  products,
  bottomText,
  ctaText,
  ctaLink
}: CollectionPageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-[200px] md:pt-[220px] pb-12 md:pb-[40px] bg-white">
        <div className="w-full mx-auto px-6 md:px-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-center md:gap-[10px] max-w-[1430px] md:mx-auto">
            {/* Left - Hero Image */}
            <div className="w-full md:w-[710px] h-[300px] md:h-[399px] relative mb-8 md:mb-0">
              <Image
                src={getAssetPath(heroImage)}
                alt={heroTitle}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right - Text Content */}
            <div className="w-full md:w-[710px] md:pl-[10px]">
              <h1 className="font-title text-[40px] md:text-[50px] leading-[60px] md:leading-[80px] text-[#dccdbf] mb-4 md:mb-6">
                {heroTitle}
              </h1>
              <p className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-[50px]">
                {heroSubtitle}
              </p>
              <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                {heroDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pt-8 md:pt-[160px] pb-12 md:pb-20 bg-white">
        <div className="w-full mx-auto px-6 md:px-0">
          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="h-px bg-[#efece9] flex-1 md:max-w-[540px]" />
            <div className="hidden md:block h-[2px] w-[350px] bg-[#2f3237] mx-4" />
            <div className="h-px bg-[#efece9] flex-1 md:max-w-[540px]" />
          </div>

          {/* Section Title */}
          <p className="text-[16px] md:text-[20px] leading-[30px] font-light text-[#2f3237] text-center mb-8 md:mb-[40px]">
            <span>KOLEKSİYON </span>
            <span className="font-bold">ÜRÜNLERİMİZ</span>
          </p>

          {/* Desktop: Masonry Grid - 3 columns */}
          <div className="hidden md:flex md:gap-[10px] mb-16 justify-center mx-auto max-w-[1430px]">
            {/* Column 1 */}
            <div className="flex flex-col gap-[10px]">
              <div className="w-[470px] h-[470px] relative">
                <Image
                  src={getAssetPath(products[0]?.image)}
                  alt="Product 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[470px] h-[627px] relative">
                <Image
                  src={getAssetPath(products[3]?.image)}
                  alt="Product 4"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[470px] h-[470px] relative">
                <Image
                  src={getAssetPath(products[6]?.image)}
                  alt="Product 7"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-[10px]">
              <div className="w-[470px] h-[627px] relative">
                <Image
                  src={getAssetPath(products[1]?.image)}
                  alt="Product 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[470px] h-[470px] relative">
                <Image
                  src={getAssetPath(products[4]?.image)}
                  alt="Product 5"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[470px] h-[627px] relative">
                <Image
                  src={getAssetPath(products[7]?.image)}
                  alt="Product 8"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-[10px]">
              <div className="w-[470px] h-[470px] relative">
                <Image
                  src={getAssetPath(products[2]?.image)}
                  alt="Product 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[470px] h-[627px] relative">
                <Image
                  src={getAssetPath(products[5]?.image)}
                  alt="Product 6"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[470px] h-[470px] relative">
                <Image
                  src={getAssetPath(products[8]?.image)}
                  alt="Product 9"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile Grid */}
          <div className="grid grid-cols-2 gap-[10px] md:hidden mb-12">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="w-full h-[200px] relative"
              >
                <Image
                  src={getAssetPath(product.image)}
                  alt={`Product ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-8 md:mb-12">
            <div className="h-px bg-[#efece9] w-full md:max-w-[1430px]" />
          </div>

          {/* Bottom Text */}
          <p className="font-title text-[16px] md:text-[20px] leading-[30px] md:leading-[40px] text-[#2f3237] text-center mb-8 md:mb-12 max-w-[800px] mx-auto px-6">
            {bottomText}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-8 md:mb-12 px-6">
            <Link
              href={ctaLink}
              className="block w-full md:w-[350px] h-[50px] bg-[#2f3237] text-[#efece9] text-[13px] leading-[50px] font-light text-center hover:opacity-90 transition-opacity"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
