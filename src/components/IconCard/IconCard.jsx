
import React from "react";
import "./IconCard.css";

function IconCard({
  icon,
  title,
  description,
  children,
  className = "",
}) {
  return (
    <article className={`icon-card ${className}`.trim()}>
      {icon && (
        <div className="icon-card-icon" aria-hidden="true">
          {icon}
        </div>
      )}

      {title && <h3 className="icon-card-title">{title}</h3>}

      {description && (
        <p className="icon-card-description">{description}</p>
      )}

      {children && <div className="icon-card-content">{children}</div>}
    </article>
  );
}

export default IconCard;
