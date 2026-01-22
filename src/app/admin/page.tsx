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
  FiPackage
} from "react-icons/fi";
import initialContent from "@/data/content.json";

type ContentType = Record<string, unknown>;

// Ürün tipi
interface Product {
  id?: number;
  category_id: number | null;
  slug?: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  banner_image: string;
  gallery_images: string[];
  sort_order: number;
  is_active: boolean;
}

// Kategori tipi
interface Category {
  id: number;
  name: string;
  slug: string;
  parent_type: string;
  hero_image?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  list_title?: string;
  sort_order?: number;
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

  const [content, setContent] = useState<ContentType | null>(null);
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

  // Ürün yönetimi state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
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
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          setContent(parsed);
          localStorage.setItem("admin_preview_content", savedContent);
          return;
        } catch {
          // JSON parse hatası, devam et
        }
      }

      // Production'da API'den yükle
      if (API_URL) {
        try {
          const response = await fetch(`${API_URL}/api/content.php`);
          if (response.ok) {
            const data = await response.json();
            setContent(data as unknown as ContentType);
            localStorage.setItem("admin_preview_content", JSON.stringify(data));
            localStorage.setItem("admin_saved_content", JSON.stringify(data));
            return;
          }
        } catch (error) {
          console.error("İçerik yüklenemedi:", error);
        }
      }

      // Fallback: content.json'dan yükle
      setContent(initialContent as unknown as ContentType);
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
          // Kategori sayfaları
          { key: "yuzuk_category", value: content?.yuzukCategory },
          { key: "kolye_category", value: content?.kolyeCategory },
          { key: "bileklik_category", value: content?.bileklikCategory },
          { key: "kupe_category", value: content?.kupeCategory },
          { key: "set_category", value: content?.setCategory },
          { key: "gozumun_nuru_category", value: content?.gozumunNuruCategory },
          { key: "dogum_gunu_category", value: content?.dogumGunuCategory },
          { key: "anneler_gunu_category", value: content?.annelerGunuCategory },
          { key: "kadinlar_gunu_category", value: content?.kadinlarGunuCategory },
          { key: "ozel_gunler_category", value: content?.ozelGunlerCategory },
          { key: "yeni_dogan_category", value: content?.yeniDoganCategory },
          { key: "aksesuar_category", value: content?.aksesuarCategory },
          { key: "tesbih_category", value: content?.tesbihCategory },
          { key: "erkek_bileklik_category", value: content?.erkekBileklikCategory },
          { key: "erkek_yuzuk_category", value: content?.erkekYuzukCategory },
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

  const updateField = (section: string, field: string, value: unknown) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: {
        ...(content[section] as Record<string, unknown>),
        [field]: value,
      },
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
            setCategories(Array.isArray(categoriesData) ? categoriesData : []);
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
          { key: "dogumGunuCategory", name: "Doğum Günü", slug: "dogum-gunu", parentType: "hediye" },
          { key: "annelerGunuCategory", name: "Anneler Günü", slug: "anneler-gunu", parentType: "hediye" },
          { key: "kadinlarGunuCategory", name: "Kadınlar Günü", slug: "kadinlar-gunu", parentType: "hediye" },
          { key: "ozelGunlerCategory", name: "Özel Günler", slug: "ozel-gunler", parentType: "hediye" },
          { key: "yeniDoganCategory", name: "Yeni Doğan", slug: "yeni-dogan", parentType: "hediye" },
          { key: "aksesuarCategory", name: "Aksesuar", slug: "aksesuar", parentType: "hediye" },
          { key: "tesbihCategory", name: "Tesbih", slug: "tesbih", parentType: "erkek" },
          { key: "erkekBileklikCategory", name: "Erkek Bileklik", slug: "bileklik", parentType: "erkek" },
          { key: "erkekYuzukCategory", name: "Erkek Yüzük", slug: "yuzuk", parentType: "erkek" },
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

  // Kategori güncelle
  const updateCategory = async (categoryId: number, field: string, value: string) => {
    try {
      if (API_URL) {
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
        }
      } else {
        // Development: local state güncelle
        setCategories(prev => prev.map(cat =>
          cat.id === categoryId ? { ...cat, [field]: value } : cat
        ));
      }
    } catch (error) {
      console.error("Kategori güncelleme hatası:", error);
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
          loadProducts();
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
    setSaving(true);
    try {
      if (API_URL) {
        const response = await fetch(`${API_URL}/api/category-products.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ category_id: categoryId, product_ids: productIds }),
        });
        if (response.ok) {
          setMessage({ type: "success", text: "Ürünler kaydedildi!" });
          setCategoryProducts(prev => ({ ...prev, [categoryId]: productIds }));
        } else {
          throw new Error("Ürünler kaydedilemedi");
        }
      } else {
        // Development: local state'e kaydet
        setCategoryProducts(prev => ({ ...prev, [categoryId]: productIds }));
        setMessage({ type: "success", text: "Ürünler kaydedildi (local)!" });
      }
    } catch (error) {
      console.error("Kategori ürünleri kaydetme hatası:", error);
      setMessage({ type: "error", text: "Ürünler kaydedilemedi!" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  // Ürünler sayfasına geçildiğinde yükle
  useEffect(() => {
    if (activeSection.startsWith("urunler-")) {
      loadProducts();
    }
  }, [activeSection]);

  // Kategori sayfasına geçildiğinde kategori-ürün ilişkisini yükle
  useEffect(() => {
    const categoryMap: Record<string, number> = {
      "mucevher-yuzuk": 1,
      "mucevher-kolye": 2,
      "mucevher-bileklik": 3,
      "mucevher-kupe": 4,
      "mucevher-set": 5,
      "koleksiyon-gozumun-nuru": 6,
      "hediye-dogum-gunu": 7,
      "hediye-anneler-gunu": 8,
      "hediye-kadinlar-gunu": 9,
      "hediye-ozel-gunler": 10,
      "hediye-yeni-dogan": 11,
      "hediye-aksesuar": 12,
      "erkek-tesbih": 13,
      "erkek-bileklik": 14,
      "erkek-yuzuk": 15,
      "preloved": 16,
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
        { key: "anasayfa-ozel", label: "Özel Tasarım Kartları" },
        { key: "anasayfa-blog", label: "Blog Bölümü" },
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
        { key: "hediye-dogum-gunu", label: "Doğum Günü" },
        { key: "hediye-anneler-gunu", label: "Anneler Günü" },
        { key: "hediye-kadinlar-gunu", label: "Kadınlar Günü" },
        { key: "hediye-ozel-gunler", label: "Özel Günler" },
        { key: "hediye-yeni-dogan", label: "Yeni Doğan" },
        { key: "hediye-aksesuar", label: "Aksesuar" },
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
      key: "urunler",
      label: "Ürün Yönetimi",
      icon: FiPackage,
      subItems: [
        { key: "urunler-liste", label: "Tüm Ürünler" },
        { key: "urunler-ekle", label: "Yeni Ürün Ekle" },
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
                  <InputField
                    label="Banner Metni"
                    value={(content.topBanner as Record<string, unknown>)?.text as string || ""}
                    onChange={(v) => updateField("topBanner", "text", v)}
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-gray-400 text-sm">
                        {((content.hero as Record<string, unknown>)?.slides as unknown[])?.length || 0} slide mevcut
                      </p>
                      <button
                        onClick={() => {
                          const slides = ((content.hero as Record<string, unknown>)?.slides as unknown[]) || [];
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
                    {((content.hero as Record<string, unknown>)?.slides as unknown[])?.map((slide: unknown, index: number) => {
                      const s = slide as Record<string, unknown>;
                      return (
                        <div key={index} className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4 space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#d4af37] text-xs font-medium">Slide {index + 1}</span>
                            <button
                              onClick={() => {
                                const slides = ((content.hero as Record<string, unknown>)?.slides as unknown[]) || [];
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
                              const slides = ((content.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, backgroundImage: v };
                              updateField("hero", "slides", updated);
                            }}
                            folder="hero"
                          />
                          <InputField
                            label="Başlık"
                            value={(s.title as string) || ""}
                            onChange={(v) => {
                              const slides = ((content.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, title: v };
                              updateField("hero", "slides", updated);
                            }}
                          />
                          <InputField
                            label="Alt Başlık"
                            value={(s.subtitle as string) || ""}
                            onChange={(v) => {
                              const slides = ((content.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, subtitle: v };
                              updateField("hero", "slides", updated);
                            }}
                          />
                          <InputField
                            label="Buton Metni"
                            value={(s.ctaText as string) || ""}
                            onChange={(v) => {
                              const slides = ((content.hero as Record<string, unknown>)?.slides as unknown[]) || [];
                              const updated = [...slides];
                              updated[index] = { ...s, ctaText: v };
                              updateField("hero", "slides", updated);
                            }}
                          />
                          <InputField
                            label="Buton Linki"
                            value={(s.ctaLink as string) || ""}
                            onChange={(v) => {
                              const slides = ((content.hero as Record<string, unknown>)?.slides as unknown[]) || [];
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
                  <div className="space-y-4">
                    <div className="p-3 bg-[#d4af37]/10 rounded-lg">
                      <p className="text-[#d4af37] text-xs font-medium mb-3">Sol Taraf</p>
                      <InputField
                        label="Başlık"
                        value={(content.trendSection as Record<string, unknown>)?.leftTitle as string || ""}
                        onChange={(v) => updateField("trendSection", "leftTitle", v)}
                      />
                      <InputField
                        label="Link"
                        value={(content.trendSection as Record<string, unknown>)?.leftLink as string || ""}
                        onChange={(v) => updateField("trendSection", "leftLink", v)}
                      />
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <p className="text-blue-400 text-xs font-medium mb-3">Sağ Taraf</p>
                      <InputField
                        label="Başlık"
                        value={(content.trendSection as Record<string, unknown>)?.rightTitle as string || ""}
                        onChange={(v) => updateField("trendSection", "rightTitle", v)}
                      />
                      <InputField
                        label="Link"
                        value={(content.trendSection as Record<string, unknown>)?.rightLink as string || ""}
                        onChange={(v) => updateField("trendSection", "rightLink", v)}
                      />
                    </div>
                  </div>
                </Section>
              )}

              {/* ANA SAYFA - HİKAYE */}
              {activeSection === "anasayfa-hikaye" && (
                <Section title="Hikaye Bölümü" subtitle="Marka hikayesi alanı">
                  <InputField
                    label="Başlık"
                    value={(content.storySection as Record<string, unknown>)?.title as string || ""}
                    onChange={(v) => updateField("storySection", "title", v)}
                  />
                  <TextareaField
                    label="Ana Metin"
                    value={(content.storySection as Record<string, unknown>)?.mainText as string || ""}
                    onChange={(v) => updateField("storySection", "mainText", v)}
                  />
                  <TextareaField
                    label="Alt Metin"
                    value={(content.storySection as Record<string, unknown>)?.subText as string || ""}
                    onChange={(v) => updateField("storySection", "subText", v)}
                  />
                </Section>
              )}

              {/* ANA SAYFA - ÖZEL TASARIM KARTLARI */}
              {activeSection === "anasayfa-ozel" && (
                <Section title="Özel Tasarım Kartları" subtitle="Kendini Özel Hisset bölümü">
                  <div className="space-y-6">
                    {/* Başlık */}
                    <div className="space-y-3">
                      <InputField
                        label="Başlık 1. Kısım"
                        value={(content.specialDesignSection as Record<string, unknown>)?.titlePart1 as string || ""}
                        onChange={(v) => updateField("specialDesignSection", "titlePart1", v)}
                      />
                      <InputField
                        label="Başlık 2. Kısım"
                        value={(content.specialDesignSection as Record<string, unknown>)?.titlePart2 as string || ""}
                        onChange={(v) => updateField("specialDesignSection", "titlePart2", v)}
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
                  />
                </Section>
              )}

              {/* FOOTER */}
              {activeSection === "footer-genel" && (
                <Section title="Footer Ayarları" subtitle="Alt bilgi alanı">
                  <InputField
                    label="Slogan"
                    value={(content.footer as Record<string, unknown>)?.slogan as string || ""}
                    onChange={(v) => updateField("footer", "slogan", v)}
                  />
                  <TextareaField
                    label="Açıklama"
                    value={(content.footer as Record<string, unknown>)?.description as string || ""}
                    onChange={(v) => updateField("footer", "description", v)}
                  />
                  <InputField
                    label="Telif Hakkı"
                    value={(content.footer as Record<string, unknown>)?.copyright as string || ""}
                    onChange={(v) => updateField("footer", "copyright", v)}
                  />
                </Section>
              )}


              {/* KATEGORİ YÖNETİMİ - MÜCEVHER */}
              {activeSection.startsWith("mucevher-") && (
                <CategoryManagementSection
                  activeSection={activeSection}
                  categoryMap={{
                    "mucevher-yuzuk": { id: 1, name: "Yüzük", slug: "yuzuk" },
                    "mucevher-kolye": { id: 2, name: "Kolye", slug: "kolye" },
                    "mucevher-bileklik": { id: 3, name: "Bileklik", slug: "bileklik" },
                    "mucevher-kupe": { id: 4, name: "Küpe", slug: "kupe" },
                    "mucevher-set": { id: 5, name: "Set", slug: "set" },
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const newProducts = current.includes(productId)
                      ? current.filter(id => id !== productId)
                      : [...current, productId];
                    saveCategoryProducts(categoryId, newProducts);
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  content={content}
                  updateField={updateField}
                />
              )}

              {/* KATEGORİ YÖNETİMİ - KOLEKSİYON */}
              {activeSection.startsWith("koleksiyon-") && (
                <CategoryManagementSection
                  activeSection={activeSection}
                  categoryMap={{
                    "koleksiyon-gozumun-nuru": { id: 6, name: "Gözümün Nuru", slug: "gozumun-nuru" },
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const newProducts = current.includes(productId)
                      ? current.filter(id => id !== productId)
                      : [...current, productId];
                    saveCategoryProducts(categoryId, newProducts);
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  content={content}
                  updateField={updateField}
                />
              )}

              {/* KATEGORİ YÖNETİMİ - HEDİYE */}
              {activeSection.startsWith("hediye-") && (
                <CategoryManagementSection
                  activeSection={activeSection}
                  categoryMap={{
                    "hediye-dogum-gunu": { id: 7, name: "Doğum Günü", slug: "dogum-gunu" },
                    "hediye-anneler-gunu": { id: 8, name: "Anneler Günü", slug: "anneler-gunu" },
                    "hediye-kadinlar-gunu": { id: 9, name: "Kadınlar Günü", slug: "kadinlar-gunu" },
                    "hediye-ozel-gunler": { id: 10, name: "Özel Günler", slug: "ozel-gunler" },
                    "hediye-yeni-dogan": { id: 11, name: "Yeni Doğan", slug: "yeni-dogan" },
                    "hediye-aksesuar": { id: 12, name: "Aksesuar", slug: "aksesuar" },
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const newProducts = current.includes(productId)
                      ? current.filter(id => id !== productId)
                      : [...current, productId];
                    saveCategoryProducts(categoryId, newProducts);
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  content={content}
                  updateField={updateField}
                />
              )}

              {/* KATEGORİ YÖNETİMİ - ERKEK */}
              {activeSection.startsWith("erkek-") && (
                <CategoryManagementSection
                  activeSection={activeSection}
                  categoryMap={{
                    "erkek-tesbih": { id: 13, name: "Tesbih", slug: "tesbih" },
                    "erkek-bileklik": { id: 14, name: "Erkek Bileklik", slug: "bileklik" },
                    "erkek-yuzuk": { id: 15, name: "Erkek Yüzük", slug: "yuzuk" },
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const newProducts = current.includes(productId)
                      ? current.filter(id => id !== productId)
                      : [...current, productId];
                    saveCategoryProducts(categoryId, newProducts);
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  content={content}
                  updateField={updateField}
                />
              )}

              {/* KATEGORİ YÖNETİMİ - PRELOVED */}
              {activeSection === "preloved-sayfa" && (
                <CategoryManagementSection
                  activeSection={activeSection}
                  categoryMap={{
                    "preloved-sayfa": { id: 16, name: "Preloved", slug: "preloved" },
                  }}
                  products={products}
                  categoryProducts={categoryProducts}
                  loadingCategoryProducts={loadingCategoryProducts}
                  onProductToggle={(categoryId, productId) => {
                    const current = categoryProducts[categoryId] || [];
                    const newProducts = current.includes(productId)
                      ? current.filter(id => id !== productId)
                      : [...current, productId];
                    saveCategoryProducts(categoryId, newProducts);
                  }}
                  onSave={(categoryId) => {
                    const productIds = categoryProducts[categoryId] || [];
                    saveCategoryProducts(categoryId, productIds);
                  }}
                  content={content}
                  updateField={updateField}
                />
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
                    <div className="space-y-3">
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
                          <ImageField
                            label="Ürün Görseli"
                            value={editingProduct.image}
                            onChange={(v) => setEditingProduct({ ...editingProduct, image: v })}
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
                            <label className="block text-xs font-medium text-gray-400 mb-2">Kategori</label>
                            <select
                              value={editingProduct.category_id || ""}
                              onChange={(e) => setEditingProduct({ ...editingProduct, category_id: e.target.value ? Number(e.target.value) : null })}
                              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
                            >
                              <option value="">Kategori Seçin</option>
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
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
                  <div className="space-y-4">
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
                    <ImageField
                      label="Ürün Görseli"
                      value={newProduct.image}
                      onChange={(v) => setNewProduct({ ...newProduct, image: v })}
                      folder="products"
                    />
                    <ImageField
                      label="Banner Görseli"
                      value={newProduct.banner_image}
                      onChange={(v) => setNewProduct({ ...newProduct, banner_image: v })}
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
                      <label className="block text-xs font-medium text-gray-400 mb-2">Kategori</label>
                      <select
                        value={newProduct.category_id || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value ? Number(e.target.value) : null })}
                        className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none"
                      >
                        <option value="">Kategori Seçin</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
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
                    if (cat) updateCategory(cat.id, field, value);
                  }}
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
                    if (cat) updateCategory(cat.id, field, value);
                  }}
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
                    if (cat) updateCategory(cat.id, field, value);
                  }}
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
                    if (cat) updateCategory(cat.id, field, value);
                  }}
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
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}

              {/* KOLEKSİYON KATEGORİLERİ */}
              {activeSection === "koleksiyon-gozumun-nuru" && (
                <CategorySection
                  title="Gözümün Nuru"
                  categoryKey="gozumun-nuru"
                  parentType="koleksiyon"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "gozumun-nuru" && c.parent_type === "koleksiyon");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}

              {/* HEDİYE KATEGORİLERİ */}
              {activeSection === "hediye-dogum-gunu" && (
                <CategorySection
                  title="Doğum Günü"
                  categoryKey="dogum-gunu"
                  parentType="hediye"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "dogum-gunu" && c.parent_type === "hediye");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}
              {activeSection === "hediye-anneler-gunu" && (
                <CategorySection
                  title="Anneler Günü"
                  categoryKey="anneler-gunu"
                  parentType="hediye"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "anneler-gunu" && c.parent_type === "hediye");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}
              {activeSection === "hediye-kadinlar-gunu" && (
                <CategorySection
                  title="Kadınlar Günü"
                  categoryKey="kadinlar-gunu"
                  parentType="hediye"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "kadinlar-gunu" && c.parent_type === "hediye");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}
              {activeSection === "hediye-ozel-gunler" && (
                <CategorySection
                  title="Özel Günler"
                  categoryKey="ozel-gunler"
                  parentType="hediye"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "ozel-gunler" && c.parent_type === "hediye");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}
              {activeSection === "hediye-yeni-dogan" && (
                <CategorySection
                  title="Yeni Doğan"
                  categoryKey="yeni-dogan"
                  parentType="hediye"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "yeni-dogan" && c.parent_type === "hediye");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}
              {activeSection === "hediye-aksesuar" && (
                <CategorySection
                  title="Aksesuar"
                  categoryKey="aksesuar"
                  parentType="hediye"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "aksesuar" && c.parent_type === "hediye");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
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
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}
              {activeSection === "erkek-bileklik" && (
                <CategorySection
                  title="Erkek Bileklik"
                  categoryKey="erkek-bileklik"
                  parentType="erkek"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "bileklik" && c.parent_type === "erkek");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}
              {activeSection === "erkek-yuzuk" && (
                <CategorySection
                  title="Erkek Yüzük"
                  categoryKey="erkek-yuzuk"
                  parentType="erkek"
                  content={content}
                  categories={categories}
                  onUpdate={(field, value) => {
                    const cat = categories.find(c => c.slug === "yuzuk" && c.parent_type === "erkek");
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}

              {/* SİZE ÖZEL (ÖZEL TASARIM) */}
              {activeSection === "ozel-tasarim-sayfa" && (
                <Section title="Size Özel" subtitle="Özel tasarım sayfası içeriği">
                  <p className="text-gray-500 text-sm">Bu sayfa özel tasarım bileşeni kullanmaktadır.</p>
                </Section>
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
                    if (cat) updateCategory(cat.id, field, value);
                  }}
                />
              )}

              {/* İLETİŞİM */}
              {activeSection === "iletisim-bilgiler" && (
                <Section title="İletişim Bilgileri" subtitle="İletişim sayfası içeriği">
                  <InputField
                    label="Adres"
                    value={(content.contact as Record<string, unknown>)?.address as string || ""}
                    onChange={(v) => updateField("contact", "address", v)}
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
                </Section>
              )}

            </div>
          </div>

          {/* Resize Handle */}
          <div
            className="hidden lg:flex w-1 bg-[#2a2a2a] hover:bg-[#d4af37] cursor-col-resize items-center justify-center group transition-colors"
            onMouseDown={() => setIsDragging(true)}
          >
            <div className="w-0.5 h-8 bg-[#3a3a3a] group-hover:bg-[#d4af37] rounded-full" />
          </div>

          {/* Live Preview */}
          <div 
            className="hidden lg:flex flex-col bg-[#0a0a0a]"
            style={{ width: `${previewWidth}%` }}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">Canlı Önizleme</span>
                <span className="text-[10px] text-gray-600">({Math.round(previewWidth)}%)</span>
              </div>
              <div className="flex items-center gap-1">
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
              </div>
            </div>
            <div className="flex-1 p-4 overflow-hidden flex items-center justify-center">
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl h-full w-full">
                <iframe
                  key={previewKey}
                  src="/"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
// Kategori Yönetimi Component
function CategoryManagementSection({
  activeSection,
  categoryMap,
  products,
  categoryProducts,
  loadingCategoryProducts,
  onProductToggle,
  onSave,
  content,
  updateField,
}: {
  activeSection: string;
  categoryMap: Record<string, { id: number; name: string; slug: string }>;
  products: Product[];
  categoryProducts: Record<number, number[]>;
  loadingCategoryProducts: boolean;
  onProductToggle: (categoryId: number, productId: number) => void;
  onSave: (categoryId: number) => void;
  content: ContentType | null;
  updateField: (path: string, field: string, value: unknown) => void;
}) {
  const category = categoryMap[activeSection];
  if (!category || !content) return null;

  const selectedProductIds = categoryProducts[category.id] || [];
  const [searchTerm, setSearchTerm] = useState("");

  // Kategori içeriğini bul
  const getCategoryContent = () => {
    const categorySlug = category.slug;
    
    // Mücevher kategorileri
    if (activeSection.startsWith("mucevher-")) {
      const mucevherCategories = (content.mucevherCategories as Record<string, unknown>) || {};
      return mucevherCategories[categorySlug] as Record<string, unknown> | undefined;
    }
    
    // Koleksiyon kategorileri
    if (activeSection.startsWith("koleksiyon-")) {
      if (categorySlug === "gozumun-nuru") {
        return content.gozumunNuruCategory as Record<string, unknown> | undefined;
      }
    }
    
    // Hediye kategorileri
    if (activeSection.startsWith("hediye-")) {
      const hediyeCategories = (content.hediyeCategories as Record<string, unknown>) || {};
      return hediyeCategories[categorySlug] as Record<string, unknown> | undefined;
    }
    
    // Erkek kategorileri
    if (activeSection.startsWith("erkek-")) {
      const erkekCategories = (content.erkekCategories as Record<string, unknown>) || {};
      return erkekCategories[categorySlug] as Record<string, unknown> | undefined;
    }
    
    // Preloved
    if (activeSection === "preloved-sayfa") {
      return content.prelovedCategory as Record<string, unknown> | undefined;
    }
    
    return undefined;
  };

  const categoryContent = getCategoryContent();
  const categoryPath = activeSection.startsWith("mucevher-") 
    ? `mucevherCategories.${category.slug}`
    : activeSection.startsWith("koleksiyon-")
    ? "gozumunNuruCategory"
    : activeSection.startsWith("hediye-")
    ? `hediyeCategories.${category.slug}`
    : activeSection.startsWith("erkek-")
    ? `erkekCategories.${category.slug}`
    : "prelovedCategory";

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.subtitle && p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Kategori İçerik Ayarları */}
      <Section title={`${category.name} - Sayfa İçeriği`} subtitle="Kategori sayfası başlık ve açıklamaları">
        <InputField
          label="Hero Başlık"
          value={(categoryContent?.heroTitle as string) || ""}
          onChange={(v) => updateField(categoryPath, "heroTitle", v)}
        />
        <InputField
          label="Hero Alt Başlık"
          value={(categoryContent?.heroSubtitle as string) || ""}
          onChange={(v) => updateField(categoryPath, "heroSubtitle", v)}
        />
        <TextareaField
          label="Hero Açıklama"
          value={(categoryContent?.heroDescription as string) || ""}
          onChange={(v) => updateField(categoryPath, "heroDescription", v)}
          rows={4}
        />
        <InputField
          label="Kategori Liste Başlığı"
          value={(categoryContent?.categoryTitle as string) || ""}
          onChange={(v) => updateField(categoryPath, "categoryTitle", v)}
        />
      </Section>

      {/* Ürün Seçimi */}
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
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
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
                    onClick={() => product.id && onProductToggle(category.id, product.id)}
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
          <button
            onClick={() => onSave(category.id)}
            className="w-full bg-[#d4af37] text-[#0f0f0f] py-3 rounded-lg font-semibold text-sm hover:bg-[#c9a432] transition-colors"
          >
            Ürün Seçimini Kaydet
          </button>
        </div>
      </Section>
    </div>
  );
}

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

// Kategori Düzenleme Bileşeni
function CategorySection({
  title,
  categoryKey,
  parentType,
  content,
  categories,
  onUpdate
}: {
  title: string;
  categoryKey: string;
  parentType: string;
  content: Record<string, unknown>;
  categories: Category[];
  onUpdate: (field: string, value: string) => void;
}) {
  const category = categories.find(c => c.slug === categoryKey && c.parent_type === parentType);

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

  return (
    <Section title={title} subtitle="Kategori sayfası içeriği">
      <ImageUploadField
        label="Hero Görseli"
        value={category?.hero_image || (categoryData?.heroImage as string) || ""}
        onChange={(v) => onUpdate("hero_image", v)}
        folder="categories"
      />
      <InputFieldSimple
        label="Hero Başlık"
        value={category?.hero_title || (categoryData?.heroTitle as string) || ""}
        onChange={(v) => onUpdate("hero_title", v)}
      />
      <InputFieldSimple
        label="Hero Alt Başlık"
        value={category?.hero_subtitle || (categoryData?.heroSubtitle as string) || ""}
        onChange={(v) => onUpdate("hero_subtitle", v)}
      />
      <TextareaFieldSimple
        label="Hero Açıklama"
        value={category?.hero_description || (categoryData?.heroDescription as string) || ""}
        onChange={(v) => onUpdate("hero_description", v)}
        rows={3}
      />
      <InputFieldSimple
        label="Liste Başlığı"
        value={category?.list_title || (categoryData?.categoryTitle as string) || ""}
        onChange={(v) => onUpdate("list_title", v)}
      />
    </Section>
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

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
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

function TextareaField({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
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
  folder = "uploads"
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya türü kontrolü
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Sadece JPG, PNG, GIF ve WebP dosyaları yüklenebilir");
      return;
    }

    // Dosya boyutu kontrolü (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Dosya boyutu 10MB'dan küçük olmalı");
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
        {/* Mevcut görsel önizleme */}
        {value && (
          <div className="relative group">
            <img
              src={value.startsWith("data:") ? value : (API_URL ? `${API_URL}${value}` : value)}
              alt="Önizleme"
              className="w-full h-32 object-cover rounded-lg border border-[#2a2a2a]"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiX size={14} />
            </button>
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
              accept="image/*"
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
