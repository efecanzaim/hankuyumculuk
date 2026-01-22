# Görsel Yükleme Kurulum Rehberi

## 📋 Genel Bakış

Admin panelinden görsel yüklerken iki mod desteklenir:
- **Development Modu**: API_URL tanımlı değilse → Görseller base64 olarak kaydedilir
- **Production Modu**: API_URL tanımlıysa → Görseller `public/images/` klasörüne kaydedilir

## 🚀 Development Modu (Local)

### Seçenek 1: Base64 Kullanımı (Varsayılan)
- `.env.local` dosyası yoksa veya `NEXT_PUBLIC_API_URL` tanımlı değilse
- Görseller base64 olarak kaydedilir
- **Avantaj**: Kurulum gerektirmez
- **Dezavantaj**: localStorage quota'sını aşabilir, görseller klasöre kaydedilmez

### Seçenek 2: Local PHP Server (Önerilen)

1. **PHP'nin yüklü olduğundan emin olun**
   ```bash
   php -v
   ```

2. **Local PHP server'ı başlatın** (proje kök dizininde)
   ```bash
   php -S localhost:8000 -t .
   ```

3. **`.env.local` dosyası oluşturun** (proje kök dizininde)
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Next.js dev server'ı yeniden başlatın**
   ```bash
   npm run dev
   ```

Artık development modunda da görseller `public/images/` klasörüne kaydedilecek!

## 🌐 Production Modu (Hosting)

1. **Hosting'e dosyaları yükleyin**
   - `api/` klasörünü hosting'e yükleyin
   - `public/images/` klasörünün yazılabilir olduğundan emin olun (chmod 755 veya 775)

2. **`.env.local` dosyasını production için güncelleyin**
   ```env
   NEXT_PUBLIC_API_URL=https://yourdomain.com
   ```

3. **Next.js build alın**
   ```bash
   npm run build
   ```

4. **Build çıktısını hosting'e yükleyin**

## ✅ Kontrol Listesi

### Development
- [ ] PHP yüklü mü? (`php -v`)
- [ ] Local PHP server çalışıyor mu? (`php -S localhost:8000`)
- [ ] `.env.local` dosyası var mı ve doğru mu?
- [ ] Next.js dev server yeniden başlatıldı mı?

### Production
- [ ] `api/` klasörü hosting'de mi?
- [ ] `public/images/` klasörü yazılabilir mi? (chmod 755)
- [ ] `.env.local` dosyasında doğru domain var mı?
- [ ] Next.js build alındı mı?

## 🔍 Sorun Giderme

### Görseller kaydedilmiyor
1. Browser console'u açın (F12)
2. Yükleme sırasında hata mesajlarını kontrol edin
3. `API_URL` değerini kontrol edin: `console.log(process.env.NEXT_PUBLIC_API_URL)`

### Klasör izinleri hatası
```bash
# Hosting'de (SSH ile)
chmod -R 755 public/images/
chown -R www-data:www-data public/images/
```

### PHP server çalışmıyor
- Port 8000 kullanımda olabilir, farklı port deneyin:
  ```bash
  php -S localhost:8001 -t .
  ```
- `.env.local` dosyasını da güncelleyin:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8001
  ```

## 📝 Notlar

- Development modunda base64 kullanmak istiyorsanız `.env.local` dosyasını oluşturmayın veya `NEXT_PUBLIC_API_URL` tanımlamayın
- Production'da mutlaka `NEXT_PUBLIC_API_URL` tanımlı olmalı
- Görseller `public/images/{folder}/` klasörüne kaydedilir
- Her görsel benzersiz bir isimle kaydedilir: `{timestamp}_{random}_{safeName}.{ext}`

