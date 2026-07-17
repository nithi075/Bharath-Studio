import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";

// Import your gallery images
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
  const trackRef = useRef(null);
  const navigate = useNavigate();

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
        {GALLERY.map((item, i) => (
          <div className="gallery__frame" key={i}>
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