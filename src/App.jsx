import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Home Components
import Hero from "./components/Hero/Hero";
import StorySection from "./components/StorySection/StorySection";
import About from "./components/About/About";
import Testimonials from "./components/testimonials/Testimonials";
import Gallery from "./components/Gallery/Gallery";
import Footer from "./components/footer/footer";
import Navbar from "./components/Navbar/Navbar";
import Storytelling from "./components/StoryTelling/StoryTelling";
import WeddingStory from "./components/WeddingStory/WeddingStory";
import TenPartNarrative from "./components/TenPartNarrative/TenPartNarrative";
import FAQ from "./components/FreequentQ/faq";
import FloatingChat from "./components/floating/floating";
import OverlayForm from "./components/overlay/overlay";
// Gallery Detail Page
import GalleryDetail from "./pages/Gallery";

/* =========================
   HOME PAGE
========================= */

function HomePage() {
  return (
    <div className="app">
      <Navbar />

      <Hero />

      {/* <StorySection /> */}
         <Storytelling />

      <TenPartNarrative />

   


      <About />

      <WeddingStory />

      <Testimonials />
       

      <FAQ />

      <Gallery />
      <FloatingChat />

      <Footer />
    </div>
  );
}

/* =========================
   APP ROUTES
========================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<HomePage />}
        />
 {/* Overlay Form */}
  <Route
    path="/book-event"
    element={<OverlayForm />}
  />

        {/* Dynamic Gallery */}
        <Route
          path="/gallery/:category"
          element={<GalleryDetail />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

