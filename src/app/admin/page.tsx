"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiHome,
  FiSettings,
  FiImage,
  FiLayout,
  FiChevronRight,
  FiChevronDown,
  FiSave,
  FiExternalLink,
  FiMenu,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiGift,
  FiUser,
  FiHeart,
  FiStar,
  FiPhone,
  FiRefreshCw,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiLock,
  FiLogOut,
  FiEye,
  FiEyeOff,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiPackage,
  FiFileText,
  FiMaximize2
} from "react-icons/fi";
import initialContent from "@/data/content.json";
import initialContentEn from "@/data/content-en.json";
import initialContentRu from "@/data/content-ru.json";

type ContentType = Record<string, unknown>;

// Taş bilgisi tipi
interface ProductStone {
  id?: number;
  stone_type: string;
  carat: string | number; // API'den number, form'dan string gelebilir
  quantity: number;
  color: string;
  clarity: string;
  cut: string;
}

// Ürün tipi
interface Product {
  id?: number;
  category_id: number | null;
  categories?: number[]; // Çoklu kategori seçimi için
  slug?: string;
  name: string;
  name_en?: string;
  name_ru?: string;
  subtitle: string;
  subtitle_en?: string;
  subtitle_ru?: string;
  description: string;
  description_en?: string;
  description_ru?: string;
  image: string;
  imagePosition?: string;
  imageScale?: number;
  banner_image: string;
  bannerImagePosition?: string;
  bannerImageScale?: number;
  gallery_images: string[];
  sort_order: number;
  is_active: boolean;
  // Sertifika Bilgileri
  gold_weight?: string | number; // Form'da string, API'den number gelebilir
  gold_karat?: string | number; // Form'da string, API'den number gelebilir
  stones?: ProductStone[];
}

// Kategori tipi
interface Category {
  id: number;
  name: string;
  name_en?: string;
  name_ru?: string;
  slug: string;
  parent_type: string;
  hero_image?: string;
  hero_title?: string;
  hero_title_en?: string;
  hero_title_ru?: string;
  hero_subtitle?: string;
  hero_subtitle_en?: string;
  hero_subtitle_ru?: string;
  hero_description?: string;
  hero_description_en?: string;
  hero_description_ru?: string;
  list_title?: string;
  list_title_en?: string;
  list_title_ru?: string;
  sort_order?: number;
  content?: string;
}

// API URL - Production'da PHP API kullanılacak
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Login Bileşeni
function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (API_URL) {
        // Production: PHP API kullan
        const response = await fetch(`${API_URL}/api/auth.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          localStorage.setItem("admin_token", data.token);
          localStorage.setItem("admin_user", data.user);
          onLogin(data.token);
        } else {
          setError(data.error || "Giriş başarısız");
        }
      } else {
        // Development: Basit kontrol
        if (username === "admin" && password === "hankuyumculuk2024") {
          const token = "dev_token_" + Date.now();
          localStorage.setItem("admin_token", token);
          localStorage.setItem("admin_user", username);
          onLogin(token);
        } else {
          setError("Kullanıcı adı veya şifre hatalı");
        }
      }
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#0f0f0f] font-bold text-2xl">H</span>
          </div>
          <h1 className="text-white text-xl font-semibold">Han Kuyumculuk</h1>
          <p className="text-gray-500 text-sm mt-1">Yönetim Paneli</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a]">
          <div className="mb-4">
            <label className="block text-gray-400 text-xs font-medium mb-2">Kullanıcı Adı</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-xs font-medium mb-2">Şifre</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg pl-10 pr-10 py-3 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <FiAlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-[#0f0f0f] py-3 rounded-lg font-semibold text-sm hover:bg-[#c9a432] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Varsayılan: admin / hankuyumculuk2024
        </p>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [, setAuthToken] = useState<string | null>(null);

  const [content, setContent] = useState<ContentType | null>(initialContent as unknown as ContentType);
  const [contentEn, setContentEn] = useState<ContentType | null>(initialContentEn as unknown as ContentType);
  const [contentRu, setContentRu] = useState<ContentType | null>(initialContentRu as unknown as ContentType);
  const [activeSection, setActiveSection] = useState("anasayfa-banner");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["anasayfa"]);
  const [previewKey, setPreviewKey] = useState(0);
  const [previewWidth, setPreviewWidth] = useState(65); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const [devicePreset, setDevicePreset] = useState<"desktop" | "tablet" | "mobile" | "custom">("desktop");
  const containerRef = useRef<HTMLDivElement>(null);
  const productListRef = useRef<HTMLDivElement>(null);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);

  // Dil yönetimi state
  const [contentLang, setContentLang] = useState<'tr' | 'en' | 'ru'>('tr');

  // Aktif dile göre içerik döndür
  const getActiveContent = (): ContentType | null => {
    switch (contentLang) {
      case 'en': return contentEn;
      case 'ru': return contentRu;
      default: return content;
    }
  };
  
  // Aktif içerik (memo edilmiş)
  const activeContent = getActiveContent();
  
  // Aktif dile göre içerik güncelle
  const setActiveContent = (updater: (prev: ContentType | null) => ContentType | null) => {
    switch (contentLang) {
      case 'en': 
        setContentEn(updater);
        break;
      case 'ru': 
        setContentRu(updater);
        break;
      default: 
        setContent(updater);
    }
  };

  // Ürün yönetimi state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    category_id: null,
    categories: [],
    slug: "",
    name: "",
    subtitle: "",
    description: "",
    image: "",
    banner_image: "",
    gallery_images: [],
    sort_order: 0,
    is_active: true,
    gold_weight: "",
    gold_karat: "",
    stones: [],
  });

  // Toplu ürün yükleme state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedProducts, setParsedProducts] = useState<Product[]>([]);
  const [bulkUploadStatus, setBulkUploadStatus] = useState<'idle' | 'parsing' | 'uploading' | 'success' | 'error'>('idle');
  const [bulkUploadError, setBulkUploadError] = useState<string>("");

  // Öne çıkan ürünler state
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loadingFeaturedProducts, setLoadingFeaturedProducts] = useState(false);

  // Hakkımızda sayfası state
  const [aboutPage, setAboutPage] = useState<any>(null);
  const [loadingAboutPage, setLoadingAboutPage] = useState(false);
  const [aboutValues, setAboutValues] = useState<any[]>([]);
  const [loadingAboutValues, setLoadingAboutValues] = useState(false);

  // Hediye sayfası state
  const [hediyePage, setHediyePage] = useState<any>(null);
  const [loadingHediyePage, setLoadingHediyePage] = useState(false);

  // Size Özel (Özel Tasarım) sayfası state
  const [ozelTasarimPage, setOzelTasarimPage] = useState<any>(null);
  const [loadingOzelTasarimPage, setLoadingOzelTasarimPage] = useState(false);

  // Gözümün Nuru ek bölümler state
  const [gnSections, setGnSections] = useState<any>(null);
  const [loadingGnSections, setLoadingGnSections] = useState(false);

  // Blog yönetimi state
  interface BlogPost {
    id?: number;
    title: string;
    title_en?: string;
    title_ru?: string;
    slug: string;
    excerpt: string;
    excerpt_en?: string;
    excerpt_ru?: string;
    content: string;
    content_en?: string;
    content_ru?: string;
    image: string;
    author: string;
    status: "draft" | "published";
    created_at?: string;
    published_at?: string;
  }
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [newBlogPost, setNewBlogPost] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Han Kuyumculuk",
    status: "draft",
  });

  // Slug oluştur (ürün adından)
  const createSlug = (text: string): string => {
    // Türkçe karakterleri dönüştür
    const turkish: Record<string, string> = {
      'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
      'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
    };
    let slug = text;
    Object.keys(turkish).forEach(key => {
      slug = slug.replace(new RegExp(key, 'g'), turkish[key]);
    });
    
    // Küçük harfe çevir
    slug = slug.toLowerCase();
    
    // Alfanumerik olmayan karakterleri tire ile değiştir
    slug = slug.replace(/[^a-z0-9]+/g, '-');
    
    // Baştaki ve sondaki tireleri kaldır
    slug = slug.replace(/^-+|-+$/g, '');
    
    return slug;
  };

  // Kategori-ürün ilişkisi state
  const [categoryProducts, setCategoryProducts] = useState<Record<number, number[]>>({});
  const [loadingCategoryProducts, setLoadingCategoryProducts] = useState(false);

  // Auth kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      if (API_URL) {
        // Production: API'den kontrol et
        try {
          const response = await fetch(`${API_URL}/api/auth.php`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();

          if (data.authenticated) {
            setIsAuthenticated(true);
            setAuthToken(token);
          } else {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");
            setIsAuthenticated(false);
          }
        } catch {
          // API hatası - token'a güven
          setIsAuthenticated(true);
          setAuthToken(token);
        }
      } else {
        // Development: Token varsa giriş yap
        setIsAuthenticated(true);
        setAuthToken(token);
      }
    };

    checkAuth();
  }, []);

  // Logout fonksiyonu
  const handleLogout = async () => {
    if (API_URL) {
      try {
        await fetch(`${API_URL}/api/auth.php`, {
          method: "DELETE",
          credentials: "include",
        });
      } catch {
        // Hata olsa da çıkış yap
      }
    }

    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  // Login callback
  const handleLogin = (token: string) => {
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  // Handle resize drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newWidth = ((rect.right - e.clientX) / rect.width) * 100;
    setPreviewWidth(Math.min(Math.max(newWidth, 20), 80)); // Limit between 20% and 80%
    setDevicePreset("custom");
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Device presets
  const setDevice = (device: "desktop" | "tablet" | "mobile") => {
    setDevicePreset(device);
    switch (device) {
      case "desktop":
        setPreviewWidth(65);
        break;
      case "tablet":
        setPreviewWidth(50);
        break;
      case "mobile":
        setPreviewWidth(25);
        break;
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      // Önce localStorage'dan kontrol et (preview için)
      const savedContent = localStorage.getItem("admin_saved_content");
      const savedContentEn = localStorage.getItem("admin_saved_content_en");
      const savedContentRu = localStorage.getItem("admin_saved_content_ru");
      
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          setContent(parsed);
          localStorage.setItem("admin_preview_content", savedContent);
        } catch {
          // JSON parse hatası, devam et
        }
      }
      
      if (savedContentEn) {
        try {
          setContentEn(JSON.parse(savedContentEn));
        } catch {
          // JSON parse hatası
        }
      }
      
      if (savedContentRu) {
        try {
          setContentRu(JSON.parse(savedContentRu));
        } catch {
          // JSON parse hatası
        }
      }

      // Production'da API'den yükle
      if (API_URL) {
        try {
          // TR içerik
          const response = await fetch(`${API_URL}/api/content.php`);
          if (response.ok) {
            const data = await response.json();
            setContent(data as unknown as ContentType);
            localStorage.setItem("admin_preview_content", JSON.stringify(data));
            localStorage.setItem("admin_saved_content", JSON.stringify(data));
          }
          
          // EN içerik
          const responseEn = await fetch(`${API_URL}/api/content.php?locale=en`);
          if (responseEn.ok) {
            const dataEn = await responseEn.json();
            setContentEn(dataEn as unknown as ContentType);
            localStorage.setItem("admin_saved_content_en", JSON.stringify(dataEn));
          }
          
          // RU içerik
          const responseRu = await fetch(`${API_URL}/api/content.php?locale=ru`);
          if (responseRu.ok) {
            const dataRu = await responseRu.json();
            setContentRu(dataRu as unknown as ContentType);
            localStorage.setItem("admin_saved_content_ru", JSON.stringify(dataRu));
          }
          
          return;
        } catch (error) {
          console.error("İçerik yüklenemedi:", error);
        }
      }

      // Fallback: JSON dosyalarından yükle
      setContent(initialContent as unknown as ContentType);
      setContentEn(initialContentEn as unknown as ContentType);
      setContentRu(initialContentRu as unknown as ContentType);
      localStorage.setItem("admin_preview_content", JSON.stringify(initialContent));
    };

    loadContent();
  }, []);

  // Update localStorage whenever content changes (for live preview)
  // The iframe reads from localStorage via polling, no need to reload
  // Base64 görselleri localStorage'a kaydetme (quota hatası önlemek için)
  useEffect(() => {
    if (content) {
      try {
        // Sadece küçük önemli alanları kaydet (base64 görselleri hariç)
        const previewData = {
          topBanner: content.topBanner,
          header: content.header,
          footer: content.footer,
        };
        localStorage.setItem("admin_preview_content", JSON.stringify(previewData));
      } catch (error) {
        // localStorage doluysa sessizce devam et
        console.warn("Önizleme verisi localStorage'a kaydedilemedi:", error);
      }
    }
  }, [content]);

  // Base64 görselleri temizle (localStorage için)
  const cleanContentForStorage = (data: ContentType): ContentType => {
    const cleaned = JSON.parse(JSON.stringify(data));
    
    // Recursive function to clean base64 images
    const cleanBase64Images = (obj: unknown): unknown => {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      
      if (Array.isArray(obj)) {
        return obj.map(cleanBase64Images);
      }
      
      const cleanedObj: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string' && value.startsWith('data:image/')) {
          // Base64 görseli temizle, sadece placeholder bırak
          cleanedObj[key] = value.substring(0, 50) + '... [base64 removed for storage]';
        } else if (typeof value === 'object') {
          cleanedObj[key] = cleanBase64Images(value);
        } else {
          cleanedObj[key] = value;
        }
      }
      return cleanedObj;
    };
    
    return cleanBase64Images(cleaned) as ContentType;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // LocalStorage'a kaydet (önizleme için) - Base64 görselleri temizle
      try {
        if (!content) {
          throw new Error("İçerik bulunamadı");
        }
        const cleanedContent = cleanContentForStorage(content);
        const contentString = JSON.stringify(cleanedContent);
        
        // localStorage boyut kontrolü (yaklaşık 5MB limit)
        if (contentString.length > 4 * 1024 * 1024) {
          throw new Error("İçerik çok büyük, localStorage'a kaydedilemiyor");
        }
        
        localStorage.setItem("admin_saved_content", contentString);
        localStorage.setItem("admin_preview_content", contentString);
      } catch (storageError) {
        // localStorage dolu veya hata varsa, kullanıcıya bilgi ver
        console.warn("localStorage'a kaydedilemedi:", storageError);
        setMessage({ 
          type: "error", 
          text: "Görseller çok büyük. Lütfen görselleri sunucuya yükleyin (Production modunda otomatik yüklenir)." 
        });
        
        // Önizleme için sadece küçük bir özet kaydet
        const minimalContent = {
          topBanner: content?.topBanner,
          header: content?.header,
          footer: content?.footer,
        };
        try {
          localStorage.setItem("admin_preview_content", JSON.stringify(minimalContent));
        } catch {
          // Eğer bu da başarısız olursa, localStorage'ı temizle
          try {
            localStorage.removeItem("admin_saved_content");
            localStorage.removeItem("admin_preview_content");
            // Eski büyük verileri temizle
            localStorage.clear();
            setMessage({ 
              type: "error", 
              text: "localStorage temizlendi. Lütfen tekrar deneyin." 
            });
          } catch {
            // Son çare: hiçbir şey yapma
          }
        }
      }

      // Eğer API_URL tanımlıysa (production), PHP API'ye de kaydet
      if (API_URL) {
        // Tüm içeriği tek seferde kaydet
        const allSections = [
          { key: "top_banner", value: content?.topBanner },
          { key: "header", value: content?.header },
          { key: "hero", value: content?.hero },
          { key: "trend_section", value: content?.trendSection },
          { key: "story_section", value: content?.storySection },
          { key: "parallax_section", value: content?.parallaxSection },
          { key: "featured_products_section", value: content?.featuredProductsSection },
          { key: "featured_products", value: content?.featuredProducts },
          { key: "special_design_section", value: content?.specialDesignSection },
          { key: "blog_section", value: content?.blogSection },
          { key: "footer", value: content?.footer },
          { key: "contact", value: content?.contact },
          { key: "menu_images", value: content?.menuImages },
          // Kategori sayfaları
          { key: "yuzuk_category", value: content?.yuzukCategory },
          { key: "kolye_category", value: content?.kolyeCategory },
          { key: "bileklik_category", value: content?.bileklikCategory },
          { key: "kupe_category", value: content?.kupeCategory },
          { key: "set_category", value: content?.setCategory },
          { key: "gozumun_nuru_category", value: content?.gozumunNuruCategory },
          { key: "tesbih_category", value: content?.tesbihCategory },
          { key: "erkek_bileklik_category", value: content?.erkekBileklikCategory },
          { key: "erkek_yuzuk_category", value: content?.erkekYuzukCategory },
          { key: "erkek_kol_category", value: content?.erkekKolCategory },
          // Diğer sayfalar
          { key: "ozel_tasarim_page", value: content?.ozelTasarimPage },
          { key: "preloved_page", value: content?.prelovedPage },
          { key: "yatirim_page", value: content?.yatirimPage },
          { key: "iletisim_page", value: content?.iletisimPage },
        ];

        const savePromises = allSections
          .filter(section => section.value)
          .map(section =>
            fetch(`${API_URL}/api/settings.php`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ key: section.key, value: section.value }),
            })
          );

        const results = await Promise.all(savePromises);
        const hasError = results.some(r => !r.ok);

        if (hasError) {
          throw new Error("Bazı ayarlar kaydedilemedi");
        }
      }

      setMessage({ type: "success", text: "Tüm değişiklikler kaydedildi!" });
    } catch (error) {
      console.error("Kaydetme hatası:", error);
      setMessage({ type: "error", text: "Kaydetme hatası! Lütfen tekrar deneyin." });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Dil suffix'ini ekleyen yardımcı fonksiyon
  const getLocalizedFieldName = (field: string): string => {
    if (contentLang === 'tr') return field;
    return `${field}_${contentLang}`;
  };

  // Lokalize değeri okuyan yardımcı fonksiyon
  const getLocalizedValue = (section: string, field: string): unknown => {
    if (!activeContent) return '';
    const sectionData = activeContent[section] as Record<string, unknown>;
    if (!sectionData) return '';
    
    // Aktif dildeki değeri döndür
    return sectionData[field] ?? '';
  };

  const updateField = (section: string, field: string, value: unknown) => {
    if (!activeContent) return;
    
    // Aktif dile göre içerik güncelle
    setActiveContent((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...(prev[section] as Record<string, unknown>),
          [field]: value,
        },
      };
    });
  };

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuKey)
        ? prev.filter(m => m !== menuKey)
        : [...prev, menuKey]
    );
  };

  // Ürünleri ve kategorileri yükle
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      if (API_URL) {
        try {
          const [productsRes, categoriesRes] = await Promise.all([
            fetch(`${API_URL}/api/products.php`, { credentials: "include" }),
            fetch(`${API_URL}/api/categories.php`, { credentials: "include" }),
          ]);

          if (productsRes.ok) {
            const productsData = await productsRes.json();
            setProducts(Array.isArray(productsData) ? productsData : []);
          }

          if (categoriesRes.ok) {
            const categoriesData = await categoriesRes.json();
            // API gruplu obje döndürüyor, düz listeye çevir
            if (Array.isArray(categoriesData)) {
              setCategories(categoriesData);
            } else if (typeof categoriesData === 'object' && categoriesData !== null) {
              // Gruplu objeyi düz listeye çevir
              const flatCategories: Category[] = [];
              Object.entries(categoriesData).forEach(([parentType, cats]) => {
                if (Array.isArray(cats)) {
                  cats.forEach((cat: any) => {
                    flatCategories.push({
                      id: cat.id,
                      name: cat.name,
                      slug: cat.slug,
                      parent_type: cat.parentType || parentType,
                      hero_image: cat.heroImage,
                      hero_title: cat.heroTitle,
                      hero_subtitle: cat.heroSubtitle,
                      hero_description: cat.heroDescription,
                      list_title: cat.listTitle,
                      content: cat.content,
                    });
                  });
                }
              });
              setCategories(flatCategories);
            } else {
              setCategories([]);
            }
          }
        } catch (fetchError) {
          // API erişilemiyorsa sessizce devam et (development modunda normal)
          console.warn("API erişilemedi (development modu olabilir):", fetchError);
          setProducts([]);
          setCategories([]);
        }
      } else {
        // Development: content.json'dan ürünleri ve kategorileri çek
        const allProducts: Product[] = [];
        const allCategories: Category[] = [];
        
        const categoryMap = [
          { key: "yuzukCategory", name: "Yüzük", slug: "yuzuk", parentType: "mucevher" },
          { key: "kolyeCategory", name: "Kolye", slug: "kolye", parentType: "mucevher" },
          { key: "bileklikCategory", name: "Bileklik", slug: "bileklik", parentType: "mucevher" },
          { key: "kupeCategory", name: "Küpe", slug: "kupe", parentType: "mucevher" },
          { key: "setCategory", name: "Set", slug: "set", parentType: "mucevher" },
          { key: "gozumunNuruCategory", name: "Gözümün Nuru", slug: "gozumun-nuru", parentType: "koleksiyon" },
          { key: "tesbihCategory", name: "Tesbih", slug: "tesbih", parentType: "erkek" },
          { key: "erkekBileklikCategory", name: "Erkek Bileklik", slug: "bileklik", parentType: "erkek" },
          { key: "erkekYuzukCategory", name: "Erkek Yüzük", slug: "yuzuk", parentType: "erkek" },
          { key: "erkekKolCategory", name: "Erkek Kol", slug: "kol", parentType: "erkek" },
        ];

        categoryMap.forEach((catInfo, index) => {
          // Kategori ekle
          allCategories.push({
            id: index + 1,
            name: catInfo.name,
            slug: catInfo.slug,
            parent_type: catInfo.parentType,
          });

          // Kategori ürünlerini ekle
          const category = content?.[catInfo.key] as { products?: Product[] } | undefined;
          if (category?.products) {
            category.products.forEach((p, i) => {
              allProducts.push({
                ...p,
                id: index * 100 + i + 1,
                category_id: index + 1,
                is_active: true,
              });
            });
          }
        });

        setProducts(allProducts);
        setCategories(allCategories);
      }
    } catch (error) {
      // Development modunda API_URL tanımlı değilse hata normal
      if (!API_URL) {
        // Development modu - hata beklenen bir durum
        console.log("Development modu: Ürünler content.json'dan yüklendi");
      } else {
        // API_URL tanımlı ama erişilemiyor
        console.warn("API erişilemedi (PHP server çalışmıyor olabilir):", error);
        setProducts([]);
        setCategories([]);
      }
    }
    setLoadingProducts(false);
  };

  // Blog yazılarını yükle
  const loadBlogPosts = async () => {
    setLoadingBlog(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/blog.php`, { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(Array.isArray(data) ? data : []);
        }
      }
    } catch (error) {
      console.warn("Blog yazıları yüklenemedi:", error);
      setBlogPosts([]);
    }
    setLoadingBlog(false);
  };

  // Blog yazısı ekle
  const handleAddBlogPost = async () => {
    if (!newBlogPost.title) {
      setMessage({ type: "error", text: "Başlık gerekli" });
      return;
    }
    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/blog.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newBlogPost),
        });
        if (response.ok) {
          setMessage({ type: "success", text: "Blog yazısı eklendi" });
          setNewBlogPost({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            image: "",
            author: "Han Kuyumculuk",
            status: "draft",
          });
          loadBlogPosts();
          setActiveSection("blog-liste");
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Blog yazısı eklenirken hata oluştu" });
    }
    setSaving(false);
  };

  // Blog yazısı güncelle
  const handleUpdateBlogPost = async () => {
    if (!editingBlogPost) return;
    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/blog.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(editingBlogPost),
        });
        if (response.ok) {
          setMessage({ type: "success", text: "Blog yazısı güncellendi" });
          setEditingBlogPost(null);
          loadBlogPosts();
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Blog yazısı güncellenirken hata oluştu" });
    }
    setSaving(false);
  };

  // Blog yazısı sil
  const handleDeleteBlogPost = async (id: number) => {
    if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return;
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/blog.php`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setMessage({ type: "success", text: "Blog yazısı silindi" });
          loadBlogPosts();
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Blog yazısı silinirken hata oluştu" });
    }
  };

  // Kategori güncelle veya oluştur
  const updateCategory = async (categoryId: number | null, field: string, value: string, categoryKey?: string, parentType?: string) => {
    try {
      if (API_URL) {
        // Eğer kategori ID yoksa, önce kategoriyi oluştur
        if (!categoryId && categoryKey && parentType) {
          // Kategori adını slug'dan oluştur
          const categoryName = categoryKey
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          const response = await fetch(`${API_URL}/api/categories.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              name: categoryName,
              slug: categoryKey,
              parent_type: parentType,
              [field]: value
            }),
          });

          if (response.ok) {
            const data = await response.json();
            // Kategorileri yeniden yükle
            loadProducts();
            return data.id;
          } else {
            const errorData = await response.json();
            setMessage({ type: "error", text: errorData.error || "Kategori oluşturulamadı" });
            return null;
          }
        } else if (categoryId) {
          // Mevcut kategoriyi güncelle
          const response = await fetch(`${API_URL}/api/categories.php`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ id: categoryId, [field]: value }),
          });

          if (response.ok) {
            // Local state güncelle
            setCategories(prev => prev.map(cat =>
              cat.id === categoryId ? { ...cat, [field]: value } : cat
            ));
            return categoryId;
          } else {
            const errorData = await response.json();
            setMessage({ type: "error", text: errorData.error || "Kategori güncellenemedi" });
            return null;
          }
        }
      } else {
        // Development: local state güncelle
        if (categoryId) {
          setCategories(prev => prev.map(cat =>
            cat.id === categoryId ? { ...cat, [field]: value } : cat
          ));
        }
        return categoryId;
      }
    } catch (error) {
      console.error("Kategori güncelleme hatası:", error);
      setMessage({ type: "error", text: "Kategori güncellenirken hata oluştu" });
      return null;
    }
  };

  // Ürün ekle
  const handleAddProduct = async () => {
    if (!newProduct.name) {
      setMessage({ type: "error", text: "Ürün adı gerekli" });
      return;
    }

    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/products.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          setMessage({ type: "success", text: "Ürün eklendi!" });
          setNewProduct({
            category_id: null,
            slug: "",
            name: "",
            subtitle: "",
            description: "",
            image: "",
            banner_image: "",
            gallery_images: [],
            sort_order: 0,
            is_active: true,
          });
          loadProducts();
        } else {
          throw new Error("Ürün eklenemedi");
        }
      } else {
        // Development: local state'e ekle
        const newId = Math.max(0, ...products.map(p => p.id || 0)) + 1;
        setProducts([...products, { ...newProduct, id: newId }]);
        setMessage({ type: "success", text: "Ürün eklendi (local)!" });
        setNewProduct({
          category_id: null,
          slug: "",
          name: "",
          subtitle: "",
          description: "",
          image: "",
          banner_image: "",
          gallery_images: [],
          sort_order: 0,
          is_active: true,
        });
      }
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
      setMessage({ type: "error", text: "Ürün eklenemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Ürün güncelle
  const handleUpdateProduct = async () => {
    if (!editingProduct || !editingProduct.id) return;

    // Scroll pozisyonunu kaydet
    const scrollPosition = productListRef.current?.scrollTop || 0;

    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/products.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(editingProduct),
        });

        if (response.ok) {
          setMessage({ type: "success", text: "Ürün güncellendi!" });
          setEditingProduct(null);
          await loadProducts();

          // Scroll pozisyonunu geri yükle
          setTimeout(() => {
            if (productListRef.current) {
              productListRef.current.scrollTop = scrollPosition;
            }
          }, 100);
        } else {
          throw new Error("Ürün güncellenemedi");
        }
      } else {
        // Development: local state'i güncelle
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
        setMessage({ type: "success", text: "Ürün güncellendi (local)!" });
        setEditingProduct(null);
      }
    } catch (error) {
      console.error("Ürün güncelleme hatası:", error);
      setMessage({ type: "error", text: "Ürün güncellenemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Ürün sil
  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return;

    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/products.php?id=${productId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          setMessage({ type: "success", text: "Ürün silindi!" });
          loadProducts();
        } else {
          throw new Error("Ürün silinemedi");
        }
      } else {
        // Development: local state'ten sil
        setProducts(products.filter(p => p.id !== productId));
        setMessage({ type: "success", text: "Ürün silindi (local)!" });
      }
    } catch (error) {
      console.error("Ürün silme hatası:", error);
      setMessage({ type: "error", text: "Ürün silinemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Öne çıkan ürünleri yükle
  const loadFeaturedProducts = async () => {
    setLoadingFeaturedProducts(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/featured-products.php`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setFeaturedProducts(Array.isArray(data) ? data : []);
        }
      } else {
        // Development: content.json'dan yükle
        const featured = (content?.featuredProducts as unknown[]) || [];
        setFeaturedProducts(featured as any[]);
      }
    } catch (error) {
      console.error("Öne çıkan ürünler yükleme hatası:", error);
    } finally {
      setLoadingFeaturedProducts(false);
    }
  };

  // Öne çıkan ürün ekle
  const handleAddFeaturedProduct = async (productId: number) => {
    setSaving(true);
    try {
      if (API_URL) {
        const product = products.find(p => p.id === productId);
        if (!product) {
          throw new Error("Ürün bulunamadı");
        }

        const response = await fetch(`${API_URL}/api/featured-products.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            productId: productId,
            displayName: product.name,
            displayCategory: categories.find(c => c.id === product.category_id)?.name || "",
          }),
        });

        if (response.ok) {
          setMessage({ type: "success", text: "Ürün eklendi!" });
          await loadFeaturedProducts();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Ürün eklenemedi");
        }
      } else {
        // Development: local state'e ekle
        const product = products.find(p => p.id === productId);
        if (product) {
          const newFeatured = {
            id: Date.now(),
            productId: productId,
            productName: product.name,
            image: product.image,
            displayName: product.name,
            displayCategory: categories.find(c => c.id === product.category_id)?.name || "",
            sortOrder: featuredProducts.length,
            isActive: true,
          };
          setFeaturedProducts([...featuredProducts, newFeatured]);
          updateField("featuredProducts", "", [...(content?.featuredProducts as unknown[] || []), newFeatured]);
          setMessage({ type: "success", text: "Ürün eklendi (local)!" });
        }
      }
    } catch (error) {
      console.error("Öne çıkan ürün ekleme hatası:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Ürün eklenemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Öne çıkan ürün sil
  const handleDeleteFeaturedProduct = async (featuredProductId: number) => {
    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/featured-products.php?id=${featuredProductId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          setMessage({ type: "success", text: "Ürün listeden kaldırıldı!" });
          await loadFeaturedProducts();
        } else {
          throw new Error("Ürün silinemedi");
        }
      } else {
        // Development: local state'ten sil
        setFeaturedProducts(featuredProducts.filter(fp => fp.id !== featuredProductId));
        const updated = (content?.featuredProducts as unknown[] || []).filter((fp: any) => fp.id !== featuredProductId);
        updateField("featuredProducts", "", updated);
        setMessage({ type: "success", text: "Ürün listeden kaldırıldı (local)!" });
      }
    } catch (error) {
      console.error("Öne çıkan ürün silme hatası:", error);
      setMessage({ type: "error", text: "Ürün silinemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Hakkımızda sayfasını yükle
  const loadAboutPage = async () => {
    setLoadingAboutPage(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/pages.php?slug=hakkimizda`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          // Eksik alanları varsayılan değerlerle doldur
          setAboutPage({
            id: data.id || null,
            slug: data.slug || "hakkimizda",
            title: data.title || "Hakkımızda",
            heroImage: data.heroImage || "/images/about-hero.jpg",
            heroImagePosition: data.heroImagePosition || "50% 50%",
            heroImageScale: data.heroImageScale || 1,
            heroTitle: data.heroTitle || "Hakkımızda | Han Kuyumculuk",
            heroParagraph2: data.heroParagraph2 || "1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaatten öte; disiplin, süreklilik ve sorumluluk anlayışıyla ele alan köklü bir üreticidir. Kuruluşundan bu yana tasarımdan üretime uzanan tüm süreçlerinde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır.\n\nİstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek Han'ın karakterini oluşturur. Bugün farklı markalar altında vitrinlerde yer alan birçok mücevher tasarımının arkasında Han imzası bulunur; çoğu zaman adı görünmeden, işçiliği ve detay diliyle kendini belli eder.\n\nTüm koleksiyonlar; pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip, alanında uzman ve istikrarlı ekipler tarafından geliştirilir. Üretimde süreklilik, Han için yalnızca hacim değil; hammaddeden son sunuma kadar standartların titizlikle korunması anlamına gelir.\n\nBugün Han Kuyumculuk;\n• Gücünü yıllara dayanan üretim tecrübesinden,\n• Güvenilirliğini uzman ve istikrarlı ekibinden,\n• Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.\n\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.",
            valuesTitle: data.valuesTitle || "Vizyonumuz"
          });
        } else {
          // Fallback: Varsayılan değerler
          setAboutPage({
            id: null,
            slug: "hakkimizda",
            title: "Hakkımızda",
            heroImage: "/images/about-hero.jpg",
            heroImagePosition: "50% 50%",
            heroImageScale: 1,
            heroTitle: "Hakkımızda | Han Kuyumculuk",
            heroParagraph2: "1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaatten öte; disiplin, süreklilik ve sorumluluk anlayışıyla ele alan köklü bir üreticidir. Kuruluşundan bu yana tasarımdan üretime uzanan tüm süreçlerinde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır.\n\nİstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek Han'ın karakterini oluşturur. Bugün farklı markalar altında vitrinlerde yer alan birçok mücevher tasarımının arkasında Han imzası bulunur; çoğu zaman adı görünmeden, işçiliği ve detay diliyle kendini belli eder.\n\nTüm koleksiyonlar; pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip, alanında uzman ve istikrarlı ekipler tarafından geliştirilir. Üretimde süreklilik, Han için yalnızca hacim değil; hammaddeden son sunuma kadar standartların titizlikle korunması anlamına gelir.\n\nBugün Han Kuyumculuk;\n• Gücünü yıllara dayanan üretim tecrübesinden,\n• Güvenilirliğini uzman ve istikrarlı ekibinden,\n• Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.\n\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.",
            valuesTitle: "Vizyonumuz"
          });
        }
      } else {
        // Development: Varsayılan değerler
        setAboutPage({
          id: null,
          slug: "hakkimizda",
          title: "Hakkımızda",
          heroImage: "/images/about-hero.jpg",
          heroImagePosition: "50% 50%",
          heroImageScale: 1,
          heroTitle: "Hakkımızda | Han Kuyumculuk",
          heroParagraph2: "1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaatten öte; disiplin, süreklilik ve sorumluluk anlayışıyla ele alan köklü bir üreticidir. Kuruluşundan bu yana tasarımdan üretime uzanan tüm süreçlerinde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır.\n\nİstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek Han'ın karakterini oluşturur. Bugün farklı markalar altında vitrinlerde yer alan birçok mücevher tasarımının arkasında Han imzası bulunur; çoğu zaman adı görünmeden, işçiliği ve detay diliyle kendini belli eder.\n\nTüm koleksiyonlar; pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip, alanında uzman ve istikrarlı ekipler tarafından geliştirilir. Üretimde süreklilik, Han için yalnızca hacim değil; hammaddeden son sunuma kadar standartların titizlikle korunması anlamına gelir.\n\nBugün Han Kuyumculuk;\n• Gücünü yıllara dayanan üretim tecrübesinden,\n• Güvenilirliğini uzman ve istikrarlı ekibinden,\n• Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.\n\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.",
          valuesTitle: "Vizyonumuz"
        });
      }
    } catch (error) {
      console.error("Hakkımızda sayfası yükleme hatası:", error);
      // Hata durumunda da varsayılan değerleri set et
      setAboutPage({
        id: null,
        slug: "hakkimizda",
        title: "Hakkımızda",
        heroImage: "/images/about-hero.jpg",
        heroImagePosition: "50% 50%",
        heroImageScale: 1,
        heroTitle: "Hakkımızda | Han Kuyumculuk",
        heroParagraph2: "1988 yılında İstanbul'da kurulan Han Kuyumculuk, mücevher üretimini bir zanaatten öte; disiplin, süreklilik ve sorumluluk anlayışıyla ele alan köklü bir üreticidir. Kuruluşundan bu yana tasarımdan üretime uzanan tüm süreçlerinde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır.\n\nİstanbul'un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek Han'ın karakterini oluşturur. Bugün farklı markalar altında vitrinlerde yer alan birçok mücevher tasarımının arkasında Han imzası bulunur; çoğu zaman adı görünmeden, işçiliği ve detay diliyle kendini belli eder.\n\nTüm koleksiyonlar; pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip, alanında uzman ve istikrarlı ekipler tarafından geliştirilir. Üretimde süreklilik, Han için yalnızca hacim değil; hammaddeden son sunuma kadar standartların titizlikle korunması anlamına gelir.\n\nBugün Han Kuyumculuk;\n• Gücünü yıllara dayanan üretim tecrübesinden,\n• Güvenilirliğini uzman ve istikrarlı ekibinden,\n• Kimliğini ise pırlantada söz sahibi olma kararlılığından alır.\n\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.",
        valuesTitle: "Vizyonumuz"
      });
    } finally {
      setLoadingAboutPage(false);
    }
  };

  // Hakkımızda sayfasını kaydet
  const saveAboutPage = async () => {
    if (!aboutPage) return;

    setSaving(true);
    try {
      if (API_URL) {
        // Her zaman PUT kullan - API slug ile sayfayı bulup güncelleyecek veya oluşturacak
        const body = {
          ...aboutPage,
          title: aboutPage.title || "Hakkımızda",
          slug: aboutPage.slug || "hakkimizda",
        };

        const response = await fetch(`${API_URL}/api/pages.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok && data.success !== false && !data.error) {
          setMessage({ type: "success", text: "Hakkımızda sayfası kaydedildi!" });
          if (data.id) {
            setAboutPage({ ...aboutPage, id: data.id });
          }
        } else {
          throw new Error(data.error || "Sayfa kaydedilemedi");
        }
      } else {
        // Development: Local state'e kaydet
        setMessage({ type: "success", text: "Hakkımızda sayfası kaydedildi (local)!" });
      }
    } catch (error) {
      console.error("Hakkımızda sayfası kaydetme hatası:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Sayfa kaydedilemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Hediye sayfasını yükle
  const defaultHediyeSections = {
    philosophyTitle1: "Bir teşekkür,",
    philosophyTitle2: "bir kutlama",
    philosophyText: "\"iyi ki varsın\" demenin en kalıcı hâli…\n\nHan'da hediye,\nyalnızca bir mücevher seçimi değil;\nduyulmuş, düşünülmüş ve anlam yüklenmiş bir jesttir.",
    splitImage: "/images/trend-left.jpg",
    splitTitle: "Değer\nverdiğini göster",
    splitText1: "Değer verdiğini, düşündüğünü\nve özen gösterdiğini göstermenin\nen açık yoludur.",
    splitText2: "Anneler Günü'nde minneti,\nKadınlar Günü'nde zarafeti,\nSevgililer Günü'nde bağı,\nyıl dönümlerinde ortak bir hikâyeyi anlatır.",
    categoriesTitle: "Kategorilerimiz",
    categoriesSubtitle: "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
    categories: [
      { title: "Yüzük", description: "Biçiminin içinde anlam", image: "/images/products/product-1.jpg", href: "/mucevher/yuzuk" },
      { title: "Kolye", description: "Göğsüne yakın sevgi", image: "/images/products/product-2.jpg", href: "/mucevher/kolye" },
      { title: "Bileklik", description: "Hareketiyle hikâye", image: "/images/products/product-3.jpg", href: "/mucevher/bileklik" },
      { title: "Küpe", description: "Yüze yakın söz", image: "/images/products/product-4.jpg", href: "/mucevher/kupe" },
    ],
    darkBgImage: "/images/parallax-bg.jpg",
    darkText1: "Her parça;\nzamansız tasarımı, dengeli oranları ve ustalıklı işçiliğiyle\nverildiği ana değer katar.",
    darkText2: "Gösterişten çok dengeye,\nabartıdan çok ustalığa,\ngeçicilikten çok kalıcılığa odaklanır.",
    darkText3: "Çünkü bazı hediyeler,\nkutudan çıktığı an değil,\nyıllar sonra bile hatırlandığında anlam kazanır…",
    ctaSmallTitle: "Peki Sen?",
    ctaTitle: "Kimin hayatında iz bırakmak istiyorsun",
    ctaSubtitle: "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
  };

  // Size Özel sayfası varsayılan bölüm verileri
  const defaultOzelTasarimSections = {
    heroSubtitle: "Han Kuyumculuk",
    heroTitle: "Size Özel",
    heroDesc: "Her şey sizi dinlemekle başlıyor.",
    scrollText: "Keşfedin",
    philosophyQuote1: "Gerçek değer,",
    philosophyQuote2: "kişiye ait olanda saklıdır.",
    philosophyText: "Size özel olan,\nhazır kalıplara sığmaz.\nBir ölçüden fazlasıdır;\nbir duruştur, bir ihtiyaçtır, bir hikâyedir.",
    splitImage: "/images/trend-left.jpg",
    splitTitle: "Dinlenmeyi\nbeklersiniz.",
    splitText1: "Söylediklerinizin anlaşılmasını,\nanlatmak istediklerinizin\ndikkatle ele alınmasını istersiniz.",
    splitText2: "Detay ararsınız.\nHer çizginin, her dokunun\nsizinle bir bağ kurmasını beklersiniz.",
    processTitle: "Özgürlük İstersiniz",
    processSubtitle: "Seçeneklerin sizi sınırlamamasını,\naksine size alan açmasını beklersiniz.",
    steps: [
      { label: "İlk Adım", title: "Anlama", desc: "Mücevher, biçim almadan önce sizi anlamakla başlar.\nBeklentiler, duygular ve size ait hikâye bu aşamada netleşir.\nHalinizi, niyenizi, anlatmak istediğinizi duygunuzu dinleriz." },
      { label: "İkinci Adım", title: "Şekillendirme", desc: "Ölçüler, dokular ve detaylar, yavaş yavaş belirir.\nBu aşama bir karar değil, bir keşiftir.\nParça kendini bulana kadar çalışılır.\nBu aşamada, sizin beklentileriniz ile bizim teknik bilgimiz\nve yıllara dayanan üretim tecrübemiz bir araya gelir.\nTasarım, bu evrede gerçek karakterini kazanır." },
      { label: "Üçüncü Adım", title: "Üretim", desc: "Tasarım netleştiğinde, usta ellerde,\neşsiz bir parça olarak hayata geçer.\nBeklenti ve istekleriniz tam olarak karşılık bulana dek\nsüreç titizlikle devam eder." },
      { label: "Son Adım", title: "Tamamlanma", desc: "Ortaya çıkan mücevher, artık yalnızca bir tasarım değil,\nsize ait bir iz haline gelir.\nTamamlanma, beklentileriniz eksiksiz karşılandığında gerçekleşir." },
    ],
    darkBgImage: "/images/parallax-bg.jpg",
    darkTitle: "Ve Sonunda...",
    darkText1: "Size ait olduğunu hissettiren",
    darkText1Cursive: "bir parça beklersiniz.",
    darkText2: "Başkasına değil,\ntam olarak size yakışan.",
    ctaTitle1: "İşte bu yüzden",
    ctaTitle2: 'Han "Size Özel"',
    ctaDesc: "Dinleyen, anlayan ve sizin için şekillenen\nbir ustalık yaklaşımı sunar.",
    ctaButtonText: "RANDEVU OLUŞTURUN",
    ctaButtonLink: "/randevu?subject=size-ozel",
    galleryImages: [
      "/images/products/product-1.jpg",
      "/images/products/product-2.jpg",
      "/images/products/product-3.jpg"
    ],
  };

  const loadHediyePage = async () => {
    setLoadingHediyePage(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/pages.php?slug=hediye`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          let sections = defaultHediyeSections;
          try {
            if (data.content) sections = { ...defaultHediyeSections, ...JSON.parse(data.content) };
          } catch { /* use defaults */ }
          setHediyePage({
            id: data.id || null,
            slug: data.slug || "hediye",
            title: data.title || "Hediye",
            heroImage: data.heroImage || "/images/hediye-menu-hero.jpg",
            heroTitle: data.heroTitle || "Hediye",
            heroSubtitle: data.heroSubtitle || "Kalplerde bir iz olarak kalan özel günler vardır",
            sections,
          });
        } else {
          setHediyePage({
            id: null, slug: "hediye", title: "Hediye",
            heroImage: "/images/hediye-menu-hero.jpg", heroTitle: "Hediye",
            heroSubtitle: "Kalplerde bir iz olarak kalan özel günler vardır",
            sections: defaultHediyeSections,
          });
        }
      } else {
        setHediyePage({
          id: null, slug: "hediye", title: "Hediye",
          heroImage: "/images/hediye-menu-hero.jpg", heroTitle: "Hediye",
          heroSubtitle: "Kalplerde bir iz olarak kalan özel günler vardır",
          sections: defaultHediyeSections,
        });
      }
    } catch (error) {
      console.error("Hediye sayfası yükleme hatası:", error);
      setHediyePage({
        id: null, slug: "hediye", title: "Hediye",
        heroImage: "/images/hediye-menu-hero.jpg", heroTitle: "Hediye",
        heroSubtitle: "Kalplerde bir iz olarak kalan özel günler vardır",
        sections: defaultHediyeSections,
      });
    } finally {
      setLoadingHediyePage(false);
    }
  };

  // Hediye sayfasını kaydet
  const saveHediyePage = async () => {
    if (!hediyePage) return;

    setSaving(true);
    try {
      if (API_URL) {
        const { sections, ...rest } = hediyePage;
        const body = {
          ...rest,
          title: rest.title || "Hediye",
          slug: rest.slug || "hediye",
          content: JSON.stringify(sections || {}),
        };

        const response = await fetch(`${API_URL}/api/pages.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok && data.success !== false && !data.error) {
          setMessage({ type: "success", text: "Hediye sayfası kaydedildi!" });
          if (data.id) {
            setHediyePage({ ...hediyePage, id: data.id });
          }
        } else {
          throw new Error(data.error || "Sayfa kaydedilemedi");
        }
      } else {
        setMessage({ type: "success", text: "Hediye sayfası kaydedildi (local)!" });
      }
    } catch (error) {
      console.error("Hediye sayfası kaydetme hatası:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Sayfa kaydedilemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Size Özel (Özel Tasarım) sayfasını yükle
  const loadOzelTasarimPage = async () => {
    setLoadingOzelTasarimPage(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/pages.php?slug=ozel-tasarim`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          let sections = defaultOzelTasarimSections;
          try {
            if (data.content) sections = { ...defaultOzelTasarimSections, ...JSON.parse(data.content) };
          } catch { /* use defaults */ }
          setOzelTasarimPage({
            id: data.id || null,
            slug: data.slug || "ozel-tasarim",
            title: data.title || "Size Özel",
            heroImage: data.heroImage || "/images/categories/ozel-tasarim-card.jpg",
            sections,
          });
        } else {
          setOzelTasarimPage({
            id: null, slug: "ozel-tasarim", title: "Size Özel",
            heroImage: "/images/categories/ozel-tasarim-card.jpg",
            sections: defaultOzelTasarimSections,
          });
        }
      } else {
        setOzelTasarimPage({
          id: null, slug: "ozel-tasarim", title: "Size Özel",
          heroImage: "/images/categories/ozel-tasarim-card.jpg",
          sections: defaultOzelTasarimSections,
        });
      }
    } catch (error) {
      console.error("Size Özel sayfası yükleme hatası:", error);
      setOzelTasarimPage({
        id: null, slug: "ozel-tasarim", title: "Size Özel",
        heroImage: "/images/categories/ozel-tasarim-card.jpg",
        sections: defaultOzelTasarimSections,
      });
    } finally {
      setLoadingOzelTasarimPage(false);
    }
  };

  // Size Özel sayfasını kaydet
  const saveOzelTasarimPage = async () => {
    if (!ozelTasarimPage) return;

    setSaving(true);
    try {
      if (API_URL) {
        const { sections, ...rest } = ozelTasarimPage;
        const body = {
          ...rest,
          title: rest.title || "Size Özel",
          slug: rest.slug || "ozel-tasarim",
          content: JSON.stringify(sections || {}),
        };

        const response = await fetch(`${API_URL}/api/pages.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok && data.success !== false && !data.error) {
          setMessage({ type: "success", text: "Size Özel sayfası kaydedildi!" });
          if (data.id) {
            setOzelTasarimPage({ ...ozelTasarimPage, id: data.id });
          }
        } else {
          throw new Error(data.error || "Sayfa kaydedilemedi");
        }
      } else {
        setMessage({ type: "success", text: "Size Özel sayfası kaydedildi (local)!" });
      }
    } catch (error) {
      console.error("Size Özel sayfası kaydetme hatası:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Sayfa kaydedilemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Gözümün Nuru ek bölümler
  const defaultGnSections = {
    philosophyQuote1: "\"Sen benim hayatımı güzelleştiren biri değilsin;",
    philosophyQuote2: "hayatımı anlamlı kılan yerdesin.\"",
    philosophyText: "Gözümün Nuru,\ndeğerini yitirmeyen bir yakınlıktan doğdu.\nRuhun penceresinden süzülen aydınlık bir bağdan…",
    splitImage: "/images/trend-right.jpg",
    splitTitle: "Her detay\nbir bağ",
    splitText1: "Bu koleksiyondaki her parça,\nbirine duyulan saf sevginin,\nkoruma içgüdüsünün\nve vazgeçilmez olma hissinin manevi yansımasıdır.",
    splitText2: "Her dokunuş, her detay;\nkoruyan, saran, tamamlayan emek harcanmış\nbir bağın izini taşır.",
    collectionTitle: "Koleksiyonu Keşfet",
    collectionSubtitle: "Işık saçmaktan daha çok;\nait olmak için…",
    darkBgImage: "/images/parallax-bg.jpg",
    darkText1: "Gösterişten ziyade,\nhissettirmeye odaklı tasarlandı.",
    darkText2: "Han mücevherleri,",
    darkText2Cursive: "özel hissettirmek için var olur.",
    darkText3: "Bu çok özel birinin hikâyesi…\nPeki Sen neresindesin?",
    ctaSmallTitle: "Seçilmiş",
    ctaTitle: "Düşünülmüş ve Uzun Vadeli Bir Değer",
    ctaSubtitle: "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
  };

  const loadGnSections = async () => {
    setLoadingGnSections(true);
    try {
      const cat = categories.find(c => c.slug === "gozumun-nuru" && c.parent_type === "koleksiyon");
      if (cat?.content) {
        try {
          setGnSections({ ...defaultGnSections, ...JSON.parse(cat.content) });
        } catch {
          setGnSections({ ...defaultGnSections });
        }
      } else if (API_URL) {
        // Fetch directly from API to get content field
        const response = await fetch(`${API_URL}/api/categories.php?slug=gozumun-nuru`, { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          if (data.content) {
            try {
              setGnSections({ ...defaultGnSections, ...JSON.parse(data.content) });
            } catch {
              setGnSections({ ...defaultGnSections });
            }
          } else {
            setGnSections({ ...defaultGnSections });
          }
        } else {
          setGnSections({ ...defaultGnSections });
        }
      } else {
        setGnSections({ ...defaultGnSections });
      }
    } catch (error) {
      console.error("Gözümün Nuru bölümleri yükleme hatası:", error);
      setGnSections({ ...defaultGnSections });
    } finally {
      setLoadingGnSections(false);
    }
  };

  const saveGnSections = async () => {
    if (!gnSections) return;
    setSaving(true);
    try {
      const cat = categories.find(c => c.slug === "gozumun-nuru" && c.parent_type === "koleksiyon");
      if (cat && API_URL) {
        const response = await fetch(`${API_URL}/api/categories.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id: cat.id, content: JSON.stringify(gnSections) }),
        });
        if (response.ok) {
          setMessage({ type: "success", text: "Gözümün Nuru bölümleri kaydedildi!" });
          // Update local categories state
          setCategories(prev => prev.map(c =>
            c.id === cat.id ? { ...c, content: JSON.stringify(gnSections) } : c
          ));
        } else {
          throw new Error("Kaydedilemedi");
        }
      } else {
        setMessage({ type: "success", text: "Gözümün Nuru bölümleri kaydedildi (local)!" });
      }
    } catch (error) {
      console.error("Gözümün Nuru kaydetme hatası:", error);
      setMessage({ type: "error", text: "Bölümler kaydedilemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Hakkımızda Values'ları yükle
  const loadAboutValues = async () => {
    setLoadingAboutValues(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/about-values.php`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setAboutValues(Array.isArray(data) ? data : []);
        } else {
          setAboutValues([]);
        }
      } else {
        // Development: Varsayılan değerler
        setAboutValues([
          { id: 1, title: "Zarafet", description: "Her tasarımımızda zarafeti ön planda tutuyoruz.", image: "/images/about-value-1.jpg", sortOrder: 1 },
          { id: 2, title: "Kalite", description: "Sertifikalı pırlantalar ve en kaliteli malzemelerle çalışıyoruz.", image: "/images/about-value-2.jpg", sortOrder: 2 },
          { id: 3, title: "Özgünlük", description: "Her mücevher, kendine özgü bir hikâye taşır.", image: "/images/about-value-3.jpg", sortOrder: 3 },
          { id: 4, title: "Güven", description: "Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir.", image: "/images/about-value-4.jpg", sortOrder: 4 }
        ]);
      }
    } catch (error) {
      console.error("Values yükleme hatası:", error);
      setAboutValues([]);
    } finally {
      setLoadingAboutValues(false);
    }
  };

  // Value kaydet/güncelle
  const saveAboutValue = async (value: any) => {
    setSaving(true);
    try {
      if (API_URL) {
        const method = value.id ? "PUT" : "POST";
        const response = await fetch(`${API_URL}/api/about-values.php`, {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(value),
        });

        if (response.ok) {
          const data = await response.json();
          setMessage({ type: "success", text: "Değer kaydedildi!" });
          if (data.id && !value.id) {
            // Yeni eklenen value'ya ID ata
            setAboutValues(prev => prev.map(v => v === value ? { ...v, id: data.id } : v));
          }
          loadAboutValues(); // Listeyi yenile
        } else {
          throw new Error("Değer kaydedilemedi");
        }
      } else {
        setMessage({ type: "success", text: "Değer kaydedildi (local)!" });
      }
    } catch (error) {
      console.error("Değer kaydetme hatası:", error);
      setMessage({ type: "error", text: "Değer kaydedilemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Value sil
  const deleteAboutValue = async (id: number) => {
    if (!confirm("Bu değeri silmek istediğinizden emin misiniz?")) return;

    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/about-values.php?id=${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          setMessage({ type: "success", text: "Değer silindi!" });
          loadAboutValues(); // Listeyi yenile
        } else {
          throw new Error("Değer silinemedi");
        }
      } else {
        setMessage({ type: "success", text: "Değer silindi (local)!" });
        setAboutValues(prev => prev.filter(v => v.id !== id));
      }
    } catch (error) {
      console.error("Değer silme hatası:", error);
      setMessage({ type: "error", text: "Değer silinemedi!" });
    }
    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // JavaScript object literal formatını JSON'a çevir
  const convertObjectLiteralToJSON = (str: string): string => {
    try {
      // Önce geçerli JSON olup olmadığını kontrol et
      JSON.parse(str);
      return str; // Zaten geçerli JSON
    } catch {
      // JavaScript object literal formatını JSON'a çevir
      let result = str.trim();
      
      // Adım 1: Boş değerleri düzelt (color: , -> "color": "")
      result = result.replace(/:\s*,/g, ': "",');
      result = result.replace(/:\s*}/g, ': ""}');
      
      // Adım 2: Property name'leri tırnak içine al (zaten tırnaklı olanları atla)
      result = result.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
      
      // Adım 3: String değerleri tırnak içine al
      // Daha güvenilir bir yaklaşım: her "key: value" çiftini ayrı ayrı işle
      result = result.replace(/:\s*([^",}\[\]]+?)(\s*[,}])/g, (match, value, suffix) => {
        const trimmed = value.trim();
        
        // Zaten tırnak içindeyse dokunma (çift veya tek tırnak)
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
          return match;
        }
        if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
          // Tek tırnakları çift tırnağa çevir
          const unquoted = trimmed.slice(1, -1);
          const escaped = unquoted.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          return `: "${escaped}"${suffix}`;
        }
        
        // Sayı mı kontrol et (negatif sayılar ve ondalık sayılar dahil)
        if (/^-?\d+\.?\d*$/.test(trimmed)) {
          return `: ${trimmed}${suffix}`;
        }
        
        // Boolean veya null mı kontrol et
        if (trimmed === 'true' || trimmed === 'false' || trimmed === 'null') {
          return `: ${trimmed}${suffix}`;
        }
        
        // Boş değer (zaten Adım 1'de düzeltilmiş olmalı ama yine de kontrol et)
        if (trimmed === '') {
          return `: ""${suffix}`;
        }
        
        // String değer - tırnak içine al (özel karakterleri escape et)
        const escaped = trimmed.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        return `: "${escaped}"${suffix}`;
      });
      
      return result;
    }
  };

  // CSV dosyasını parse et
  const parseCSV = useCallback((file: File) => {
    setBulkUploadStatus('parsing');
    setBulkUploadError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
          throw new Error('CSV dosyası boş veya geçersiz');
        }

        // Header'ı kontrol et - delimiter'ı otomatik algıla (virgül veya noktalı virgül)
        const firstLine = lines[0];
        const delimiter = firstLine.includes(';') ? ';' : ',';

        const headers = firstLine.split(delimiter).map(h => h.trim().replace(/^"|"$/g, '').replace(/^\uFEFF/, '').toLowerCase());
        console.log('CSV Headers:', headers);
        console.log('Delimiter:', delimiter);

        const products: Product[] = [];

        // Her satırı parse et (header'dan sonraki satırlar)
        for (let i = 1; i < lines.length; i++) {
          const values: string[] = [];
          let currentValue = '';
          let insideQuotes = false;

          // CSV parsing with quote handling
          for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];

            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === delimiter && !insideQuotes) {
              values.push(currentValue.trim().replace(/^"|"$/g, ''));
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          values.push(currentValue.trim().replace(/^"|"$/g, '')); // Son değeri ekle

          if (values.length < 3) continue; // En az 3 kolon olmalı (slug, name, subtitle)

          // Header'a göre değerleri eşleştir
          const getValue = (key: string): string => {
            const index = headers.indexOf(key.toLowerCase());
            return index >= 0 ? (values[index] || '') : '';
          };

          const slug = getValue('slug');
          const name = getValue('name');
          const subtitle = getValue('subtitle');
          const description = getValue('description');
          const categoryId = getValue('category_id');
          const image = getValue('image');
          const bannerImage = getValue('banner_image');
          const galleryImagesStr = getValue('gallery_images');
          const goldWeight = getValue('gold_weight')?.replace(/^'/, ''); // Başındaki tek tırnağı kaldır
          const goldKarat = getValue('gold_karat');
          const stonesJson = getValue('stones_json');

          if (!name && !slug) continue; // name veya slug yoksa atla

          // Galeri görsellerini parse et
          const galleryImages = galleryImagesStr
            ? galleryImagesStr.split(',').map(img => img.trim()).filter(img => img)
            : [];

          // Taş bilgilerini parse et
          let stones: ProductStone[] = [];
          if (stonesJson) {
            try {
              // CSV'deki escape edilmiş double quote'ları düzelt ("" -> ")
              let cleanedJson = stonesJson.replace(/""/g, '"');
              
              // Eğer hala parse edilemiyorsa, JavaScript object literal formatını dene
              try {
                stones = JSON.parse(cleanedJson);
              } catch {
                // JavaScript object literal formatını JSON'a çevir
                cleanedJson = convertObjectLiteralToJSON(cleanedJson);
                stones = JSON.parse(cleanedJson);
              }
              
              console.log('Parsed stones for', name, ':', stones);
            } catch (error) {
              console.warn('Taş bilgileri parse edilemedi:', stonesJson, error);
            }
          }

          products.push({
            category_id: categoryId ? parseInt(categoryId) : null,
            slug: slug || createSlug(name),
            name: name || slug || '',
            subtitle: subtitle || '',
            description: description || '',
            image: image || '',
            banner_image: bannerImage || '',
            gallery_images: galleryImages,
            sort_order: 0,
            is_active: true,
            gold_weight: goldWeight || '',
            gold_karat: goldKarat || '',
            stones: stones,
          });
        }

        if (products.length === 0) {
          throw new Error('CSV dosyasında geçerli ürün bulunamadı');
        }

        setParsedProducts(products);
        setBulkUploadStatus('idle');
        setMessage({ type: 'success', text: `${products.length} ürün başarıyla parse edildi!` });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } catch (error) {
        console.error('CSV parse hatası:', error);
        setBulkUploadError(error instanceof Error ? error.message : 'CSV dosyası parse edilemedi');
        setBulkUploadStatus('error');
      }
    };

    reader.onerror = () => {
      setBulkUploadError('Dosya okunamadı');
      setBulkUploadStatus('error');
    };

    reader.readAsText(file, 'UTF-8');
  }, []);

  // Toplu ürün yükleme
  const handleBulkUpload = async () => {
    if (parsedProducts.length === 0) {
      setMessage({ type: "error", text: "Yüklenecek ürün bulunamadı" });
      return;
    }

    setBulkUploadStatus('uploading');
    setSaving(true);

    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/products-bulk.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ products: parsedProducts }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setMessage({
            type: "success",
            text: `${result.inserted || parsedProducts.length} ürün başarıyla eklendi!`
          });
          setParsedProducts([]);
          setUploadedFile(null);
          setBulkUploadStatus('success');
          loadProducts();

          // 2 saniye sonra liste sayfasına git
          setTimeout(() => {
            setActiveSection('urunler-liste');
          }, 2000);
        } else {
          throw new Error(result.message || "Ürünler eklenemedi");
        }
      } else {
        // Development: local state'e ekle
        const newProducts = parsedProducts.map((p, index) => ({
          ...p,
          id: Math.max(0, ...products.map(pr => pr.id || 0)) + index + 1
        }));
        setProducts([...products, ...newProducts]);
        setMessage({ type: "success", text: `${parsedProducts.length} ürün eklendi (local)!` });
        setParsedProducts([]);
        setUploadedFile(null);
        setBulkUploadStatus('success');

        setTimeout(() => {
          setActiveSection('urunler-liste');
        }, 2000);
      }
    } catch (error) {
      console.error("Toplu yükleme hatası:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Ürünler eklenemedi!" });
      setBulkUploadStatus('error');
    }

    setSaving(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Kategori-ürün ilişkisini yükle
  const loadCategoryProducts = async (categoryId: number) => {
    setLoadingCategoryProducts(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/category-products.php?category_id=${categoryId}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCategoryProducts(prev => ({
            ...prev,
            [categoryId]: Array.isArray(data) ? data.map((p: { product_id: number }) => p.product_id) : []
          }));
        }
      } else {
        // Development: Boş array
        setCategoryProducts(prev => ({
          ...prev,
          [categoryId]: []
        }));
      }
    } catch (error) {
      console.error("Kategori ürünleri yükleme hatası:", error);
    } finally {
      setLoadingCategoryProducts(false);
    }
  };

  // Kategori-ürün ilişkisini kaydet
  const saveCategoryProducts = async (categoryId: number, productIds: number[]) => {
    if (!categoryId) {
      setMessage({ type: "error", text: "Kategori bulunamadı. Lütfen önce kategori bilgilerini kaydedin." });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      return;
    }

    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/category-products.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ category_id: categoryId, product_ids: productIds }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          setMessage({ type: "success", text: "Ürünler kaydedildi!" });
          setCategoryProducts(prev => ({ ...prev, [categoryId]: productIds }));
        } else {
          throw new Error(data.error || "Ürünler kaydedilemedi");
        }
      } else {
        // Development: local state'e kaydet
        setCategoryProducts(prev => ({ ...prev, [categoryId]: productIds }));
        setMessage({ type: "success", text: "Ürünler kaydedildi (local)!" });
      }
    } catch (error) {
      console.error("Kategori ürünleri kaydetme hatası:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Ürünler kaydedilemedi!" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
  };

  // Ürünler sayfasına geçildiğinde yükle
  useEffect(() => {
    if (activeSection.startsWith("urunler-")) {
      loadProducts();
    }
    if (activeSection === "anasayfa-ozel-urunler") {
      loadFeaturedProducts();
      loadProducts(); // Ürünleri de yükle
    }
  }, [activeSection]);

  // Blog sayfasına geçildiğinde yükle
  useEffect(() => {
    if (activeSection.startsWith("blog-")) {
      loadBlogPosts();
    }
  }, [activeSection]);

  // Hakkımızda sayfasına geçildiğinde yükle
  useEffect(() => {
    if (activeSection === "hakkimizda-sayfa") {
      loadAboutPage();
      loadAboutValues();
    }
  }, [activeSection]);

  // Hediye sayfasına geçildiğinde yükle
  useEffect(() => {
    if (activeSection === "hediye-sayfa") {
      loadHediyePage();
    }
  }, [activeSection]);

  // Size Özel sayfasına geçildiğinde yükle
  useEffect(() => {
    if (activeSection === "ozel-tasarim-sayfa") {
      loadOzelTasarimPage();
    }
  }, [activeSection]);

  // Gözümün Nuru sayfasına geçildiğinde ek bölümleri yükle
  useEffect(() => {
    if (activeSection === "koleksiyon-gozumun-nuru") {
      loadGnSections();
    }
  }, [activeSection, categories]);

  // Kategori sayfasına geçildiğinde kategori-ürün ilişkisini yükle
  useEffect(() => {
    const categoryMap: Record<string, number> = {
      "mucevher-yuzuk": 1,
      "mucevher-kolye": 2,
      "mucevher-bileklik": 3,
      "mucevher-kupe": 4,
      "mucevher-set": 5,
      "koleksiyon-gozumun-nuru": 6,
      "erkek-tesbih": 13,
      "erkek-bileklik": 14,
      "erkek-yuzuk": 15,
      "erkek-kol": 16,
      "preloved": 17,
    };
    
    const categoryId = categoryMap[activeSection];
    if (categoryId && !categoryProducts[categoryId]) {
      loadCategoryProducts(categoryId);
      loadProducts(); // Ürünleri de yükle
    }
  }, [activeSection]);

  // Menu structure based on pages
  const menuStructure = [
    {
      key: "anasayfa",
      label: "Ana Sayfa",
      icon: FiHome,
      subItems: [
        { key: "anasayfa-banner", label: "Üst Banner" },
        { key: "anasayfa-hero", label: "Hero Slider" },
        { key: "anasayfa-trend", label: "Trend Bölümü" },
        { key: "anasayfa-hikaye", label: "Hikaye Bölümü" },
        { key: "anasayfa-ozel-urunler", label: "Size Özel Ürünlerimiz" },
        { key: "anasayfa-ozel", label: "Özel Tasarım Kartları" },
        { key: "anasayfa-blog", label: "Blog Bölümü" },
        { key: "anasayfa-menu-gorselleri", label: "Menü Görselleri" },
      ]
    },
    {
      key: "mucevher",
      label: "Mücevher",
      icon: FiStar,
      subItems: [
        { key: "mucevher-yuzuk", label: "Yüzük" },
        { key: "mucevher-kolye", label: "Kolye" },
        { key: "mucevher-bileklik", label: "Bileklik" },
        { key: "mucevher-kupe", label: "Küpe" },
        { key: "mucevher-set", label: "Set" },
      ]
    },
    {
      key: "koleksiyon",
      label: "Koleksiyon",
      icon: FiLayout,
      subItems: [
        { key: "koleksiyon-gozumun-nuru", label: "Gözümün Nuru" },
      ]
    },
    {
      key: "hediye",
      label: "Hediye",
      icon: FiGift,
      subItems: [
        { key: "hediye-sayfa", label: "Sayfa İçeriği" },
      ]
    },
    {
      key: "erkek",
      label: "Erkeklere Özel",
      icon: FiUser,
      subItems: [
        { key: "erkek-tesbih", label: "Tesbih" },
        { key: "erkek-bileklik", label: "Bileklik" },
        { key: "erkek-yuzuk", label: "Yüzük" },
        { key: "erkek-kol", label: "Kol Düğmesi" },
      ]
    },
    {
      key: "ozel-tasarim",
      label: "Size Özel",
      icon: FiHeart,
      subItems: [
        { key: "ozel-tasarim-sayfa", label: "Sayfa İçeriği" },
      ]
    },
    {
      key: "preloved",
      label: "Preloved",
      icon: FiStar,
      subItems: [
        { key: "preloved-sayfa", label: "Sayfa İçeriği" },
      ]
    },
    {
      key: "hakkimizda",
      label: "Hakkımızda",
      icon: FiStar,
      subItems: [
        { key: "hakkimizda-sayfa", label: "Sayfa İçeriği" },
      ]
    },
    {
      key: "iletisim",
      label: "İletişim",
      icon: FiPhone,
      subItems: [
        { key: "iletisim-bilgiler", label: "İletişim Bilgileri" },
      ]
    },
    {
      key: "footer",
      label: "Footer",
      icon: FiSettings,
      subItems: [
        { key: "footer-genel", label: "Genel Ayarlar" },
      ]
    },
    {
      key: "blog",
      label: "Blog Yönetimi",
      icon: FiFileText,
      subItems: [
        { key: "blog-liste", label: "Blog Yazıları" },
        { key: "blog-ekle", label: "Yeni Yazı Ekle" },
      ]
    },
    {
      key: "urunler",
      label: "Ürün Yönetimi",
      icon: FiPackage,
      subItems: [
        { key: "urunler-liste", label: "Tüm Ürünler" },
        { key: "urunler-ekle", label: "Yeni Ürün Ekle" },
        { key: "urunler-toplu-yukle", label: "Toplu Ürün Yükle" },
      ]
    },
  ];

  // Auth kontrolü - Loading
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Auth kontrolü - Login gerekli
  if (isAuthenticated === false) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1a1a1a] border-b border-[#2a2a2a] z-50 h-14">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-[#2a2a2a] rounded-lg lg:hidden text-white">
              {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/han-logo.svg"
                  alt="Han Kuyumculuk"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-white font-medium text-sm">HAN Kuyumculuk Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg" title="Siteyi Görüntüle">
              <FiExternalLink size={18} />
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-[#d4af37] text-[#0f0f0f] px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#c9a432] disabled:opacity-50"
            >
              <FiSave size={16} />
              {saving ? "..." : "Kaydet"}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#2a2a2a] rounded-lg"
              title="Çıkış Yap"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      {message.text && (
        <div className={`fixed top-16 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white text-sm`}>
          {message.type === "success" ? <FiCheck size={16} /> : <FiAlertCircle size={16} />}
          {message.text}
        </div>
      )}

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-[#1a1a1a] border-r border-[#2a2a2a] pt-14 lg:pt-0 overflow-y-auto transform transition-transform sidebar-scroll ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`} style={{ height: "calc(100vh - 56px)" }}>
          <nav className="p-3">
            {menuStructure.map((menu) => {
              const Icon = menu.icon;
              const isExpanded = expandedMenus.includes(menu.key);
              const hasActiveChild = menu.subItems.some(item => item.key === activeSection);
              
              return (
                <div key={menu.key} className="mb-1">
                  <button
                    onClick={() => toggleMenu(menu.key)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      hasActiveChild ? "bg-[#d4af37]/10 text-[#d4af37]" : "text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="flex-1 text-left font-medium">{menu.label}</span>
                    {isExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {menu.subItems.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => {
                            setActiveSection(item.key);
                            if (window.innerWidth < 1024) setSidebarOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                            activeSection === item.key
                              ? "bg-[#d4af37] text-[#0f0f0f] font-medium"
                              : "text-gray-500 hover:bg-[#2a2a2a] hover:text-white"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main Area */}
        <div ref={containerRef} className="flex-1 flex" style={{ height: "calc(100vh - 56px)" }}>
          {/* Editor */}
          <div
            className="p-4 lg:p-6 overflow-y-auto sidebar-scroll"
            style={{ width: `${100 - previewWidth}%`, height: "100%" }}
          >
            <div className="max-w-lg mx-auto">
              
              {/* ANA SAYFA - BANNER */}
              {activeSection === "anasayfa-banner" && (
                <Section title="Üst Banner" subtitle="Ana sayfadaki duyuru alanı">
                  <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                  <InputField
                    label={`Banner Metni ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                    value={getLocalizedValue("topBanner", "text") as string || ""}
                    onChange={(v) => updateField("topBanner", "text", v)}
                    placeholder={contentLang !== 'tr' ? (content.topBanner as Record<string, unknown>)?.text as string || '' : ''}
                  />
                  <ToggleField
                    label="Görünürlük"
                    checked={(content.topBanner as Record<string, unknown>)?.visible as boolean || false}
                    onChange={(v) => updateField("topBanner", "visible", v)}
                  />
                </Section>
              )}

              {/* ANA SAYFA - HERO */}
              {activeSection === "anasayfa-hero" && (
                <Section title="Hero Slider" subtitle="Ana sayfa slider alanı">
                  <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-gray-400 text-sm">
                        {((activeContent?.hero as Record<string, unknown>)?.slides as unknown[])?.length || 0} slide mevcut
                      </p>
                      <button
                        onClick={() => {
                          const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                          const newSlide = {
                            backgroundImage: "/images/hero-bg.jpg",
                            title: "Yeni Slide",
                            subtitle: "Alt başlık",
                            ctaText: "BUTON METNİ",
                            ctaLink: "/"
                          };
                          updateField("hero", "slides", [...slides, newSlide]);
                        }}
                        className="px-3 py-1.5 bg-[#d4af37] text-[#0f0f0f] rounded-lg text-xs font-medium hover:bg-[#c9a432]"
                      >
                        <FiPlus size={14} className="inline mr-1" />
                        Yeni Slide Ekle
                      </button>
                    </div>
                    {((activeContent?.hero as Record<string, unknown>)?.slides as unknown[])?.map((slide: unknown, index: number) => {
                      const s = slide as Record<string, unknown>;
                      return (
                        <div key={index} className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4 space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#d4af37] text-xs font-medium">Slide {index + 1}</span>
                            <button
                              onClick={() => {
                                const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                                updateField("hero", "slides", slides.filter((_: unknown, i: number) => i !== index));
                              }}
                              className="p-1 text-gray-400 hover:text-red-400"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                          <ImageField
                            label="Arka Plan Görseli/Video"
                            value={(s.backgroundImage as string) || ""}
                            onChange={(v) => {
                              const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, backgroundImage: v };
                              updateField("hero", "slides", updated);
                            }}
                            folder="hero"
                            objectPosition={(s.imagePosition as string) || "50% 50%"}
                            onObjectPositionChange={(v) => {
                              const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, imagePosition: v };
                              updateField("hero", "slides", updated);
                            }}
                            objectScale={(s.imageScale as number) || 1}
                            onObjectScaleChange={(v) => {
                              const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, imageScale: v };
                              updateField("hero", "slides", updated);
                            }}
                          />
                          <InputField
                            label={`Başlık ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                            value={(s.title as string) || ''}
                            onChange={(v) => {
                              const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, title: v };
                              updateField("hero", "slides", updated);
                            }}
                            placeholder={contentLang !== 'tr' ? ((content?.hero as Record<string, unknown>)?.slides as unknown[])?.[index] ? ((content?.hero as Record<string, unknown>)?.slides as Record<string, unknown>[])?.[index]?.title as string : '' : ''}
                          />
                          <InputField
                            label={`Alt Başlık ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                            value={(s.subtitle as string) || ''}
                            onChange={(v) => {
                              const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, subtitle: v };
                              updateField("hero", "slides", updated);
                            }}
                            placeholder={contentLang !== 'tr' ? ((content?.hero as Record<string, unknown>)?.slides as Record<string, unknown>[])?.[index]?.subtitle as string : ''}
                          />
                          <InputField
                            label={`Buton Metni ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                            value={(s.ctaText as string) || ''}
                            onChange={(v) => {
                              const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, ctaText: v };
                              updateField("hero", "slides", updated);
                            }}
                            placeholder={contentLang !== 'tr' ? ((content?.hero as Record<string, unknown>)?.slides as Record<string, unknown>[])?.[index]?.ctaText as string : ''}
                          />
                          <InputField
                            label="Buton Linki"
                            value={(s.ctaLink as string) || ""}
                            onChange={(v) => {
                              const slides = ((activeContent?.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, ctaLink: v };
                              updateField("hero", "slides", updated);
                            }}
                          />
                        </div>
                      );
                    }) || (
                      <div className="bg-[#0f0f0f] rounded-xl p-8 text-center">
                        <FiImage className="mx-auto text-gray-600 mb-3" size={32} />
                        <p className="text-gray-500 text-sm">Henüz slide eklenmemiş</p>
                      </div>
                    )}
                  </div>
                </Section>
              )}

              {/* ANA SAYFA - TREND */}
              {activeSection === "anasayfa-trend" && (
                <Section title="Trend Bölümü" subtitle="İki sütunlu görsel alan">
                  <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                  <div className="space-y-4">
                    <div className="p-3 bg-[#d4af37]/10 rounded-lg">
                      <p className="text-[#d4af37] text-xs font-medium mb-3">Sol Taraf</p>
                      <ImageField
                        label="Görsel"
                        value={(content?.trendSection as Record<string, unknown>)?.leftImage as string || ""}
                        onChange={(v) => updateField("trendSection", "leftImage", v)}
                        folder="trend"
                        objectPosition={(content?.trendSection as Record<string, unknown>)?.leftImagePosition as string || "50% 50%"}
                        onObjectPositionChange={(v) => updateField("trendSection", "leftImagePosition", v)}
                        objectScale={(content?.trendSection as Record<string, unknown>)?.leftImageScale as number || 1}
                        onObjectScaleChange={(v) => updateField("trendSection", "leftImageScale", v)}
                      />
                      <InputField
                        label={`Başlık ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                        value={getLocalizedValue("trendSection", "leftTitle") as string || ""}
                        onChange={(v) => updateField("trendSection", "leftTitle", v)}
                        placeholder={contentLang !== 'tr' ? (content?.trendSection as Record<string, unknown>)?.leftTitle as string || '' : ''}
                      />
                      <InputField
                        label="Link"
                        value={getLocalizedValue("trendSection", "leftTitleLink") as string || ""}
                        onChange={(v) => updateField("trendSection", "leftTitleLink", v)}
                      />
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <p className="text-blue-400 text-xs font-medium mb-3">Sağ Taraf</p>
                      <ImageField
                        label="Görsel"
                        value={(content?.trendSection as Record<string, unknown>)?.rightImage as string || ""}
                        onChange={(v) => updateField("trendSection", "rightImage", v)}
                        folder="trend"
                        objectPosition={(content?.trendSection as Record<string, unknown>)?.rightImagePosition as string || "50% 50%"}
                        onObjectPositionChange={(v) => updateField("trendSection", "rightImagePosition", v)}
                        objectScale={(content?.trendSection as Record<string, unknown>)?.rightImageScale as number || 1}
                        onObjectScaleChange={(v) => updateField("trendSection", "rightImageScale", v)}
                      />
                      <InputField
                        label={`Başlık ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                        value={getLocalizedValue("trendSection", "rightTitle") as string || ""}
                        onChange={(v) => updateField("trendSection", "rightTitle", v)}
                        placeholder={contentLang !== 'tr' ? (content?.trendSection as Record<string, unknown>)?.rightTitle as string || '' : ''}
                      />
                      <InputField
                        label="Link"
                        value={getLocalizedValue("trendSection", "rightTitleLink") as string || ""}
                        onChange={(v) => updateField("trendSection", "rightTitleLink", v)}
                      />
                    </div>
                  </div>
                </Section>
              )}

              {/* ANA SAYFA - HİKAYE */}
              {activeSection === "anasayfa-hikaye" && (
                <Section title="Hikaye Bölümü" subtitle="Marka hikayesi alanı">
                  <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                  <InputField
                    label={`Başlık ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                    value={getLocalizedValue("storySection", "title") as string || ""}
                    onChange={(v) => updateField("storySection", "title", v)}
                    placeholder={contentLang !== 'tr' ? (content.storySection as Record<string, unknown>)?.title as string || '' : ''}
                  />
                  <TextareaField
                    label={`Ana Metin ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                    value={getLocalizedValue("storySection", "mainText") as string || ""}
                    onChange={(v) => updateField("storySection", "mainText", v)}
                    placeholder={contentLang !== 'tr' ? (content.storySection as Record<string, unknown>)?.mainText as string || '' : ''}
                  />
                  <TextareaField
                    label={`Alt Metin ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                    value={getLocalizedValue("storySection", "subText") as string || ""}
                    onChange={(v) => updateField("storySection", "subText", v)}
                    placeholder={contentLang !== 'tr' ? (content.storySection as Record<string, unknown>)?.subText as string || '' : ''}
                  />
                </Section>
              )}

              {/* ANA SAYFA - SİZE ÖZEL ÜRÜNLERİMİZ */}
              {activeSection === "anasayfa-ozel-urunler" && (
                <div className="space-y-6">
                  <Section title="Size Özel Ürünlerimiz" subtitle="Ana sayfa öne çıkan ürünler bölümü">
                    <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                    <div className="space-y-4">
                      {/* Başlık */}
                      <div className="space-y-3">
                        <InputField
                          label={`Başlık 1. Kısım ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                          value={getLocalizedValue("featuredProductsSection", "titlePart1") as string || (contentLang === 'tr' ? "SİZE ÖZEL" : "")}
                          onChange={(v) => updateField("featuredProductsSection", "titlePart1", v)}
                          placeholder={contentLang !== 'tr' ? (content.featuredProductsSection as Record<string, unknown>)?.titlePart1 as string || 'SİZE ÖZEL' : ''}
                        />
                        <InputField
                          label={`Başlık 2. Kısım ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                          value={getLocalizedValue("featuredProductsSection", "titlePart2") as string || (contentLang === 'tr' ? "ÜRÜNLERİMİZ" : "")}
                          onChange={(v) => updateField("featuredProductsSection", "titlePart2", v)}
                          placeholder={contentLang !== 'tr' ? (content.featuredProductsSection as Record<string, unknown>)?.titlePart2 as string || 'ÜRÜNLERİMİZ' : ''}
                        />
                      </div>

                      {/* Banner Görselleri */}
                      <div className="space-y-3">
                        <ImageUploadField
                          label="Banner Görsel 1"
                          value={(content.featuredProductsSection as Record<string, unknown>)?.bannerImage1 as string || ""}
                          onChange={(v) => updateField("featuredProductsSection", "bannerImage1", v)}
                          folder="products"
                        />
                        <ImageUploadField
                          label="Banner Görsel 2"
                          value={(content.featuredProductsSection as Record<string, unknown>)?.bannerImage2 as string || ""}
                          onChange={(v) => updateField("featuredProductsSection", "bannerImage2", v)}
                          folder="products"
                        />
                      </div>
                    </div>
                  </Section>

                  {/* Öne Çıkan Ürünler Listesi */}
                  <Section title="Öne Çıkan Ürünler" subtitle="Ana sayfada gösterilecek ürünler">
                    <div className="space-y-4">
                      {/* Ürün Ekle Butonu */}
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm">
                          {featuredProducts.length} ürün seçili
                        </p>
                        <select
                          onChange={(e) => {
                            const productId = parseInt(e.target.value);
                            if (productId) {
                              handleAddFeaturedProduct(productId);
                              e.target.value = ""; // Reset
                            }
                          }}
                          className="px-3 py-1.5 bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg text-xs font-medium focus:outline-none focus:border-[#d4af37]"
                          defaultValue=""
                        >
                          <option value="">Ürün Seç...</option>
                          {products
                            .filter(p => p.id && !featuredProducts.some(fp => fp.productId === p.id))
                            .map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* Ürün Listesi */}
                      {loadingFeaturedProducts ? (
                        <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
                      ) : featuredProducts.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 text-sm">
                          Henüz ürün eklenmedi. Ürün eklemek için yukarıdaki butonu kullanın.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {featuredProducts.map((fp, index) => (
                            <div
                              key={fp.id}
                              className="flex items-center gap-3 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded overflow-hidden bg-[#1a1a1a] shrink-0">
                                    {fp.image && (
                                      <img
                                        src={fp.image.startsWith('http') ? fp.image : `${API_URL || ''}${fp.image}`}
                                        alt={fp.displayName || fp.productName}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">
                                      {fp.displayName || fp.productName}
                                    </p>
                                    <p className="text-gray-400 text-xs truncate">
                                      {fp.displayCategory || "Kategori belirtilmemiş"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleDeleteFeaturedProduct(fp.id)}
                                  className="p-2 text-red-400 hover:text-red-300 hover:bg-[#2a2a2a] rounded"
                                  title="Sil"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Section>
                </div>
              )}

              {/* ANA SAYFA - ÖZEL TASARIM KARTLARI */}
              {activeSection === "anasayfa-ozel" && (
                <Section title="Özel Tasarım Kartları" subtitle="Kendini Özel Hisset bölümü">
                  <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                  <div className="space-y-6">
                    {/* Başlık */}
                    <div className="space-y-3">
                      <InputField
                        label={`Başlık 1. Kısım ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                        value={getLocalizedValue("specialDesignSection", "titlePart1") as string || ""}
                        onChange={(v) => updateField("specialDesignSection", "titlePart1", v)}
                        placeholder={contentLang !== 'tr' ? (content.specialDesignSection as Record<string, unknown>)?.titlePart1 as string || '' : ''}
                      />
                      <InputField
                        label={`Başlık 2. Kısım ${contentLang !== 'tr' ? `(${contentLang.toUpperCase()})` : ''}`}
                        value={getLocalizedValue("specialDesignSection", "titlePart2") as string || ""}
                        onChange={(v) => updateField("specialDesignSection", "titlePart2", v)}
                        placeholder={contentLang !== 'tr' ? (content.specialDesignSection as Record<string, unknown>)?.titlePart2 as string || '' : ''}
                      />
                    </div>

                    {/* Üst Kartlar */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white text-sm font-medium">Üst Kartlar</h3>
                        <button
                          onClick={() => {
                            const topCards = ((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[]) || [];
                            const newCard = {
                              title: "Yeni Kart",
                              image: "/images/categories/mucevher-card.jpg",
                              link: "/",
                              buttonText: "KEŞFEDİN"
                            };
                            updateField("specialDesignSection", "topCards", [...topCards, newCard]);
                          }}
                          className="px-3 py-1.5 bg-[#d4af37] text-[#0f0f0f] rounded-lg text-xs font-medium hover:bg-[#c9a432]"
                        >
                          <FiPlus size={14} className="inline mr-1" />
                          Kart Ekle
                        </button>
                      </div>
                      {((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[])?.map((card: unknown, index: number) => {
                        const c = card as Record<string, unknown>;
                        return (
                          <div key={index} className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4 space-y-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#d4af37] text-xs font-medium">Kart {index + 1}</span>
                              <button
                                onClick={() => {
                                  const topCards = ((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[]) || [];
                                  updateField("specialDesignSection", "topCards", topCards.filter((_: unknown, i: number) => i !== index));
                                }}
                                className="p-1 text-gray-400 hover:text-red-400"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                            <InputField
                              label="Başlık"
                              value={(c.title as string) || ""}
                              onChange={(v) => {
                                const topCards = ((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[]) || [];
                                const updated = [...topCards];
                                updated[index] = { ...c, title: v };
                                updateField("specialDesignSection", "topCards", updated);
                              }}
                            />
                            <ImageField
                              label="Görsel"
                              value={(c.image as string) || ""}
                              onChange={(v) => {
                                const topCards = ((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[]) || [];
                                const updated = [...topCards];
                                updated[index] = { ...c, image: v };
                                updateField("specialDesignSection", "topCards", updated);
                              }}
                              folder="categories"
                              objectPosition={(c.imagePosition as string) || "50% 50%"}
                              onObjectPositionChange={(v) => {
                                const topCards = ((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[]) || [];
                                const updated = [...topCards];
                                updated[index] = { ...c, imagePosition: v };
                                updateField("specialDesignSection", "topCards", updated);
                              }}
                              objectScale={(c.imageScale as number) || 1}
                              onObjectScaleChange={(v) => {
                                const topCards = ((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[]) || [];
                                const updated = [...topCards];
                                updated[index] = { ...c, imageScale: v };
                                updateField("specialDesignSection", "topCards", updated);
                              }}
                            />
                            <InputField
                              label="Link"
                              value={(c.link as string) || ""}
                              onChange={(v) => {
                                const topCards = ((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[]) || [];
                                const updated = [...topCards];
                                updated[index] = { ...c, link: v };
                                updateField("specialDesignSection", "topCards", updated);
                              }}
                            />
                            <InputField
                              label="Buton Metni"
                              value={(c.buttonText as string) || ""}
                              onChange={(v) => {
                                const topCards = ((content.specialDesignSection as Record<string, unknown>)?.topCards as unknown[]) || [];
                                const updated = [...topCards];
                                updated[index] = { ...c, buttonText: v };
                                updateField("specialDesignSection", "topCards", updated);
                              }}
                            />
                          </div>
                        );
                      }) || (
                        <div className="bg-[#0f0f0f] rounded-lg p-4 text-center text-gray-500 text-sm">
                          Henüz kart eklenmemiş
                        </div>
                      )}
                    </div>

                    {/* Alt Kartlar */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white text-sm font-medium">Alt Kartlar</h3>
                        <button
                          onClick={() => {
                            const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                            const newCard = {
                              title: "Yeni Kart",
                              subtitle: "Alt başlık",
                              image: "/images/promo/goz-alici.jpg",
                              link: "/",
                              buttonText: "BUTON METNİ"
                            };
                            updateField("specialDesignSection", "bottomCards", [...bottomCards, newCard]);
                          }}
                          className="px-3 py-1.5 bg-[#d4af37] text-[#0f0f0f] rounded-lg text-xs font-medium hover:bg-[#c9a432]"
                        >
                          <FiPlus size={14} className="inline mr-1" />
                          Kart Ekle
                        </button>
                      </div>
                      {((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[])?.map((card: unknown, index: number) => {
                        const c = card as Record<string, unknown>;
                        return (
                          <div key={index} className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4 space-y-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#d4af37] text-xs font-medium">Kart {index + 1}</span>
                              <button
                                onClick={() => {
                                  const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                                  updateField("specialDesignSection", "bottomCards", bottomCards.filter((_: unknown, i: number) => i !== index));
                                }}
                                className="p-1 text-gray-400 hover:text-red-400"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                            <InputField
                              label="Başlık"
                              value={(c.title as string) || ""}
                              onChange={(v) => {
                                const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                                const updated = [...bottomCards];
                                updated[index] = { ...c, title: v };
                                updateField("specialDesignSection", "bottomCards", updated);
                              }}
                            />
                            <TextareaField
                              label="Alt Başlık"
                              value={(c.subtitle as string) || ""}
                              onChange={(v) => {
                                const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                                const updated = [...bottomCards];
                                updated[index] = { ...c, subtitle: v };
                                updateField("specialDesignSection", "bottomCards", updated);
                              }}
                              rows={2}
                            />
                            <ImageField
                              label="Görsel"
                              value={(c.image as string) || ""}
                              onChange={(v) => {
                                const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                                const updated = [...bottomCards];
                                updated[index] = { ...c, image: v };
                                updateField("specialDesignSection", "bottomCards", updated);
                              }}
                              folder="promo"
                              objectPosition={(c.imagePosition as string) || "50% 50%"}
                              onObjectPositionChange={(v) => {
                                const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                                const updated = [...bottomCards];
                                updated[index] = { ...c, imagePosition: v };
                                updateField("specialDesignSection", "bottomCards", updated);
                              }}
                              objectScale={(c.imageScale as number) || 1}
                              onObjectScaleChange={(v) => {
                                const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                                const updated = [...bottomCards];
                                updated[index] = { ...c, imageScale: v };
                                updateField("specialDesignSection", "bottomCards", updated);
                              }}
                            />
                            <InputField
                              label="Link"
                              value={(c.link as string) || ""}
                              onChange={(v) => {
                                const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                                const updated = [...bottomCards];
                                updated[index] = { ...c, link: v };
                                updateField("specialDesignSection", "bottomCards", updated);
                              }}
                            />
                            <InputField
                              label="Buton Metni"
                              value={(c.buttonText as string) || ""}
                              onChange={(v) => {
                                const bottomCards = ((content.specialDesignSection as Record<string, unknown>)?.bottomCards as unknown[]) || [];
                                const updated = [...bottomCards];
                                updated[index] = { ...c, buttonText: v };
                                updateField("specialDesignSection", "bottomCards", updated);
                              }}
                            />
                          </div>
                        );
                      }) || (
                        <div className="bg-[#0f0f0f] rounded-lg p-4 text-center text-gray-500 text-sm">
                          Henüz kart eklenmemiş
                        </div>
                      )}
                    </div>
                  </div>
                </Section>
              )}

              {/* ANA SAYFA - BLOG */}
              {activeSection === "anasayfa-blog" && (
                <Section title="Blog Bölümü" subtitle="Blog tanıtım alanı">
                  <InputField
                    label="Başlık"
                    value={(content.blogSection as Record<string, unknown>)?.title as string || ""}
                    onChange={(v) => updateField("blogSection", "title", v)}
                  />
                  <InputField
                    label="Alt Başlık"
                    value={(content.blogSection as Record<string, unknown>)?.subtitle as string || ""}
                    onChange={(v) => updateField("blogSection", "subtitle", v)}
                  />
                  <TextareaField
                    label="Açıklama"
                    value={(content.blogSection as Record<string, unknown>)?.description as string || ""}
                    onChange={(v) => updateField("blogSection", "description", v)}
                    maxLength={120}
                  />
                </Section>
              )}

              {/* MENÜ GÖRSELLERİ */}
              {activeSection === "anasayfa-menu-gorselleri" && (
                <Section title="Menü Görselleri" subtitle="Dropdown menülerde gösterilen görseller">
                  <div className="space-y-6">
                    {/* Mücevher */}
                    <div className="p-3 bg-[#d4af37]/10 rounded-lg space-y-3">
                      <p className="text-[#d4af37] text-xs font-medium">Mücevher Menüsü</p>
                      <ImageField
                        label="Hero Görsel (Sağ Taraf)"
                        value={(content.menuImages as Record<string, unknown>)?.mucevherHero as string || ""}
                        onChange={(v) => updateField("menuImages", "mucevherHero", v)}
                        folder="menu"
                        objectPosition={(content.menuImages as Record<string, unknown>)?.mucevherHeroPosition as string || "50% 50%"}
                        onObjectPositionChange={(v) => updateField("menuImages", "mucevherHeroPosition", v)}
                        objectScale={(content.menuImages as Record<string, unknown>)?.mucevherHeroScale as number || 1}
                        onObjectScaleChange={(v) => updateField("menuImages", "mucevherHeroScale", v)}
                      />
                    </div>

                    {/* Koleksiyon */}
                    <div className="p-3 bg-blue-500/10 rounded-lg space-y-3">
                      <p className="text-blue-400 text-xs font-medium">Koleksiyon Menüsü</p>
                      <ImageField
                        label="Hero Görsel (Sağ Taraf)"
                        value={(content.menuImages as Record<string, unknown>)?.koleksiyonHero as string || ""}
                        onChange={(v) => updateField("menuImages", "koleksiyonHero", v)}
                        folder="menu"
                        objectPosition={(content.menuImages as Record<string, unknown>)?.koleksiyonHeroPosition as string || "50% 50%"}
                        onObjectPositionChange={(v) => updateField("menuImages", "koleksiyonHeroPosition", v)}
                        objectScale={(content.menuImages as Record<string, unknown>)?.koleksiyonHeroScale as number || 1}
                        onObjectScaleChange={(v) => updateField("menuImages", "koleksiyonHeroScale", v)}
                      />
                    </div>

                    {/* Erkeklere Özel */}
                    <div className="p-3 bg-green-500/10 rounded-lg space-y-3">
                      <p className="text-green-400 text-xs font-medium">Erkeklere Özel Menüsü</p>
                      <ImageField
                        label="Hero Görsel (Sağ Taraf)"
                        value={(content.menuImages as Record<string, unknown>)?.erkekHero as string || ""}
                        onChange={(v) => updateField("menuImages", "erkekHero", v)}
                        folder="menu"
                        objectPosition={(content.menuImages as Record<string, unknown>)?.erkekHeroPosition as string || "50% 50%"}
                        onObjectPositionChange={(v) => updateField("menuImages", "erkekHeroPosition", v)}
                        objectScale={(content.menuImages as Record<string, unknown>)?.erkekHeroScale as number || 1}
                        onObjectScaleChange={(v) => updateField("menuImages", "erkekHeroScale", v)}
                      />
                    </div>
                  </div>
                </Section>
              )}

              {/* FOOTER */}
              {activeSection === "footer-genel" && (
                <Section title="Footer Ayarları" subtitle="Alt bilgi alanı">
                  <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                  
                  <InputField
                    label={`Slogan${contentLang !== 'tr' ? ` (${contentLang.toUpperCase()})` : ''}`}
                    value={getLocalizedValue("footer", "slogan") as string || ""}
                    onChange={(v) => updateField("footer", "slogan", v)}
                    placeholder={contentLang !== 'tr' ? (content?.footer as Record<string, unknown>)?.slogan as string : undefined}
                  />
                  <TextareaField
                    label={`Açıklama${contentLang !== 'tr' ? ` (${contentLang.toUpperCase()})` : ''}`}
                    value={getLocalizedValue("footer", "description") as string || ""}
                    onChange={(v) => updateField("footer", "description", v)}
                    placeholder={contentLang !== 'tr' ? (content?.footer as Record<string, unknown>)?.description as string : undefined}
                  />
                  <InputField
                    label={`Telif Hakkı${contentLang !== 'tr' ? ` (${contentLang.toUpperCase()})` : ''}`}
                    value={getLocalizedValue("footer", "copyright") as string || ""}
                    onChange={(v) => updateField("footer", "copyright", v)}
                    placeholder={contentLang !== 'tr' ? (content?.footer as Record<string, unknown>)?.copyright as string : undefined}
                  />
                </Section>
              )}



              {/* ÜRÜN LİSTESİ */}
              {activeSection === "urunler-liste" && (
                <Section title="Tüm Ürünler" subtitle="Mevcut ürünleri görüntüle ve düzenle">
                  {loadingProducts ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="bg-[#0f0f0f] rounded-xl p-8 text-center">
                      <FiPackage className="mx-auto text-gray-600 mb-3" size={32} />
                      <p className="text-gray-500 text-sm">Henüz ürün eklenmemiş</p>
                      <button
                        onClick={() => setActiveSection("urunler-ekle")}
                        className="mt-4 px-4 py-2 bg-[#d4af37] text-[#0f0f0f] rounded-lg text-sm font-medium hover:bg-[#c9a432]"
                      >
                        İlk Ürünü Ekle
                      </button>
                    </div>
                  ) : (
                    <div ref={productListRef} className="space-y-3 max-h-[600px] overflow-y-auto">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors"
                        >
                          {/* Ürün Görseli */}
                          <div className="w-16 h-16 rounded-lg bg-[#2a2a2a] overflow-hidden shrink-0">
                            {product.image ? (
                              <img
                                src={product.image.startsWith("data:") ? product.image : (API_URL ? `${API_URL}${product.image}` : product.image)}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FiImage className="text-gray-600" size={20} />
                              </div>
                            )}
                          </div>

                          {/* Ürün Bilgileri */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">{product.name}</h4>
                            {product.subtitle && (
                              <p className="text-gray-500 text-xs truncate">{product.subtitle}</p>
                            )}
                            <p className="text-[#d4af37] text-xs mt-1 truncate">
                              {(product as { slug?: string; link?: string }).slug 
                                ? `/urun/${(product as { slug?: string }).slug}` 
                                : (product as { link?: string }).link || "Link yok"}
                            </p>
                          </div>

                          {/* Aksiyon Butonları */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg"
                              title="Düzenle"
                            >
                              <FiEdit3 size={16} />
                            </button>
                            <button
                              onClick={() => product.id && handleDeleteProduct(product.id)}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#2a2a2a] rounded-lg"
                              title="Sil"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={() => setActiveSection("urunler-ekle")}
                        className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-[#3a3a3a] rounded-lg text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors"
                      >
                        <FiPlus size={16} />
                        <span className="text-sm">Yeni Ürün Ekle</span>
                      </button>
                    </div>
                  )}

                  {/* Ürün Düzenleme Modal */}
                  {editingProduct && (
                    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                      <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#1a1a1a] p-4 border-b border-[#2a2a2a] flex items-center justify-between">
                          <h3 className="text-white font-semibold">Ürün Düzenle</h3>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                        <div className="p-4 space-y-4">
                          <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                          
                          {contentLang === 'tr' ? (
                            <>
                              <InputField
                                label="Ürün Adı"
                                value={editingProduct.name}
                                onChange={(v) => {
                                  const slug = v ? createSlug(v) : "";
                                  setEditingProduct({ ...editingProduct, name: v, slug: slug || editingProduct.slug });
                                }}
                              />
                              <InputField
                                label="Alt Başlık"
                                value={editingProduct.subtitle}
                                onChange={(v) => setEditingProduct({ ...editingProduct, subtitle: v })}
                              />
                              <TextareaField
                                label="Açıklama"
                                value={editingProduct.description}
                                onChange={(v) => setEditingProduct({ ...editingProduct, description: v })}
                              />
                            </>
                          ) : contentLang === 'en' ? (
                            <>
                              <InputField
                                label="Ürün Adı (EN)"
                                value={editingProduct.name_en || ''}
                                onChange={(v) => setEditingProduct({ ...editingProduct, name_en: v })}
                                placeholder={editingProduct.name}
                              />
                              <InputField
                                label="Alt Başlık (EN)"
                                value={editingProduct.subtitle_en || ''}
                                onChange={(v) => setEditingProduct({ ...editingProduct, subtitle_en: v })}
                                placeholder={editingProduct.subtitle}
                              />
                              <TextareaField
                                label="Açıklama (EN)"
                                value={editingProduct.description_en || ''}
                                onChange={(v) => setEditingProduct({ ...editingProduct, description_en: v })}
                                placeholder={editingProduct.description}
                              />
                            </>
                          ) : (
                            <>
                              <InputField
                                label="Ürün Adı (RU)"
                                value={editingProduct.name_ru || ''}
                                onChange={(v) => setEditingProduct({ ...editingProduct, name_ru: v })}
                                placeholder={editingProduct.name}
                              />
                              <InputField
                                label="Alt Başlık (RU)"
                                value={editingProduct.subtitle_ru || ''}
                                onChange={(v) => setEditingProduct({ ...editingProduct, subtitle_ru: v })}
                                placeholder={editingProduct.subtitle}
                              />
                              <TextareaField
                                label="Açıklama (RU)"
                                value={editingProduct.description_ru || ''}
                                onChange={(v) => setEditingProduct({ ...editingProduct, description_ru: v })}
                                placeholder={editingProduct.description}
                              />
                            </>
                          )}
                          
                          <ImageField
                            label="Hero Görsel"
                            value={editingProduct.image}
                            onChange={(v) => setEditingProduct({ ...editingProduct, image: v })}
                            folder="products"
                            objectPosition={editingProduct.imagePosition || "50% 50%"}
                            onObjectPositionChange={(v) => setEditingProduct({ ...editingProduct, imagePosition: v })}
                            objectScale={editingProduct.imageScale || 1}
                            onObjectScaleChange={(v) => setEditingProduct({ ...editingProduct, imageScale: v })}
                          />
                          <ImageField
                            label="Banner Görseli (1 adet)"
                            value={editingProduct.banner_image}
                            onChange={(v) => setEditingProduct({ ...editingProduct, banner_image: v })}
                            folder="products"
                            objectPosition={editingProduct.bannerImagePosition || "50% 50%"}
                            onObjectPositionChange={(v) => setEditingProduct({ ...editingProduct, bannerImagePosition: v })}
                            objectScale={editingProduct.bannerImageScale || 1}
                            onObjectScaleChange={(v) => setEditingProduct({ ...editingProduct, bannerImageScale: v })}
                          />
                          <GalleryImagesField
                            label="Galeri Görselleri (Slider - Birden fazla)"
                            images={editingProduct.gallery_images || []}
                            onChange={(images) => setEditingProduct({ ...editingProduct, gallery_images: images })}
                            folder="products"
                          />
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2">URL Slug</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editingProduct.slug || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                                placeholder="urun-adi-slug"
                                className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (editingProduct.name) {
                                    setEditingProduct({ ...editingProduct, slug: createSlug(editingProduct.name) });
                                  }
                                }}
                                className="px-3 py-2.5 bg-[#2a2a2a] text-gray-400 hover:text-white rounded-lg text-xs font-medium hover:bg-[#3a3a3a] transition-colors"
                                title="Ürün adından otomatik oluştur"
                              >
                                Otomatik
                              </button>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">
                              Link: /urun/{editingProduct.slug || "urun-adi"}
                            </p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2">Kategoriler</label>
                            <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3 max-h-48 overflow-y-auto">
                              {categories.length === 0 ? (
                                <p className="text-gray-500 text-xs">Kategori yükleniyor...</p>
                              ) : (
                                <div className="space-y-2">
                                  {categories.map((cat) => (
                                    <label
                                      key={cat.id}
                                      className="flex items-center gap-2 cursor-pointer hover:bg-[#1a1a1a] p-1.5 rounded"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={(editingProduct.categories || []).includes(cat.id)}
                                        onChange={(e) => {
                                          const currentCategories = editingProduct.categories || [];
                                          const newCategories = e.target.checked
                                            ? [...currentCategories, cat.id]
                                            : currentCategories.filter(id => id !== cat.id);
                                          setEditingProduct({
                                            ...editingProduct,
                                            categories: newCategories,
                                            category_id: newCategories.length > 0 ? newCategories[0] : null // İlk kategoriyi ana kategori olarak belirle
                                          });
                                        }}
                                        className="w-4 h-4 text-[#d4af37] bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-2 focus:ring-[#d4af37]"
                                      />
                                      <span className="text-sm text-white">{cat.name}</span>
                                      <span className="text-xs text-gray-500">({cat.parent_type})</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="text-gray-500 text-xs mt-1">
                              {(editingProduct.categories || []).length} kategori seçildi
                            </p>
                          </div>

                          {/* SERTİFİKA BİLGİLERİ */}
                          <div className="border-t border-[#2a2a2a] pt-4 mt-4">
                            <h4 className="text-white font-medium text-sm mb-4">Sertifika Bilgileri</h4>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <InputField
                                label="Altın Ağırlığı (gr)"
                                value={editingProduct.gold_weight ? String(editingProduct.gold_weight) : ""}
                                onChange={(v) => setEditingProduct({ ...editingProduct, gold_weight: v })}
                                placeholder="Örn: 8.94"
                              />
                              <div>
                                <label className="block text-xs font-medium text-gray-400 mb-2">Altın Ayar</label>
                                <select
                                  value={editingProduct.gold_karat || ""}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, gold_karat: e.target.value })}
                                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
                                >
                                  <option value="">Seçin</option>
                                  <option value="8">8K</option>
                                  <option value="14">14K</option>
                                  <option value="18">18K</option>
                                  <option value="22">22K</option>
                                  <option value="24">24K</option>
                                </select>
                              </div>
                            </div>

                            {/* Taş Bilgileri */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-medium text-gray-400">Taş Bilgileri</label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newStones = [...(editingProduct.stones || []), {
                                      stone_type: "Pırlanta",
                                      carat: "",
                                      quantity: 1,
                                      color: "",
                                      clarity: "",
                                      cut: "Yuvarlak"
                                    }];
                                    setEditingProduct({ ...editingProduct, stones: newStones });
                                  }}
                                  className="text-xs text-[#d4af37] hover:text-[#c9a432] flex items-center gap-1"
                                >
                                  <FiPlus size={12} /> Taş Ekle
                                </button>
                              </div>

                              {editingProduct.stones && editingProduct.stones.length > 0 ? (
                                <div className="space-y-3">
                                  {editingProduct.stones.map((stone, idx) => (
                                    <div key={idx} className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500">Taş #{idx + 1}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newStones = editingProduct.stones?.filter((_, i) => i !== idx) || [];
                                            setEditingProduct({ ...editingProduct, stones: newStones });
                                          }}
                                          className="text-red-400 hover:text-red-300"
                                        >
                                          <FiTrash2 size={14} />
                                        </button>
                                      </div>
                                      <div className="grid grid-cols-3 gap-2">
                                        <div>
                                          <label className="block text-[10px] text-gray-500 mb-1">Taş Türü</label>
                                          <select
                                            value={stone.stone_type}
                                            onChange={(e) => {
                                              const newStones = [...(editingProduct.stones || [])];
                                              newStones[idx] = { ...stone, stone_type: e.target.value };
                                              setEditingProduct({ ...editingProduct, stones: newStones });
                                            }}
                                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                          >
                                            <option value="Pırlanta">Pırlanta</option>
                                            <option value="Yakut">Yakut</option>
                                            <option value="Zümrüt">Zümrüt</option>
                                            <option value="Safir">Safir</option>
                                            <option value="Turmalin">Turmalin</option>
                                            <option value="Tanzanit">Tanzanit</option>
                                            <option value="Ametist">Ametist</option>
                                            <option value="Akuamarin">Akuamarin</option>
                                          </select>
                                        </div>
                                        <div>
                                          <label className="block text-[10px] text-gray-500 mb-1">Karat</label>
                                          <input
                                            type="text"
                                            value={stone.carat}
                                            onChange={(e) => {
                                              const newStones = [...(editingProduct.stones || [])];
                                              newStones[idx] = { ...stone, carat: e.target.value };
                                              setEditingProduct({ ...editingProduct, stones: newStones });
                                            }}
                                            placeholder="0.50"
                                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] text-gray-500 mb-1">Adet</label>
                                          <input
                                            type="number"
                                            value={stone.quantity}
                                            onChange={(e) => {
                                              const newStones = [...(editingProduct.stones || [])];
                                              newStones[idx] = { ...stone, quantity: parseInt(e.target.value) || 1 };
                                              setEditingProduct({ ...editingProduct, stones: newStones });
                                            }}
                                            min="1"
                                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] text-gray-500 mb-1">Renk</label>
                                          <input
                                            type="text"
                                            value={stone.color}
                                            onChange={(e) => {
                                              const newStones = [...(editingProduct.stones || [])];
                                              newStones[idx] = { ...stone, color: e.target.value };
                                              setEditingProduct({ ...editingProduct, stones: newStones });
                                            }}
                                            placeholder="F"
                                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] text-gray-500 mb-1">Berraklık</label>
                                          <input
                                            type="text"
                                            value={stone.clarity}
                                            onChange={(e) => {
                                              const newStones = [...(editingProduct.stones || [])];
                                              newStones[idx] = { ...stone, clarity: e.target.value };
                                              setEditingProduct({ ...editingProduct, stones: newStones });
                                            }}
                                            placeholder="VS"
                                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] text-gray-500 mb-1">Kesim</label>
                                          <select
                                            value={stone.cut}
                                            onChange={(e) => {
                                              const newStones = [...(editingProduct.stones || [])];
                                              newStones[idx] = { ...stone, cut: e.target.value };
                                              setEditingProduct({ ...editingProduct, stones: newStones });
                                            }}
                                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                          >
                                            <option value="Yuvarlak">Yuvarlak</option>
                                            <option value="Baget">Baget</option>
                                            <option value="Prenses">Prenses</option>
                                            <option value="Oval">Oval</option>
                                            <option value="Markiz">Markiz</option>
                                            <option value="Armut">Armut</option>
                                            <option value="Zümrüt">Zümrüt</option>
                                            <option value="Kalp">Kalp</option>
                                            <option value="Yastık">Yastık</option>
                                            <option value="Radyan">Radyan</option>
                                            <option value="Trapez">Trapez</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-xs">Henüz taş eklenmemiş</p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={() => setEditingProduct(null)}
                              className="flex-1 px-4 py-2.5 bg-[#2a2a2a] text-white rounded-lg text-sm font-medium hover:bg-[#3a3a3a]"
                            >
                              İptal
                            </button>
                            <button
                              onClick={handleUpdateProduct}
                              disabled={saving}
                              className="flex-1 px-4 py-2.5 bg-[#d4af37] text-[#0f0f0f] rounded-lg text-sm font-medium hover:bg-[#c9a432] disabled:opacity-50"
                            >
                              {saving ? "Kaydediliyor..." : "Kaydet"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Section>
              )}

              {/* YENİ ÜRÜN EKLE */}
              {activeSection === "urunler-ekle" && (
                <Section title="Yeni Ürün Ekle" subtitle="Yeni bir ürün oluştur">
                  <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                  <div className="space-y-4">
                    {contentLang === 'tr' ? (
                      <>
                        <InputField
                          label="Ürün Adı *"
                          value={newProduct.name}
                          onChange={(v) => setNewProduct({ ...newProduct, name: v })}
                          placeholder="Örn: Altın Pırlanta Yüzük"
                        />
                        <InputField
                          label="Alt Başlık"
                          value={newProduct.subtitle}
                          onChange={(v) => setNewProduct({ ...newProduct, subtitle: v })}
                          placeholder="Örn: 14 Ayar Altın"
                        />
                        <TextareaField
                          label="Açıklama"
                          value={newProduct.description}
                          onChange={(v) => setNewProduct({ ...newProduct, description: v })}
                        />
                      </>
                    ) : contentLang === 'en' ? (
                      <>
                        <InputField
                          label="Ürün Adı (EN)"
                          value={newProduct.name_en || ''}
                          onChange={(v) => setNewProduct({ ...newProduct, name_en: v })}
                          placeholder={newProduct.name || "Product name in English"}
                        />
                        <InputField
                          label="Alt Başlık (EN)"
                          value={newProduct.subtitle_en || ''}
                          onChange={(v) => setNewProduct({ ...newProduct, subtitle_en: v })}
                          placeholder={newProduct.subtitle || "Subtitle in English"}
                        />
                        <TextareaField
                          label="Açıklama (EN)"
                          value={newProduct.description_en || ''}
                          onChange={(v) => setNewProduct({ ...newProduct, description_en: v })}
                          placeholder={newProduct.description || "Description in English"}
                        />
                      </>
                    ) : (
                      <>
                        <InputField
                          label="Ürün Adı (RU)"
                          value={newProduct.name_ru || ''}
                          onChange={(v) => setNewProduct({ ...newProduct, name_ru: v })}
                          placeholder={newProduct.name || "Название продукта"}
                        />
                        <InputField
                          label="Alt Başlık (RU)"
                          value={newProduct.subtitle_ru || ''}
                          onChange={(v) => setNewProduct({ ...newProduct, subtitle_ru: v })}
                          placeholder={newProduct.subtitle || "Подзаголовок"}
                        />
                        <TextareaField
                          label="Açıklama (RU)"
                          value={newProduct.description_ru || ''}
                          onChange={(v) => setNewProduct({ ...newProduct, description_ru: v })}
                          placeholder={newProduct.description || "Описание"}
                        />
                      </>
                    )}
                    <ImageField
                      label="Hero Görsel"
                      value={newProduct.image}
                      onChange={(v) => setNewProduct({ ...newProduct, image: v })}
                      folder="products"
                      objectPosition={newProduct.imagePosition || "50% 50%"}
                      onObjectPositionChange={(v) => setNewProduct({ ...newProduct, imagePosition: v })}
                      objectScale={newProduct.imageScale || 1}
                      onObjectScaleChange={(v) => setNewProduct({ ...newProduct, imageScale: v })}
                    />
                    <ImageField
                      label="Banner Görseli (1 adet)"
                      value={newProduct.banner_image}
                      onChange={(v) => setNewProduct({ ...newProduct, banner_image: v })}
                      folder="products"
                      objectPosition={(newProduct as any).bannerImagePosition || "50% 50%"}
                      onObjectPositionChange={(v) => setNewProduct({ ...newProduct, bannerImagePosition: v } as any)}
                      objectScale={(newProduct as any).bannerImageScale || 1}
                      onObjectScaleChange={(v) => setNewProduct({ ...newProduct, bannerImageScale: v } as any)}
                    />
                    <GalleryImagesField
                      label="Galeri Görselleri (Slider - Birden fazla)"
                      images={newProduct.gallery_images || []}
                      onChange={(images) => setNewProduct({ ...newProduct, gallery_images: images })}
                      folder="products"
                    />
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">URL Slug (Otomatik oluşturulur)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newProduct.slug || createSlug(newProduct.name)}
                          onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
                          placeholder="urun-adi-slug"
                          className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newProduct.name) {
                              setNewProduct({ ...newProduct, slug: createSlug(newProduct.name) });
                            }
                          }}
                          className="px-3 py-2.5 bg-[#2a2a2a] text-gray-400 hover:text-white rounded-lg text-xs font-medium hover:bg-[#3a3a3a] transition-colors"
                          title="Ürün adından otomatik oluştur"
                        >
                          Otomatik
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        Link: /urun/{newProduct.slug || createSlug(newProduct.name) || "urun-adi"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">Kategoriler</label>
                      <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3 max-h-48 overflow-y-auto">
                        {categories.length === 0 ? (
                          <p className="text-gray-500 text-xs">Kategori yükleniyor...</p>
                        ) : (
                          <div className="space-y-2">
                            {categories.map((cat) => (
                              <label
                                key={cat.id}
                                className="flex items-center gap-2 cursor-pointer hover:bg-[#1a1a1a] p-1.5 rounded"
                              >
                                <input
                                  type="checkbox"
                                  checked={(newProduct.categories || []).includes(cat.id)}
                                  onChange={(e) => {
                                    const currentCategories = newProduct.categories || [];
                                    const newCategories = e.target.checked
                                      ? [...currentCategories, cat.id]
                                      : currentCategories.filter(id => id !== cat.id);
                                    setNewProduct({
                                      ...newProduct,
                                      categories: newCategories,
                                      category_id: newCategories.length > 0 ? newCategories[0] : null // İlk kategoriyi ana kategori olarak belirle
                                    });
                                  }}
                                  className="w-4 h-4 text-[#d4af37] bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-2 focus:ring-[#d4af37]"
                                />
                                <span className="text-sm text-white">{cat.name}</span>
                                <span className="text-xs text-gray-500">({cat.parent_type})</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {(newProduct.categories || []).length} kategori seçildi
                      </p>
                    </div>
                    {/* SERTİFİKA BİLGİLERİ */}
                    <div className="border-t border-[#2a2a2a] pt-4 mt-4">
                      <h4 className="text-white font-medium text-sm mb-4">Sertifika Bilgileri</h4>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <InputField
                          label="Altın Ağırlığı (gr)"
                          value={newProduct.gold_weight ? String(newProduct.gold_weight) : ""}
                          onChange={(v) => setNewProduct({ ...newProduct, gold_weight: v })}
                          placeholder="Örn: 8.94"
                        />
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-2">Altın Ayar</label>
                          <select
                            value={newProduct.gold_karat || ""}
                            onChange={(e) => setNewProduct({ ...newProduct, gold_karat: e.target.value })}
                            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
                          >
                            <option value="">Seçin</option>
                            <option value="8">8K</option>
                            <option value="14">14K</option>
                            <option value="18">18K</option>
                            <option value="22">22K</option>
                            <option value="24">24K</option>
                          </select>
                        </div>
                      </div>

                      {/* Taş Bilgileri */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-medium text-gray-400">Taş Bilgileri</label>
                          <button
                            type="button"
                            onClick={() => {
                              const newStones = [...(newProduct.stones || []), {
                                stone_type: "Pırlanta",
                                carat: "",
                                quantity: 1,
                                color: "",
                                clarity: "",
                                cut: "Yuvarlak"
                              }];
                              setNewProduct({ ...newProduct, stones: newStones });
                            }}
                            className="text-xs text-[#d4af37] hover:text-[#c9a432] flex items-center gap-1"
                          >
                            <FiPlus size={12} /> Taş Ekle
                          </button>
                        </div>

                        {newProduct.stones && newProduct.stones.length > 0 ? (
                          <div className="space-y-3">
                            {newProduct.stones.map((stone, idx) => (
                              <div key={idx} className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-gray-500">Taş #{idx + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newStones = newProduct.stones?.filter((_, i) => i !== idx) || [];
                                      setNewProduct({ ...newProduct, stones: newStones });
                                    }}
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <FiTrash2 size={14} />
                                  </button>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Taş Türü</label>
                                    <select
                                      value={stone.stone_type}
                                      onChange={(e) => {
                                        const newStones = [...(newProduct.stones || [])];
                                        newStones[idx] = { ...stone, stone_type: e.target.value };
                                        setNewProduct({ ...newProduct, stones: newStones });
                                      }}
                                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                    >
                                      <option value="Pırlanta">Pırlanta</option>
                                      <option value="Yakut">Yakut</option>
                                      <option value="Zümrüt">Zümrüt</option>
                                      <option value="Safir">Safir</option>
                                      <option value="Turmalin">Turmalin</option>
                                      <option value="Tanzanit">Tanzanit</option>
                                      <option value="Ametist">Ametist</option>
                                      <option value="Akuamarin">Akuamarin</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Karat</label>
                                    <input
                                      type="text"
                                      value={stone.carat}
                                      onChange={(e) => {
                                        const newStones = [...(newProduct.stones || [])];
                                        newStones[idx] = { ...stone, carat: e.target.value };
                                        setNewProduct({ ...newProduct, stones: newStones });
                                      }}
                                      placeholder="0.50"
                                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Adet</label>
                                    <input
                                      type="number"
                                      value={stone.quantity}
                                      onChange={(e) => {
                                        const newStones = [...(newProduct.stones || [])];
                                        newStones[idx] = { ...stone, quantity: parseInt(e.target.value) || 1 };
                                        setNewProduct({ ...newProduct, stones: newStones });
                                      }}
                                      min="1"
                                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Renk</label>
                                    <input
                                      type="text"
                                      value={stone.color}
                                      onChange={(e) => {
                                        const newStones = [...(newProduct.stones || [])];
                                        newStones[idx] = { ...stone, color: e.target.value };
                                        setNewProduct({ ...newProduct, stones: newStones });
                                      }}
                                      placeholder="F"
                                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Berraklık</label>
                                    <input
                                      type="text"
                                      value={stone.clarity}
                                      onChange={(e) => {
                                        const newStones = [...(newProduct.stones || [])];
                                        newStones[idx] = { ...stone, clarity: e.target.value };
                                        setNewProduct({ ...newProduct, stones: newStones });
                                      }}
                                      placeholder="VS"
                                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Kesim</label>
                                    <select
                                      value={stone.cut}
                                      onChange={(e) => {
                                        const newStones = [...(newProduct.stones || [])];
                                        newStones[idx] = { ...stone, cut: e.target.value };
                                        setNewProduct({ ...newProduct, stones: newStones });
                                      }}
                                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs"
                                    >
                                      <option value="Yuvarlak">Yuvarlak</option>
                                      <option value="Baget">Baget</option>
                                      <option value="Prenses">Prenses</option>
                                      <option value="Oval">Oval</option>
                                      <option value="Markiz">Markiz</option>
                                      <option value="Armut">Armut</option>
                                      <option value="Zümrüt">Zümrüt</option>
                                      <option value="Kalp">Kalp</option>
                                      <option value="Yastık">Yastık</option>
                                      <option value="Radyan">Radyan</option>
                                      <option value="Trapez">Trapez</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-xs">Henüz taş eklenmemiş</p>
                        )}
                      </div>
                    </div>

                    <InputField
                      label="Sıralama"
                      value={String(newProduct.sort_order)}
                      onChange={(v) => setNewProduct({ ...newProduct, sort_order: parseInt(v) || 0 })}
                      placeholder="0"
                    />
                    <div className="pt-4">
                      <button
                        onClick={handleAddProduct}
                        disabled={saving || !newProduct.name}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-lg font-semibold hover:bg-[#c9a432] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPlus size={18} />
                        {saving ? "Ekleniyor..." : "Ürün Ekle"}
                      </button>
                    </div>
                  </div>
                </Section>
              )}

              {/* TOPLU ÜRÜN YÜKLEME */}
              {activeSection === "urunler-toplu-yukle" && (
                <Section title="Toplu Ürün Yükle" subtitle="CSV dosyası ile birden fazla ürün ekleyin">
                  <div className="space-y-6">
                    {/* Bilgilendirme ve Şablon İndirme */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <FiAlertCircle className="text-blue-400 shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                          <h4 className="text-blue-400 font-medium text-sm mb-2">Nasıl Kullanılır?</h4>
                          <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                            <li>Önce örnek şablon dosyasını indirin</li>
                            <li>Excel veya Google Sheets'te dosyayı açın</li>
                            <li>Ürün bilgilerini doldurun (her satır bir ürün)</li>
                            <li>Dosyayı CSV formatında kaydedin (UTF-8 encoding)</li>
                            <li>Aşağıdaki alana yükleyin</li>
                          </ul>
                          <a
                            href="/urun-yukleme-sablonu.csv"
                            download
                            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/30 transition-colors"
                          >
                            <FiFileText size={14} />
                            Örnek Şablon İndir (CSV)
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Dosya Yükleme Alanı */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">CSV Dosyası Yükle</label>
                      <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                          uploadedFile
                            ? 'border-green-500/50 bg-green-500/5'
                            : 'border-[#3a3a3a] hover:border-[#d4af37] bg-[#0f0f0f]'
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt'))) {
                            setUploadedFile(file);
                            parseCSV(file);
                          } else {
                            setMessage({ type: 'error', text: 'Lütfen CSV dosyası yükleyin' });
                            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
                          }
                        }}
                      >
                        <input
                          type="file"
                          accept=".csv,.txt"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploadedFile(file);
                              parseCSV(file);
                            }
                          }}
                          className="hidden"
                          id="csv-upload"
                        />
                        <label htmlFor="csv-upload" className="cursor-pointer">
                          {uploadedFile ? (
                            <div className="flex flex-col items-center gap-2">
                              <FiCheck className="text-green-400" size={32} />
                              <p className="text-green-400 font-medium">{uploadedFile.name}</p>
                              <p className="text-gray-500 text-xs">
                                {parsedProducts.length} ürün parse edildi
                              </p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setUploadedFile(null);
                                  setParsedProducts([]);
                                }}
                                className="mt-2 px-3 py-1.5 bg-[#2a2a2a] text-gray-400 hover:text-white rounded-lg text-xs font-medium hover:bg-[#3a3a3a] transition-colors"
                              >
                                Başka Dosya Seç
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <FiFileText className="text-gray-600" size={32} />
                              <p className="text-white font-medium">CSV dosyanızı buraya sürükleyin</p>
                              <p className="text-gray-500 text-xs">veya tıklayarak dosya seçin</p>
                              <p className="text-gray-600 text-xs mt-2">Desteklenen format: .csv</p>
                            </div>
                          )}
                        </label>
                      </div>

                      {bulkUploadStatus === 'parsing' && (
                        <div className="mt-3 flex items-center gap-2 text-blue-400 text-sm">
                          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                          <span>CSV dosyası işleniyor...</span>
                        </div>
                      )}

                      {bulkUploadError && (
                        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-red-400 text-sm">{bulkUploadError}</p>
                        </div>
                      )}
                    </div>

                    {/* Ürün Önizleme Tablosu */}
                    {parsedProducts.length > 0 && (
                      <div>
                        <h4 className="text-white font-medium text-sm mb-3">
                          Ürün Önizleme ({parsedProducts.length} ürün)
                        </h4>
                        <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-[#1a1a1a]">
                                <tr className="border-b border-[#2a2a2a]">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-xs">#</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-xs">Ürün Kodu</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-xs">Alt Başlık</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-xs">Görsel</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-xs">Altın Ağırlığı</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-xs">Ayar</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-xs">Taş Sayısı</th>
                                </tr>
                              </thead>
                              <tbody>
                                {parsedProducts.map((product, index) => (
                                  <tr key={index} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                                    <td className="px-4 py-3 text-gray-500 text-xs">{index + 1}</td>
                                    <td className="px-4 py-3 text-white text-xs">{product.name}</td>
                                    <td className="px-4 py-3 text-gray-400 text-xs truncate max-w-[150px]">
                                      {product.subtitle || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 text-xs truncate max-w-[120px]" title={product.image}>
                                      {product.image ? '✓' : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 text-xs">
                                      {product.gold_weight ? `${product.gold_weight} gr` : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 text-xs">
                                      {product.gold_karat ? `${product.gold_karat}K` : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-xs">
                                      <span className={`px-2 py-1 rounded ${
                                        product.stones && product.stones.length > 0
                                          ? 'bg-[#d4af37]/20 text-[#d4af37]'
                                          : 'bg-gray-500/20 text-gray-400'
                                      }`}>
                                        {product.stones?.length || 0} taş
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Toplu Yükleme Butonu */}
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            onClick={handleBulkUpload}
                            disabled={saving || parsedProducts.length === 0}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-lg font-semibold hover:bg-[#c9a432] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {bulkUploadStatus === 'uploading' ? (
                              <>
                                <div className="w-4 h-4 border-2 border-[#0f0f0f] border-t-transparent rounded-full animate-spin"></div>
                                <span>Yükleniyor... ({parsedProducts.length} ürün)</span>
                              </>
                            ) : (
                              <>
                                <FiPlus size={18} />
                                <span>{parsedProducts.length} Ürünü Ekle</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setParsedProducts([]);
                              setUploadedFile(null);
                              setBulkUploadError('');
                            }}
                            className="px-4 py-3 bg-[#2a2a2a] text-gray-400 hover:text-white rounded-lg font-medium hover:bg-[#3a3a3a] transition-colors"
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Section>
              )}

              {/* BLOG LİSTESİ */}
              {activeSection === "blog-liste" && (
                <Section title="Blog Yazıları" subtitle="Mevcut blog yazılarını görüntüle ve düzenle">
                  {loadingBlog ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : blogPosts.length === 0 ? (
                    <div className="bg-[#0f0f0f] rounded-xl p-8 text-center">
                      <FiFileText className="mx-auto text-gray-600 mb-3" size={32} />
                      <p className="text-gray-500 text-sm">Henüz blog yazısı eklenmemiş</p>
                      <button
                        onClick={() => setActiveSection("blog-ekle")}
                        className="mt-4 px-4 py-2 bg-[#d4af37] text-[#0f0f0f] rounded-lg text-sm font-medium hover:bg-[#c9a432]"
                      >
                        İlk Yazıyı Ekle
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {blogPosts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center gap-4 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors"
                        >
                          {/* Blog Görseli */}
                          <div className="w-20 h-14 rounded-lg bg-[#2a2a2a] overflow-hidden shrink-0">
                            {post.image ? (
                              <img
                                src={post.image.startsWith("data:") ? post.image : (API_URL ? `${API_URL}${post.image}` : post.image)}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FiImage className="text-gray-600" size={20} />
                              </div>
                            )}
                          </div>

                          {/* Blog Bilgileri */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">{post.title}</h4>
                            <p className="text-gray-500 text-xs truncate">{post.excerpt || "Özet yok"}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${post.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                                {post.status === "published" ? "Yayında" : "Taslak"}
                              </span>
                              <span className="text-gray-600 text-xs">
                                {post.published_at ? new Date(post.published_at).toLocaleDateString("tr-TR") : ""}
                              </span>
                            </div>
                          </div>

                          {/* Aksiyon Butonları */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setEditingBlogPost(post)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg"
                              title="Düzenle"
                            >
                              <FiEdit3 size={16} />
                            </button>
                            <button
                              onClick={() => post.id && handleDeleteBlogPost(post.id)}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#2a2a2a] rounded-lg"
                              title="Sil"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={() => setActiveSection("blog-ekle")}
                        className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-[#3a3a3a] rounded-lg text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors"
                      >
                        <FiPlus size={16} />
                        <span className="text-sm">Yeni Yazı Ekle</span>
                      </button>
                    </div>
                  )}

                  {/* Blog Düzenleme Modal */}
                  {editingBlogPost && (
                    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                      <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#1a1a1a] p-4 border-b border-[#2a2a2a] flex items-center justify-between">
                          <h3 className="text-white font-semibold">Blog Yazısı Düzenle</h3>
                          <button
                            onClick={() => setEditingBlogPost(null)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                        <div className="p-4 space-y-4">
                          <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                          
                          {contentLang === 'tr' ? (
                            <>
                              <InputField
                                label="Başlık"
                                value={editingBlogPost.title}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, title: v })}
                              />
                              <InputField
                                label="Özet"
                                value={editingBlogPost.excerpt}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, excerpt: v })}
                                maxLength={120}
                              />
                              <TextareaField
                                label="İçerik"
                                value={editingBlogPost.content}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, content: v })}
                                rows={8}
                              />
                            </>
                          ) : contentLang === 'en' ? (
                            <>
                              <InputField
                                label="Başlık (EN)"
                                value={editingBlogPost.title_en || ''}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, title_en: v })}
                                placeholder={editingBlogPost.title}
                              />
                              <InputField
                                label="Özet (EN)"
                                value={editingBlogPost.excerpt_en || ''}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, excerpt_en: v })}
                                placeholder={editingBlogPost.excerpt}
                                maxLength={120}
                              />
                              <TextareaField
                                label="İçerik (EN)"
                                value={editingBlogPost.content_en || ''}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, content_en: v })}
                                rows={8}
                                placeholder={editingBlogPost.content}
                              />
                            </>
                          ) : (
                            <>
                              <InputField
                                label="Başlık (RU)"
                                value={editingBlogPost.title_ru || ''}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, title_ru: v })}
                                placeholder={editingBlogPost.title}
                              />
                              <InputField
                                label="Özet (RU)"
                                value={editingBlogPost.excerpt_ru || ''}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, excerpt_ru: v })}
                                placeholder={editingBlogPost.excerpt}
                                maxLength={120}
                              />
                              <TextareaField
                                label="İçerik (RU)"
                                value={editingBlogPost.content_ru || ''}
                                onChange={(v) => setEditingBlogPost({ ...editingBlogPost, content_ru: v })}
                                rows={8}
                                placeholder={editingBlogPost.content}
                              />
                            </>
                          )}
                          
                          <InputField
                            label="Slug (URL Adresi)"
                            value={editingBlogPost.slug}
                            onChange={(v) => {
                              // Slug formatını zorla (küçük harf, tire, rakam)
                              const cleanSlug = v
                                .toLowerCase()
                                .replace(/ı/g, 'i')
                                .replace(/ğ/g, 'g')
                                .replace(/ü/g, 'u')
                                .replace(/ş/g, 's')
                                .replace(/ö/g, 'o')
                                .replace(/ç/g, 'c')
                                .replace(/[^a-z0-9-]/g, '');
                              setEditingBlogPost({ ...editingBlogPost, slug: cleanSlug });
                            }}
                            placeholder="ornek-blog-yazisi"
                          />
                          <ImageField
                            label="Kapak Görseli"
                            value={editingBlogPost.image}
                            onChange={(v) => setEditingBlogPost({ ...editingBlogPost, image: v })}
                            objectPosition={(editingBlogPost as any).imagePosition || "50% 50%"}
                            onObjectPositionChange={(v) => setEditingBlogPost({ ...editingBlogPost, imagePosition: v } as any)}
                            objectScale={(editingBlogPost as any).imageScale || 1}
                            onObjectScaleChange={(v) => setEditingBlogPost({ ...editingBlogPost, imageScale: v } as any)}
                          />
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-2">Durum</label>
                            <select
                              value={editingBlogPost.status}
                              onChange={(e) => setEditingBlogPost({ ...editingBlogPost, status: e.target.value as "draft" | "published" })}
                              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                            >
                              <option value="draft">Taslak</option>
                              <option value="published">Yayında</option>
                            </select>
                          </div>
                          <div className="pt-4">
                            <button
                              onClick={handleUpdateBlogPost}
                              disabled={saving}
                              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-lg font-semibold hover:bg-[#c9a432] disabled:opacity-50"
                            >
                              <FiSave size={18} />
                              {saving ? "Kaydediliyor..." : "Kaydet"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Section>
              )}

              {/* BLOG EKLE */}
              {activeSection === "blog-ekle" && (
                <Section title="Yeni Blog Yazısı" subtitle="Yeni bir blog yazısı oluştur">
                  <div className="space-y-4">
                    <LanguageTabs currentLang={contentLang} onChange={setContentLang} />
                    
                    {contentLang === 'tr' ? (
                      <>
                        <InputField
                          label="Başlık"
                          value={newBlogPost.title}
                          onChange={(v) => {
                            setNewBlogPost({ ...newBlogPost, title: v });
                            // Otomatik slug oluştur (sadece boşsa)
                            if (!newBlogPost.slug || newBlogPost.slug === "") {
                              const autoSlug = v
                                .toLowerCase()
                                .replace(/ı/g, 'i')
                                .replace(/ğ/g, 'g')
                                .replace(/ü/g, 'u')
                                .replace(/ş/g, 's')
                                .replace(/ö/g, 'o')
                                .replace(/ç/g, 'c')
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/^-+|-+$/g, '');
                              setNewBlogPost(prev => ({ ...prev, slug: autoSlug }));
                            }
                          }}
                          placeholder="Blog yazısı başlığı"
                        />
                        <InputField
                          label="Özet"
                          value={newBlogPost.excerpt}
                          onChange={(v) => setNewBlogPost({ ...newBlogPost, excerpt: v })}
                          placeholder="Kısa özet (ana sayfada görünür)"
                          maxLength={120}
                        />
                        <TextareaField
                          label="İçerik"
                          value={newBlogPost.content}
                          onChange={(v) => setNewBlogPost({ ...newBlogPost, content: v })}
                          rows={10}
                        />
                      </>
                    ) : contentLang === 'en' ? (
                      <>
                        <InputField
                          label="Başlık (EN)"
                          value={newBlogPost.title_en || ''}
                          onChange={(v) => setNewBlogPost({ ...newBlogPost, title_en: v })}
                          placeholder={newBlogPost.title || "English title"}
                        />
                        <InputField
                          label="Özet (EN)"
                          value={newBlogPost.excerpt_en || ''}
                          onChange={(v) => setNewBlogPost({ ...newBlogPost, excerpt_en: v })}
                          placeholder={newBlogPost.excerpt || "English excerpt"}
                          maxLength={120}
                        />
                        <TextareaField
                          label="İçerik (EN)"
                          value={newBlogPost.content_en || ''}
                          onChange={(v) => setNewBlogPost({ ...newBlogPost, content_en: v })}
                          rows={10}
                          placeholder={newBlogPost.content || "English content"}
                        />
                      </>
                    ) : (
                      <>
                        <InputField
                          label="Başlık (RU)"
                          value={newBlogPost.title_ru || ''}
                          onChange={(v) => setNewBlogPost({ ...newBlogPost, title_ru: v })}
                          placeholder={newBlogPost.title || "Заголовок"}
                        />
                        <InputField
                          label="Özet (RU)"
                          value={newBlogPost.excerpt_ru || ''}
                          onChange={(v) => setNewBlogPost({ ...newBlogPost, excerpt_ru: v })}
                          placeholder={newBlogPost.excerpt || "Краткое описание"}
                          maxLength={120}
                        />
                        <TextareaField
                          label="İçerik (RU)"
                          value={newBlogPost.content_ru || ''}
                          onChange={(v) => setNewBlogPost({ ...newBlogPost, content_ru: v })}
                          rows={10}
                          placeholder={newBlogPost.content || "Содержание"}
                        />
                      </>
                    )}
                    
                    <InputField
                      label="Slug (URL Adresi)"
                      value={newBlogPost.slug}
                      onChange={(v) => {
                        // Slug formatını zorla (küçük harf, tire, rakam)
                        const cleanSlug = v
                          .toLowerCase()
                          .replace(/ı/g, 'i')
                          .replace(/ğ/g, 'g')
                          .replace(/ü/g, 'u')
                          .replace(/ş/g, 's')
                          .replace(/ö/g, 'o')
                          .replace(/ç/g, 'c')
                          .replace(/[^a-z0-9-]/g, '');
                        setNewBlogPost({ ...newBlogPost, slug: cleanSlug });
                      }}
                      placeholder="ornek-blog-yazisi"
                    />
                    <ImageField
                      label="Kapak Görseli"
                      value={newBlogPost.image}
                      onChange={(v) => setNewBlogPost({ ...newBlogPost, image: v })}
                      objectPosition={(newBlogPost as any).imagePosition || "50% 50%"}
                      onObjectPositionChange={(v) => setNewBlogPost({ ...newBlogPost, imagePosition: v } as any)}
                      objectScale={(newBlogPost as any).imageScale || 1}
                      onObjectScaleChange={(v) => setNewBlogPost({ ...newBlogPost, imageScale: v } as any)}
                    />
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">Durum</label>
                      <select
                        value={newBlogPost.status}
                        onChange={(e) => setNewBlogPost({ ...newBlogPost, status: e.target.value as "draft" | "published" })}
                        className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="draft">Taslak</option>
                        <option value="published">Yayınla</option>
                      </select>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleAddBlogPost}
                        disabled={saving || !newBlogPost.title}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-lg font-semibold hover:bg-[#c9a432] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPlus size={18} />
                        {saving ? "Ekleniyor..." : "Blog Yazısı Ekle"}
                      </button>
                    </div>
                  </div>
                </Section>
              )}

              {/* MÜCEVHER KATEGORİLERİ */}
              {activeSection === "mucevher-yuzuk" && (
                <CategorySection
                  title="Yüzük"
                  categoryKey="yuzuk"
                  parentType="mucevher"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "yuzuk" && c.parent_type === "mucevher");
                    updateCategory(cat?.id || null, field, value, "yuzuk", "mucevher");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}
              {activeSection === "mucevher-kolye" && (
                <CategorySection
                  title="Kolye"
                  categoryKey="kolye"
                  parentType="mucevher"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "kolye" && c.parent_type === "mucevher");
                    updateCategory(cat?.id || null, field, value, "kolye", "mucevher");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}
              {activeSection === "mucevher-bileklik" && (
                <CategorySection
                  title="Bileklik"
                  categoryKey="bileklik"
                  parentType="mucevher"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "bileklik" && c.parent_type === "mucevher");
                    updateCategory(cat?.id || null, field, value, "bileklik", "mucevher");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}
              {activeSection === "mucevher-kupe" && (
                <CategorySection
                  title="Küpe"
                  categoryKey="kupe"
                  parentType="mucevher"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "kupe" && c.parent_type === "mucevher");
                    updateCategory(cat?.id || null, field, value, "kupe", "mucevher");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}
              {activeSection === "mucevher-set" && (
                <CategorySection
                  title="Set"
                  categoryKey="set"
                  parentType="mucevher"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "set" && c.parent_type === "mucevher");
                    updateCategory(cat?.id || null, field, value, "set", "mucevher");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}

              {/* KOLEKSİYON KATEGORİLERİ */}
              {activeSection === "koleksiyon-gozumun-nuru" && (
                <div className="space-y-6">
                  <CategorySection
                    title="Gözümün Nuru"
                    categoryKey="gozumun-nuru"
                    parentType="koleksiyon"
                    content={content}
                    categories={categories}
                    onUpdate={(field, value) => {
                      const cat = categories.find(c => c.slug === "gozumun-nuru" && c.parent_type === "koleksiyon");
                      updateCategory(cat?.id || null, field, value, "gozumun-nuru", "koleksiyon");
                    }}
                    products={products}
                    categoryProducts={categoryProducts}
                    loadingCategoryProducts={loadingCategoryProducts}
                    onProductToggle={(categoryId, productId) => {
                      const current = categoryProducts[categoryId] || [];
                      const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                      setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                    }}
                    onSave={(categoryId) => {
                      const productIds = categoryProducts[categoryId] || [];
                      saveCategoryProducts(categoryId, productIds);
                    }}
                    contentLang={contentLang}
                    onLangChange={setContentLang}
                  />

                  {/* Ek Bölümler */}
                  {loadingGnSections ? (
                    <div className="text-center py-8 text-gray-500">Bölümler yükleniyor...</div>
                  ) : gnSections ? (
                    <>
                      <Section title="Felsefe Bölümü" subtitle="Alıntı ve açıklama metinleri">
                        <InputField
                          label="Alıntı Satır 1"
                          value={gnSections.philosophyQuote1 || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, philosophyQuote1: v })}
                        />
                        <InputField
                          label="Alıntı Satır 2 (italik)"
                          value={gnSections.philosophyQuote2 || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, philosophyQuote2: v })}
                        />
                        <TextareaField
                          label="Felsefe Metni"
                          value={gnSections.philosophyText || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, philosophyText: v })}
                          rows={4}
                        />
                      </Section>

                      <Section title="Görsel + Metin Bölümü" subtitle="Sol görsel, sağ metin alanı">
                        <ImageField
                          label="Sol Görsel"
                          value={gnSections.splitImage || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, splitImage: v })}
                          folder="categories"
                          objectPosition={gnSections.splitImagePosition || "50% 50%"}
                          onObjectPositionChange={(v: string) => setGnSections({ ...gnSections, splitImagePosition: v })}
                          objectScale={gnSections.splitImageScale || 1}
                          onObjectScaleChange={(v: number) => setGnSections({ ...gnSections, splitImageScale: v })}
                        />
                        <InputField
                          label="Başlık"
                          value={gnSections.splitTitle || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, splitTitle: v })}
                        />
                        <TextareaField
                          label="Metin 1"
                          value={gnSections.splitText1 || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, splitText1: v })}
                          rows={4}
                        />
                        <TextareaField
                          label="Metin 2"
                          value={gnSections.splitText2 || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, splitText2: v })}
                          rows={3}
                        />
                      </Section>

                      <Section title="Koleksiyon Başlıkları" subtitle="Ürün listesi üst başlıkları">
                        <InputField
                          label="Bölüm Başlığı"
                          value={gnSections.collectionTitle || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, collectionTitle: v })}
                        />
                        <InputField
                          label="Bölüm Alt Başlığı"
                          value={gnSections.collectionSubtitle || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, collectionSubtitle: v })}
                        />
                      </Section>

                      <Section title="Koyu Arkaplan Bölümü" subtitle="Arka planlı metin alanı">
                        <ImageField
                          label="Arkaplan Görseli"
                          value={gnSections.darkBgImage || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, darkBgImage: v })}
                          folder="categories"
                          objectPosition={gnSections.darkBgImagePosition || "50% 50%"}
                          onObjectPositionChange={(v: string) => setGnSections({ ...gnSections, darkBgImagePosition: v })}
                          objectScale={gnSections.darkBgImageScale || 1}
                          onObjectScaleChange={(v: number) => setGnSections({ ...gnSections, darkBgImageScale: v })}
                        />
                        <TextareaField
                          label="Metin 1"
                          value={gnSections.darkText1 || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, darkText1: v })}
                          rows={2}
                        />
                        <InputField
                          label="Metin 2"
                          value={gnSections.darkText2 || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, darkText2: v })}
                        />
                        <InputField
                          label="Metin 2 İtalik Kısmı"
                          value={gnSections.darkText2Cursive || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, darkText2Cursive: v })}
                        />
                        <TextareaField
                          label="Metin 3"
                          value={gnSections.darkText3 || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, darkText3: v })}
                          rows={2}
                        />
                      </Section>

                      <Section title="CTA Bölümü" subtitle="Sayfanın alt kısmı - çağrı butonu">
                        <InputField
                          label="Küçük Başlık (italik)"
                          value={gnSections.ctaSmallTitle || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, ctaSmallTitle: v })}
                        />
                        <InputField
                          label="Ana Başlık"
                          value={gnSections.ctaTitle || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, ctaTitle: v })}
                        />
                        <InputField
                          label="Alt Metin"
                          value={gnSections.ctaSubtitle || ""}
                          onChange={(v: string) => setGnSections({ ...gnSections, ctaSubtitle: v })}
                        />
                      </Section>

                      <div className="flex justify-end">
                        <button
                          onClick={saveGnSections}
                          disabled={saving}
                          className="px-6 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-lg font-semibold hover:bg-[#c4a030] transition-colors disabled:opacity-50"
                        >
                          {saving ? "Kaydediliyor..." : "Bölümleri Kaydet"}
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              )}

              {/* HEDİYE KATEGORİLERİ */}
              {activeSection === "hediye-sayfa" && (
                <div className="space-y-6">
                  {loadingHediyePage ? (
                    <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
                  ) : hediyePage ? (
                    <>
                      <Section title="Hero Bölümü" subtitle="Hediye sayfası üst kısmı">
                        <InputField
                          label="Hero Başlık"
                          value={hediyePage.heroTitle || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, heroTitle: v })}
                        />
                        <InputField
                          label="Hero Alt Başlık"
                          value={hediyePage.heroSubtitle || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, heroSubtitle: v })}
                        />
                        <ImageField
                          label="Hero Görsel"
                          value={hediyePage.heroImage || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, heroImage: v })}
                          folder="pages"
                          objectPosition={hediyePage.heroImagePosition || "50% 50%"}
                          onObjectPositionChange={(v: string) => setHediyePage({ ...hediyePage, heroImagePosition: v })}
                          objectScale={hediyePage.heroImageScale || 1}
                          onObjectScaleChange={(v: number) => setHediyePage({ ...hediyePage, heroImageScale: v })}
                        />
                      </Section>

                      <Section title="Felsefe Bölümü" subtitle="Hediye felsefesi metinleri">
                        <InputField
                          label="Başlık Satır 1"
                          value={hediyePage.sections?.philosophyTitle1 || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, philosophyTitle1: v } })}
                        />
                        <InputField
                          label="Başlık Satır 2 (italik)"
                          value={hediyePage.sections?.philosophyTitle2 || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, philosophyTitle2: v } })}
                        />
                        <TextareaField
                          label="Felsefe Metni"
                          value={hediyePage.sections?.philosophyText || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, philosophyText: v } })}
                          rows={5}
                        />
                      </Section>

                      <Section title="Görsel + Metin Bölümü" subtitle="Sol görsel, sağ metin alanı">
                        <ImageField
                          label="Sol Görsel"
                          value={hediyePage.sections?.splitImage || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, splitImage: v } })}
                          folder="pages"
                          objectPosition={hediyePage.sections?.splitImagePosition || "50% 50%"}
                          onObjectPositionChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, splitImagePosition: v } })}
                          objectScale={hediyePage.sections?.splitImageScale || 1}
                          onObjectScaleChange={(v: number) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, splitImageScale: v } })}
                        />
                        <InputField
                          label="Başlık"
                          value={hediyePage.sections?.splitTitle || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, splitTitle: v } })}
                        />
                        <TextareaField
                          label="Metin 1"
                          value={hediyePage.sections?.splitText1 || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, splitText1: v } })}
                          rows={3}
                        />
                        <TextareaField
                          label="Metin 2"
                          value={hediyePage.sections?.splitText2 || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, splitText2: v } })}
                          rows={3}
                        />
                      </Section>

                      <Section title="Kategoriler Bölümü" subtitle="Kategori başlığı ve kartları">
                        <InputField
                          label="Bölüm Başlığı"
                          value={hediyePage.sections?.categoriesTitle || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, categoriesTitle: v } })}
                        />
                        <InputField
                          label="Bölüm Alt Başlığı"
                          value={hediyePage.sections?.categoriesSubtitle || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, categoriesSubtitle: v } })}
                        />
                        {[0, 1, 2, 3].map((i) => {
                          const cats = hediyePage.sections?.categories || [];
                          const cat = cats[i] || { title: "", description: "", image: "", href: "" };
                          const updateCat = (field: string, value: string) => {
                            const updated = [...(hediyePage.sections?.categories || [{}, {}, {}, {}])];
                            updated[i] = { ...updated[i], [field]: value };
                            setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, categories: updated } });
                          };
                          return (
                            <div key={i} className="border border-[#2a2a2a] rounded-lg p-4 space-y-3">
                              <p className="text-sm font-medium text-[#d4af37]">Kategori {i + 1}</p>
                              <InputField label="Başlık" value={cat.title || ""} onChange={(v: string) => updateCat("title", v)} />
                              <InputField label="Açıklama" value={cat.description || ""} onChange={(v: string) => updateCat("description", v)} />
                              <InputField label="Link" value={cat.href || ""} onChange={(v: string) => updateCat("href", v)} />
                              <ImageField
                                label="Görsel"
                                value={cat.image || ""}
                                onChange={(v: string) => updateCat("image", v)}
                                folder="pages"
                                objectPosition={cat.imagePosition || "50% 50%"}
                                onObjectPositionChange={(v: string) => updateCat("imagePosition", v)}
                                objectScale={cat.imageScale || 1}
                                onObjectScaleChange={(v: number) => updateCat("imageScale", String(v))}
                              />
                            </div>
                          );
                        })}
                      </Section>

                      <Section title="Koyu Arkaplan Bölümü" subtitle="Arka planlı metin alanı">
                        <ImageField
                          label="Arkaplan Görseli"
                          value={hediyePage.sections?.darkBgImage || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, darkBgImage: v } })}
                          folder="pages"
                          objectPosition={hediyePage.sections?.darkBgImagePosition || "50% 50%"}
                          onObjectPositionChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, darkBgImagePosition: v } })}
                          objectScale={hediyePage.sections?.darkBgImageScale || 1}
                          onObjectScaleChange={(v: number) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, darkBgImageScale: v } })}
                        />
                        <TextareaField
                          label="Metin 1"
                          value={hediyePage.sections?.darkText1 || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, darkText1: v } })}
                          rows={3}
                        />
                        <TextareaField
                          label="Metin 2 (vurgulu)"
                          value={hediyePage.sections?.darkText2 || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, darkText2: v } })}
                          rows={3}
                        />
                        <TextareaField
                          label="Metin 3"
                          value={hediyePage.sections?.darkText3 || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, darkText3: v } })}
                          rows={3}
                        />
                      </Section>

                      <Section title="CTA Bölümü" subtitle="Sayfanın alt kısmı - çağrı butonu">
                        <InputField
                          label="Küçük Başlık"
                          value={hediyePage.sections?.ctaSmallTitle || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, ctaSmallTitle: v } })}
                        />
                        <InputField
                          label="Ana Başlık"
                          value={hediyePage.sections?.ctaTitle || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, ctaTitle: v } })}
                        />
                        <InputField
                          label="Alt Metin"
                          value={hediyePage.sections?.ctaSubtitle || ""}
                          onChange={(v: string) => setHediyePage({ ...hediyePage, sections: { ...hediyePage.sections, ctaSubtitle: v } })}
                        />
                      </Section>

                      <div className="flex justify-end">
                        <button
                          onClick={saveHediyePage}
                          disabled={saving}
                          className="px-6 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-lg font-semibold hover:bg-[#c4a030] transition-colors disabled:opacity-50"
                        >
                          {saving ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">Sayfa yüklenemedi.</div>
                  )}
                </div>
              )}

              {/* ERKEKLERE ÖZEL KATEGORİLERİ */}
              {activeSection === "erkek-tesbih" && (
                <CategorySection
                  title="Tesbih"
                  categoryKey="tesbih"
                  parentType="erkek"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "tesbih" && c.parent_type === "erkek");
                    updateCategory(cat?.id || null, field, value, "tesbih", "erkek");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}
              {activeSection === "erkek-bileklik" && (
                <CategorySection
                  title="Erkek Bileklik"
                  categoryKey="bileklik"
                  parentType="erkek"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "bileklik" && c.parent_type === "erkek");
                    updateCategory(cat?.id || null, field, value, "bileklik", "erkek");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}
              {activeSection === "erkek-yuzuk" && (
                <CategorySection
                  title="Erkek Yüzük"
                  categoryKey="yuzuk"
                  parentType="erkek"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "yuzuk" && c.parent_type === "erkek");
                    updateCategory(cat?.id || null, field, value, "yuzuk", "erkek");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}
              {activeSection === "erkek-kol" && (
                <CategorySection
                  title="Erkek Kol"
                  categoryKey="kol"
                  parentType="erkek"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "kol" && c.parent_type === "erkek");
                    updateCategory(cat?.id || null, field, value, "kol", "erkek");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}

              {/* SİZE ÖZEL (ÖZEL TASARIM) */}
              {activeSection === "ozel-tasarim-sayfa" && (
                <div className="space-y-6">
                  {loadingOzelTasarimPage ? (
                    <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
                  ) : ozelTasarimPage ? (
                    <>
                      <Section title="Hero Bölümü" subtitle="Sayfa üst kısmı (tam ekran görsel)">
                        <ImageField
                          label="Hero Arkaplan Görseli"
                          value={ozelTasarimPage.heroImage || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, heroImage: v })}
                          folder="pages"
                        />
                        <InputField
                          label="Üst Yazı (küçük)"
                          value={ozelTasarimPage.sections?.heroSubtitle || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, heroSubtitle: v } })}
                        />
                        <InputField
                          label="Ana Başlık"
                          value={ozelTasarimPage.sections?.heroTitle || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, heroTitle: v } })}
                        />
                        <InputField
                          label="Alt Metin"
                          value={ozelTasarimPage.sections?.heroDesc || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, heroDesc: v } })}
                        />
                        <InputField
                          label="Scroll Indicator Metni"
                          value={ozelTasarimPage.sections?.scrollText || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, scrollText: v } })}
                        />
                      </Section>

                      <Section title="Felsefe Bölümü" subtitle="Philosophy section metinleri">
                        <InputField
                          label="Alıntı Satır 1"
                          value={ozelTasarimPage.sections?.philosophyQuote1 || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, philosophyQuote1: v } })}
                        />
                        <InputField
                          label="Alıntı Satır 2 (italik)"
                          value={ozelTasarimPage.sections?.philosophyQuote2 || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, philosophyQuote2: v } })}
                        />
                        <TextareaField
                          label="Felsefe Metni"
                          value={ozelTasarimPage.sections?.philosophyText || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, philosophyText: v } })}
                          rows={5}
                        />
                      </Section>

                      <Section title="Görsel + Metin Bölümü" subtitle="Split section (sol görsel, sağ metin)">
                        <ImageField
                          label="Sol Görsel"
                          value={ozelTasarimPage.sections?.splitImage || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, splitImage: v } })}
                          folder="pages"
                        />
                        <InputField
                          label="Başlık"
                          value={ozelTasarimPage.sections?.splitTitle || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, splitTitle: v } })}
                        />
                        <TextareaField
                          label="Metin 1"
                          value={ozelTasarimPage.sections?.splitText1 || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, splitText1: v } })}
                          rows={4}
                        />
                        <TextareaField
                          label="Metin 2"
                          value={ozelTasarimPage.sections?.splitText2 || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, splitText2: v } })}
                          rows={4}
                        />
                      </Section>

                      <Section title="Süreç Bölümü" subtitle="4 adımlık timeline">
                        <InputField
                          label="Bölüm Başlığı"
                          value={ozelTasarimPage.sections?.processTitle || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, processTitle: v } })}
                        />
                        <TextareaField
                          label="Bölüm Alt Başlığı"
                          value={ozelTasarimPage.sections?.processSubtitle || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, processSubtitle: v } })}
                          rows={2}
                        />
                        {[0, 1, 2, 3].map((i) => {
                          const steps = ozelTasarimPage.sections?.steps || [];
                          const step = steps[i] || { label: "", title: "", desc: "" };
                          const updateStep = (field: string, value: string) => {
                            const updated = [...(ozelTasarimPage.sections?.steps || [{}, {}, {}, {}])];
                            updated[i] = { ...updated[i], [field]: value };
                            setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, steps: updated } });
                          };
                          return (
                            <div key={i} className="border border-[#2a2a2a] rounded-lg p-4 space-y-3">
                              <p className="text-sm font-medium text-[#d4af37]">Adım {i + 1}</p>
                              <InputField label="Etiket (örn: İlk Adım)" value={step.label || ""} onChange={(v: string) => updateStep("label", v)} />
                              <InputField label="Başlık" value={step.title || ""} onChange={(v: string) => updateStep("title", v)} />
                              <TextareaField label="Açıklama" value={step.desc || ""} onChange={(v: string) => updateStep("desc", v)} rows={4} />
                            </div>
                          );
                        })}
                      </Section>

                      <Section title="Koyu Arkaplan Bölümü" subtitle="Dark background section">
                        <ImageField
                          label="Arkaplan Görseli"
                          value={ozelTasarimPage.sections?.darkBgImage || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, darkBgImage: v } })}
                          folder="pages"
                        />
                        <InputField
                          label="Başlık"
                          value={ozelTasarimPage.sections?.darkTitle || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, darkTitle: v } })}
                        />
                        <InputField
                          label="Metin 1"
                          value={ozelTasarimPage.sections?.darkText1 || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, darkText1: v } })}
                        />
                        <InputField
                          label="Metin 1 Devamı (italik)"
                          value={ozelTasarimPage.sections?.darkText1Cursive || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, darkText1Cursive: v } })}
                        />
                        <TextareaField
                          label="Metin 2"
                          value={ozelTasarimPage.sections?.darkText2 || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, darkText2: v } })}
                          rows={3}
                        />
                      </Section>

                      <Section title="CTA Bölümü" subtitle="Sayfanın alt kısmı - çağrı butonu">
                        <InputField
                          label="Başlık 1 (italik)"
                          value={ozelTasarimPage.sections?.ctaTitle1 || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, ctaTitle1: v } })}
                        />
                        <InputField
                          label="Başlık 2"
                          value={ozelTasarimPage.sections?.ctaTitle2 || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, ctaTitle2: v } })}
                        />
                        <TextareaField
                          label="Açıklama"
                          value={ozelTasarimPage.sections?.ctaDesc || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, ctaDesc: v } })}
                          rows={3}
                        />
                        <InputField
                          label="Buton Metni"
                          value={ozelTasarimPage.sections?.ctaButtonText || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, ctaButtonText: v } })}
                        />
                        <InputField
                          label="Buton Linki"
                          value={ozelTasarimPage.sections?.ctaButtonLink || ""}
                          onChange={(v: string) => setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, ctaButtonLink: v } })}
                        />
                      </Section>

                      <Section title="Galeri Bölümü" subtitle="3 görsel yan yana">
                        {[0, 1, 2].map((i) => {
                          const gImages = ozelTasarimPage.sections?.galleryImages || [];
                          return (
                            <ImageField
                              key={i}
                              label={`Görsel ${i + 1}`}
                              value={gImages[i] || ""}
                              onChange={(v: string) => {
                                const updated = [...(ozelTasarimPage.sections?.galleryImages || ["", "", ""])];
                                updated[i] = v;
                                setOzelTasarimPage({ ...ozelTasarimPage, sections: { ...ozelTasarimPage.sections, galleryImages: updated } });
                              }}
                              folder="pages"
                            />
                          );
                        })}
                      </Section>

                      <div className="flex justify-end">
                        <button
                          onClick={saveOzelTasarimPage}
                          disabled={saving}
                          className="px-6 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-lg font-semibold hover:bg-[#c4a030] transition-colors disabled:opacity-50"
                        >
                          {saving ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">Sayfa yüklenemedi.</div>
                  )}
                </div>
              )}

              {/* PRELOVED */}
              {activeSection === "preloved-sayfa" && (
                <CategorySection
                  title="Preloved"
                  categoryKey="preloved"
                  parentType="preloved"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "preloved" && c.parent_type === "preloved");
                    updateCategory(cat?.id || null, field, value, "preloved", "preloved");
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const updated = current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId];
                    setCategoryProducts(prev => ({ ...prev, [categoryId]: updated }));
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  contentLang={contentLang}
                  onLangChange={setContentLang}
                />
              )}

              {/* İLETİŞİM */}
              {/* HAKKIMIZDA SAYFASI */}
              {activeSection === "hakkimizda-sayfa" && (
                <div className="space-y-6">
                  {loadingAboutPage ? (
                    <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
                  ) : aboutPage ? (
                    <>
                      <Section title="Hero Bölümü" subtitle="Sayfa üst kısmı">
                        <InputField
                          label="Hero Başlık"
                          value={aboutPage.heroTitle || ""}
                          onChange={(v) => setAboutPage({ ...aboutPage, heroTitle: v })}
                        />
                        <TextareaField
                          label="Hero Detay Metin"
                          value={aboutPage.heroParagraph2 || ""}
                          onChange={(v) => setAboutPage({ ...aboutPage, heroParagraph2: v })}
                          rows={15}
                          placeholder="Detaylı hakkımızda metni. Paragraflar arasında boş satır bırakın."
                        />
                        <ImageField
                          label="Hero Görsel"
                          value={aboutPage.heroImage || ""}
                          onChange={(v) => setAboutPage({ ...aboutPage, heroImage: v })}
                          folder="pages"
                          objectPosition={aboutPage.heroImagePosition || "50% 50%"}
                          onObjectPositionChange={(v: string) => setAboutPage({ ...aboutPage, heroImagePosition: v })}
                          objectScale={aboutPage.heroImageScale || 1}
                          onObjectScaleChange={(v: number) => setAboutPage({ ...aboutPage, heroImageScale: v })}
                        />
                      </Section>

                      <Section title="Vizyonumuz Bölümü" subtitle="Values (Değerler) bölümü">
                        <InputField
                          label="Bölüm Başlığı"
                          value={aboutPage.valuesTitle || "Vizyonumuz"}
                          onChange={(v) => setAboutPage({ ...aboutPage, valuesTitle: v })}
                        />
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-xs font-medium text-gray-400">Değerler</label>
                            <button
                              type="button"
                              onClick={() => {
                                const newValue = { id: null, title: "", description: "", image: "", sortOrder: aboutValues.length + 1 };
                                setAboutValues([...aboutValues, newValue]);
                              }}
                              className="px-3 py-1.5 bg-[#2a2a2a] text-white rounded text-xs hover:bg-[#3a3a3a] transition-colors flex items-center gap-1"
                            >
                              <FiPlus size={12} />
                              Yeni Değer Ekle
                            </button>
                          </div>

                          {loadingAboutValues ? (
                            <div className="text-center py-4 text-gray-500 text-sm">Yükleniyor...</div>
                          ) : (
                            <div className="space-y-4">
                              {aboutValues.map((value, index) => (
                                <div key={value.id || index} className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <span className="text-xs text-gray-500">Değer #{index + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => deleteAboutValue(value.id)}
                                      className="text-red-400 hover:text-red-300 text-xs"
                                    >
                                      <FiTrash2 size={14} />
                                    </button>
                                  </div>
                                  <div className="space-y-3">
                                    <InputField
                                      label="Başlık"
                                      value={value.title || ""}
                                      onChange={(v) => {
                                        const updated = [...aboutValues];
                                        updated[index] = { ...updated[index], title: v };
                                        setAboutValues(updated);
                                      }}
                                    />
                                    <TextareaField
                                      label="Açıklama"
                                      value={value.description || ""}
                                      onChange={(v) => {
                                        const updated = [...aboutValues];
                                        updated[index] = { ...updated[index], description: v };
                                        setAboutValues(updated);
                                      }}
                                      rows={2}
                                    />
                                    <ImageField
                                      label="Görsel"
                                      value={value.image || ""}
                                      onChange={(v) => {
                                        const updated = [...aboutValues];
                                        updated[index] = { ...updated[index], image: v };
                                        setAboutValues(updated);
                                      }}
                                      folder="pages"
                                      objectPosition={value.imagePosition || "50% 50%"}
                                      onObjectPositionChange={(v) => {
                                        const updated = [...aboutValues];
                                        updated[index] = { ...updated[index], imagePosition: v };
                                        setAboutValues(updated);
                                      }}
                                      objectScale={value.imageScale || 1}
                                      onObjectScaleChange={(v) => {
                                        const updated = [...aboutValues];
                                        updated[index] = { ...updated[index], imageScale: v };
                                        setAboutValues(updated);
                                      }}
                                    />
                                    <div className="flex justify-end">
                                      <button
                                        type="button"
                                        onClick={() => saveAboutValue(value)}
                                        disabled={saving}
                                        className="px-4 py-2 bg-[#2a2a2a] text-white rounded text-xs hover:bg-[#3a3a3a] transition-colors disabled:opacity-50"
                                      >
                                        {saving ? "Kaydediliyor..." : "Kaydet"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {aboutValues.length === 0 && (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                  Henüz değer eklenmemiş. "Yeni Değer Ekle" butonuna tıklayarak ekleyebilirsiniz.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </Section>

                      <div className="flex justify-end">
                        <button
                          onClick={saveAboutPage}
                          disabled={saving}
                          className="px-6 py-3 bg-[#d4af37] text-[#0f0f0f] rounded-lg font-semibold text-sm hover:bg-[#c9a432] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {saving ? (
                            <>
                              <div className="w-4 h-4 border-2 border-[#0f0f0f] border-t-transparent rounded-full animate-spin" />
                              Kaydediliyor...
                            </>
                          ) : (
                            <>
                              <FiSave size={16} />
                              Kaydet
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">Sayfa yüklenemedi</div>
                  )}
                </div>
              )}

              {activeSection === "iletisim-bilgiler" && (
                <Section title="İletişim Bilgileri" subtitle="İletişim sayfası içeriği">
                  <TextareaField
                    label="Adres"
                    value={(content.contact as Record<string, unknown>)?.address as string || ""}
                    onChange={(v) => updateField("contact", "address", v)}
                    rows={3}
                  />
                  <InputField
                    label="Telefon"
                    value={(content.contact as Record<string, unknown>)?.phone as string || ""}
                    onChange={(v) => updateField("contact", "phone", v)}
                  />
                  <InputField
                    label="E-posta"
                    value={(content.contact as Record<string, unknown>)?.email as string || ""}
                    onChange={(v) => updateField("contact", "email", v)}
                  />
                  <InputField
                    label="Çalışma Saatleri"
                    value={(content.contact as Record<string, unknown>)?.workingHours as string || ""}
                    onChange={(v) => updateField("contact", "workingHours", v)}
                  />
                  <InputField
                    label="Instagram 1 (kullanıcı adı)"
                    value={(content.contact as Record<string, unknown>)?.instagram1 as string || "@gozumunnuru.antalya"}
                    onChange={(v) => updateField("contact", "instagram1", v)}
                  />
                  <InputField
                    label="Instagram 1 URL"
                    value={(content.contact as Record<string, unknown>)?.instagram1Url as string || "https://www.instagram.com/gozumunnuru.antalya"}
                    onChange={(v) => updateField("contact", "instagram1Url", v)}
                  />
                  <InputField
                    label="Instagram 2 (kullanıcı adı)"
                    value={(content.contact as Record<string, unknown>)?.instagram2 as string || "@hankuyumculuk_"}
                    onChange={(v) => updateField("contact", "instagram2", v)}
                  />
                  <InputField
                    label="Instagram 2 URL"
                    value={(content.contact as Record<string, unknown>)?.instagram2Url as string || "https://www.instagram.com/hankuyumculuk_"}
                    onChange={(v) => updateField("contact", "instagram2Url", v)}
                  />
                  <InputField
                    label="Google Maps Embed URL veya iframe kodu"
                    value={(content.contact as Record<string, unknown>)?.mapEmbed as string || ""}
                    onChange={(v) => {
                      // iframe HTML yapıştırılmışsa src URL'sini çıkar
                      let url = v;
                      if (v.includes('<iframe')) {
                        const srcMatch = v.match(/src=["']([^"']+)["']/);
                        if (srcMatch) url = srcMatch[1];
                      }
                      updateField("contact", "mapEmbed", url);
                    }}
                    placeholder="Google Maps'ten kopyaladığınız embed URL veya iframe kodu"
                  />
                </Section>
              )}

            </div>
          </div>

          {/* Resize Handle */}
          {!previewCollapsed && (
            <div
              className="hidden lg:flex w-1 bg-[#2a2a2a] hover:bg-[#d4af37] cursor-col-resize items-center justify-center group transition-colors"
              onMouseDown={() => setIsDragging(true)}
            >
              <div className="w-0.5 h-8 bg-[#3a3a3a] group-hover:bg-[#d4af37] rounded-full" />
            </div>
          )}

          {/* Live Preview */}
          <div
            className="hidden lg:flex flex-col bg-[#0a0a0a]"
            style={{ width: previewCollapsed ? '40px' : `${previewWidth}%` }}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2">
                {!previewCollapsed && (
                  <>
                    <span className="text-xs text-gray-400 font-medium">Canlı Önizleme</span>
                    <span className="text-[10px] text-gray-600">({Math.round(previewWidth)}%)</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                {/* Collapse/Expand Toggle */}
                <button
                  onClick={() => setPreviewCollapsed(!previewCollapsed)}
                  className="p-1.5 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded"
                  title={previewCollapsed ? "Önizlemeyi Aç" : "Önizlemeyi Kapat"}
                >
                  {previewCollapsed ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                </button>
                {!previewCollapsed && (
                  <>
                    <div className="w-px h-4 bg-[#2a2a2a] mx-1" />
                    {/* Device Presets */}
                    <button
                      onClick={() => setDevice("desktop")}
                      className={`p-1.5 rounded transition-colors ${devicePreset === "desktop" ? "bg-[#d4af37] text-[#0f0f0f]" : "text-gray-500 hover:text-white hover:bg-[#2a2a2a]"}`}
                      title="Masaüstü (65%)"
                    >
                      <FiMonitor size={14} />
                    </button>
                    <button
                      onClick={() => setDevice("tablet")}
                      className={`p-1.5 rounded transition-colors ${devicePreset === "tablet" ? "bg-[#d4af37] text-[#0f0f0f]" : "text-gray-500 hover:text-white hover:bg-[#2a2a2a]"}`}
                      title="Tablet (50%)"
                    >
                      <FiTablet size={14} />
                    </button>
                    <button
                      onClick={() => setDevice("mobile")}
                      className={`p-1.5 rounded transition-colors ${devicePreset === "mobile" ? "bg-[#d4af37] text-[#0f0f0f]" : "text-gray-500 hover:text-white hover:bg-[#2a2a2a]"}`}
                      title="Mobil (25%)"
                    >
                      <FiSmartphone size={14} />
                    </button>
                    <div className="w-px h-4 bg-[#2a2a2a] mx-1" />
                    <button
                      onClick={() => setPreviewKey(prev => prev + 1)}
                      className="p-1.5 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded"
                      title="Yenile"
                    >
                      <FiRefreshCw size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
            {!previewCollapsed && (
              <div className="flex-1 p-4 overflow-hidden flex items-center justify-center">
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl h-full w-full">
                  <iframe
                    key={previewKey}
                    src="/"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 space-y-4">
        {children}
      </div>
    </div>
  );
}

// Dil Sekmeleri Bileşeni
function LanguageTabs({ 
  currentLang, 
  onChange 
}: { 
  currentLang: 'tr' | 'en' | 'ru'; 
  onChange: (lang: 'tr' | 'en' | 'ru') => void;
}) {
  const languages = [
    { code: 'tr' as const, label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'ru' as const, label: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <div className="flex gap-1 mb-4 p-1 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
            currentLang === lang.code
              ? 'bg-[#d4af37] text-[#0f0f0f]'
              : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
          }`}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}

// Kategori Düzenleme Bileşeni
function CategorySection({
  title,
  categoryKey,
  parentType,
  content,
  categories,
  onUpdate,
  products,
  categoryProducts,
  loadingCategoryProducts,
  onProductToggle,
  onSave,
  contentLang,
  onLangChange
}: {
  title: string;
  categoryKey: string;
  parentType: string;
  content: Record<string, unknown>;
  categories: Category[];
  onUpdate: (field: string, value: string) => void;
  products?: Product[];
  categoryProducts?: Record<number, number[]>;
  loadingCategoryProducts?: boolean;
  onProductToggle?: (categoryId: number, productId: number) => void;
  onSave?: (categoryId: number) => void;
  contentLang: 'tr' | 'en' | 'ru';
  onLangChange: (lang: 'tr' | 'en' | 'ru') => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const category = categories.find(c => c.slug === categoryKey && c.parent_type === parentType);
  const selectedProductIds = category ? (categoryProducts?.[category.id] || []) : [];

  // Dile göre alan adını belirle
  const getFieldName = (field: string) => contentLang === 'tr' ? field : `${field}_${contentLang}`;
  const getFieldLabel = (label: string) => contentLang === 'tr' ? label : `${label} (${contentLang.toUpperCase()})`;
  const getFieldValue = (field: string) => {
    if (!category) return '';
    const localizedField = contentLang === 'tr' ? field : `${field}_${contentLang}`;
    return (category as unknown as Record<string, string>)[localizedField] || '';
  };
  const getPlaceholder = (field: string) => {
    if (contentLang === 'tr' || !category) return '';
    return (category as unknown as Record<string, string>)[field] || '';
  };

  // Content'ten kategori verilerini al (API'den gelen)
  const getCategoryFromContent = () => {
    const categoriesMap: Record<string, string> = {
      'mucevher': 'mucevherCategories',
      'koleksiyon': 'koleksiyonCategories',
      'hediye': 'hediyeCategories',
      'erkek': 'erkekCategories',
      'preloved': 'prelovedCategory',
    };
    const contentKey = categoriesMap[parentType];
    if (!contentKey) return null;

    if (parentType === 'preloved') {
      return content[contentKey] as Record<string, unknown>;
    }

    const cats = content[contentKey] as Record<string, Record<string, unknown>>;
    return cats?.[categoryKey] || null;
  };

  const categoryData = getCategoryFromContent();

  const filteredProducts = products?.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.subtitle && p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="space-y-6">
      <Section title={title} subtitle="Kategori sayfası içeriği">
        <LanguageTabs currentLang={contentLang} onChange={onLangChange} />
        <ImageUploadField
          label="Hero Görseli"
          value={category?.hero_image || (categoryData?.heroImage as string) || ""}
          onChange={(v) => onUpdate("hero_image", v)}
          folder="categories"
        />
        <InputFieldSimple
          label={getFieldLabel("Hero Başlık")}
          value={getFieldValue("hero_title") || (contentLang === 'tr' ? (categoryData?.heroTitle as string) || "" : "")}
          onChange={(v) => onUpdate(getFieldName("hero_title"), v)}
          placeholder={getPlaceholder("hero_title")}
        />
        <InputFieldSimple
          label={getFieldLabel("Hero Alt Başlık")}
          value={getFieldValue("hero_subtitle") || (contentLang === 'tr' ? (categoryData?.heroSubtitle as string) || "" : "")}
          onChange={(v) => onUpdate(getFieldName("hero_subtitle"), v)}
          placeholder={getPlaceholder("hero_subtitle")}
        />
        <TextareaFieldSimple
          label={getFieldLabel("Hero Açıklama")}
          value={getFieldValue("hero_description") || (contentLang === 'tr' ? (categoryData?.heroDescription as string) || "" : "")}
          onChange={(v) => onUpdate(getFieldName("hero_description"), v)}
          rows={3}
        />
        <InputFieldSimple
          label={getFieldLabel("Liste Başlığı")}
          value={getFieldValue("list_title") || (contentLang === 'tr' ? (categoryData?.categoryTitle as string) || "" : "")}
          onChange={(v) => onUpdate(getFieldName("list_title"), v)}
          placeholder={getPlaceholder("list_title")}
        />
      </Section>

      {/* Ürün Seçimi */}
      {products && products.length > 0 && onProductToggle && onSave && (
        <Section title="Ürün Seçimi" subtitle="Bu kategoride gösterilecek ürünleri seçin">
          <div className="space-y-4">
            {/* Arama */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Ürün Ara</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ürün adı veya alt başlık ile ara..."
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            {/* Seçili Ürün Sayısı */}
            <div className="flex items-center justify-between p-3 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
              <span className="text-xs text-gray-400">Seçili Ürün Sayısı</span>
              <span className="text-[#d4af37] font-semibold">{selectedProductIds.length}</span>
            </div>

            {/* Ürün Listesi */}
            {loadingCategoryProducts ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-[#0f0f0f] rounded-xl p-8 text-center">
                <FiPackage className="mx-auto text-gray-600 mb-3" size={32} />
                <p className="text-gray-500 text-sm">
                  {searchTerm ? "Arama sonucu bulunamadı" : "Henüz ürün eklenmemiş"}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProductIds.includes(product.id || 0);
                  return (
                    <div
                      key={product.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#d4af37]/10 border-[#d4af37]"
                          : "bg-[#0f0f0f] border-[#2a2a2a] hover:border-[#3a3a3a]"
                      }`}
                      onClick={() => product.id && category && onProductToggle(category.id, product.id)}
                    >
                      {/* Checkbox */}
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#d4af37] border-[#d4af37]"
                          : "border-gray-600"
                      }`}>
                        {isSelected && <FiCheck size={12} className="text-[#0f0f0f]" />}
                      </div>

                      {/* Ürün Görseli */}
                      <div className="w-12 h-12 rounded-lg bg-[#2a2a2a] overflow-hidden shrink-0">
                        {product.image ? (
                          <img
                            src={product.image.startsWith("data:") ? product.image : (process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}` : product.image)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiImage className="text-gray-600" size={16} />
                          </div>
                        )}
                      </div>

                      {/* Ürün Bilgileri */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{product.name}</h4>
                        {product.subtitle && (
                          <p className="text-gray-500 text-xs truncate">{product.subtitle}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Kaydet Butonu */}
            {category && (
              <button
                onClick={() => onSave(category.id)}
                className="w-full bg-[#d4af37] text-[#0f0f0f] py-3 rounded-lg font-semibold text-sm hover:bg-[#c9a432] transition-colors"
              >
                Ürün Seçimini Kaydet
              </button>
            )}
            {!category && (
              <p className="text-yellow-500 text-sm text-center">
                Bu kategori henüz veritabanında tanımlanmamış. Önce kategoriyi kaydedin.
              </p>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}

// Basit Input Field (state dışı)
function InputFieldSimple({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
      />
    </div>
  );
}

// Basit Textarea Field
function TextareaFieldSimple({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none resize-none"
      />
    </div>
  );
}

// Görsel Yükleme Alanı (Kategori için)
function ImageUploadField({ label, value, onChange, folder = "categories" }: { label: string; value: string; onChange: (v: string) => void; folder?: string }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      if (API_URL) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch(`${API_URL}/api/upload.php`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const data = await response.json();
        if (data.success && data.url) {
          onChange(data.url);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-2">{label}</label>
      <div className="flex gap-3">
        <div className="w-20 h-20 rounded-lg bg-[#0f0f0f] border border-[#2a2a2a] overflow-hidden flex items-center justify-center">
          {value ? (
            <img src={value.startsWith('http') ? value : `${API_URL}${value}`} alt="" className="w-full h-full object-cover" />
          ) : (
            <FiImage className="text-gray-600" size={24} />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-xs rounded-lg transition-colors disabled:opacity-50"
          >
            {uploading ? "Yükleniyor..." : "Görsel Seç"}
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="veya URL girin"
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-2 py-1 text-white text-xs placeholder-gray-600 focus:ring-1 focus:ring-[#d4af37] outline-none"
          />
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, maxLength }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-xs font-medium text-gray-400">{label}</label>
        {maxLength && (
          <span className={`text-xs ${(value?.length || 0) > maxLength ? 'text-red-400' : 'text-gray-500'}`}>
            {value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) return;
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, rows = 4, placeholder, maxLength }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; maxLength?: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-xs font-medium text-gray-400">{label}</label>
        {maxLength && (
          <span className={`text-xs ${(value?.length || 0) > maxLength ? 'text-red-400' : 'text-gray-500'}`}>
            {value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) return;
          onChange(e.target.value);
        }}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none resize-none"
      />
    </div>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg">
      <span className="text-sm text-white">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
        <div className="w-11 h-6 bg-[#2a2a2a] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 peer-checked:after:bg-[#0f0f0f] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af37]"></div>
      </label>
    </div>
  );
}

// Görsel Yükleme Bileşeni
function ImageField({
  label,
  value,
  onChange,
  folder = "uploads",
  objectPosition,
  onObjectPositionChange,
  objectScale,
  onObjectScaleChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  objectPosition?: string;
  onObjectPositionChange?: (pos: string) => void;
  objectScale?: number;
  onObjectScaleChange?: (scale: number) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAdjust, setShowAdjust] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 50, posY: 50 });

  const posX = objectPosition ? parseFloat(objectPosition.split(' ')[0]) : 50;
  const posY = objectPosition ? parseFloat(objectPosition.split(' ')[1] || '50') : 50;
  const scale = objectScale ?? 1;
  const hasAdjustProps = !!(onObjectPositionChange || onObjectScaleChange);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, posX, posY };
  }, [posX, posY]);

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const rect = dragRef.current.getBoundingClientRect();
      const dx = ((e.clientX - dragStartRef.current.x) / rect.width) * 100;
      const dy = ((e.clientY - dragStartRef.current.y) / rect.height) * 100;
      const newX = Math.min(100, Math.max(0, dragStartRef.current.posX - dx));
      const newY = Math.min(100, Math.max(0, dragStartRef.current.posY - dy));
      onObjectPositionChange?.(`${Math.round(newX)}% ${Math.round(newY)}%`);
    };
    const handleUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging, onObjectPositionChange]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya türü kontrolü
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
    const isVideo = allowedVideoTypes.includes(file.type);
    if (!allowedTypes.includes(file.type)) {
      setError("JPG, PNG, GIF, WebP, MP4, WebM veya OGG dosyaları yüklenebilir");
      return;
    }

    // Dosya boyutu kontrolü (görsel 10MB, video 100MB)
    const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(isVideo ? "Video boyutu 100MB'dan küçük olmalı" : "Dosya boyutu 10MB'dan küçük olmalı");
      return;
    }

    setError("");
    setUploading(true);

    try {
      if (API_URL) {
        // Production: PHP API kullan
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        console.log("Yükleme başlatılıyor:", { API_URL, folder, fileName: file.name, fileSize: file.size });

        const response = await fetch(`${API_URL}/api/upload.php`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const data = await response.json();
        console.log("Yükleme yanıtı:", { status: response.status, data });

        if (response.ok && data.success) {
          onChange(data.url);
          setError(""); // Başarılı olduğunda hatayı temizle
          console.log("Görsel başarıyla yüklendi:", data.url);
        } else {
          const errorMsg = data.error || "Yükleme başarısız";
          setError(errorMsg);
          console.error("Yükleme hatası:", data);
        }
      } else {
        // Development: Base64 olarak sakla
        // Not: Static export kullanıldığı için API route'lar çalışmaz
        // Production'da (API_URL tanımlı) görseller PHP API ile sunucuya yüklenir
        console.warn("⚠️ Development modu: Görsel base64 olarak kaydediliyor.");
        console.warn("💡 Production modu için .env.local dosyasına şunu ekleyin:");
        console.warn("   NEXT_PUBLIC_API_URL=https://yourdomain.com");
        
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          onChange(base64);
          setError(""); // Base64 başarılı, hata yok
        };
        reader.onerror = () => {
          setError("Görsel okunamadı");
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Yükleme hatası:", error);
      setError(`Yükleme hatası: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`);
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-2">{label}</label>
      <div className="space-y-2">
        {/* Mevcut görsel/video önizleme */}
        {value && (
          <div className="relative group">
            {value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.ogg') ? (
              <video
                src={value.startsWith("data:") ? value : (API_URL ? `${API_URL}${value}` : value)}
                className="w-full h-32 object-cover rounded-lg border border-[#2a2a2a]"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={value.startsWith("data:") ? value : (API_URL ? `${API_URL}${value}` : value)}
                alt="Önizleme"
                className="w-full h-32 object-cover rounded-lg border border-[#2a2a2a]"
                style={hasAdjustProps ? { objectPosition: `${posX}% ${posY}%` } : undefined}
              />
            )}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {hasAdjustProps && !(value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.ogg')) && (
                <button
                  type="button"
                  onClick={() => setShowAdjust(!showAdjust)}
                  className={`p-1.5 ${showAdjust ? 'bg-[#d4af37] text-black' : 'bg-[#2a2a2a] text-white'} rounded-lg`}
                  title="Görseli Ayarla"
                >
                  <FiMaximize2 size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => { onChange(""); setShowAdjust(false); }}
                className="p-1.5 bg-red-500 text-white rounded-lg"
              >
                <FiX size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Görsel Ayarlama Paneli */}
        {showAdjust && value && hasAdjustProps && !(value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.ogg')) && (
          <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#d4af37] text-xs font-medium">Görsel Ayarları</span>
              <button
                type="button"
                onClick={() => {
                  onObjectPositionChange?.('50% 50%');
                  onObjectScaleChange?.(1);
                }}
                className="text-gray-500 text-xs hover:text-white transition-colors"
              >
                Sıfırla
              </button>
            </div>
            {/* Sürüklenebilir Önizleme */}
            <div
              ref={dragRef}
              className="relative w-full h-48 rounded-lg overflow-hidden border border-[#3a3a3a] cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleDragStart}
            >
              <img
                src={value.startsWith("data:") ? value : (API_URL ? `${API_URL}${value}` : value)}
                alt="Ayarla"
                className="w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: `${posX}% ${posY}%`, transform: `scale(${scale})` }}
                draggable={false}
              />
              {/* Crosshair göstergesi */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
              </div>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
                Konum: {Math.round(posX)}% {Math.round(posY)}%
              </div>
            </div>

            {/* Yakınlaştırma */}
            {onObjectScaleChange && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Yakınlaştırma</span>
                  <span className="text-white text-xs">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.05"
                  value={scale}
                  onChange={(e) => onObjectScaleChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />
              </div>
            )}
          </div>
        )}

        {/* URL girişi veya yükleme */}
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Görsel URL'si veya yükleyin"
            className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
          />
          <label className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] text-white rounded-lg cursor-pointer hover:bg-[#3a3a3a] transition-colors">
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiImage size={16} />
            )}
            <span className="text-sm">{uploading ? "..." : "Yükle"}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/mp4,video/webm,video/ogg"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {error && (
          <p className="text-red-400 text-xs flex items-center gap-1">
            <FiAlertCircle size={12} />
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

// Galeri Görselleri Bileşeni (Birden fazla görsel)
function GalleryImagesField({
  label,
  images,
  onChange,
  folder = "products"
}: {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Dosya türü kontrolü
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
          setError(`${file.name}: Sadece JPG, PNG, GIF ve WebP dosyaları yüklenebilir`);
          continue;
        }

        // Dosya boyutu kontrolü (10MB)
        if (file.size > 10 * 1024 * 1024) {
          setError(`${file.name}: Dosya boyutu 10MB'dan küçük olmalı`);
          continue;
        }

        if (API_URL) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);

          const response = await fetch(`${API_URL}/api/upload.php`, {
            method: "POST",
            credentials: "include",
            body: formData,
          });

          const data = await response.json();
          if (data.success && data.url) {
            uploadedUrls.push(data.url);
          } else {
            setError(`${file.name}: Yükleme başarısız`);
          }
        } else {
          // Development: Base64'e çevir
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              uploadedUrls.push(event.target.result as string);
              if (uploadedUrls.length === files.length) {
                onChange([...images, ...uploadedUrls]);
                setUploading(false);
              }
            }
          };
          reader.readAsDataURL(file);
        }
      }

      if (API_URL && uploadedUrls.length > 0) {
        onChange([...images, ...uploadedUrls]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("Görsel yüklenirken hata oluştu");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...images];
    if (direction === "up" && index > 0) {
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    } else if (direction === "down" && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    }
    onChange(newImages);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-2">{label}</label>
      <div className="space-y-3">
        {/* Görsel Listesi */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-[#0f0f0f] border border-[#2a2a2a]">
                  <img
                    src={image.startsWith("data:") ? image : (API_URL ? `${API_URL}${image}` : image)}
                    alt={`Galeri ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveImage(index, "up")}
                    disabled={index === 0}
                    className="p-1.5 bg-[#2a2a2a] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3a3a3a]"
                    title="Yukarı taşı"
                  >
                    <FiChevronRight size={14} className="-rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Sil"
                  >
                    <FiTrash2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, "down")}
                    disabled={index === images.length - 1}
                    className="p-1.5 bg-[#2a2a2a] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3a3a3a]"
                    title="Aşağı taşı"
                  >
                    <FiChevronRight size={14} className="rotate-90" />
                  </button>
                </div>
                <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Yükleme Butonu */}
        <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[#2a2a2a] rounded-lg cursor-pointer hover:border-[#d4af37] transition-colors">
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-400">Yükleniyor...</span>
            </>
          ) : (
            <>
              <FiPlus size={16} className="text-[#d4af37]" />
              <span className="text-sm text-gray-400">Görsel Ekle (Birden fazla seçebilirsiniz)</span>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>

        {error && (
          <p className="text-red-400 text-xs flex items-center gap-1">
            <FiAlertCircle size={12} />
            {error}
          </p>
        )}

        {images.length > 0 && (
          <p className="text-gray-500 text-xs">
            {images.length} görsel eklendi. Sıralamayı değiştirmek için görsellerin üzerine gelin.
          </p>
        )}
      </div>
    </div>
  );
}
