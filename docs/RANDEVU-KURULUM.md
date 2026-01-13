# Randevu Sistemi Kurulum Rehberi

## Mevcut Google Apps Script'inizi Kullanma

Zaten çalışan bir Google Apps Script'iniz var. Sadece birkaç adım yapmanız yeterli:

---

## ADIM 1: Google Apps Script URL'sini Alın

1. Google Apps Script projenize gidin: https://script.google.com
2. Projenizi açın (randevu scripti)
3. Sağ üstten **Dağıt** > **Dağıtımları yönet** seçin
4. Aktif dağıtımın **Web uygulaması URL'sini** kopyalayın

   URL şuna benzer olmalı:
   ```
   https://script.google.com/macros/s/AKfycbw.../exec
   ```

---

## ADIM 2: Environment Variable Oluşturun

1. Proje klasöründe `.env.local` adında bir dosya oluşturun:
   ```
   C:\Users\demas\Desktop\hankuyumculuk\.env.local
   ```

2. İçine şunu yazın (URL'yi kendinizinkiyle değiştirin):
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

---

## ADIM 3: Çalışma Saatlerini Kontrol Edin

Sizin scriptinizde çalışma saatleri şöyle ayarlı:
```javascript
const WORK_HOURS = {
  start: 11, // 11:00
  end: 16,   // 16:00
};
```

Bu, saat slotlarının **11:00, 12:00, 13:00, 14:00, 15:00, 16:00** olacağı anlamına gelir.

Değiştirmek isterseniz scriptinizde `WORK_HOURS` değişkenini güncelleyin.

---

## ADIM 4: Development Server'ı Yeniden Başlatın

Environment variable'lar değiştiğinde server'ı yeniden başlatmanız gerekir:

```bash
# Terminal'i durdurun (Ctrl+C)
# Tekrar başlatın:
npm run dev
```

---

## ADIM 5: Test Edin

1. http://localhost:3000/randevu adresine gidin
2. Takvimden bir tarih seçin
3. Müsait saatlerin Google Calendar'dan geldiğini doğrulayın
4. Bir randevu oluşturun
5. Google Calendar'ınızı kontrol edin - randevu görünmeli!

---

## Sorun Giderme

### "Demo mod" yazıyorsa:
- `.env.local` dosyasının doğru yerde olduğundan emin olun
- URL'nin doğru olduğunu kontrol edin
- Server'ı yeniden başlatın

### Saatler görünmüyorsa:
- Google Apps Script'in dağıtımının aktif olduğunu kontrol edin
- Script'te Calendar API'nin etkin olduğundan emin olun
- Browser console'da hata olup olmadığını kontrol edin (F12)

### Randevu oluşturulmuyor:
- Google Calendar ID'nin doğru olduğunu kontrol edin
- Script'in Calendar'a yazma izni olduğundan emin olun
- Script'i yeniden dağıtın

---

## Ek Notlar

### Calendar ID Değiştirme
Scriptinizde şu satırı bulun:
```javascript
const CALENDAR_ID = '7e00447cce07ec3c77b5899dafb14cf23a6f1631a8f315230a837db2d81ee0da@group.calendar.google.com';
```

Bunu kendi takvim ID'nizle değiştirin:
- `'primary'` = Varsayılan takviminiz
- Özel takvim için: Google Calendar > Ayarlar > Takvim Ayarları > Takvim ID

### Randevu Süresi
Varsayılan 60 dakika. Değiştirmek için:
```javascript
const APPOINTMENT_DURATION = 60; // dakika
```

### Script Güncelleme Sonrası
Script'te değişiklik yaptıktan sonra:
1. **Dağıt** > **Yeni dağıtım** seçin
2. Yeni URL'yi `.env.local` dosyasına kopyalayın
3. Server'ı yeniden başlatın

