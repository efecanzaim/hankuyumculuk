"use client";

interface TopBannerProps {
  text: string;
  visible: boolean;
  topLinks?: { text: string; href: string }[];
}

export default function TopBanner({ text, visible }: TopBannerProps) {
  if (!visible || !text) return null;

  return (
    <div className="hidden lg:block bg-primary py-3">
      <div className="container mx-auto px-8 relative">
        <div className="flex items-center justify-center">
          {/* Center - Banner Text */}
          <p className="text-[15px] text-[#2f3237] text-center font-normal leading-normal">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
