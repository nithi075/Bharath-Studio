import { useState } from 'react'
import './Footer.css'

const FOOTER_LINKS = {
  Studio: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
  ],
  Explore: [
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
}

const SOCIALS = [
  {
    name: 'Instagram',
    link: 'https://instagram.com/',
  },
  {
    name: 'Facebook',
    link: 'https://facebook.com/',
  },
  {
    name: 'YouTube',
    link: 'https://youtube.com/',
  },
]

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()

    if (!email) return

    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container footer__top">
        {/* Brand */}
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <span>Bharath</span>
            <span>Studio</span>
          </a>

          <p className="footer__tagline">
            Professional Photography, Videography & Creative Visual Storytelling.
          </p>

         
        </div>

        {/* Links */}
        <div className="footer__columns">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div className="footer__column" key={heading}>
              <p className="footer__column-heading">
                {heading}
              </p>

              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="footer__column">
            <p className="footer__column-heading">
              Follow Us
            </p>

            <ul>
              {SOCIALS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <span className="footer__monogram" aria-hidden="true">
        📷
      </span>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            &copy; {new Date().getFullYear()} Bharath Studio. All Rights Reserved.
          </p>

          <p>
            Designed & Developed by Bharath Studio
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer