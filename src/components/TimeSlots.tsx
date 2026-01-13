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
}

const MONTHS_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const DAYS_FULL_TR = [
  "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"
];

export default function TimeSlots({
  selectedTime,
  onTimeSelect,
  availableSlots,
  isLoading = false,
  selectedDate
}: TimeSlotsProps) {
  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    const day = selectedDate.getDate();
    const month = MONTHS_TR[selectedDate.getMonth()];
    const dayName = DAYS_FULL_TR[selectedDate.getDay()];
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
            Lütfen önce bir tarih seçin
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
            Müsait saatler yükleniyor...
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
          Seçilen Tarih
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
          {availableCount} müsait saat
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
            className="text-[14px] text-[#c44] text-center"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Bu tarihte müsait saat bulunmamaktadır.<br />
            Lütfen başka bir tarih seçin.
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
            <span className="font-medium text-[#2f3237]">{formatSelectedDate()}</span> tarihinde{" "}
            <span className="font-medium text-[#2f3237]">{selectedTime}</span> saati için randevu alacaksınız.
          </p>
        </div>
      )}
    </div>
  );
}

