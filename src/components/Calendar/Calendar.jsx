
import React from "react";

function Calendar({ selectedDate, onDateSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="reservation-calendar">
      <h3>Select a Date</h3>

      <div className="calendar-dates">
      {dates.map((date, index) => {
          const dateValue = formatDate(date);
          const isSelected = selectedDate === dateValue;

          return (
            <button
              key={dateValue}
              type="button"
              className={
                isSelected
                  ? "calendar-date selected"
                  : "calendar-date"
              }
              onClick={() => onDateSelect(dateValue)}
              aria-pressed={isSelected}
              aria-label={date.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            >
              <p>
  {index === 0
    ? "Today"
    : date.toLocaleDateString("en-IN", {
        weekday: "short",
      })}
</p>

              <strong>{date.getDate()}</strong>

              <span>
                {date.toLocaleDateString("en-IN", {
                  month: "short",
                })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
