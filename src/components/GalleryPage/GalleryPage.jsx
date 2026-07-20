import { useState } from "react";
import { useParams } from "react-router-dom";
import { GALLERY } from "../../data/gallery";
import "./GalleryPage.css";

function GalleryCategory() {
  const { category } = useParams();

  // Lightbox State
  const [selectedImage, setSelectedImage] = useState(null);

  // Category Details
  const categoryInfo = {
    wedding: {
      title: "Wedding Photography",
      quote: "Every love story deserves to be remembered forever.",
    },
    prewedding: {
      title: "Pre Wedding Photography",
      quote:
        "Beautiful moments before the big day, captured with love and creativity.",
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

  // Filter Buttons
  const categoryButtons = [
    "All",
    "Wedding",
    "PreWedding",
    "Model",
    "Portrait",
    "Maternity",
    "Bride",
  ];

  // Title & Quote
  const info = category
    ? categoryInfo[category.toLowerCase()]
    : {
        title: "Our Gallery",
        quote:
          "Explore our collection of beautiful moments captured through the lens.",
      };

  // Active Filter
  const [filter, setFilter] = useState(
    category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "All"
  );

  // Filter Images
  const images = GALLERY.filter((item) => {
    if (category) {
      return item.category.toLowerCase() === category.toLowerCase();
    }

    if (filter === "All") {
      return true;
    }

    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section className="category-gallery">
      <div className="container">
        <h2 className="category-title">{info.title}</h2>

        <p className="category-quote">{info.quote}</p>

        {/* Filters */}
        {!category && (
          <div className="gallery-filters">
            {categoryButtons.map((btn) => (
              <button
                key={btn}
                className={filter === btn ? "active" : ""}
                onClick={() => setFilter(btn)}
              >
                {btn === "PreWedding" ? "Pre Wedding" : btn}
              </button>
            ))}
          </div>
        )}

        {/* Gallery */}
        <div className="grid">
          {images.length > 0 ? (
            images.map((item, index) => (
              <div
                className="grid-item"
                key={index}
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.type || item.category}
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <h3>No images found.</h3>
          )}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="gallery-lightbox"
            onClick={() => setSelectedImage(null)}
          >
            <span
              className="gallery-close"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </span>

            <img
              src={selectedImage}
              alt="Preview"
              className="gallery-lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default GalleryCategory;