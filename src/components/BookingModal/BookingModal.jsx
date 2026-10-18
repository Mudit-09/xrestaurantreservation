
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import TimeSlotPicker from "../Calendar/TimeSlotPicker/TimeSlotPicker";

function BookingModal({ restaurant, onClose, onBookingComplete }) {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState("");

  if (!restaurant) {
    return null;
  }

  const restaurantName =
    restaurant.restaurantName || restaurant.name || "Restaurant";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time.");
      return;
    }

    const booking = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      restaurantName,
      name: restaurantName,
      address: restaurant.address || "",
      city: restaurant.city || "",
      state: restaurant.state || "",
      rating: restaurant.rating ?? null,
      date: selectedDate,
      time: selectedTime,
      reservationTime: selectedTime,
      guests: Number(guests),
      status: "confirmed",
    };

    try {
      const existingBookings = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );

      if (!Array.isArray(existingBookings)) {
        throw new Error("Invalid bookings data");
      }

      const updatedBookings = [...existingBookings, booking];

      localStorage.setItem("bookings", JSON.stringify(updatedBookings));

      if (onBookingComplete) {
        onBookingComplete(booking);
      }

      if (onClose) {
        onClose();
      }

      navigate("/my-bookings");
    } catch {
      setError("Unable to save your reservation. Please try again.");
    }
  };

  return (
    <div
      className="booking-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <section
        className="booking-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <button
          type="button"
          className="booking-close"
          aria-label="Close booking dialog"
          onClick={onClose}
        >
          ×
        </button>

        <h2 id="booking-modal-title">Book FREE Reservation</h2>
        <h3>{restaurantName}</h3>

        {restaurant.address && <p>{restaurant.address}</p>}

        <form onSubmit={handleSubmit}>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

<TimeSlotPicker
  selectedTime={selectedTime}
  onTimeSelect={setSelectedTime}
  selectedDate={selectedDate}
/>

          <div className="guest-selector">
            <label htmlFor="booking-guests">Number of Guests</label>

            <select
              id="booking-guests"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>

          {error && <p role="alert">{error}</p>}

          <button type="submit">Confirm Reservation</button>
        </form>
      </section>
    </div>
  );
}

export default BookingModal;
