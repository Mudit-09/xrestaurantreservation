
import React from "react";

const TIME_SLOTS = [
  {
    label: "Morning",
    time: "9:00 AM – 11:00 AM",
  },
  {
    label: "Afternoon",
    time: "12:00 PM – 3:00 PM",
  },
  {
    label: "Evening",
    time: "6:00 PM – 9:00 PM",
  },
];

function TimeSlotPicker({ selectedTime, onTimeSelect, selectedDate }) {
  const today = new Date();

  const todayValue = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const isToday = selectedDate === todayValue;

  return (
    <section className="time-slot-picker">
      <h3>Select a Time</h3>

      <p className="booking-day-label">
        {isToday ? "Today" : "Available Times"}
      </p>

      <div className="time-slot-list">
        {TIME_SLOTS.map((slot) => {
          const isSelected = selectedTime === slot.label;

          return (
            <button
              key={slot.label}
              type="button"
              className={`time-slot${isSelected ? " selected" : ""}`}
              onClick={() => onTimeSelect(slot.label)}
              aria-pressed={isSelected}
            >
              <p>{slot.label}</p>
              <span>{slot.time}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default TimeSlotPicker;
