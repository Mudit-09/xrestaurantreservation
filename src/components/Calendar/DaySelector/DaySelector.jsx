

import React from "react";
import "./DaySelector.css";

function DaySelector({ selectedDate, onDateSelect }) {
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
    <div className="day-selector">
      <h3>Choose a Date</h3>

      <div className="day-selector-list">
        {dates.map((date, index) => {
          const dateValue = formatDate(date);
          const isSelected = selectedDate === dateValue;

          return (
            <button
              key={dateValue}
              type="button"
              className={`day-selector-item${isSelected ? " selected" : ""}`}
              onClick={() => onDateSelect(dateValue)}
              aria-pressed={isSelected}
              aria-label={date.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            >
              <span className="day-selector-weekday">
                {index === 0
                  ? "Today"
                  : date.toLocaleDateString("en-IN", {
                      weekday: "short",
                    })}
              </span>

              <strong className="day-selector-number">
                {date.getDate()}
              </strong>

              <span className="day-selector-month">
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

export default DaySelector;
