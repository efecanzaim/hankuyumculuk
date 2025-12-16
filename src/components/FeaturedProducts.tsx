"use client";

import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  link: string;
}

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20 pb-40 bg-white">
      <div className="max-w-[1430px] mx-auto px-4">
        {/* Title with decorative lines on both sides */}
        <div className="flex items-center justify-center gap-[68px] mb-[48px]">
          <div className="h-px bg-light w-[470px]"></div>
          <h2 className="text-[20px] leading-[30px] font-light text-[#2f3237] whitespace-nowrap">
            SANA ÖZEL
          </h2>
          <div className="h-px bg-light w-[470px]"></div>
        </div>

        {/* Top Row: Büyük sol (710) + Küçük orta (350) + Küçük sağ (350) */}
        <div className="flex gap-[10px] mb-[50px]">
          {/* Büyük sol görsel - 710x590 */}
          <div className="w-[710px] h-[590px] relative bg-gray-100 shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(/images/products/featured-large-1.jpg)` }}
            />
          </div>

          {/* Küçük orta ürün - 350x525 + text */}
          <Link href={products[0]?.link || '#'} className="w-[350px] shrink-0">
            <div className="w-[350px] h-[525px] relative bg-gray-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getAssetPath(products[0]?.image || '')})` }}
                  />
                </div>
            <p className="text-[15px] leading-[25px] font-light text-[#2f3237] mt-[20px]">
              {products[0]?.name}
                </p>
            <p className="text-[10px] leading-[20px] font-bold text-[#2f3237]">
              {products[0]?.category}
            </p>
          </Link>

          {/* Küçük sağ ürün - 350x525 + text */}
          <Link href={products[1]?.link || '#'} className="w-[350px] shrink-0">
            <div className="w-[350px] h-[525px] relative bg-gray-100">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getAssetPath(products[1]?.image || '')})` }}
              />
              </div>
            <p className="text-[15px] leading-[25px] font-light text-[#2f3237] mt-[20px]">
              {products[1]?.name}
            </p>
            <p className="text-[10px] leading-[20px] font-bold text-[#2f3237]">
              {products[1]?.category}
            </p>
          </Link>
          </div>

        {/* Bottom Row: Küçük sol (350) + Küçük orta (350) + Büyük sağ (710) */}
        <div className="flex gap-[10px]">
          {/* Küçük sol ürün - 350x525 + text */}
          <Link href={products[2]?.link || '#'} className="w-[350px] shrink-0">
            <div className="w-[350px] h-[525px] relative bg-gray-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getAssetPath(products[2]?.image || '')})` }}
                  />
                </div>
            <p className="text-[15px] leading-[25px] font-light text-[#2f3237] mt-[20px]">
              {products[2]?.name}
                </p>
            <p className="text-[10px] leading-[20px] font-bold text-[#2f3237]">
              {products[2]?.category}
            </p>
          </Link>

          {/* Küçük orta ürün - 350x525 + text */}
          <Link href={products[3]?.link || '#'} className="w-[350px] shrink-0">
            <div className="w-[350px] h-[525px] relative bg-gray-100">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getAssetPath(products[3]?.image || '')})` }}
              />
              </div>
            <p className="text-[15px] leading-[25px] font-light text-[#2f3237] mt-[20px]">
              {products[3]?.name}
            </p>
            <p className="text-[10px] leading-[20px] font-bold text-[#2f3237]">
              {products[3]?.category}
            </p>
          </Link>

          {/* Büyük sağ görsel - 710x590 */}
          <div className="w-[710px] h-[590px] relative bg-gray-100 shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${getAssetPath('/images/products/featured-large-2.jpg')})` }}
            />
          </div>
        </div>
        
        {/* Bottom decorative line - separator */}
        <div className="h-px bg-light w-full mt-[160px]"></div>
      </div>
    </section>
  );
}
