"use client";

import Link from "next/link";

interface StorySectionProps {
  title: string;
  mainText: string;
  subText: string;
  linkText: string;
  linkHref: string;
}

export default function StorySection({ title, mainText, subText, linkText, linkHref = "#" }: StorySectionProps) {
  // Split text by double newlines to create paragraphs
  const mainParagraphs = mainText.split("\n\n").filter(p => p.trim());
  const subParagraphs = subText.split("\n\n").filter(p => p.trim());

  return (
    <section className="relative bg-light pt-10 md:pt-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-[420px] md:max-w-[950px] mx-auto text-center">
          {/* Title */}
          <h2 className="font-title text-[30px] md:text-[50px] leading-[30px] md:leading-[80px] text-[#2f3237] mb-6 md:mb-10">
            {title}
          </h2>

          {/* Main Text - Large */}
          <div className="mb-6 md:mb-10">
            {mainParagraphs.map((para, idx) => (
              <p key={idx} className="text-[20px] md:text-[20px] leading-[20px] md:leading-[32px] font-light text-[#2f3237] mb-4 max-w-[420px] md:max-w-none mx-auto">
                {para}
              </p>
            ))}
          </div>

          {/* Sub Text - Small */}
          <div className="mb-4 md:mb-8">
            {subParagraphs.map((para, idx) => (
              <p key={idx} className="text-[15px] md:text-[15px] leading-[20px] font-light text-[#2f3237] max-w-[420px] md:max-w-[710px] mx-auto mb-4">
                {para}
              </p>
            ))}
          </div>

          {/* Link */}
          <Link
            href={linkHref}
            className="text-[15px] leading-[30px] font-bold text-[#2f3237] underline hover:opacity-70 transition-opacity inline-block"
          >
            {linkText}
          </Link>
        </div>
      </div>

      {/* Perspective Stripes - 5 filled horizontal bands fading from top to bottom */}
      <div className="relative w-full pointer-events-none">
        {[...Array(5)].map((_, i) => {
          const opacity = 0.2 + (i * 0.2); // Fade in: 0.2, 0.4, 0.6, 0.8, 1.0
          const stripeHeight = 25; // Height of each stripe

          return (
            <div
              key={i}
              className="w-full"
              style={{
                height: `${stripeHeight}px`,
                backgroundColor: `rgba(220, 205, 191, ${opacity})`,
                marginBottom: i < 4 ? `${stripeHeight}px` : '0'
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
