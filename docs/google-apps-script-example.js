/**
 * HAN KUYUMCULUK - Randevu Sistemi
 * Google Apps Script Web App
 * 
 * KURULUM:
 * 1. Google Sheets'te yeni bir spreadsheet oluşturun
 * 2. Extensions > Apps Script'e gidin
 * 3. Bu kodu yapıştırın
 * 4. Deploy > New deployment seçin
 * 5. Type: Web app seçin
 * 6. Execute as: Me, Who has access: Anyone seçin
 * 7. Deploy'a tıklayın ve URL'yi kopyalayın
 * 8. Bu URL'yi projenizde .env.local dosyasına ekleyin:
 *    GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 */

// Spreadsheet ayarları
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Spreadsheet ID'nizi buraya girin
const APPOINTMENTS_SHEET = 'Randevular';

// Çalışma saatleri
const WORKING_HOURS = {
  start: 10, // 10:00
  end: 18,   // 18:00
  slotDuration: 60 // dakika
};

// Ana işleyici - GET istekleri
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getAvailableSlots') {
    return getAvailableSlots(e.parameter.date);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    error: 'Geçersiz istek'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Ana işleyici - POST istekleri
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'createAppointment') {
      return createAppointment(data.data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      error: 'Geçersiz işlem'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Müsait saatleri getir
function getAvailableSlots(dateStr) {
  const sheet = getOrCreateSheet();
  const bookedSlots = getBookedSlotsForDate(sheet, dateStr);
  
  const allSlots = generateTimeSlots();
  const slots = allSlots.map(time => ({
    time: time,
    available: !bookedSlots.includes(time)
  }));
  
  return ContentService.createTextOutput(JSON.stringify({
    date: dateStr,
    slots: slots
  })).setMimeType(ContentService.MimeType.JSON);
}

// Randevu oluştur
function createAppointment(data) {
  const sheet = getOrCreateSheet();
  
  // Çift rezervasyon kontrolü
  const bookedSlots = getBookedSlotsForDate(sheet, data.date);
  if (bookedSlots.includes(data.time)) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Bu saat zaten dolu. Lütfen başka bir saat seçin.'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Yeni randevu ekle
  const appointmentId = generateAppointmentId();
  const timestamp = new Date().toISOString();
  
  sheet.appendRow([
    appointmentId,
    timestamp,
    data.date,
    data.time,
    data.name,
    data.email,
    data.phone,
    data.subject,
    data.message || '',
    'Beklemede'
  ]);
  
  // E-posta bildirimi gönder (opsiyonel)
  sendNotificationEmail(data, appointmentId);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    appointmentId: appointmentId,
    message: 'Randevu başarıyla oluşturuldu'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Belirli bir tarih için dolu saatleri getir
function getBookedSlotsForDate(sheet, dateStr) {
  const data = sheet.getDataRange().getValues();
  const bookedSlots = [];
  
  // İlk satır başlık, atla
  for (let i = 1; i < data.length; i++) {
    const rowDate = data[i][2]; // Tarih sütunu
    const rowTime = data[i][3]; // Saat sütunu
    const status = data[i][9];  // Durum sütunu
    
    // İptal edilmiş randevuları sayma
    if (rowDate === dateStr && status !== 'İptal') {
      bookedSlots.push(rowTime);
    }
  }
  
  return bookedSlots;
}

// Saat slotları oluştur
function generateTimeSlots() {
  const slots = [];
  for (let hour = WORKING_HOURS.start; hour <= WORKING_HOURS.end; hour++) {
    // Öğle arası (13:00) hariç
    if (hour !== 13) {
      slots.push(hour.toString().padStart(2, '0') + ':00');
    }
  }
  return slots;
}

// Spreadsheet'i al veya oluştur
function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(APPOINTMENTS_SHEET);
  
  if (!sheet) {
    sheet = ss.insertSheet(APPOINTMENTS_SHEET);
    // Başlık satırı ekle
    sheet.appendRow([
      'ID',
      'Oluşturulma',
      'Tarih',
      'Saat',
      'Ad Soyad',
      'E-posta',
      'Telefon',
      'Konu',
      'Mesaj',
      'Durum'
    ]);
    
    // Başlık satırını formatla
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

// Benzersiz randevu ID'si oluştur
function generateAppointmentId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'HAN-';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// E-posta bildirimi gönder
function sendNotificationEmail(data, appointmentId) {
  try {
    // Mağaza sahibine bildirim
    const ownerEmail = 'info@hankuyumculuk.com'; // Mağaza e-posta adresi
    
    const ownerSubject = `Yeni Randevu: ${data.name} - ${data.date} ${data.time}`;
    const ownerBody = `
Yeni bir randevu talebi alındı:

Randevu ID: ${appointmentId}
Ad Soyad: ${data.name}
E-posta: ${data.email}
Telefon: ${data.phone}
Tarih: ${data.date}
Saat: ${data.time}
Konu: ${data.subject}
Mesaj: ${data.message || 'Belirtilmedi'}

---
Han Kuyumculuk Randevu Sistemi
    `;
    
    MailApp.sendEmail(ownerEmail, ownerSubject, ownerBody);
    
    // Müşteriye onay e-postası
    const customerSubject = 'Randevu Talebiniz Alındı - Han Kuyumculuk';
    const customerBody = `
Sayın ${data.name},

Randevu talebiniz başarıyla alınmıştır.

Randevu Detayları:
- Randevu No: ${appointmentId}
- Tarih: ${data.date}
- Saat: ${data.time}
- Konu: ${data.subject}

Adresimiz:
Nuruosmaniye Caddesi No:45, Fatih, İstanbul

Randevunuzu onaylamak için sizinle en kısa sürede iletişime geçeceğiz.

Sevgilerimizle,
Han Kuyumculuk
    `;
    
    MailApp.sendEmail(data.email, customerSubject, customerBody);
  } catch (error) {
    console.error('E-posta gönderilirken hata:', error);
  }
}

// Test fonksiyonu
function testGetSlots() {
  const result = getAvailableSlots('2026-01-15');
  Logger.log(result.getContent());
}

function testCreateAppointment() {
  const testData = {
    name: 'Test Kullanıcı',
    email: 'test@example.com',
    phone: '+90 555 123 4567',
    date: '2026-01-15',
    time: '14:00',
    subject: 'ozel-tasarim',
    message: 'Test mesajı'
  };
  
  const result = createAppointment(testData);
  Logger.log(result.getContent());
}

