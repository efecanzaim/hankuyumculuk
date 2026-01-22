# Han Kuyumculuk - Kurulum Rehberi (Natro / cPanel)

## 📋 Genel Bakış

Bu proje **Node.js gerektirmez**. Static HTML/CSS/JS + PHP API kullanır.

```
┌─────────────────────────────────────────────────────────┐
│                    Natro Hosting                        │
│  ┌─────────────────┐     ┌─────────────────────────┐   │
│  │  Static Files   │     │      PHP API            │   │
│  │  (Next.js out)  │────►│  (api/*.php)            │   │
│  │  HTML/CSS/JS    │     │         │               │   │
│  └─────────────────┘     │         ▼               │   │
│                          │  ┌─────────────────┐    │   │
│                          │  │     MySQL       │    │   │
│                          │  │   Veritabanı    │    │   │
│                          │  └─────────────────┘    │   │
│                          └─────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Adım 1: Veritabanı Oluşturma

### cPanel'de:
1. **MySQL Veritabanları** bölümüne gidin
2. Yeni veritabanı oluşturun: `hankuyumculuk`
3. Yeni kullanıcı oluşturun (güçlü şifre)
4. Kullanıcıyı veritabanına ekleyin → **TÜM YETKİLER**

### phpMyAdmin'de:
1. **phpMyAdmin** açın
2. Sol menüden veritabanınızı seçin
3. **SQL** sekmesine tıklayın
4. `database/schema.sql` dosyasının içeriğini yapıştırın
5. **Git** butonuna basın

---

## 🚀 Adım 2: Projeyi Derleme (Build)

Bilgisayarınızda terminalde:

```bash
cd C:\Users\demas\Desktop\hankuyumculuk
npm run build
```

Bu komut `out` klasörü oluşturur - tüm static dosyalar burada.

---

## 🚀 Adım 3: Dosyaları Yükleme

### FTP veya File Manager ile:

1. **`out/` klasörünün İÇİNDEKİLERİ** → `public_html/` (veya ana dizin)
2. **`api/` klasörü** → `public_html/api/`
3. **`images/` klasörü** → `public_html/images/` (zaten `out/images` içinde olacak)

### Dosya Yapısı (Hosting):
```
public_html/
├── api/
│   ├── config.php      ← VERİTABANI BİLGİLERİNİ DÜZENLE!
│   ├── settings.php
│   ├── products.php
│   ├── categories.php
│   ├── hero-slides.php
│   ├── upload.php
│   └── content.php
├── images/
│   ├── products/
│   ├── hero-bg.jpg
│   └── ...
├── _next/
├── index.html
├── admin.html
└── ...
```

---

## 🚀 Adım 4: API Yapılandırması

**`public_html/api/config.php`** dosyasını düzenleyin:

```php
// Veritabanı bilgileri - BUNLARI DEĞİŞTİRİN
define('DB_HOST', 'localhost');
define('DB_USER', 'natrousername_dbuser');    // cPanel'deki tam kullanıcı adı
define('DB_PASS', 'gercek_sifreniz');         // Belirlediğiniz şifre
define('DB_NAME', 'natrousername_hankuyumculuk'); // cPanel'deki tam db adı
```

---

## 🚀 Adım 5: Test Etme

Tarayıcıda açın:
- `https://siteniz.com/api/settings.php` → JSON görmelisiniz
- `https://siteniz.com/api/content.php` → Tüm içerik
- `https://siteniz.com/admin` → Admin paneli

---

## 📁 API Endpoints

| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/api/settings.php` | GET | Tüm site ayarları |
| `/api/settings.php` | POST | Ayar güncelle |
| `/api/products.php` | GET | Ürünleri listele |
| `/api/products.php` | POST | Yeni ürün ekle |
| `/api/products.php` | PUT | Ürün güncelle |
| `/api/products.php?id=X` | DELETE | Ürün sil |
| `/api/categories.php` | GET | Kategorileri listele |
| `/api/categories.php` | PUT | Kategori güncelle |
| `/api/hero-slides.php` | GET/POST/PUT/DELETE | Slider yönetimi |
| `/api/upload.php` | POST | Görsel yükle |
| `/api/content.php` | GET | Tüm site içeriği (frontend için) |

---

## 🔧 Sorun Giderme

### "Access denied for user" hatası
- `config.php`'deki kullanıcı adı ve şifreyi kontrol edin
- cPanel'de kullanıcının veritabanına eklendiğinden emin olun

### "Unknown database" hatası
- Veritabanı adının tam olduğundan emin olun (örn: `natro1234_hankuyumculuk`)

### CORS hatası
- `config.php` dosyasında CORS header'ları zaten ayarlı

### 500 Internal Server Error
- PHP hata loglarını kontrol edin (cPanel → Error Log)
- `config.php` syntax hatası olabilir

---

## 📱 Admin Paneli Kullanımı

1. `https://siteniz.com/admin` adresine gidin
2. Sol menüden düzenlemek istediğiniz bölümü seçin
3. Değişiklikleri yapın
4. **Kaydet** butonuna basın
5. Değişiklikler anında siteye yansır!

---

## 🔄 Güncellemeler

Site içeriğinde değişiklik yapmak için:
1. Admin panelini kullanın (önerilen)
2. Veya phpMyAdmin'den doğrudan veritabanını düzenleyin

Kod değişikliği için:
1. Bilgisayarınızda değişiklikleri yapın
2. `npm run build` çalıştırın
3. `out/` klasörünü tekrar yükleyin

---

**Sorularınız için:** Destek almak için iletişime geçin.
