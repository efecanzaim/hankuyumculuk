# API & Frontend Uyumluluk Kontrol Raporu

## 📋 Kontrol Edilen Dosyalar

### Backend (API)
- `api/products.php` - Tekli ürün CRUD işlemleri
- `api/products-bulk.php` - Toplu ürün yükleme

### Frontend
- `src/app/admin/page.tsx` - Admin panel, Product interface, CSV parse
- `src/components/ProductPageClient.tsx` - Ürün sayfası client component
- `src/components/ProductDetailPage.tsx` - Ürün detay gösterimi

---

## ✅ DOĞRU ÇALIŞAN ALANLAR

### 1. Temel Ürün Bilgileri
| Alan | API (snake_case) | Frontend (camelCase) | Durum |
|------|------------------|---------------------|--------|
| ID | `id` | `id` | ✅ |
| Slug | `slug` | `slug` | ✅ |
| İsim | `name` | `name` | ✅ |
| Alt Başlık | `subtitle` | `subtitle` | ✅ |
| Açıklama | `description` | `description` | ✅ |

### 2. Görsel Alanları
| Alan | API | Frontend | Durum |
|------|-----|----------|--------|
| Ana Görsel | `main_image` | `mainImage`, `image` | ✅ Both supported |
| Banner | `banner_image` | `bannerImage`, `banner_image` | ✅ Both supported |
| Galeri | `gallery_images` (JSON) | `galleryImages`, `gallery_images` (Array) | ✅ |

### 3. Kategori Bilgileri
| Alan | API | Frontend | Durum |
|------|-----|----------|--------|
| Kategori ID | `category_id` | `categoryId`, `category_id` | ✅ Both supported |
| Kategori Adı | `category_name` | `categoryName` | ✅ |
| Kategori Slug | `category_slug` | `categorySlug` | ✅ |
| Parent Type | `parent_type` | `parentType`, `parent_type` | ✅ Both supported |

### 4. Sertifika & Taş Bilgileri
| Alan | API | Frontend | Durum |
|------|-----|----------|--------|
| Altın Ağırlığı | `gold_weight` (DECIMAL) | `gold_weight` (string) | ✅ |
| Altın Ayar | `gold_karat` (INT) | `gold_karat` (string) | ✅ |
| Taş Bilgileri | `stones` (Array from separate table) | `stones` (ProductStone[]) | ✅ |

### 5. Diğer Alanlar
| Alan | API | Frontend | Durum |
|------|-----|----------|--------|
| Öne Çıkan | `is_featured` (BOOL) | `isFeatured`, `is_featured` | ✅ Both supported |
| Sıralama | `sort_order` (INT) | `sortOrder`, `sort_order` | ✅ Both supported |
| Aktif | `is_active` (BOOL) | `is_active` | ✅ |
| Link | `link` (computed) | `link` | ✅ |

---

## 🔍 DETAYLI İNCELEME

### API formatProduct() Fonksiyonu (products.php:232-288)

**Döndürdüğü Alanlar:**
```php
return [
    'id' => (int)$product['id'],
    'categoryId' => $product['category_id'] ? (int)$product['category_id'] : null,
    'category_id' => $product['category_id'] ? (int)$product['category_id'] : null,
    'categoryName' => $product['category_name'] ?? null,
    'categorySlug' => $product['category_slug'] ?? null,
    'parentType' => $product['parent_type'] ?? null,
    'parent_type' => $product['parent_type'] ?? null,
    'slug' => $product['slug'],
    'name' => $product['name'],
    'subtitle' => $product['subtitle'],
    'description' => $product['description'],
    'mainImage' => $product['main_image'],
    'image' => $product['main_image'],
    'bannerImage' => $product['banner_image'],
    'banner_image' => $product['banner_image'],
    'galleryImages' => $galleryImages,
    'gallery_images' => $galleryImages ?? [],
    'gold_weight' => $product['gold_weight'] ?? null,
    'gold_karat' => $product['gold_karat'] ?? null,
    'stones' => $stones,
    'isFeatured' => (bool)$product['is_featured'],
    'is_featured' => (bool)$product['is_featured'],
    'sortOrder' => (int)$product['sort_order'],
    'sort_order' => (int)$product['sort_order'],
    'is_active' => isset($product['is_active']) ? (bool)$product['is_active'] : true,
    'link' => '/urun/' . $product['slug']
];
```

**✅ İYİ:** Hem camelCase hem snake_case destekliyor (backward compatibility)

### Taş Bilgileri Yapısı

**API (products.php:241-258):**
```php
$stones[] = [
    'id' => (int)$stone['id'],
    'stone_type' => $stone['stone_type'],
    'carat' => $stone['carat'],  // DECIMAL olarak döner
    'quantity' => (int)$stone['quantity'],
    'color' => $stone['color'],
    'clarity' => $stone['clarity'],
    'cut' => $stone['cut']
];
```

**Frontend (admin/page.tsx:42-51):**
```typescript
interface ProductStone {
  id?: number;
  stone_type: string;
  carat: string;  // String olarak bekleniyor!
  quantity: number;
  color: string;
  clarity: string;
  cut: string;
}
```

**⚠️ POTANSİYEL SORUN:**
- API `carat` değerini DECIMAL/float olarak döndürüyor
- Frontend string bekliyor
- Ancak TypeScript'te bu otomatik string'e dönüşebilir

---

## 🐛 TESPİT EDİLEN SORUNLAR

### 1. ❌ BÜYÜK SORUN: PUT isteğinde `allowedFields` listesi eksik

**Dosya:** `api/products.php:217-223`

```php
$allowedFields = [
    'category_id', 'slug', 'name', 'subtitle', 'description',
    'main_image', 'banner_image', 'gallery_images',
    'gold_weight', 'gold_karat',
    'is_featured', 'sort_order', 'is_active'
];
```

**⚠️ PROBLEM:** Liste güncel ama `gold_weight` ve `gold_karat` string olarak gönderilirse doğru parse edilmiyor olabilir.

**Kontrol edilmeli:**
```php
// gold_weight ve gold_karat için özel işlem gerekebilir
if ($dbField === 'gold_weight' && $value !== '') {
    $value = str_replace(',', '.', $value);
    $value = floatval($value);
}
if ($dbField === 'gold_karat' && $value !== '') {
    $value = (int)$value;
}
```

### 2. ⚠️ UYARI: CSV Parse - Stones Array Format

**Dosya:** `src/app/admin/page.tsx:1132-1143`

CSV'den gelen stones_json:
```csv
"[{""stone_type"": ""Pırlanta"", ""carat"": ""1.51"", ...}]"
```

Parse ediliyor:
```typescript
const cleanedJson = stonesJson.replace(/""/g, '"');
stones = JSON.parse(cleanedJson);
```

**✅ DOĞRU** ama console.log eklenmiş debug için - production'da bu loglar kaldırılabilir.

### 3. ℹ️ BİLGİ: Bulk Upload - Stones Insertion

**Dosya:** `api/products-bulk.php:125-159`

```php
foreach ($product['stones'] as $stoneIndex => $stone) {
    $stoneCarat = null;
    if (isset($stone['carat']) && $stone['carat'] !== '') {
        $stoneCarat = str_replace(',', '.', $stone['carat']);
        $stoneCarat = floatval($stoneCarat);
    }
    // ...
}
```

**✅ DOĞRU:** Virgül formatını noktaya çeviriyor ve float'a dönüştürüyor.

---

## 🔧 ÖNERİLEN DÜZELTMELrecek

### 1. PUT İsteğinde gold_weight ve gold_karat İşleme Eklenmeli

**Şu anki kod HATALI OLABİLİR çünkü:**
- Frontend string gönderiyor: `"8.94"`, `"18"`
- Veritabanı DECIMAL ve INT bekliyor
- UPDATE sırasında dönüşüm yapılmıyor

### 2. Frontend ProductStone Interface - carat Tipi

**Seçenek 1:** API'yi değiştir - string döndür
**Seçenek 2:** Frontend'i değiştir - number kabul et (ÖNERİLEN)

---

## 📊 SONUÇ

### ✅ Çalışan Sistemler
- Temel CRUD işlemleri
- Kategori ilişkileri
- Görsel yönetimi
- Toplu ürün yükleme (CSV)
- Taş bilgileri ekleme (POST)

### ⚠️ Potansiyel Sorunlu Alanlar
1. **Ürün güncelleme (PUT)** - gold_weight ve gold_karat dönüşümü eksik
2. **Taş bilgileri güncellemede** - carat değeri string/number uyumsuzluğu
3. **Debug log'ları** - Production'da temizlenmeli

### 📝 Öncelikli Aksiyonlar
1. [ ] PUT metodunda gold_weight/gold_karat dönüşümü ekle
2. [ ] ProductStone.carat tipini `number | string` yap veya API'yi değiştir
3. [ ] Console.log'ları production build'de kaldır
4. [ ] Test: Ürün güncelleme ile taş bilgilerini değiştirme

---

**Rapor Tarihi:** 2026-01-26
**Kontrol Eden:** Claude Code
**Durum:** Çoğunlukla uyumlu, küçük iyileştirmeler gerekiyor
