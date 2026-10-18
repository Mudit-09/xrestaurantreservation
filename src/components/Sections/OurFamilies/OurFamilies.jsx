
import React from "react";
import { Link } from "react-router-dom";
import "./OurFamilies.css";

const diningOptions = [
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Dining",
    description:
      "Discover comfortable places where family and friends can enjoy a meal together.",
  },
  {
    icon: "❤️",
    title: "Date Night",
    description:
      "Find a restaurant for a memorable evening, a special occasion, or a relaxed dinner.",
  },
  {
    icon: "🎉",
    title: "Group Celebrations",
    description:
      "Explore dining options for birthdays, reunions, and other special gatherings.",
  },
  {
    icon: "🍴",
    title: "Everyday Dining",
    description:
      "Explore local restaurants and find somewhere new for your next meal.",
  },
];

function OurFamilies() {
  return (
    <section className="families-section" id="families">
      <div className="families-intro">
        <p className="families-eyebrow">MADE FOR EVERY MOMENT</p>
        <h2>Good Food Brings Everyone Together</h2>
        <p>
          Whether you are planning a family dinner, a special date, or
          a get-together with friends, find a restaurant that suits your
          occasion.
        </p>
        <Link to="/search" className="families-button">
          Find Your Restaurant
        </Link>
      </div>

      <div className="families-grid">
        {diningOptions.map((option) => (
          <article className="family-card" key={option.title}>
            <div className="family-card-icon" aria-hidden="true">
              {option.icon}
            </div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OurFamilies;
