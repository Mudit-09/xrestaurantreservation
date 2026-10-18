
import React from "react";
import { Link } from "react-router-dom";
import "./HeroServices.css";

const services = [
  {
    icon: "🔎",
    title: "Find Restaurants",
    description:
      "Discover restaurants and explore dining options in your city.",
    link: "/search",
    linkText: "Explore restaurants",
  },
  {
    icon: "📅",
    title: "Easy Reservations",
    description:
      "Choose your preferred date and time to book a table.",
    link: "/search",
    linkText: "Book a table",
  },
  {
    icon: "🍽️",
    title: "Manage Bookings",
    description:
      "View, update, and cancel your restaurant reservations.",
    link: "/my-bookings",
    linkText: "My bookings",
  },
];

function HeroServices() {
  return (
    <section className="hero-services" aria-labelledby="services-heading">
      <div className="services-heading">
        <p className="services-eyebrow">DINING MADE SIMPLE</p>
        <h2 id="services-heading">Everything You Need for a Great Meal</h2>
        <p>
          From discovering local restaurants to managing your
          reservations, make every dining experience easier.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-icon" aria-hidden="true">
              {service.icon}
            </div>

            <h3>{service.title}</h3>
            <p>{service.description}</p>

            <Link to={service.link} className="service-link">
              {service.linkText} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HeroServices;
