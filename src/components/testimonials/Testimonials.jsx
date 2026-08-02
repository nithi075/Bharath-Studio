import { useEffect, useState } from 'react'
import './Testimonials.css'
import { apiGet } from '../../api/api'

// Existing testimonials - these always stay on the site as-is.
const REVIEWS = [
 
];

function Testimonials() {
  // Admin-added testimonials get merged in on top of the existing ones above.
  const [adminReviews, setAdminReviews] = useState([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    apiGet('/api/testimonials')
      .then((data) => setAdminReviews(data))
      .catch((err) => console.error('Failed to load admin testimonials:', err))
  }, [])

  const reviews = [...REVIEWS, ...adminReviews]

  // Auto-advance every 7s, paused implicitly by user interaction resetting index.
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [reviews.length])

  const goTo = (index) => setActive(index)
  const goPrev = () => setActive((prev) => (prev - 1 + reviews.length) % reviews.length)
  const goNext = () => setActive((prev) => (prev + 1) % reviews.length)

  return (
    <section id="testimonials" className="testimonials">
      <div className="container testimonials__inner">
        <p className="eyebrow">In Their Words</p>
        <h2 className="section-heading testimonials__heading">Kind words from <em>our</em> Clients</h2>

        <div className="testimonials__carousel">
          <button className="testimonials__arrow testimonials__arrow--left" onClick={goPrev} aria-label="Previous testimonial">&#8592;</button>

          <div className="testimonials__slide-window">
            <span className="testimonials__mark" aria-hidden="true">&#8220;</span>

            {reviews.map((review, index) => (
              <blockquote
                key={review._id || review.name}
                className={`testimonials__slide ${active === index ? 'is-active' : ''}`}
              >
                <p className="testimonials__quote">{review.quote}</p>
                <footer className="testimonials__attribution">
                  <span className="testimonials__name">{review.name}</span>
                  <span className="testimonials__venue">{review.venue}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          <button className="testimonials__arrow testimonials__arrow--right" onClick={goNext} aria-label="Next testimonial">&#8594;</button>
        </div>

        <div className="testimonials__dots">
          {reviews.map((review, index) => (
            <button
              key={review._id || review.name}
              className={`testimonials__dot ${active === index ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Show testimonial from ${review.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
