"use client";

import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  link: string;
  imagePosition?: string;
  imageScale?: number;
}

interface FeaturedProductsProps {
  products: Product[];
  titlePart1?: string;
  titlePart2?: string;
  bannerImage1?: string;
  bannerImage2?: string;
}

function ProductCard({ product, className, imageClassName }: { product: Product | undefined; className?: string; imageClassName?: string }) {
  if (!product) return null;
  const scale = product.imageScale || 1;
  return (
    <Link href={product.link || "#"} className={`group ${className || ""}`}>
      <div className={`relative bg-gray-100 overflow-hidden ${imageClassName || "w-full aspect-square"}`}>
        <div
          className="absolute inset-0 bg-cover group-hover:scale-105 transition-transform duration-500"
          style={{ 
            backgroundImage: `url(${getAssetPath(product.image || '')})`,
            backgroundPosition: product.imagePosition || '50% 50%',
            transform: `scale(${scale})`
          }}
        />
        <div className="absolute inset-0 bg-[#d9d9d9] opacity-10 group-hover:opacity-0 transition-opacity" />
      </div>
      <p className="text-[15px] leading-[25px] font-light text-[#2f3237] mt-3 md:mt-[20px]">
        {product.name}
      </p>
      <p className="text-[10px] leading-[20px] font-bold text-[#2f3237]">
        {product.category}
      </p>
    </Link>
  );
}

export default function FeaturedProducts({
  products,
  titlePart1 = "SİZE ÖZEL",
  titlePart2 = "ÜRÜNLERİMİZ",
  bannerImage1 = "/images/products/featured-large-1.jpg",
  bannerImage2 = "/images/products/featured-large-2.jpg"
}: FeaturedProductsProps) {
  return (
    <section className="py-10 pb-20 md:py-20 md:pb-40 bg-white">
      <div className="max-w-[1430px] mx-auto px-6 md:px-4">
        {/* Section Heading */}
        <div className="text-center mb-[30px] md:mb-[48px]">
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

        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Banner 1 */}
          <div className="px-[10px] mb-6">
            <div className="w-full aspect-[420/349] relative bg-gray-100 pointer-events-none">
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${getAssetPath(bannerImage1)})` }}
              />
            </div>
          </div>

          {/* Products Row 1 - Horizontal Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-[10px] mb-6">
            <div className="flex-shrink-0 w-[248px] snap-center">
              <ProductCard product={products[0]} imageClassName="w-[248px] h-[248px] relative" />
            </div>
            <div className="flex-shrink-0 w-[248px] snap-center">
              <ProductCard product={products[1]} imageClassName="w-[248px] h-[248px] relative" />
            </div>
          </div>

          {/* Banner 2 */}
          <div className="px-[10px] mb-6">
            <div className="w-full aspect-[420/349] relative bg-gray-100 pointer-events-none">
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${getAssetPath(bannerImage2)})` }}
              />
            </div>
          </div>

          {/* Products Row 2 - Horizontal Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-[10px]">
            <div className="flex-shrink-0 w-[248px] snap-center">
              <ProductCard product={products[2]} imageClassName="w-[248px] h-[248px] relative" />
            </div>
            <div className="flex-shrink-0 w-[248px] snap-center">
              <ProductCard product={products[3]} imageClassName="w-[248px] h-[248px] relative" />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        {/* Top Row: Büyük sol (610) + Kare orta (400) + Kare sağ (400) */}
        <div className="hidden md:flex gap-[10px] mb-[50px]">
          {/* Büyük sol görsel - 610x465 */}
          <div className="w-[610px] h-[465px] relative bg-gray-100 shrink-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${getAssetPath(bannerImage1)})` }}
            />
          </div>

          {/* Kare orta ürün - 400x400 + text */}
          <ProductCard product={products[0]} className="w-[400px] shrink-0" imageClassName="w-[400px] h-[400px] relative" />

          {/* Kare sağ ürün - 400x400 + text */}
          <ProductCard product={products[1]} className="w-[400px] shrink-0" imageClassName="w-[400px] h-[400px] relative" />
        </div>

        {/* Bottom Row: Kare sol (400) + Kare orta (400) + Büyük sağ (610) */}
        <div className="hidden md:flex gap-[10px]">
          {/* Kare sol ürün - 400x400 + text */}
          <ProductCard product={products[2]} className="w-[400px] shrink-0" imageClassName="w-[400px] h-[400px] relative" />

          {/* Kare orta ürün - 400x400 + text */}
          <ProductCard product={products[3]} className="w-[400px] shrink-0" imageClassName="w-[400px] h-[400px] relative" />

          {/* Büyük sağ görsel - 610x465 */}
          <div className="w-[610px] h-[465px] relative bg-gray-100 shrink-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${getAssetPath(bannerImage2)})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
