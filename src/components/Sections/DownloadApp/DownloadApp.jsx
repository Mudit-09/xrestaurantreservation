
import React from "react";
import { Link } from "react-router-dom";
import SmsForm from "./SmsForm";
import "./DownloadApp.css";

function DownloadApp() {
  return (
    <section className="download-app-section" id="download-app">
      <div className="download-app-content">
        <p className="download-app-eyebrow">
          YOUR NEXT MEAL IS CLOSER
        </p>

        <h2>Make Your Next Reservation with Ease</h2>

        <p className="download-app-description">
          Discover restaurants, choose your preferred date and time,
          and keep track of your reservations in one convenient place.
        </p>

        <div className="download-app-features">
          <div className="download-app-feature">
            <span aria-hidden="true">✓</span>
            <p>Explore restaurants by city</p>
          </div>

          <div className="download-app-feature">
            <span aria-hidden="true">✓</span>
            <p>Choose a date and time</p>
          </div>

          <div className="download-app-feature">
            <span aria-hidden="true">✓</span>
            <p>Manage your bookings easily</p>
          </div>
        </div>

        <div className="download-app-actions">
          <Link to="/search" className="download-app-primary">
            Find Restaurants
          </Link>

          <Link to="/my-bookings" className="download-app-secondary">
            View My Bookings
          </Link>
        </div>

        <div className="download-app-sms">
          <h3>Stay Connected</h3>
          <p>
            Enter your phone number to try the contact form.
          </p>
          <SmsForm />
        </div>
      </div>

      <div className="download-app-visual" aria-hidden="true">
        <div className="download-app-circle">
          <div className="download-app-phone">
            <div className="download-app-phone-speaker" />

            <div className="download-app-phone-screen">
              <span className="download-app-phone-icon">🍽️</span>
              <strong>Your table awaits</strong>
              <span className="download-app-phone-line" />
              <span className="download-app-phone-line short" />

              <div className="download-app-confirmation">
                <span>✓</span>
                Reservation ready
              </div>
            </div>
          </div>

          <div className="download-app-floating floating-top">
            <span>📅</span>
            <div>
              <strong>Pick a date</strong>
              <p>Choose your visit</p>
            </div>
          </div>

          <div className="download-app-floating floating-bottom">
            <span>✓</span>
            <div>
              <strong>All set!</strong>
              <p>Manage your booking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadApp;
