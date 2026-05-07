"use client";

import { useState, useEffect, useMemo } from "react";
import { usePreviewContent } from "@/contexts/PreviewContext";
import contentDataTr from "@/data/content-tr.json";
import contentDataEn from "@/data/content-en.json";
import contentDataRu from "@/data/content-ru.json";
import type { Locale } from "@/i18n/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

type ContentType = typeof contentDataTr;

const contentByLocale: Record<Locale, ContentType> = {
  tr: contentDataTr,
  en: contentDataEn as ContentType,
  ru: contentDataRu as ContentType,
};

export function useContent(locale: Locale = 'tr'): ContentType {
  const previewContent = usePreviewContent();
  // Stable reference — prevents infinite effect loops caused by inline object creation
  const fallbackContent = useMemo(
    () => contentByLocale[locale] || contentDataTr,
    [locale]
  );
  const [content, setContent] = useState<ContentType>(previewContent || fallbackContent);

  useEffect(() => {
    if (previewContent && Object.keys(previewContent).length > 0) {
      setContent(previewContent);
      return;
    }

    if (API_URL) {
      const langParam = locale !== 'tr' ? `?locale=${locale}` : '';
      fetch(`${API_URL}/api/content.php${langParam}`)
        .then((res) => res.json())
        .then((data) => setContent(data as ContentType))
        .catch(() => setContent(fallbackContent));
    } else {
      setContent(fallbackContent);
    }
  }, [previewContent, locale, fallbackContent]);

  return content;
}

export default useContent;
