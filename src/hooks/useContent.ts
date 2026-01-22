"use client";

import { useState, useEffect } from "react";
import { usePreviewContent } from "@/contexts/PreviewContext";
import contentData from "@/data/content.json";

// API URL - Production'da PHP API kullanılacak
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

type ContentType = typeof contentData;

/**
 * İçerik yükleme hook'u
 * Öncelik sırası:
 * 1. PreviewContext (admin panelinden gelen preview içeriği)
 * 2. API'den yükleme (production)
 * 3. content.json (fallback)
 */
export function useContent(): ContentType {
  const previewContent = usePreviewContent();
  const [content, setContent] = useState<ContentType>(previewContent);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // PreviewContext'ten gelen içerik varsa onu kullan
    if (previewContent && Object.keys(previewContent).length > 0) {
      setContent(previewContent);
      return;
    }

    // Production'da API'den yükle
    if (API_URL) {
      setIsLoading(true);
      fetch(`${API_URL}/api/content.php`)
        .then((res) => res.json())
        .then((data) => {
          setContent(data as ContentType);
        })
        .catch((error) => {
          console.error("İçerik yüklenemedi:", error);
          // Fallback: content.json
          setContent(contentData);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Development: content.json kullan
      setContent(contentData);
    }
  }, [previewContent]);

  return content;
}

export default useContent;

