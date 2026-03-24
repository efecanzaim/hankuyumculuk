"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CertificatePageClient from "@/components/CertificatePageClient";

export default function SertifikaPage() {
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length > 1 && pathParts[0] === "sertifika") {
      setSlug(pathParts[1]);
    } else {
      setSlug(null);
    }
  }, [pathname]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sertifika bulunamadı</h1>
          <p className="text-gray-600">Geçerli bir sertifika URL&apos;si girin.</p>
        </div>
      </div>
    );
  }

  return <CertificatePageClient slug={slug} locale="tr" />;
}
