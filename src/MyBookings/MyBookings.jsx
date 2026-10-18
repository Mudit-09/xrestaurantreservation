import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "./../App.css";

const TIME_SLOTS = [
  { label: "Morning", time: "9:00 AM - 11:00 AM" },
  { label: "Afternoon", time: "12:00 PM - 3:00 PM" },
  { label: "Evening", time: "6:00 PM - 9:00 PM" },
];

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editGuests, setEditGuests] = useState("2");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(Array.isArray(saved) ? saved : []);
    } catch {
      setBookings([]);
      setError("Unable to read your saved bookings.");
    }
  }, []);

  const persistBookings = (updatedBookings) => {
    try {
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      return true;
    } catch {
      setError("Unable to save changes. Please try again.");
      return false;
    }
  };

  const formatDate = (value) => {
    if (!value) {
      return "Date not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const cancelBooking = (index) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    const updatedBookings = bookings.filter((_, i) => i !== index);

    if (persistBookings(updatedBookings)) {
      setError("");
    }
  };

  const openEditor = (booking, index) => {
    const rawDate = booking.date || booking.bookingDate || "";
    const parsedDate = rawDate ? new Date(rawDate) : null;

    setEditingIndex(index);
    setEditDate(
      parsedDate && !Number.isNaN(parsedDate.getTime())
        ? [
            parsedDate.getFullYear(),
            String(parsedDate.getMonth() + 1).padStart(2, "0"),
            String(parsedDate.getDate()).padStart(2, "0"),
          ].join("-")
        : ""
    );
    setEditTime(
      booking.time || booking.reservationTime || booking.bookingTime || ""
    );
    setEditGuests(String(booking.guests || 2));
    setError("");
  };

  const saveChanges = (event) => {
    event.preventDefault();

    if (editingIndex === null || !editDate || !editTime) {
      setError("Please select a date and time.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const chosenDate = new Date(`${editDate}T00:00:00`);
    const lastAllowedDate = new Date(today);
    lastAllowedDate.setDate(today.getDate() + 6);

    if (
      Number.isNaN(chosenDate.getTime()) ||
      chosenDate < today ||
      chosenDate > lastAllowedDate
    ) {
      setError("Please select a date within the next seven days.");
      return;
    }

    const updatedBookings = bookings.map((booking, index) =>
      index === editingIndex
        ? {
            ...booking,
            date: editDate,
            time: editTime,
            reservationTime: editTime,
            guests: Number(editGuests),
            status: "confirmed",
          }
        : booking
    );

    if (persistBookings(updatedBookings)) {
      setEditingIndex(null);
      setError("");
    }
  };

  return (
    <>
      <NavBar />

      <main className="my-bookings-page container">
        <section className="bookings-heading">
          <h1>My Bookings</h1>
          <p>View and manage your restaurant reservations.</p>
        </section>

        {error && <p role="alert">{error}</p>}

        {bookings.length === 0 ? (
          <section className="empty-bookings">
            <div className="empty-bookings-icon" aria-hidden="true">
              🍽️
            </div>

            <h2>No bookings yet</h2>

            <p>
              You haven't made a reservation yet. Find a restaurant
              and book your next dining experience.
            </p>

            <a href="/search" className="booking-action-button">
              Find Restaurants
            </a>
          </section>
        ) : (
          <section className="bookings-list">
            {bookings.map((booking, index) => {
              const restaurantName =
                booking.restaurantName || booking.name || "Restaurant";

              const bookingDate = booking.date || booking.bookingDate;
              const bookingTime =
                booking.time ||
                booking.reservationTime ||
                booking.bookingTime;

              return (
                <article
                  className="booking-card"
                  key={booking.id || `legacy-booking-${index}`}
                >
                  <div className="booking-card-header">
                    <div>
                      <h3>{restaurantName}</h3>
                      <p className="booking-status">
                        {booking.status || "confirmed"}
                      </p>
                    </div>
                  </div>

                  {booking.address && <p>{booking.address}</p>}

                  {(booking.city || booking.state) && (
                    <p>
                      {[booking.city, booking.state]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}

                  <div className="booking-information">
                    <p>
                      <strong>Date:</strong> {formatDate(bookingDate)}
                    </p>

                    <p>
                      <strong>Time:</strong> {bookingTime || "Not specified"}
                    </p>

                    <p>
                      <strong>Guests:</strong> {booking.guests || 2}
                    </p>

                    {booking.rating != null && (
                      <p>
                        <strong>Overall Rating:</strong> {booking.rating}
                      </p>
                    )}
                  </div>

                  <div className="booking-actions">
                    <button
                      type="button"
                      onClick={() => openEditor(booking, index)}
                    >
                      Edit Booking
                    </button>

                    <button
                      type="button"
                      className="cancel-booking-button"
                      onClick={() => cancelBooking(index)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {editingIndex !== null && (
          <div className="booking-overlay">
            <section
              className="booking-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-booking-title"
            >
              <button
                type="button"
                className="booking-close"
                aria-label="Close edit form"
                onClick={() => {
                  setEditingIndex(null);
                  setError("");
                }}
              >
                ×
              </button>

              <h2 id="edit-booking-title">Edit Booking</h2>

              <form onSubmit={saveChanges}>
                <div className="edit-booking-field">
                  <label htmlFor="edit-date">Reservation Date</label>
                  <input
                    id="edit-date"
                    type="date"
                    value={editDate}
                    onChange={(event) => setEditDate(event.target.value)}
                    required
                  />
                </div>

                <div className="edit-booking-field">
                  <label htmlFor="edit-time">Reservation Time</label>
                  <select
                    id="edit-time"
                    value={editTime}
                    onChange={(event) => setEditTime(event.target.value)}
                    required
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.label} value={slot.label}>
                        {slot.label} ({slot.time})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="edit-booking-field">
                  <label htmlFor="edit-guests">Number of Guests</label>
                  <select
                    id="edit-guests"
                    value={editGuests}
                    onChange={(event) => setEditGuests(event.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                      <option key={number} value={number}>
                        {number} {number === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <p role="alert">{error}</p>}

                <button type="submit">Save Changes</button>
              </form>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default MyBookings;