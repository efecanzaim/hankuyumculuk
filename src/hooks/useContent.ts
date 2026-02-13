"use client";

import { useState, useEffect } from "react";
import { usePreviewContent } from "@/contexts/PreviewContext";
import contentDataTr from "@/data/content-tr.json";
import contentDataEn from "@/data/content-en.json";
import contentDataRu from "@/data/content-ru.json";
import type { Locale } from "@/i18n/config";

// API URL - Production'da PHP API kullanılacak
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

type ContentType = typeof contentDataTr;

const contentByLocale: Record<Locale, ContentType> = {
  tr: contentDataTr,
  en: contentDataEn as ContentType,
  ru: contentDataRu as ContentType,
};

/**
 * İçerik yükleme hook'u
 * Öncelik sırası:
 * 1. PreviewContext (admin panelinden gelen preview içeriği)
 * 2. API'den yükleme (production)
 * 3. content-{locale}.json (fallback)
 */
export function useContent(locale: Locale = 'tr'): ContentType {
  const previewContent = usePreviewContent();
  const fallbackContent = contentByLocale[locale] || contentDataTr;
  const [content, setContent] = useState<ContentType>(previewContent || fallbackContent);

  useEffect(() => {
    // PreviewContext'ten gelen içerik varsa onu kullan
    if (previewContent && Object.keys(previewContent).length > 0) {
      setContent(previewContent);
      return;
    }

    // Production'da API'den yükle
    if (API_URL) {
      const langParam = locale !== 'tr' ? `?locale=${locale}` : '';
      fetch(`${API_URL}/api/content.php${langParam}`)
        .then((res) => res.json())
        .then((data) => {
          setContent(data as ContentType);
        })
        .catch((error) => {
          console.error("İçerik yüklenemedi:", error);
          setContent(fallbackContent);
        });
    } else {
      setContent(fallbackContent);
    }
  }, [previewContent, locale, fallbackContent]);

  return content;
}

export default useContent;
