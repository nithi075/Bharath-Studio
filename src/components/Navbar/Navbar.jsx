import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

const portfolioLinks = [
  { label: 'Portraits', path: '/portfolio?category=portraits' },
  { label: 'Pre Weddings', path: '/portfolio?category=pre' },
  { label: 'Tamil Weddings', path: '/portfolio?category=tamil' },
  { label: 'Telugu Weddings', path: '/portfolio?category=telugu' },
  { label: 'Brahmin Weddings', path: '/portfolio?category=brahmin' },
  { label: 'Christian Weddings', path: '/portfolio?category=christian' },
  { label: 'Muslim Weddings', path: '/portfolio?category=muslim' },
  { label: 'Engagement', path: '/portfolio?category=engage' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const isPortfolioPage = location.pathname === '/portfolio'

  /* Section tracking handler logic */
  const handleSectionClick = (e, targetId) => {
    e.preventDefault()
    setMenuOpen(false)

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(targetId)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const element = document.getElementById(targetId)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location.pathname, location.search])

  return (
    <header
      className={`navbar 
        ${scrolled ? 'navbar--scrolled' : ''} 
        ${menuOpen ? 'navbar--open' : ''} 
        ${isPortfolioPage ? 'navbar--solid' : ''}
      `}
    >
      <div className="navbar__inner">

        {/* LEFT LINKS */}
        <nav className="navbar__links navbar__links--left" aria-label="Left navigation">
          <Link
            to="/"
            className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
          >
            Home
          </Link>

          <a
            href="#about"
            className="navbar__link"
            onClick={(e) => handleSectionClick(e, 'about')}
          >
            About
          </a>

          <div
            className={`navbar__dropdown-wrapper ${dropdownOpen ? 'navbar__dropdown-wrapper--open' : ''}`}
            ref={dropdownRef}
          >
            <button
              type="button"
              className="navbar__link navbar__link--dropdown-trigger"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
            >
              Portfolio
              <span className="navbar__dropdown-caret">▾</span>
            </button>

            <ul className="navbar__dropdown" role="menu">
              {portfolioLinks.map(({ label, path }) => (
                <li key={label} role="none">
                  <Link
                    to={path}
                    role="menuitem"
                    className="navbar__dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* LOGO */}
       <Link to="/" className="navbar__logo" aria-label="Srimathi Photography">
  <span className="navbar__logo-text">
    Zoomin
    <small>Momentz</small>
  </span>
</Link>

        {/* RIGHT LINKS */}
        <nav className="navbar__links navbar__links--right" aria-label="Right navigation">
          <Link
            to="/portfolio"
            className={`navbar__link ${isPortfolioPage ? 'navbar__link--active' : ''}`}
          >
            Portfolio
          </Link>

          <a
            href="#contact"
            className="navbar__link"
            onClick={(e) => handleSectionClick(e, 'contact')}
          >
            Contact
          </a>
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <nav className="navbar__mobile-nav">
          <Link to="/" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <a
            href="#about"
            className="navbar__mobile-link"
            onClick={(e) => handleSectionClick(e, 'about')}
          >
            About
          </a>

          <details className="navbar__mobile-dropdown">
            <summary className="navbar__mobile-link">Portfolio</summary>
            <ul className="navbar__mobile-sub">
              {portfolioLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="navbar__mobile-sublink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          {/* Corrected Second Entry to Gallery Route */}
        
          <a
            href="#gallery"
            className="navbar__mobile-link"
            onClick={(e) => handleSectionClick(e, 'gallery')}
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="navbar__mobile-link"
            onClick={(e) => handleSectionClick(e, 'contact')}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}