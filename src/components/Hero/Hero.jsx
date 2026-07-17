import { useEffect, useState } from "react";
import "./Hero.css";

import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";
import hero4 from "../../assets/hero4.jpg";
import hero5 from "../../assets/hero5.jpg";
import hero6 from "../../assets/hero6.jpg";

const images = [hero1, hero2, hero3, hero4, hero5, hero6];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="hero" id="home">

      {images.map((img, index) => (
        <div
          key={index}
          className={`hero__slide ${
            index === current ? "active" : ""
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="hero__overlay"></div>

      <div className="container hero__content">

        <p className="hero__subtitle">
          Tirunelveli • Wedding • Outdoor • Corporate
        </p>

        <h1>
          Capturing
          <br />
          <span>Your Beautiful</span>
          <br />
          Stories.
        </h1>

        <p className="hero__text">
          Bharath Studio transforms your special moments into timeless memories
          with cinematic photography and creative storytelling.
        </p>

        <div className="hero__buttons">
          <a href="#portfolio" className="btn-primary">
            Explore Gallery
          </a>

          <a href="#contact" className="btn-outline">
            Book Now
          </a>
        </div>

      </div>

      <a href="#about" className="hero__scroll">
        <span></span>
      </a>

    </section>
  );
}

export default Hero;