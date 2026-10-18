
import React from "react";
import { Link } from "react-router-dom";
import "./PatientCaring.css";

const benefits = [
  {
    icon: "🔎",
    title: "Easy Restaurant Discovery",
    description:
      "Browse restaurants by state and city to find dining options that suit your plans.",
  },
  {
    icon: "📅",
    title: "Convenient Reservations",
    description:
      "Choose a date, select a time slot, and specify the number of guests for your booking.",
  },
  {
    icon: "📝",
    title: "Simple Booking Management",
    description:
      "View your reservations and update or cancel bookings from the My Bookings page.",
  },
];

function PatientCaring() {
  return (
    <section className="patient-caring-section" id="why-choose-us">
      <div className="patient-caring-content">
        <p className="patient-caring-eyebrow">DINING MADE SIMPLER</p>

        <h2>A Better Way to Plan Your Restaurant Visits</h2>

        <p className="patient-caring-description">
          Spend less time planning and more time enjoying your meals.
          Our reservation experience helps you discover restaurants and
          keep your bookings organised.
        </p>

        <div className="patient-caring-benefits">
          {benefits.map((benefit) => (
            <article className="patient-caring-benefit" key={benefit.title}>
              <div className="patient-caring-icon" aria-hidden="true">
                {benefit.icon}
              </div>

              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>

        <Link to="/search" className="patient-caring-button">
          Explore Restaurants →
        </Link>
      </div>

      <div className="patient-caring-visual" aria-hidden="true">
        <div className="patient-caring-plate">
          <div className="patient-caring-plate-inner">
            <span>🍲</span>
          </div>
        </div>

        <div className="patient-caring-floating-card">
          <span className="patient-caring-check">✓</span>
          <div>
            <strong>Your next meal awaits</strong>
            <p>Find a table for your occasion</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientCaring;
