"use client";

import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

interface FooterColumn {
  title: string;
  links: { text: string; href: string }[];
}

interface FooterProps {
  logo: string;
  slogan: string;
  description: string;
  columns: FooterColumn[];
  copyright: string;
  socialLinks?: { instagram?: string };
}

export default function Footer({ logo, slogan, description, columns, copyright, socialLinks }: FooterProps) {
  return (
    <>
      {/* Separator Line with Logo - Outside footer */}
      <div className="relative bg-white">
        <div className="max-w-[1430px] mx-auto px-6 md:px-8 py-8">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-primary" />
            <div className="px-8">
              {/* Han Logo - #2F3237 color */}
              <Image
                src={getAssetPath("/images/han-logo.svg")}
                alt="Han Logo"
                width={110}
                height={41}
                className="mx-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(412%) hue-rotate(169deg) brightness(95%) contrast(89%)' }}
              />
            </div>
            <div className="flex-1 h-px bg-primary" />
            {/* Instagram Icon - Right next to the line */}
            {socialLinks?.instagram && (
              <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="ml-4">
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10C12.2386 10 10 12.2386 10 15C10 17.7614 12.2386 20 15 20C17.7614 20 20 17.7614 20 15C20 12.2386 17.7614 10 15 10ZM15 18.125C13.2759 18.125 11.875 16.7241 11.875 15C11.875 13.2759 13.2759 11.875 15 11.875C16.7241 11.875 18.125 13.2759 18.125 15C18.125 16.7241 16.7241 18.125 15 18.125ZM21.1875 9.78125C21.1875 10.4062 20.6875 10.9062 20.0625 10.9062C19.4375 10.9062 18.9375 10.4062 18.9375 9.78125C18.9375 9.15625 19.4375 8.65625 20.0625 8.65625C20.6875 8.65625 21.1875 9.15625 21.1875 9.78125ZM24.9062 10.9062C24.8437 9.5 24.5312 8.25 23.5 7.21875C22.4687 6.1875 21.2187 5.875 19.8125 5.8125C18.375 5.71875 11.625 5.71875 10.1875 5.8125C8.78125 5.875 7.53125 6.1875 6.5 7.21875C5.46875 8.25 5.15625 9.5 5.09375 10.9062C5 12.3437 5 19.0937 5.09375 20.5312C5.15625 21.9375 5.46875 23.1875 6.5 24.2187C7.53125 25.25 8.78125 25.5625 10.1875 25.625C11.625 25.7187 18.375 25.7187 19.8125 25.625C21.2187 25.5625 22.4687 25.25 23.5 24.2187C24.5312 23.1875 24.8437 21.9375 24.9062 20.5312C25 19.0937 25 12.3437 24.9062 10.9062ZM22.9687 22.0625C22.6562 22.9062 22 23.5625 21.1562 23.875C20 24.2187 17.5937 24.125 15 24.125C12.4062 24.125 10 24.2187 8.84375 23.875C8 23.5625 7.34375 22.9062 7.03125 22.0625C6.6875 20.9062 6.78125 18.5 6.78125 15.9062C6.78125 13.3125 6.6875 10.9062 7.03125 9.75C7.34375 8.90625 8 8.25 8.84375 7.9375C10 7.59375 12.4062 7.6875 15 7.6875C17.5937 7.6875 20 7.59375 21.1562 7.9375C22 8.25 22.6562 8.90625 22.9687 9.75C23.3125 10.9062 23.2187 13.3125 23.2187 15.9062C23.2187 18.5 23.3125 20.9062 22.9687 22.0625Z" fill="#2F3237"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-primary overflow-hidden">
        {/* Decorative Stripes - Background, positioned from columns section */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse pointer-events-none" style={{ top: '280px' }}>
          {/* Stripe 1 (bottom) - Most opaque */}
          <div className="h-[26px] bg-dark/20 shrink-0" />
          {/* Gap */}
          <div className="h-[21px] shrink-0" />
          {/* Stripe 2 */}
          <div className="h-[26px] bg-dark/15 shrink-0" />
          {/* Gap */}
          <div className="h-[25px] shrink-0" />
          {/* Stripe 3 */}
          <div className="h-[23px] bg-dark/10 shrink-0" />
          {/* Gap */}
          <div className="h-[27px] shrink-0" />
          {/* Stripe 4 */}
          <div className="h-[22px] bg-dark/6 shrink-0" />
          {/* Gap */}
          <div className="h-[25px] shrink-0" />
          {/* Stripe 5 (top) - Most transparent */}
          <div className="h-[23px] bg-dark/3 shrink-0" />
          {/* Remaining space fills with primary color */}
          <div className="flex-1" />
        </div>

        <div className="relative z-10 max-w-[1430px] mx-auto px-6 md:px-8 pt-[80px] md:pt-[100px]">
          {/* Slogan */}
          <div className="text-center">
            <p className="text-[35px] leading-[normal] tracking-[0.05em] text-[#2f3237]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              {slogan}
            </p>
          </div>

          {/* Description */}
          <div className="text-center mt-[10px] max-w-[708px] mx-auto px-6">
            <p className="font-light text-[20px] leading-[30px] text-[#2f3237]">
              {description}
            </p>
          </div>

          {/* Footer Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-[80px] md:mt-[100px] max-w-[900px] mx-auto px-6">
            {columns.map((column, index) => (
              <div key={index} className="text-center">
                <h3 className="font-bold text-[13px] leading-[normal] text-[#2f3237] mb-[16px]">
                  {column.title}
                </h3>
                <ul className="space-y-[10px]">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="font-normal text-[13px] leading-[26px] text-[#2f3237] hover:opacity-70 transition-opacity"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center mt-[60px] pb-[40px]">
            <p className="font-normal text-[10px] leading-[normal] text-[#2f3237]">
              {copyright}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
