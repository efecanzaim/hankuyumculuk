"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import contentDataTr from "@/data/content-tr.json";
import contentDataEn from "@/data/content-en.json";
import contentDataRu from "@/data/content-ru.json";
import type { Locale } from "@/i18n/config";

// Geriye uyumluluk: eski content.json import'u yerine content-tr.json kullanılıyor
const contentData = contentDataTr;

type ContentType = typeof contentData;

const contentByLocale: Record<Locale, ContentType> = {
  tr: contentDataTr,
  en: contentDataEn as ContentType,
  ru: contentDataRu as ContentType,
};

interface PreviewContextValue {
  content: ContentType;
  locale: Locale;
}

const PreviewContext = createContext<PreviewContextValue>({
  content: contentData,
  locale: 'tr',
});

// API URL - Production'da PHP API kullanılacak
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Preview modunda mı kontrol et (iframe içinde veya URL'de preview parametresi var mı)
function isPreviewMode(): boolean {
  if (typeof window === 'undefined') return false;

  // URL'de preview=true parametresi var mı?
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('preview') === 'true') return true;

  // iframe içinde mi? (admin panelinden açılmış)
  try {
    if (window.self !== window.top) return true;
  } catch {
    // Cross-origin iframe durumunda hata verir, bu da preview olabilir
    return true;
  }

  return false;
}

export function PreviewProvider({ locale = 'tr' as Locale, children }: { locale?: Locale; children: ReactNode }) {
  const fallbackContent = contentByLocale[locale] || contentData;
  // Başlangıçta locale'e uygun content ile başla (fallback)
  const [content, setContent] = useState<ContentType>(fallbackContent);
  const [isLoaded, setIsLoaded] = useState(false);

  // Veritabanından içerik yükle
  useEffect(() => {
    const inPreviewMode = isPreviewMode();
    const currentFallback = contentByLocale[locale] || contentData;

    const loadContent = async () => {
      // SADECE preview modundaysa localStorage'dan oku
      if (inPreviewMode) {
        const storageKey = locale === 'tr' ? "admin_preview_content" : `admin_preview_content_${locale}`;
        const previewContent = localStorage.getItem(storageKey);
        if (previewContent) {
          try {
            const parsed = JSON.parse(previewContent);
            const mergedContent = { ...currentFallback, ...parsed };
            setContent(mergedContent);
            setIsLoaded(true);
            return;
          } catch {
            localStorage.removeItem(storageKey);
          }
        }
      }

      // Production'da API'den yükle (normal site)
      if (API_URL) {
        try {
          const langParam = locale !== 'tr' ? `?locale=${locale}` : '';
          const response = await fetch(`${API_URL}/api/content.php${langParam}`, {
            cache: 'no-store'
          });
          if (response.ok) {
            const data = await response.json();
            // TR dışındaki diller için: API'den gelen metinsel içerikleri değil,
            // sadece görsel/ürün gibi dinamik verileri kullan
            if (locale !== 'tr') {
              // Sadece ürün ve görsel verilerini API'den al
              const dynamicKeys = ['featuredProducts', 'mucevherCategories', 'erkekCategories', 'koleksiyonCategories', 'hediyeCategories', 'mucevherCategory', 'erkekCategory', 'yuzukCategory', 'kolyeCategory', 'bileklikCategory', 'kupeCategory', 'setCategory', 'gozumunNuruCategory', 'prelovedCategory', 'yatirimCategory', 'ozelTasarimCategory', 'blog', 'blogPosts'];
              const filteredData: Partial<typeof data> = {};
              for (const key of dynamicKeys) {
                if (data[key] !== undefined) {
                  filteredData[key] = data[key];
                }
              }
              const mergedContent = { ...currentFallback, ...filteredData };
              setContent(mergedContent as ContentType);
            } else {
              // TR için tüm API verilerini kullan
              const mergedContent = { ...currentFallback, ...data };
              setContent(mergedContent as ContentType);
            }
          }
        } catch (error) {
          console.error("İçerik yüklenemedi:", error);
        }
      }

      setIsLoaded(true);
    };

    // Locale değiştiğinde fallback içeriği hemen güncelle
    setContent(currentFallback);
    loadContent();

    // SADECE preview modundaysa localStorage değişikliklerini dinle
    if (inPreviewMode) {
      const storageKey = locale === 'tr' ? "admin_preview_content" : `admin_preview_content_${locale}`;

      const checkPreview = () => {
        try {
          const previewContent = localStorage.getItem(storageKey);
          if (previewContent) {
            const parsed = JSON.parse(previewContent);
            const mergedContent = { ...currentFallback, ...parsed };
            setContent(mergedContent);
          }
        } catch {
          // Ignore errors
        }
      };

      const handleStorage = (e: StorageEvent) => {
        if (e.key === storageKey && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            const mergedContent = { ...currentFallback, ...parsed };
            setContent(mergedContent);
          } catch {
            // Ignore errors
          }
        }
      };

      const handleCustomEvent = (e: CustomEvent) => {
        if (e.detail) {
          setContent(e.detail);
        }
      };

      window.addEventListener("storage", handleStorage);
      window.addEventListener("previewUpdate", handleCustomEvent as EventListener);
      const interval = setInterval(checkPreview, 100);

      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("previewUpdate", handleCustomEvent as EventListener);
        clearInterval(interval);
      };
    }
  }, [locale]);

  return (
    <PreviewContext.Provider value={{ content, locale }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreviewContent(): ContentType {
  return useContext(PreviewContext).content;
}

export function usePreviewLocale(): Locale {
  return useContext(PreviewContext).locale;
}

export default PreviewContext;
