import React, { useMemo, useRef, useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";

const toDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const fromDateInputValue = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDateLabel = (value, options) => {
  return new Intl.DateTimeFormat("en-US", options).format(
    fromDateInputValue(value)
  );
};

const SlotPicker = ({ onNext }) => {
  const todayValue = useMemo(() => toDateInputValue(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(todayValue);
  const [selectedTime, setSelectedTime] = useState(null);
  const calendarInputRef = useRef(null);

  const fee = "Rs. 900";
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const value = toDateInputValue(date);

      return {
        value,
        weekday: formatDateLabel(value, { weekday: "short" }),
        day: formatDateLabel(value, { day: "2-digit" }),
        month: formatDateLabel(value, { month: "short" }),
        year: formatDateLabel(value, { year: "numeric" }),
      };
    });
  }, []);
  const slots = {
    morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    afternoon: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"],
  };

  const selectedDateLabel = formatDateLabel(selectedDate, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const openCalendar = () => {
    if (calendarInputRef.current?.showPicker) {
      calendarInputRef.current.showPicker();
      return;
    }

    calendarInputRef.current?.focus();
  };

  const handleNext = () => {
    onNext({
      date: selectedDateLabel,
      dateISO: selectedDate,
      time: selectedTime,
      fee,
    });
  };

  return (
    <div className="content-card animate-in fade-in slide-in-from-bottom-4">
      <h2 className="mb-8 flex items-center gap-2">
        <FiCalendar className="text-primary" /> Choose your slot
      </h2>

      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <p className="section-title mb-1">Select Date</p>
            <p className="text-small">{selectedDateLabel}</p>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={openCalendar}
              className="icon-tile"
              aria-label="Open calendar"
              title="Open calendar"
            >
              <FiCalendar />
            </button>
            <input
              ref={calendarInputRef}
              type="date"
              min={todayValue}
              value={selectedDate}
              onChange={(event) => {
                if (!event.target.value) return;
                setSelectedDate(event.target.value);
                setSelectedTime(null);
              }}
              aria-label="Choose appointment date"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {dates.map((date) => (
            <button
              key={date.value}
              onClick={() => {
                setSelectedDate(date.value);
                setSelectedTime(null);
              }}
              className={`shrink-0 w-24 h-24 flex flex-col items-center justify-center transition-all border-2 ${
                selectedDate === date.value
                  ? "bg-primary text-inverse"
                  : "bg-surface text-muted"
              }`}
              style={{
                borderColor:
                  selectedDate === date.value
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <span className="text-xs font-black uppercase mb-1">{date.weekday}</span>
              <span className="text-xl font-black">{date.day}</span>
              <span className="text-[10px] font-black uppercase">
                {date.month} {date.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="section-title mb-4 flex items-center gap-1">
          <FiClock /> Morning
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {slots.morning.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`slot-chip ${selectedTime === time ? "selected" : ""}`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <p className="section-title mb-4 flex items-center gap-1">
          <FiClock /> Afternoon
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {slots.afternoon.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`slot-chip ${selectedTime === time ? "selected" : ""}`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div
        className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div>
          <p className="section-title mb-1">Consultation Fee</p>
          <p className="page-title">{fee}</p>
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedTime}
          className="btn btn-primary btn-lg w-full sm:w-auto"
        >
          Next: Confirm Details
        </button>
      </div>
    </div>
  );
};

export default SlotPicker;
