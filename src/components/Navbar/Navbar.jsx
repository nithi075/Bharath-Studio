import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Gallery", id: "gallery" },
  { label: "Services", id: "services" },
  { label: "Reviews", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      // முதலில் Home page-க்கு போ
      navigate("/");

      // Home render ஆன பிறகு scroll செய்
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      // Home page-ல இருந்தால் நேரடியாக scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header
      className={`navbar ${
        scrolled || !isHome ? "navbar--scrolled" : ""
      }`}
    >
      <div className="navbar__inner container">
        {/* Logo */}
        <div
          className="navbar__logo"
          onClick={() => handleNavClick("home")}
          style={{ cursor: "pointer" }}
        >
          <span className="navbar__logo-word">Bharath</span>
          <span className="navbar__logo-word">Studio</span>
        </div>

        {/* Desktop Menu */}
        <nav className="navbar__links navbar__links--desktop">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className="navbar__link"
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Contact Button */}
        <button
          className="navbar__cta btn-outline"
          onClick={() => handleNavClick("contact")}
        >
          Inquire
        </button>

        {/* Burger */}
        <button
          className={`navbar__burger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile */}
      <div className={`navbar__drawer ${menuOpen ? "is-open" : ""}`}>
        <nav className="navbar__links navbar__links--mobile">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className="navbar__link navbar__link--mobile"
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </button>
          ))}

          <button
            className="btn-primary navbar__cta--mobile"
            onClick={() => handleNavClick("contact")}
          >
            Inquire
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;