
import React, { useState } from "react";
import BookingModal from "../BookingModal/BookingModal";

function RestaurantCard({ restaurant }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!restaurant) {
    return null;
  }

  const restaurantName =
    restaurant.restaurantName ||
    restaurant.name ||
    restaurant.restaurant_name ||
    "Restaurant";

  const address = restaurant.address || "Address not available";
  const city = restaurant.city || "";
  const state = restaurant.state || "";
  const rating =
    restaurant.rating ??
    restaurant.overallRating ??
    restaurant.overall_rating ??
    restaurant.overallRatingValue;

  return (
    <>
      <article className="restaurant-card">
        <div className="restaurant-card-details">
          <h3>{restaurantName}</h3>

          <p>{address}</p>

          <p>
            {[city, state].filter(Boolean).join(", ") ||
              "Location not available"}
          </p>

          <p>
            Overall Rating:{" "}
            {rating !== undefined && rating !== null && rating !== ""
              ? rating
              : "Not available"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBookingModal(true)}
        >
          Book FREE Reservation
        </button>
      </article>

      {showBookingModal && (
        <BookingModal
          restaurant={{
            ...restaurant,
            restaurantName,
            address,
            city,
            state,
            rating: rating ?? null,
          }}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
}

export default RestaurantCard;
