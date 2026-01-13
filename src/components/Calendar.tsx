"use client";

import { useState, useEffect } from "react";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  bookedDates?: string[]; // Format: "YYYY-MM-DD"
  minDate?: Date;
}

const DAYS_TR = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTHS_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

export default function Calendar({ 
  selectedDate, 
  onDateSelect, 
  bookedDates = [],
  minDate = new Date()
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<(Date | null)[]>([]);

  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth]);

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of week (0 = Sunday, adjust for Monday start)
    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1; // Convert to Monday = 0
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    setCalendarDays(days);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    
    // Disable Sundays (day 0)
    if (date.getDay() === 0) return true;
    
    // Check if date is before minDate
    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      if (date < min) return true;
    }
    
    return false;
  };

  const isDateFullyBooked = (date: Date) => {
    const dateStr = formatDateString(date);
    return bookedDates.includes(dateStr);
  };

  const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return formatDateString(date) === formatDateString(selectedDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDateString(date) === formatDateString(today);
  };

  const canGoPrevious = () => {
    const today = new Date();
    return currentMonth.getMonth() > today.getMonth() || 
           currentMonth.getFullYear() > today.getFullYear();
  };

  return (
    <div className="bg-white border border-[#e0e0e0] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious()}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            canGoPrevious() 
              ? 'hover:bg-[#f5f5f5] text-[#2f3237]' 
              : 'text-[#e0e0e0] cursor-not-allowed'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h3 
          className="text-[18px] text-[#2f3237] font-medium"
          style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
        >
          {MONTHS_TR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] text-[#2f3237] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_TR.map((day, index) => (
          <div 
            key={day}
            className={`text-center text-[12px] font-medium py-2 ${
              index === 6 ? 'text-[#e0e0e0]' : 'text-[#2f3237]/60'
            }`}
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-10" />;
          }

          const disabled = isDateDisabled(date);
          const fullyBooked = isDateFullyBooked(date);
          const selected = isSelected(date);
          const today = isToday(date);

          return (
            <button
              key={formatDateString(date)}
              onClick={() => !disabled && !fullyBooked && onDateSelect(date)}
              disabled={disabled || fullyBooked}
              className={`
                h-10 rounded-full text-[14px] transition-all duration-200
                ${selected 
                  ? 'bg-[#2f3237] text-white' 
                  : today 
                    ? 'bg-primary/30 text-[#2f3237]' 
                    : disabled || fullyBooked
                      ? 'text-[#e0e0e0] cursor-not-allowed'
                      : 'text-[#2f3237] hover:bg-[#f5f5f5]'
                }
                ${fullyBooked && !disabled ? 'line-through' : ''}
              `}
              style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[#e0e0e0]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary/30" />
          <span 
            className="text-[12px] text-[#2f3237]/60"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Bugün
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2f3237]" />
          <span 
            className="text-[12px] text-[#2f3237]/60"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Seçili
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-[12px] text-[#e0e0e0] line-through"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            00
          </span>
          <span 
            className="text-[12px] text-[#2f3237]/60"
            style={{ fontFamily: 'var(--font-bw-modelica), sans-serif' }}
          >
            Dolu
          </span>
        </div>
      </div>
    </div>
  );
}

