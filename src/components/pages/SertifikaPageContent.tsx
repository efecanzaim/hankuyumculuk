"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CertificatePageClient from "@/components/CertificatePageClient";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface SertifikaPageContentProps {
  locale: Locale;
}

export default function SertifikaPageContent({ locale }: SertifikaPageContentProps) {
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const basePath = getLocalizedPath('certificate', locale);
    if (pathname.startsWith(basePath + '/')) {
      const remainder = pathname.slice(basePath.length + 1);
      if (remainder) {
        setSlug(remainder);
      } else {
        setSlug(null);
      }
    } else {
      setSlug(null);
    }
  }, [pathname, locale]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Certificate not found</h1>
          <p className="text-gray-600">Please enter a valid certificate URL.</p>
        </div>
      </div>
    );
  }

  return <CertificatePageClient slug={slug} locale={locale} />;
}
