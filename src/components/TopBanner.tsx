"use client";

import Link from "next/link";

interface TopBannerProps {
  text: string;
  visible: boolean;
  topLinks: { text: string; href: string }[];
}

export default function TopBanner({ text, visible, topLinks }: TopBannerProps) {
  if (!visible) return null;

  return (
    <div className="hidden lg:block bg-primary py-3">
      <div className="container mx-auto px-8 relative">
        <div className="flex items-center justify-center">
          {/* Center - Links */}
          <div className="hidden lg:flex items-center gap-6">
            {topLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-[11px] font-medium text-[#2f3237] hover:opacity-70 transition-opacity"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
