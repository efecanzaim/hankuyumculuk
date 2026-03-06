"use client";

import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/paths";

const HanLogo = () => (
  <svg
    viewBox="0 0 110 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block align-middle mx-[0.15em]"
    style={{ height: '0.75em', width: 'auto' }}
  >
    <path d="M9.2847 0H0V12.7349H9.2847V0Z" fill="currentColor"/>
    <path d="M31.292 0H22.0073V12.7349H31.292V0Z" fill="currentColor"/>
    <path d="M31.292 28.2651H22.0073V41H31.292V28.2651Z" fill="currentColor"/>
    <path d="M9.2847 28.2651H0V41H9.2847V28.2651Z" fill="currentColor"/>
    <path d="M31.292 14.3907H0V15.7099H31.292V14.3907Z" fill="currentColor"/>
    <path d="M31.292 17.1247H0V18.4439H31.292V17.1247Z" fill="currentColor"/>
    <path d="M31.292 19.8404H0V21.1596H31.292V19.8404Z" fill="currentColor"/>
    <path d="M31.292 22.5743H0V23.8935H31.292V22.5743Z" fill="currentColor"/>
    <path d="M31.292 25.3106H0V26.6298H31.292V25.3106Z" fill="currentColor"/>
    <path d="M88.3033 13.6674H79.0254V41H88.3033V13.6674Z" fill="currentColor"/>
    <path d="M110.003 13.6674H100.725V41H110.003V13.6674Z" fill="currentColor"/>
    <path d="M110 0H79.0254V1.50117H110V0Z" fill="currentColor"/>
    <path d="M110 2.70437H79.0254V4.20553H110V2.70437Z" fill="currentColor"/>
    <path d="M110 5.40647H79.0254V6.70748H110V5.40647Z" fill="currentColor"/>
    <path d="M110 8.1859H79.0254V9.41185H110V8.1859Z" fill="currentColor"/>
    <path d="M110 10.863H79.0254V12.164H110V10.863Z" fill="currentColor"/>
    <path d="M40.1711 28.7632L39.5615 30.0824H53.2132L52.4994 28.7632H40.1711Z" fill="currentColor"/>
    <path d="M38.9109 31.4972L38.3013 32.8164H54.6928L53.979 31.4972H38.9109Z" fill="currentColor"/>
    <path d="M37.6532 34.2243L37.0459 35.5458H56.1705L55.4544 34.2243H37.6532Z" fill="currentColor"/>
    <path d="M36.3954 36.9514L35.7881 38.2729H57.6458L56.9319 36.9514H36.3954Z" fill="currentColor"/>
    <path d="M58.4072 39.6808H35.1399L34.5303 41H59.1233L58.4072 39.6808Z" fill="currentColor"/>
    <path d="M75.7868 41L54.7971 0C52.932 3.66193 51.0306 7.3921 49.1247 11.1291L40.8213 27.3462H53.8702L61.3419 40.9977H75.7845L75.7868 41Z" fill="currentColor"/>
  </svg>
);

const renderWithLogo = (text: string) => {
  const parts = text.split(/(Han Kuyumculuk|Han)/g);
  return parts.map((part, i) =>
    (part === 'Han Kuyumculuk' || part === 'Han')
      ? <HanLogo key={i} />
      : part
  );
};

interface Value {
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  imageScale?: number;
}

interface AboutPageProps {
  heroTitle: string;
  heroParagraph2: string;
  heroImage: string;
  heroImagePosition?: string;
  heroImageScale?: number;
  valuesTitle: string;
  values: Value[];
  aboutContent?: string; // Yeni eklenen Hakkımızda metni
}

export default function AboutPage({
  heroTitle,
  heroParagraph2,
  heroImage,
  heroImagePosition = "50% 50%",
  heroImageScale = 1,
  valuesTitle,
  values,
  aboutContent,
}: AboutPageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-[230px] md:pt-[191px] pb-0 bg-white overflow-hidden">
        <div className="w-full mx-auto px-0">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Beige Background with Text */}
            <div className="relative bg-primary w-full md:flex-1 px-6 md:px-0 pt-8 md:pt-10 pb-32 md:pb-0 flex flex-col items-center justify-start md:h-[800px]">
              {/* Title */}
              <h1 className="font-title text-[40px] md:text-[50px] leading-[60px] md:leading-[80px] text-[#2f3237] text-center mb-8 md:mb-12 mt-0 md:mt-0">
                {heroTitle}
              </h1>

              {/* Main Content */}
              <div className="text-[14px] md:text-[15px] leading-[24px] md:leading-[28px] font-light text-[#2f3237] text-justify max-w-[700px] mx-auto px-4 md:px-8 mb-12 md:mb-16">
                {heroParagraph2.split('\n\n').filter(p => p.trim()).map((para, idx) => (
                  <p key={idx} className="mb-5 last:mb-0">{renderWithLogo(para)}</p>
                ))}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative w-full md:w-[750px] ml-auto aspect-[390/500] md:aspect-auto md:h-[800px]">
              <Image
                src={getAssetPath(heroImage)}
                alt={heroTitle}
                fill
                className="object-cover"
                style={{
                  objectPosition: heroImagePosition,
                  transform: `scale(${heroImageScale})`
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="font-title text-[40px] md:text-[50px] leading-[50px] md:leading-[66px] text-[#2f3237] text-center mb-12 md:mb-20">
            {valuesTitle}
          </h2>

          {/* Values Grid - Zigzag Layout */}
          <div className="max-w-[1430px] mx-auto px-4">
            <div className="flex flex-col gap-0">
              {/* Row 1: Zarafet (Left Text) + Image (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[10px] mb-0">
                <div className="flex items-center justify-center text-center px-6 md:px-0">
                  <div className="max-w-[426px]">
                    <h3 className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-8">
                      {values[0]?.title}
                    </h3>
                    <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                      {values[0]?.description}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[300px] md:h-[400px] relative">
                  <Image
                    src={getAssetPath(values[0]?.image)}
                    alt={values[0]?.title}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: values[0]?.imagePosition || '50% 50%',
                      transform: values[0]?.imageScale && values[0].imageScale !== 1 ? `scale(${values[0].imageScale})` : undefined,
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Image (Left) + Kalite (Right Text) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[10px] mb-0">
                <div className="w-full h-[300px] md:h-[400px] relative order-2 md:order-1">
                  <Image
                    src={getAssetPath(values[1]?.image)}
                    alt={values[1]?.title}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: values[1]?.imagePosition || '50% 50%',
                      transform: values[1]?.imageScale && values[1].imageScale !== 1 ? `scale(${values[1].imageScale})` : undefined,
                    }}
                  />
                </div>
                <div className="flex items-center justify-center text-center px-6 md:px-0 order-1 md:order-2">
                  <div className="max-w-[426px]">
                    <h3 className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-8">
                      {values[1]?.title}
                    </h3>
                    <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                      {values[1]?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 3: Özgünlük (Left Text) + Image (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[10px] mb-0">
                <div className="flex items-center justify-center text-center px-6 md:px-0">
                  <div className="max-w-[426px]">
                    <h3 className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-8">
                      {values[2]?.title}
                    </h3>
                    <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                      {values[2]?.description}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[300px] md:h-[400px] relative">
                  <Image
                    src={getAssetPath(values[2]?.image)}
                    alt={values[2]?.title}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: values[2]?.imagePosition || '50% 50%',
                      transform: values[2]?.imageScale && values[2].imageScale !== 1 ? `scale(${values[2].imageScale})` : undefined,
                    }}
                  />
                </div>
              </div>

              {/* Row 4: Image (Left) + Güven (Right Text) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[10px]">
                <div className="w-full h-[300px] md:h-[400px] relative order-2 md:order-1">
                  <Image
                    src={getAssetPath(values[3]?.image)}
                    alt={values[3]?.title}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: values[3]?.imagePosition || '50% 50%',
                      transform: values[3]?.imageScale && values[3].imageScale !== 1 ? `scale(${values[3].imageScale})` : undefined,
                    }}
                  />
                </div>
                <div className="flex items-center justify-center text-center px-6 md:px-0 order-1 md:order-2">
                  <div className="max-w-[426px]">
                    <h3 className="font-title text-[24px] md:text-[30px] leading-[30px] text-[#2f3237] mb-6 md:mb-8">
                      {values[3]?.title}
                    </h3>
                    <p className="text-[18px] md:text-[30px] leading-[28px] md:leading-[40px] font-light text-[#2f3237]">
                      {values[3]?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
