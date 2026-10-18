
import React, { useState } from "react";
import "./Accordion.css";

function Accordion({ title, children, items = [], allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  const accordionItems =
    items.length > 0
      ? items
      : [
          {
            title: title || "Frequently Asked Questions",
            content: children,
          },
        ];

  const toggleItem = (index) => {
    setOpenItems((previous) => {
      if (previous.includes(index)) {
        return previous.filter((item) => item !== index);
      }

      return allowMultiple ? [...previous, index] : [index];
    });
  };

  return (
    <div className="restaurant-accordion">
      {accordionItems.map((item, index) => {
        const isOpen = openItems.includes(index);
        const heading = item.title || item.question || `Item ${index + 1}`;
        const content = item.content ?? item.answer ?? "";

        return (
          <section className="accordion-item" key={`${heading}-${index}`}>
            <h3 className="accordion-heading">
              <button
                type="button"
                className="accordion-trigger"
                aria-expanded={isOpen}
                onClick={() => toggleItem(index)}
              >
                <span>{heading}</span>
                <span className="accordion-indicator" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>

            {isOpen && (
              <div className="accordion-content">
                {content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default Accordion;
