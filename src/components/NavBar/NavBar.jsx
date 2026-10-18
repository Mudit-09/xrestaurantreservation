
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <header className={styles["site-header"]}>
      <nav
        className={styles["site-navigation"]}
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className={styles["site-brand"]}
          aria-label="Restaurant home"
        >
          <span className={styles["brand-mark"]}>R</span>
          <span>Restaurant</span>
        </Link>

        <div className={styles["site-nav-links"]}>
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/search">
            Find Restaurants
          </NavLink>

          <NavLink to="/my-bookings">
            My Bookings
          </NavLink>
        </div>

        <Link
          to="/search"
          className={styles["nav-reserve-button"]}
        >
          Book a Table
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;
