import { useState } from "react";
import { useParams } from "react-router-dom";
import { GALLERY } from "../../data/gallery";
import "./GalleryPage.css";

function GalleryCategory() {
  const { category } = useParams();

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

  // Category Filter Buttons
  const categoryButtons = [
    "All",
    "Wedding",
    "Model",
    "Portrait",
    "Maternity",
    "Bride",
  ];

  const info = category
    ? categoryInfo[category.toLowerCase()]
    : {
        title: "Our Gallery",
        quote:
          "Explore our collection of beautiful moments captured through the lens.",
      };

  const [filter, setFilter] = useState(
    category ? category.charAt(0).toUpperCase() + category.slice(1) : "All"
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

        {/* Filter only in Full Gallery */}
        {!category && (
          <div className="gallery-filters">
            {categoryButtons.map((btn) => (
              <button
                key={btn}
                className={filter === btn ? "active" : ""}
                onClick={() => setFilter(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        )}

        <div className="grid">
          {images.length > 0 ? (
            images.map((item, index) => (
              <div className="grid-item" key={index}>
                <img
                  src={item.image}
                  alt={item.category}
                  loading="lazy"
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