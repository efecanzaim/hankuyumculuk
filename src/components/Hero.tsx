"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { getAssetPath } from "@/utils/paths";

interface Slide {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imagePosition?: string;
  imageScale?: number;
  poster?: string;
}

interface HeroProps {
  slides: Slide[];
}

const isVideo = (src: string | undefined) =>
  !!src && /\.(mp4|webm|ogg)$/i.test(src);

// Sadece aktif slide ve bir sonraki slide'ı yükle
function shouldLoadSlide(index: number, current: number, total: number) {
  if (index === current) return true;
  const next = (current + 1) % total;
  return index === next;
}

export default function Hero({ slides }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentSlideRef = useRef(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const goToSlide = useCallback((index: number) => {
    clearTimer();
    currentSlideRef.current = index;
    setCurrentSlide(index);
    setShowContent(false);
  }, [clearTimer]);

  const goToNext = useCallback(() => {
    goToSlide((currentSlideRef.current + 1) % slides.length);
  }, [goToSlide, slides.length]);

  // Video bittiğinde: içeriği göster, 5s sonra sonraki slide'a geç
  const handleVideoEnded = useCallback((index: number) => {
    if (index !== currentSlideRef.current) return;
    setShowContent(true);
    timerRef.current = setTimeout(goToNext, 5000);
  }, [goToNext]);

  // Aktif slide ve bir sonraki slide'ı yükleme kuyruğuna ekle
  useEffect(() => {
    const next = (currentSlide + 1) % slides.length;
    setLoadedSlides(prev => {
      const updated = new Set(prev);
      updated.add(currentSlide);
      updated.add(next);
      return updated;
    });
  }, [currentSlide, slides.length]);

  // Slide değiştiğinde video kontrolü ve görsel slide için zamanlayıcı
  useEffect(() => {
    clearTimer();

    // Video kontrolü: aktif olanı başlat, diğerlerini durdur
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === currentSlide) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Görsel slide ise içeriği hemen göster, 10s sonra geç
    const bgImage = slides[currentSlide]?.backgroundImage || '';
    if (!isVideo(bgImage)) {
      setShowContent(true);
      timerRef.current = setTimeout(goToNext, 10000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide((currentSlide + 1) % slides.length);
      else goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }
  };

  if (!slides || slides.length === 0) return null;

  return (
    <section
      className="relative h-[600px] md:h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images/Videos */}
      {slides.map((s, index) => {
        const bgImage = s.backgroundImage || '';
        const isActive = index === currentSlide;
        const shouldLoad = loadedSlides.has(index) || shouldLoadSlide(index, currentSlide, slides.length);
        return (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              zIndex: isActive ? 1 : 0,
            }}
          >
            {isVideo(bgImage) ? (
              shouldLoad ? (
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  muted
                  playsInline
                  preload={isActive ? "auto" : "none"}
                  poster={s.poster ? getAssetPath(s.poster) : undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                  onEnded={() => handleVideoEnded(index)}
                >
                  <source src={getAssetPath(bgImage)} type="video/mp4" />
                </video>
              ) : null
            ) : bgImage && shouldLoad ? (
              <div
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${getAssetPath(bgImage)})`,
                  backgroundPosition: s.imagePosition || 'center',
                  transform: s.imageScale && s.imageScale !== 1 ? `scale(${s.imageScale})` : undefined,
                }}
              />
            ) : null}
          </div>
        );
      })}

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
            {/* Video oynarken gizli, video bitince 5s bekleme sırasında animasyonla belirir */}
            <div
              className="flex flex-col items-center"
              style={{
                opacity: index === currentSlide && showContent ? 1 : 0,
                transform: index === currentSlide && showContent ? 'translateY(0)' : 'translateY(28px)',
                transition: index === currentSlide
                  ? 'opacity 1s ease 0.15s, transform 1s ease 0.15s'
                  : 'none',
              }}
            >
              <h1
                className="font-title text-[40px] leading-[40px] md:text-[70px] md:leading-[100px] text-center mb-4 md:mb-6 tracking-wide whitespace-pre-line"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.9)' }}
              >
                {slide.title}
              </h1>
              <p
                className="text-[15px] leading-[30px] md:text-[20px] md:leading-[30px] font-light tracking-wide mb-6 md:mb-8 text-center max-w-[280px] md:max-w-2xl uppercase"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
              >
                {slide.subtitle}
              </p>
              <Link
                href={slide.ctaLink || "#"}
                className="border border-white w-[250px] h-[50px] flex items-center justify-center text-[15px] font-light tracking-wide hover:bg-white hover:text-[#2f3237] transition-colors duration-300 text-center"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                {slide.ctaText}
              </Link>
            </div>
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

        {/* Desktop Arrow Navigation */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center border border-white/50 text-white hover:bg-white/20 transition-colors duration-300"
              aria-label="Önceki"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => goToSlide((currentSlide + 1) % slides.length)}
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center border border-white/50 text-white hover:bg-white/20 transition-colors duration-300"
              aria-label="Sonraki"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
