
import React from "react";
import { Link } from "react-router-dom";
import "./Offers.css";

const offers = [
  {
    icon: "🍕",
    tag: "EXPLORE",
    title: "Discover Local Favourites",
    description:
      "Find popular restaurants and discover new places to enjoy a great meal.",
  },
  {
    icon: "🥂",
    tag: "CELEBRATE",
    title: "Make Every Occasion Special",
    description:
      "Find a welcoming spot for birthdays, date nights, and family gatherings.",
  },
  {
    icon: "🍽️",
    tag: "RESERVE",
    title: "Plan Your Next Dining Experience",
    description:
      "Choose your preferred date and time and manage your reservation online.",
  },
];

function Offers() {
  return (
    <section className="offers-section" id="offers">
      <div className="offers-heading">
        <p className="offers-eyebrow">A TABLE FOR EVERY OCCASION</p>
        <h2>Discover Your Next Dining Experience</h2>
        <p>
          Explore restaurants, find a place for every occasion, and
          reserve a table with ease.
        </p>
      </div>

      <div className="offers-grid">
        {offers.map((offer) => (
          <article className="offer-card" key={offer.title}>
            <div className="offer-card-icon" aria-hidden="true">
              {offer.icon}
            </div>

            <span className="offer-tag">{offer.tag}</span>

            <h3>{offer.title}</h3>

            <p>{offer.description}</p>

            <Link to="/search" className="offer-link">
              Explore Restaurants →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Offers;
