"use client";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotsProps {
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  availableSlots: TimeSlot[];
  isLoading?: boolean;
  selectedDate: Date | null;
  locale?: 'tr' | 'en' | 'ru';
}

const MONTHS: Record<string, string[]> = {
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
};

const DAYS_FULL: Record<string, string[]> = {
  tr: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  ru: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
};

const LABELS: Record<string, {
  selectDateFirst: string;
  loading: string;
  selectedDateLabel: string;
  availableCount: (n: number) => string;
  noSlots: string;
  selectAnother: string;
  appointmentFor: (date: string, time: string) => string;
}> = {
  tr: {
    selectDateFirst: "Lütfen önce bir tarih seçin",
    loading: "Müsait saatler yükleniyor...",
    selectedDateLabel: "Seçilen Tarih",
    availableCount: (n) => `${n} müsait saat`,
    noSlots: "Bu tarihte müsait saat bulunmamaktadır.\nLütfen başka bir tarih seçin.",
    selectAnother: "Lütfen başka bir tarih seçin.",
    appointmentFor: (date, time) => `${date} tarihinde ${time} saati için randevu alacaksınız.`,
  },
  en: {
    selectDateFirst: "Please select a date first",
    loading: "Loading available times...",
    selectedDateLabel: "Selected Date",
    availableCount: (n) => `${n} available slot${n !== 1 ? 's' : ''}`,
    noSlots: "No available times on this date.\nPlease select another date.",
    selectAnother: "Please select another date.",
    appointmentFor: (date, time) => `You are booking an appointment on ${date} at ${time}.`,
  },
  ru: {
    selectDateFirst: "Пожалуйста, сначала выберите дату",
    loading: "Загрузка доступного времени...",
    selectedDateLabel: "Выбранная дата",
    availableCount: (n) => `${n} свободных слота`,
    noSlots: "На эту дату нет доступного времени.\nПожалуйста, выберите другую дату.",
    selectAnother: "Пожалуйста, выберите другую дату.",
    appointmentFor: (date, time) => `Вы записываетесь на приём ${date} в ${time}.`,
  },
};

export default function TimeSlots({
  selectedTime,
  onTimeSelect,
  availableSlots,
  isLoading = false,
  selectedDate,
  locale = 'tr',
}: TimeSlotsProps) {
  const months = MONTHS[locale] ?? MONTHS.tr;
  const daysFull = DAYS_FULL[locale] ?? DAYS_FULL.tr;
  const labels = LABELS[locale] ?? LABELS.tr;

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    const day = selectedDate.getDate();
    const month = months[selectedDate.getMonth()];
    const dayName = daysFull[selectedDate.getDay()];
    return `${day} ${month}, ${dayName}`;
  };

  if (!selectedDate) {
    return (
      <div className="bg-white border border-[#e0e0e0] p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-4 text-[#e0e0e0]"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p
            className="text-[15px] text-[#2f3237]/50"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {labels.selectDateFirst}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white border border-[#e0e0e0] p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-primary mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p
            className="text-[15px] text-[#2f3237]/50"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {labels.loading}
          </p>
        </div>
      </div>
    );
  }

  const availableCount = availableSlots.filter(slot => slot.available).length;

  return (
    <div className="bg-white border border-[#e0e0e0] p-6">
      {/* Header */}
      <div className="mb-6">
        <p
          className="text-[14px] text-[#2f3237]/60 mb-1"
          style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
        >
          {labels.selectedDateLabel}
        </p>
        <h3
          className="text-[18px] text-[#2f3237] font-medium"
          style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
        >
          {formatSelectedDate()}
        </h3>
        <p
          className="text-[13px] text-primary mt-2"
          style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
        >
          {labels.availableCount(availableCount)}
        </p>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-2 gap-3">
        {availableSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onTimeSelect(slot.time)}
            disabled={!slot.available}
            className={`
              h-[50px] border rounded-sm text-[15px] transition-all duration-200
              ${selectedTime === slot.time
                ? 'bg-[#2f3237] border-[#2f3237] text-white'
                : slot.available
                  ? 'bg-white border-[#e0e0e0] text-[#2f3237] hover:border-[#2f3237]'
                  : 'bg-[#f5f5f5] border-[#e0e0e0] text-[#c0c0c0] cursor-not-allowed line-through'
              }
            `}
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {/* No Available Slots */}
      {availableCount === 0 && (
        <div className="mt-6 p-4 bg-[#fff5f5] border border-[#ffdddd] rounded-sm">
          <p
            className="text-[14px] text-[#c44] text-center whitespace-pre-line"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {labels.noSlots}
          </p>
        </div>
      )}

      {/* Selected Time Info */}
      {selectedTime && (
        <div className="mt-6 p-4 bg-[#f5f5f5] rounded-sm">
          <p
            className="text-[14px] text-[#2f3237]/60 text-center"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {labels.appointmentFor(formatSelectedDate(), selectedTime)}
          </p>
        </div>
      )}
    </div>
  );
}
