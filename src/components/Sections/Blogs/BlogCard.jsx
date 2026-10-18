
import React from "react";
import { Link } from "react-router-dom";

function BlogCard({
  category = "DINING TIPS",
  title,
  description,
  icon = "🍽️",
  readTime = "4 min read",
  link = "/search",
}) {
  return (
    <article className="blog-card">
      <div className="blog-card-visual" aria-hidden="true">
        <span>{icon}</span>
      </div>

      <div className="blog-card-content">
        <p className="blog-category">{category}</p>

        <h3>{title}</h3>

        <p className="blog-description">{description}</p>

        <div className="blog-card-footer">
          <span>{readTime}</span>

          <Link to={link}>
            Explore Restaurants →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
