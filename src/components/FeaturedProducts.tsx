"use client";

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
  titlePart1?: string;
  titlePart2?: string;
  bannerImage1?: string;
  bannerImage2?: string;
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
          <div className="w-full aspect-390/324 relative bg-gray-100 mb-6 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${getAssetPath(bannerImage1)})` }}
            />
          </div>

          {/* Product 1 */}
          <div className="block mb-6 pointer-events-none">
            <div className="w-[290px] mx-auto aspect-290/435 relative bg-gray-100">
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
          </div>

          {/* Banner 2 */}
          <div className="w-full aspect-390/324 relative bg-gray-100 mb-6 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${getAssetPath(bannerImage2)})` }}
            />
          </div>

          {/* Product 2 */}
          <div className="block pointer-events-none">
            <div className="w-[290px] mx-auto aspect-290/435 relative bg-gray-100">
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
          </div>
        </div>

        {/* Desktop Layout */}
        {/* Top Row: Büyük sol (710) + Küçük orta (350) + Küçük sağ (350) */}
        <div className="hidden md:flex gap-[10px] mb-[50px]">
          {/* Büyük sol görsel - 710x590 */}
          <div className="w-[710px] h-[590px] relative bg-gray-100 shrink-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${getAssetPath(bannerImage1)})` }}
            />
          </div>

          {/* Küçük orta ürün - 350x525 + text */}
          <div className="w-[350px] shrink-0 pointer-events-none">
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
          </div>

          {/* Küçük sağ ürün - 350x525 + text */}
          <div className="w-[350px] shrink-0 pointer-events-none">
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
          </div>
        </div>

        {/* Bottom Row: Küçük sol (350) + Küçük orta (350) + Büyük sağ (710) */}
        <div className="hidden md:flex gap-[10px]">
          {/* Küçük sol ürün - 350x525 + text */}
          <div className="w-[350px] shrink-0 pointer-events-none">
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
          </div>

          {/* Küçük orta ürün - 350x525 + text */}
          <div className="w-[350px] shrink-0 pointer-events-none">
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
          </div>

          {/* Büyük sağ görsel - 710x590 */}
          <div className="w-[710px] h-[590px] relative bg-gray-100 shrink-0 pointer-events-none">
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
