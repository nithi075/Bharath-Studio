import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Gallery from "./components/Gallery/Gallery";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Instagram from "./components/Instagram/Instagram";
import Footer from "./components/Footer/Footer";

import GalleryCategory from "./components/GalleryPage/GalleryPage";

function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="portfolio">
        <Portfolio />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <section id="instagram">
        <Instagram />
      </section>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Full Gallery */}
        <Route path="/gallery" element={<GalleryCategory />} />

        {/* Category Gallery */}
        <Route
          path="/gallery/:category"
          element={<GalleryCategory />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;