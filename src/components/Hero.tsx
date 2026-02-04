"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAssetPath } from "@/utils/paths";

interface Slide {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroProps {
  slides: Slide[];
}

export default function Hero({ slides }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds interval

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const isVideo = (src: string | undefined) => {
    if (!src) return false;
    return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg');
  };

  // Eğer slides yoksa veya boşsa, hiçbir şey gösterme
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section className="relative h-[600px] md:h-screen overflow-hidden">
      {/* Background Images/Videos */}
      {slides.map((s, index) => {
        const bgImage = s.backgroundImage || '';
        return (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            zIndex: index === currentSlide ? 1 : 0,
          }}
        >
          {isVideo(bgImage) ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={getAssetPath(bgImage)} type="video/mp4" />
            </video>
          ) : bgImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${getAssetPath(bgImage)})` }}
            />
          ) : null}
        </div>
      )})}


      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-[#2f3237]/50 via-transparent to-transparent z-2" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white pt-0 md:pt-32">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 flex flex-col items-center justify-center pt-0 md:pt-32 px-6 md:px-4"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              pointerEvents: index === currentSlide ? "auto" : "none",
            }}
          >
            <h1 className="font-title text-[40px] leading-[40px] md:text-[70px] md:leading-[100px] text-center mb-4 md:mb-6 tracking-wide whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-[15px] leading-[30px] md:text-[20px] md:leading-[30px] font-light tracking-wide mb-6 md:mb-8 text-center max-w-[280px] md:max-w-2xl uppercase">
              {slide.subtitle}
            </p>
            <Link
              href={slide.ctaLink || "#"}
              className="border border-white w-[250px] h-[50px] flex items-center justify-center text-[15px] font-light tracking-wide hover:bg-white hover:text-[#2f3237] transition-colors duration-300 text-center"
            >
              {slide.ctaText}
            </Link>
          </div>
        ))}

        {/* Slider Dots */}
        <div className="absolute bottom-10 md:bottom-16 left-1/2 transform -translate-x-1/2 flex gap-[10px] z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white"
                  : "border border-white hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
