import { useState } from "react";
import { useParams } from "react-router-dom";
import { GALLERY } from "../../data/gallery";
import "./GalleryPage.css";

function GalleryCategory() {
  const { category } = useParams();

  // Category Details
  const categoryInfo = {
    wedding: {
      title: "Wedding Photography",
      quote: "Every love story deserves to be remembered forever.",
    },
    model: {
      title: "Model Photography",
      quote: "Confidence is the best outfit. Every frame reflects your style.",
    },
    portrait: {
      title: "Portrait Photography",
      quote: "Every face has a story waiting to be captured.",
    },
    maternity: {
      title: "Maternity Photography",
      quote: "A beautiful journey of love before the little one arrives.",
    },
    bride: {
      title: "Bridal Photography",
      quote: "Elegance, grace, and timeless bridal beauty in every frame.",
    },
  };

  // Category Filters
  const categoryFilters = {
    wedding: ["All", "Candid", "Traditional", "Outdoor", "Indoor"],
    model: ["All", "Fashion", "Studio", "Outdoor"],
    portrait: ["All", "Indoor", "Outdoor", "Studio"],
    maternity: ["All", "Indoor", "Outdoor", "Studio"],
    bride: ["All", "Bridal"],
  };

  const info = categoryInfo[category?.toLowerCase()] || {
    title: "Gallery",
    quote: "Capturing moments that last forever.",
  };

  const filters = categoryFilters[category?.toLowerCase()] || ["All"];

  const [filter, setFilter] = useState("All");

  // Filter Images
  const images = GALLERY.filter((item) => {
    const categoryMatch =
      item.category.toLowerCase() === category?.toLowerCase();

    const filterMatch =
      filter === "All" || item.type === filter;

    return categoryMatch && filterMatch;
  });

  return (
    <section className="category-gallery">
      <div className="container">
        <h2 className="category-title">{info.title}</h2>

        <p className="category-quote">
          "{info.quote}"
        </p>

        {/* Filter Buttons */}
        <div className="gallery-filters">
          {filters.map((btn) => (
            <button
              key={btn}
              className={filter === btn ? "active" : ""}
              onClick={() => setFilter(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid">
          {images.length > 0 ? (
            images.map((item, index) => (
              <div className="grid-item" key={index}>
                <img
                  src={item.image}
                  alt={`${item.category} ${item.type}`}
                />
              </div>
            ))
          ) : (
            <h3>No images found.</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default GalleryCategory;