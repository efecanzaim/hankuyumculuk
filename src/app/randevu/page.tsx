"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import { useContent } from "@/hooks/useContent";
import { getAssetPath } from "@/utils/paths";

// Google Apps Script URL - .env dosyasından veya doğrudan buraya yazın
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

// Varsayılan saat slotları (11:00-16:00, 1 saatlik aralıklar)
const DEFAULT_TIME_SLOTS = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

interface TimeSlot {
  time: string;
  available: boolean;
}

function RandevuContent() {
  const content = useContent();
  const searchParams = useSearchParams();
  const subjectFromUrl = searchParams.get('subject');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjectFromUrl || "diger",
    message: "",
  });
  
  // URL'den gelen subject değiştiğinde formu güncelle
  useEffect(() => {
    if (subjectFromUrl) {
      setFormData(prev => ({ ...prev, subject: subjectFromUrl }));
    }
  }, [subjectFromUrl]);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1); // 1: Tarih/Saat, 2: Bilgiler

  const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Seçilen tarih için müsait saatleri getir (Google Apps Script'ten)
  const fetchAvailableSlots = useCallback(async (date: Date) => {
    setIsLoadingSlots(true);
    setSelectedTime(null);
    
    try {
      const dateStr = formatDateString(date);
      
      // Google Apps Script URL varsa, oradan al
      if (GOOGLE_SCRIPT_URL) {
        const scriptUrl = `${GOOGLE_SCRIPT_URL}?action=getAvailableTimeSlots&date=${dateStr}`;
        const response = await fetch(scriptUrl);
        const data = await response.json();
        
        if (data.availableSlots && Array.isArray(data.availableSlots)) {
          // Google Script'ten gelen müsait saatler
          const slots = DEFAULT_TIME_SLOTS.map(time => ({
            time,
            available: data.availableSlots.includes(time)
          }));
          setAvailableSlots(slots);
          return;
        }
      }
      
      // Google Script yoksa veya hata olduysa, tüm saatleri müsait göster
      setAvailableSlots(DEFAULT_TIME_SLOTS.map(time => ({
        time,
        available: true
      })));
      
    } catch (error) {
      console.error('Müsait saatler alınamadı:', error);
      // Hata durumunda varsayılan slotları göster (11:00-16:00 çalışma saatleri)
      setAvailableSlots(DEFAULT_TIME_SLOTS.map(time => ({
        time,
        available: true
      })));
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  // Tarih seçildiğinde
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    fetchAvailableSlots(date);
  };

  // Saat seçildiğinde
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Sonraki adıma geç
  const handleNextStep = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };

  // Önceki adıma dön
  const handlePrevStep = () => {
    setStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      setSubmitError('Lütfen tarih ve saat seçin');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Tarih ve saati ISO formatına çevir
      const dateStr = formatDateString(selectedDate);
      const dateTime = `${dateStr}T${selectedTime}:00`;
      
      if (GOOGLE_SCRIPT_URL) {
        // Google Apps Script'e GET ile gönder (CORS için)
        const params = new URLSearchParams({
          action: 'createAppointment',
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          dateTime: dateTime,
          message: formData.message || '',
        });

        const scriptUrl = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
        const response = await fetch(scriptUrl);
        const data = await response.json();
        
        if (data.success) {
          setIsSubmitted(true);
        } else {
          // Çakışma kontrolü
          if (data.conflict) {
            setSubmitError('Bu saat için zaten bir randevu var. Lütfen başka bir saat seçin.');
            // Saatleri yeniden yükle
            fetchAvailableSlots(selectedDate);
          } else {
            setSubmitError(data.message || 'Bir hata oluştu');
          }
        }
      } else {
        // Google Script URL yoksa demo mod
        console.log('Demo mod - Randevu bilgileri:', {
          ...formData,
          dateTime,
        });
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form gönderilirken hata:', error);
      setSubmitError('Bir hata oluştu, lütfen tekrar deneyin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const MONTHS_TR = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const DAYS_FULL_TR = [
    "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"
  ];

  const formatDisplayDate = (date: Date) => {
    const day = date.getDate();
    const month = MONTHS_TR[date.getMonth()];
    const dayName = DAYS_FULL_TR[date.getDay()];
    return `${day} ${month}, ${dayName}`;
  };

  return (
    <>
      <TopBanner
        text={content.topBanner.text}
        visible={content.topBanner.visible}
      />
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isTransparent={true}
      />
      
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src={getAssetPath("/images/categories/ozel-tasarim-card.jpg")}
              alt="Randevu"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <p 
              className="text-[14px] tracking-[0.3em] text-white/60 mb-4 uppercase"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              Han Kuyumculuk
            </p>
            <h1 
              className="text-[44px] md:text-[60px] leading-[1.1] text-white mb-6"
              style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
            >
              Randevu Oluşturun
            </h1>
            <p 
              className="text-[16px] md:text-[18px] leading-[1.6] text-white/80 font-light max-w-[500px] mx-auto"
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              Özel tasarım süreciniz için bir adım atın.
              Size uygun bir zamanda buluşalım.
            </p>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-[60px] md:py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            
            {isSubmitted ? (
              /* Success Message */
              <div className="max-w-[600px] mx-auto text-center py-16">
                <div className="w-[100px] h-[100px] rounded-full bg-primary flex items-center justify-center mx-auto mb-8">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#2f3237" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 
                  className="text-[36px] md:text-[44px] text-[#2f3237] mb-6"
                  style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                >
                  Teşekkür Ederiz
                </h2>
                <p 
                  className="text-[18px] text-[#2f3237]/70 font-light mb-4"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  Randevu talebiniz başarıyla alındı.
                </p>
                {selectedDate && selectedTime && (
                  <div className="bg-[#f5f5f5] p-6 rounded-sm inline-block mb-8">
                    <p 
                      className="text-[16px] text-[#2f3237] font-medium"
                      style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                    >
                      {formatDisplayDate(selectedDate)} - {selectedTime}
                    </p>
                  </div>
                )}
                <p 
                  className="text-[16px] text-[#2f3237]/60 font-light"
                  style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                >
                  En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              </div>
            ) : (
              <>
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-12">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-3 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] ${
                        step === 1 ? 'bg-[#2f3237] text-white' : 'bg-primary text-[#2f3237]'
                      }`}
                        style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                      >
                        1
                      </div>
                      <span 
                        className="text-[14px] text-[#2f3237] hidden sm:inline"
                        style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                      >
                        Tarih & Saat
                      </span>
                    </div>
                    
                    <div className="w-[60px] h-px bg-[#e0e0e0]" />
                    
                    <div className={`flex items-center gap-3 ${step === 2 ? 'opacity-100' : 'opacity-50'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] ${
                        step === 2 ? 'bg-[#2f3237] text-white' : 'bg-[#e0e0e0] text-[#2f3237]'
                      }`}
                        style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                      >
                        2
                      </div>
                      <span 
                        className="text-[14px] text-[#2f3237] hidden sm:inline"
                        style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                      >
                        Bilgileriniz
                      </span>
                    </div>
                  </div>
                </div>

                {step === 1 ? (
                  /* Step 1: Date & Time Selection */
                  <>
                    <div className="text-center mb-10">
                      <h2 
                        className="text-[28px] md:text-[36px] text-[#2f3237] mb-4"
                        style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                      >
                        Tarih ve Saat Seçin
                      </h2>
                      <p 
                        className="text-[16px] text-[#2f3237]/60 font-light"
                        style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                      >
                        Size uygun olan gün ve saati belirleyin
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[900px] mx-auto">
                      {/* Calendar */}
                      <div>
                        <Calendar
                          selectedDate={selectedDate}
                          onDateSelect={handleDateSelect}
                          bookedDates={bookedDates}
                        />
                      </div>

                      {/* Time Slots */}
                      <div>
                        <TimeSlots
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onTimeSelect={handleTimeSelect}
                          availableSlots={availableSlots}
                          isLoading={isLoadingSlots}
                        />
                      </div>
                    </div>

                    {/* Next Button */}
                    <div className="max-w-[900px] mx-auto mt-8">
                      <button
                        onClick={handleNextStep}
                        disabled={!selectedDate || !selectedTime}
                        className={`w-full h-[55px] text-[14px] tracking-widest transition-colors flex items-center justify-center gap-2 ${
                          selectedDate && selectedTime
                            ? 'bg-[#2f3237] text-light hover:bg-[#1a1c1f]'
                            : 'bg-[#e0e0e0] text-[#999] cursor-not-allowed'
                        }`}
                        style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                      >
                        DEVAM ET
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  /* Step 2: Contact Information */
                  <>
                    <div className="text-center mb-10">
                      <h2 
                        className="text-[28px] md:text-[36px] text-[#2f3237] mb-4"
                        style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                      >
                        Bilgilerinizi Girin
                      </h2>
                      {selectedDate && selectedTime && (
                        <div className="inline-flex items-center gap-2 bg-[#f5f5f5] px-4 py-2 rounded-sm">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#2f3237" strokeWidth="1.5"/>
                            <path d="M3 10H21" stroke="#2f3237" strokeWidth="1.5"/>
                            <path d="M8 2V6" stroke="#2f3237" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M16 2V6" stroke="#2f3237" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          <span 
                            className="text-[14px] text-[#2f3237]"
                            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                          >
                            {formatDisplayDate(selectedDate)} - {selectedTime}
                          </span>
                          <button
                            onClick={handlePrevStep}
                            className="text-primary hover:text-[#2f3237] transition-colors ml-2"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 3L21 3L21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M21 3L13 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M10 14L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M3 15L3 21L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="max-w-[600px] mx-auto">
                      <div className="bg-[#f5f5f5] p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Name */}
                          <div>
                            <label 
                              className="block text-[14px] text-[#2f3237] mb-2"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            >
                              Adınız Soyadınız *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full h-[50px] px-4 bg-white border border-[#e0e0e0] text-[#2f3237] text-[15px] focus:outline-none focus:border-[#2f3237] transition-colors"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            />
                          </div>

                          {/* Email */}
                          <div>
                            <label 
                              className="block text-[14px] text-[#2f3237] mb-2"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            >
                              E-posta *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full h-[50px] px-4 bg-white border border-[#e0e0e0] text-[#2f3237] text-[15px] focus:outline-none focus:border-[#2f3237] transition-colors"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            />
                          </div>

                          {/* Phone */}
                          <div>
                            <label 
                              className="block text-[14px] text-[#2f3237] mb-2"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            >
                              Telefon *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              placeholder="+90 5XX XXX XX XX"
                              className="w-full h-[50px] px-4 bg-white border border-[#e0e0e0] text-[#2f3237] text-[15px] focus:outline-none focus:border-[#2f3237] transition-colors placeholder:text-[#2f3237]/40"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            />
                          </div>

                          {/* Subject */}
                          <div>
                            <label 
                              className="block text-[14px] text-[#2f3237] mb-2"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            >
                              Konu
                            </label>
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full h-[50px] px-4 bg-white border border-[#e0e0e0] text-[#2f3237] text-[15px] focus:outline-none focus:border-[#2f3237] transition-colors appearance-none"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            >
                              <option value="mucevher">Mücevher</option>
                              <option value="koleksiyon">Koleksiyon</option>
                              <option value="size-ozel">Size Özel</option>
                              <option value="hediye">Hediye</option>
                              <option value="erkeklere-ozel">Erkeklere Özel</option>
                              <option value="preloved">Preloved</option>
                              <option value="diger">Diğer</option>
                            </select>
                          </div>

                          {/* Message */}
                          <div>
                            <label 
                              className="block text-[14px] text-[#2f3237] mb-2"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            >
                              Mesajınız (Opsiyonel)
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={4}
                              placeholder="Hayalinizdeki tasarımı, bir hatırayı veya özel bir isteği paylaşabilirsiniz..."
                              className="w-full px-4 py-3 bg-white border border-[#e0e0e0] text-[#2f3237] text-[15px] focus:outline-none focus:border-[#2f3237] transition-colors resize-none placeholder:text-[#2f3237]/40"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            />
                          </div>

                          {/* Error Message */}
                          {submitError && (
                            <div className="p-4 bg-[#fff5f5] border border-[#ffdddd] rounded-sm">
                              <p 
                                className="text-[14px] text-[#c44] text-center"
                                style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                              >
                                {submitError}
                              </p>
                            </div>
                          )}

                          {/* Buttons */}
                          <div className="flex gap-4 pt-4">
                            <button
                              type="button"
                              onClick={handlePrevStep}
                              className="flex-1 h-[55px] border border-[#2f3237] text-[#2f3237] text-[14px] tracking-widest hover:bg-[#2f3237] hover:text-white transition-colors flex items-center justify-center gap-2"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              GERİ
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-2 h-[55px] bg-[#2f3237] text-light text-[14px] tracking-widest hover:bg-[#1a1c1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  GÖNDERİLİYOR
                                </>
                              ) : (
                                "RANDEVU OLUŞTURUN"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>

        {/* Info Section */}
        {!isSubmitted && (
          <section className="py-[60px] md:py-[80px] bg-[#f5f5f5]">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Location */}
                <div className="text-center">
                  <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#2f3237" strokeWidth="1.5"/>
                      <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#2f3237" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <h3 
                    className="text-[18px] text-[#2f3237] font-medium mb-2"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    Mağazamız
                  </h3>
                  <p 
                    className="text-[15px] text-[#2f3237]/60 font-light"
                    style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                  >
                    Liman Mahallesi, Akdeniz Bulvarı<br />
                    No: 257 Fenix Center, Konyaaltı/Antalya
                  </p>
                </div>

                {/* Phone */}
                <div className="text-center">
                  <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22 20.4704 21.7804 20.9992 21.3899 21.3899C20.9992 21.7804 20.4704 22 19.92 22C15.4 21.62 11.07 20 7.47 17.33C4.37 15.01 1.98 12.01 0.49 8.53C-0.01 7.47 -0.01 6.25 0.49 5.19C0.86 4.32 1.47 3.58 2.25 3.05C3.03 2.52 3.94 2.22 4.88 2.19C5.23 2.17 5.57 2.3 5.82 2.55C6.07 2.8 6.2 3.14 6.18 3.49L6.68 8.46C6.72 8.88 6.57 9.29 6.27 9.59L4.81 11.05C6.4 13.91 8.68 16.29 11.46 18L12.92 16.54C13.22 16.24 13.63 16.09 14.05 16.13L19.02 16.63C19.37 16.61 19.71 16.74 19.96 16.99C20.21 17.24 20.34 17.58 20.32 17.93" stroke="#2f3237" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 
                    className="text-[18px] text-[#2f3237] font-medium mb-2"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    Telefon
                  </h3>
                  <p 
                    className="text-[15px] text-[#2f3237]/60 font-light"
                    style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                  >
                    +90 212 123 45 67
                  </p>
                </div>

                {/* Hours */}
                <div className="text-center">
                  <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#2f3237" strokeWidth="1.5"/>
                      <path d="M12 6V12L16 14" stroke="#2f3237" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 
                    className="text-[18px] text-[#2f3237] font-medium mb-2"
                    style={{ fontFamily: 'var(--font-faculty-glyphic), serif' }}
                  >
                    Çalışma Saatleri
                  </h3>
                  <p 
                    className="text-[15px] text-[#2f3237]/60 font-light"
                    style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
                  >
                    Haftanın Her Günü: 10:00 - 20:00
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        description={content.footer.description}
        columns={content.footer.columns}
        copyright={content.footer.copyright}
        socialLinks={content.footer.socialLinks}
      />
    </>
  );
}

export default function RandevuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2f3237] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <RandevuContent />
    </Suspense>
  );
}
