
import React from "react";
import { Link } from "react-router-dom";
import "./Blogs.css";

const blogPosts = [
  {
    category: "FOOD & DINING",
    title: "How to Choose the Perfect Restaurant",
    description:
      "Consider the occasion, location, menu, and atmosphere when choosing where to dine.",
    icon: "🍽️",
    readTime: "4 min read",
  },
  {
    category: "DINING TIPS",
    title: "Make Your Restaurant Reservation Easy",
    description:
      "Plan ahead by selecting your preferred date, time, and guest count before booking.",
    icon: "📅",
    readTime: "3 min read",
  },
  {
    category: "SPECIAL OCCASIONS",
    title: "Ideas for Your Next Dining Out",
    description:
      "From relaxed family meals to celebrations with friends, discover ideas for your next outing.",
    icon: "🥂",
    readTime: "5 min read",
  },
];

function Blogs() {
  return (
    <section className="blogs-section" id="blogs">
      <div className="blogs-heading">
        <p className="blogs-eyebrow">FROM OUR JOURNAL</p>
        <h2>Tips for Your Next Dining Experience</h2>
        <p>
          Get inspired, discover helpful dining tips, and make your next
          restaurant visit more enjoyable.
        </p>
      </div>

      <div className="blogs-grid">
        {blogPosts.map((post) => (
          <article className="blog-card" key={post.title}>
            <div className="blog-card-visual" aria-hidden="true">
              <span>{post.icon}</span>
            </div>

            <div className="blog-card-content">
              <p className="blog-category">{post.category}</p>

              <h3>{post.title}</h3>

              <p className="blog-description">{post.description}</p>

              <div className="blog-card-footer">
                <span>{post.readTime}</span>
                <Link to="/search" aria-label={`Explore restaurants: ${post.title}`}>
                  Explore Restaurants →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
