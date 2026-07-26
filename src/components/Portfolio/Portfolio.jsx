import { useEffect, useState } from "react";
import "./Portfolio.css";
import { apiGet, toImageUrl } from "../../api/api";

// Existing portfolio images
import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/p4.jpg";
import p5 from "../../assets/p5.jpg";
import p6 from "../../assets/p6.jpg";
import p7 from "../../assets/p7.jpg";
import p8 from "../../assets/p8.jpg";

const WEDDINGS = [
  {
    id: 1,
    image: p1,
    category: "Classic",
    couple: "Aravind & Keerthana",
    venue: "Tirunelveli",
    size: "tall",
  },
  {
    id: 2,
    image: p2,
    category: "Garden",
    couple: "Karthik & Nivetha",
    venue: "Palayamkottai",
    size: "short",
  },
  {
    id: 3,
    image: p3,
    category: "Ballroom",
    couple: "Suresh & Divya",
    venue: "Madurai",
    size: "wide",
  },
  {
    id: 4,
    image: p4,
    category: "Classic",
    couple: "Vignesh & Priya",
    venue: "Tirunelveli",
    size: "short",
  },
  {
    id: 5,
    image: p5,
    category: "Garden",
    couple: "Ramesh & Anitha",
    venue: "Nagercoil",
    size: "tall",
  },
  {
    id: 6,
    image: p6,
    category: "Ballroom",
    couple: "Arjun & Sneha",
    venue: "Madurai",
    size: "short",
  },
  {
    id: 7,
    image: p7,
    category: "Classic",
    couple: "Manoj & Deepika",
    venue: "Tenkasi",
    size: "wide",
  },
  {
    id: 8,
    image: p8,
    category: "Garden",
    couple: "Hari & Swathi",
    venue: "Palayamkottai",
    size: "short",
  },
];

const MAX_PORTFOLIO = 8;

function Portfolio() {
  const [adminImages, setAdminImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    apiGet("/api/portfolio")
      .then((data) => setAdminImages(data))
      .catch((err) =>
        console.error("Failed to load admin portfolio images:", err)
      );
  }, []);

  // Latest uploaded images (maximum 8)
  const uploadedWeddings = adminImages
    .slice(-MAX_PORTFOLIO)
    .map((item) => ({
      id: item._id,
      image: toImageUrl(item.imageUrl),
      category: item.category,
      couple: item.couple,
      venue: item.venue,
      size: item.size,
    }));

  // Remaining default images
  const remaining = MAX_PORTFOLIO - uploadedWeddings.length;

  const defaultWeddings = WEDDINGS.slice(0, remaining);

  // Final portfolio (always maximum 8)
  const allWeddings = [...defaultWeddings, ...uploadedWeddings];

  const visibleWeddings =
    activeFilter === "All"
      ? allWeddings
      : allWeddings.filter((w) => w.category === activeFilter);

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio__header">
          <div>
            <p className="eyebrow">Real Weddings</p>

            <h2 className="section-heading">
              A few days we've <em>witnessed</em>
            </h2>
          </div>
        </div>

        <div className="portfolio__grid">
          {visibleWeddings.map((wedding, index) => (
            <div
              className={`portfolio__item portfolio__item--${wedding.size}`}
              key={wedding.id}
              onClick={() => setSelectedImage(wedding.image)}
            >
              <img
                src={wedding.image}
                className="portfolio__image"
                alt={wedding.couple}
              />

              <span className="portfolio__figure">
                Fig. {String(index + 1).padStart(2, "0")}
              </span>

              <div className="portfolio__overlay">
                <span className="portfolio__zoom">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="portfolio__lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <span className="portfolio__close">&times;</span>

          <img
            src={selectedImage}
            alt=""
            className="portfolio__lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default Portfolio;