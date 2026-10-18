
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-about">
          <Link to="/" className="footer-brand">
            <span className="footer-brand-mark">R</span>
            Restaurant
          </Link>

          <p>
            Discover restaurants, explore local favourites, and
            reserve your table for your next memorable meal.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/search">Find Restaurants</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <a href="/#offers">Special Offers</a>
          <a href="/#blogs">Latest Blogs</a>
          <a href="/#faqs">FAQs</a>
        </div>

        <div className="footer-contact">
          <h3>Get in Touch</h3>
          <p>Find your next favourite dining spot.</p>
          <Link to="/search" className="footer-cta">
            Explore Restaurants
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Restaurant Reservation.
          All rights reserved.
        </p>
        <Link to="/">Back to Home ↑</Link>
      </div>
    </footer>
  );
}

export default Footer;
