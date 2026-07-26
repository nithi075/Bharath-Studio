import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";
import { apiGet, toImageUrl } from "../../api/api";

// Existing gallery images - these always stay on the site as-is.
import GalleryImg1 from "../../assets/gal1.jpg";
import GalleryImg2 from "../../assets/gal2.jpg";
import GalleryImg3 from "../../assets/gal3.jpg";
import GalleryImg4 from "../../assets/gal4.jpg";
import GalleryImg5 from "../../assets/gal5.jpg";
import GalleryImg6 from "../../assets/gal6.jpg";
import GalleryImg7 from "../../assets/gal7.jpg";
import GalleryImg8 from "../../assets/gal8.jpg";
import GalleryImg9 from "../../assets/gal9.jpg";
import GalleryImg10 from "../../assets/gal10.jpg";

const GALLERY = [
  { image: GalleryImg1 },
  { image: GalleryImg2 },
  { image: GalleryImg3 },
  { image: GalleryImg4 },
  { image: GalleryImg5 },
  { image: GalleryImg6 },
  { image: GalleryImg7 },
  { image: GalleryImg8 },
  { image: GalleryImg9 },
  { image: GalleryImg10 },
];

function Gallery() {
  // Admin-added images (marked "show on home") get merged in after the existing ones above.
  const [adminImages, setAdminImages] = useState([]);
  const trackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/api/gallery?home=true")
      .then((data) => {
        const oldestFirst = [...data].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setAdminImages(oldestFirst);
      })
      .catch((err) => console.error("Failed to load admin gallery images:", err));
  }, []);

  const FEATURED_LIMIT = 10;

  // Featured Works strip always shows the 10 most recent images: existing
  // ones first, then admin-added ones in the order they were added. Once
  // the total goes past 10, the oldest ones roll off automatically.
  const combined = [
    ...GALLERY,
    ...adminImages.map((item) => ({ image: toImageUrl(item.imageUrl), id: item._id })),
  ];
  const allImages = combined.slice(-FEATURED_LIMIT);

  const scrollByAmount = (direction) => {
    if (!trackRef.current) return;

    trackRef.current.scrollBy({
      left: direction * 380,
      behavior: "smooth",
    });
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container gallery__header">
        <div>
          <p className="eyebrow">Our Gallery</p>
          <h2 className="section-heading">
            Featured <em>Works</em>
          </h2>
        </div>

        <div className="gallery__nav">
          <button
            className="gallery__arrow"
            onClick={() => scrollByAmount(-1)}
          >
            &#8592;
          </button>

          <button
            className="gallery__arrow"
            onClick={() => scrollByAmount(1)}
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="gallery__track" ref={trackRef}>
        {allImages.map((item, i) => (
          <div className="gallery__frame" key={item.id || i}>
            <div className="gallery__image-wrapper">
              <img src={item.image} className="gallery__image" alt="" />
              <span className="gallery__index">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="gallery__btn">
        <button
          className="view-more-btn"
          onClick={() => navigate("/gallery")}
        >
          View More
        </button>
      </div>
    </section>
  );
}

export default Gallery;
