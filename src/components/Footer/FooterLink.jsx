
import React from "react";
import { Link } from "react-router-dom";

function FooterLink({ to, href, children, label, className = "" }) {
  const linkText = children || label;

  if (href) {
    const isExternal = /^https?:\/\//i.test(href);

    return (
      <a
        href={href}
        className={`footer-link ${className}`.trim()}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {linkText}
      </a>
    );
  }

  return (
    <Link
      to={to || "/"}
      className={`footer-link ${className}`.trim()}
    >
      {linkText}
    </Link>
  );
}

export default FooterLink;
