
import React, { useState } from "react";
import "./FAQs.css";

const faqItems = [
  {
    question: "How do I find restaurants in my city?",
    answer:
      "Open the Find Restaurants page, select your state and city from the dropdowns, and click Search to view the available restaurants.",
  },
  {
    question: "How can I book a restaurant reservation?",
    answer:
      "Choose a restaurant from the search results, click Book FREE Reservation, select a date and time, choose the number of guests, and confirm your reservation.",
  },
  {
    question: "Where can I see my reservations?",
    answer:
      "Open My Bookings from the navigation menu to view your saved reservations and manage your booking details.",
  },
  {
    question: "Can I change or cancel a reservation?",
    answer:
      "Yes. Visit My Bookings to edit the date, time, or guest count of a saved reservation, or cancel it if your plans change.",
  },
  {
    question: "Where are my bookings saved?",
    answer:
      "Reservations are saved in your browser's local storage. They remain available in the same browser unless the stored data is cleared.",
  },
  {
    question: "What should I do if restaurants do not load?",
    answer:
      "Check your internet connection and try again. The restaurant service may take some time to respond, so wait a little before retrying.",
  },
];

function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  return (
    <section className="faqs-section" id="faqs">
      <div className="faqs-heading">
        <p className="faqs-eyebrow">NEED A HAND?</p>
        <h2>Frequently Asked Questions</h2>
        <p>
          Find answers to common questions about discovering restaurants
          and managing your reservations.
        </p>
      </div>

      <div className="faqs-list">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;

          return (
            <article className="faq-item" key={item.question}>
              <h3 className="faq-question-heading">
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>

              {isOpen && (
                <div className="faq-answer" id={answerId}>
                  <p>{item.answer}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default FAQs;
