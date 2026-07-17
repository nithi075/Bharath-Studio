import { useEffect, useState } from 'react'
import './Testimonials.css'

const REVIEWS = [
  {
    quote:
      "Thank you Bharath Studio for beautifully capturing our wedding. Every photograph feels natural and full of emotion. The team was patient, professional, and made us feel comfortable throughout the day. We couldn't have asked for better memories.",
    name: "Mr. Aravind & Mrs. Keerthana",
    venue: "Tirunelveli",
  },
  {
    quote:
      "The outdoor pre-wedding shoot exceeded our expectations. Every frame looked cinematic and elegant. The team's creativity, punctuality, and friendly approach made the entire experience enjoyable.",
    name: "Mr. Karthik & Mrs. Nivetha",
    venue: "Palayamkottai",
  },
  {
    quote:
      "Our daughter's Bharatanatyam Arangetram was captured perfectly. Every important moment, expression, and performance was beautifully preserved. We sincerely thank Bharath Studio for their dedication and excellent work.",
    name: "Mrs. Meenakshi",
    venue: "Shivaank Nrithyalaya, Palayamkottai",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0)

  // Auto-advance every 7s, paused implicitly by user interaction resetting index.
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % REVIEWS.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index) => setActive(index)
  const goPrev = () => setActive((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
  const goNext = () => setActive((prev) => (prev + 1) % REVIEWS.length)

  return (
    <section id="testimonials" className="testimonials">
      <div className="container testimonials__inner">
        <p className="eyebrow">In Their Words</p>
        <h2 className="section-heading testimonials__heading">Kind words from <em>our</em> Clients</h2>

        <div className="testimonials__carousel">
          <button className="testimonials__arrow testimonials__arrow--left" onClick={goPrev} aria-label="Previous testimonial">&#8592;</button>

          <div className="testimonials__slide-window">
            <span className="testimonials__mark" aria-hidden="true">&#8220;</span>

            {REVIEWS.map((review, index) => (
              <blockquote
                key={review.name}
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
          {REVIEWS.map((review, index) => (
            <button
              key={review.name}
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
