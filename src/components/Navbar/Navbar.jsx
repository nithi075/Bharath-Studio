import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Services", href: "/#services" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/#home" className="navbar__logo" onClick={handleLinkClick}>
          <span className="navbar__logo-word">Bharath</span>
          <span className="navbar__logo-word">Studio</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="navbar__links navbar__links--desktop">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="navbar__link"
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Button */}
        <Link
          to="/#contact"
          className="navbar__cta btn-outline"
          onClick={handleLinkClick}
        >
          Inquire
        </Link>

        {/* Mobile Burger */}
        <button
          className={`navbar__burger ${menuOpen ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__drawer ${menuOpen ? "is-open" : ""}`}>
        <nav className="navbar__links navbar__links--mobile">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              className="navbar__link navbar__link--mobile"
              style={{ transitionDelay: `${index * 0.05}s` }}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/#contact"
            className="btn-primary navbar__cta--mobile"
            onClick={handleLinkClick}
          >
            Inquire
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;