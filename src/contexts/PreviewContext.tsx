"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import contentData from "@/data/content.json";

type ContentType = typeof contentData;

const PreviewContext = createContext<ContentType>(contentData);

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

export function PreviewProvider({ children }: { children: ReactNode }) {
  // Başlangıçta content.json verisiyle başla (fallback)
  const [content, setContent] = useState<ContentType>(contentData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Veritabanından içerik yükle
  useEffect(() => {
    const inPreviewMode = isPreviewMode();
    
    const loadContent = async () => {
      // SADECE preview modundaysa localStorage'dan oku
      if (inPreviewMode) {
        const previewContent = localStorage.getItem("admin_preview_content");
        if (previewContent) {
          try {
            const parsed = JSON.parse(previewContent);
            const mergedContent = { ...contentData, ...parsed };
            setContent(mergedContent);
            setIsLoaded(true);
            return;
          } catch {
            localStorage.removeItem("admin_preview_content");
          }
        }
      }

      // Production'da API'den yükle (normal site)
      if (API_URL) {
        try {
          const response = await fetch(`${API_URL}/api/content.php`, {
            cache: 'no-store'
          });
          if (response.ok) {
            const data = await response.json();
            const mergedContent = { ...contentData, ...data };
            setContent(mergedContent as ContentType);
          }
        } catch (error) {
          console.error("İçerik yüklenemedi:", error);
        }
      }
      
      setIsLoaded(true);
    };

    loadContent();

    // SADECE preview modundaysa localStorage değişikliklerini dinle
    if (inPreviewMode) {
      const checkPreview = () => {
        try {
          const previewContent = localStorage.getItem("admin_preview_content");
          if (previewContent) {
            const parsed = JSON.parse(previewContent);
            const mergedContent = { ...contentData, ...parsed };
            setContent(mergedContent);
          }
        } catch {
          // Ignore errors
        }
      };

      const handleStorage = (e: StorageEvent) => {
        if (e.key === "admin_preview_content" && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            const mergedContent = { ...contentData, ...parsed };
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
  }, []);

  return (
    <PreviewContext.Provider value={content}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreviewContent() {
  return useContext(PreviewContext);
}

export default PreviewContext;

