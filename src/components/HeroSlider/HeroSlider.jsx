
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./HeroSlider.css";

const slides = [
  {
    eyebrow: "DISCOVER GREAT FOOD",
    title: "Find Your Next Favourite Restaurant",
    description:
      "Explore restaurants in your city and discover places perfect for every occasion.",
    button: "Find Restaurants",
    link: "/search",
    number: "01",
  },
  {
    eyebrow: "RESERVE WITH EASE",
    title: "Your Perfect Table Is Waiting",
    description:
      "Choose a restaurant, select your preferred date and time, and make your reservation.",
    button: "Book a Table",
    link: "/search",
    number: "02",
  },
  {
    eyebrow: "ALL YOUR BOOKINGS",
    title: "Dining Plans Made Simple",
    description:
      "Keep your reservations organised and manage your upcoming dining plans in one place.",
    button: "My Bookings",
    link: "/my-bookings",
    number: "03",
  },
];

function HeroSlider() {
  return (
    <section className="hero-slider" aria-label="Restaurant reservation highlights">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        a11y={{ enabled: true }}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.number}>
            <div className="hero-slide">
              <div className="hero-slide-content">
                <p className="hero-eyebrow">{slide.eyebrow}</p>

                <h1>{slide.title}</h1>

                <p className="hero-description">{slide.description}</p>

                <Link className="hero-cta" to={slide.link}>
                  {slide.button}
                  <span aria-hidden="true"> →</span>
                </Link>

                <p className="hero-slide-number">
                  {slide.number} <span>/ 03</span>
                </p>
              </div>

              <div className="hero-slide-visual" aria-hidden="true">
                <div className="hero-food-circle">
                  <span className="hero-food-emoji">
                    {slide.number === "01"
                      ? "🍽️"
                      : slide.number === "02"
                        ? "🥂"
                        : "🍜"}
                  </span>
                </div>

                <div className="hero-floating-card">
                  <span className="hero-floating-icon">✓</span>
                  <div>
                    <strong>
                      {slide.number === "02"
                        ? "Reserve your table"
                        : slide.number === "03"
                          ? "Bookings organised"
                          : "Discover local dining"}
                    </strong>
                    <p>Simple. Convenient. Delicious.</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSlider;
