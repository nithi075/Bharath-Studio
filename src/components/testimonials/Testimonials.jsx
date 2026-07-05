/* =============================================
   Testimonials — 3 rotating sets of 3 reviews
   ============================================= */
import { useState } from 'react'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    body: 'Visuals by KS beautifully captured every emotion of our wedding journey. From candid moments to traditional frames, every picture felt natural and timeless. The team made us comfortable throughout and gave us memories we will cherish forever.',
    couple: 'Harini + Karthik',
  },
  {
    id: 2,
    body: 'Choosing Visuals by KS for our engagement and wedding was the best decision. Their creativity, patience, and attention to detail were amazing. Every photo tells a story and the final output exceeded our expectations.',
    couple: 'Meera + Arjun',
  },
  {
    id: 3,
    body: 'The entire experience with Visuals by KS was wonderful. The team captured our pre-wedding shoot and wedding moments so beautifully. They understood our style and created pictures that truly reflected us.',
    couple: 'Divya + Rohit',
  },
  {
    id: 4,
    body: 'From the first discussion to final delivery, Visuals by KS handled everything professionally. The photographers were friendly, creative, and captured every little detail perfectly. We absolutely loved our wedding album.',
    couple: 'Priya + Sanjay',
  },
  {
    id: 5,
    body: 'A huge thanks to Visuals by KS for turning our special day into beautiful memories. The candid shots, videos, and edits were elegant and emotional. Their dedication and quality of work are truly impressive.',
    couple: 'Nandhini + Vishal',
  },
  {
    id: 6,
    body: 'Visuals by KS made us feel completely relaxed in front of the camera. Their team captured genuine smiles, emotions, and unforgettable moments. The final photos were beyond what we imagined.',
    couple: 'Swetha + Naveen',
  },
  {
    id: 7,
    body: 'Every frame delivered by Visuals by KS had a beautiful story behind it. Their balance of candid photography and traditional moments was perfect. We are so happy that they captured our big day.',
    couple: 'Ananya + Pranav',
  },
  {
    id: 8,
    body: 'Amazing experience working with Visuals by KS! The pre-wedding concepts, wedding coverage, and highlight videos were beautifully executed. A passionate team that truly loves creating memories.',
    couple: 'Keerthana + Rahul',
  },
  {
    id: 9,
    body: 'The Visuals by KS team did a fantastic job capturing our celebrations. Their patience, creativity, and commitment were visible in every photo and film. Highly recommended for couples looking for elegant memories.',
    couple: 'Aadhya + Siddharth',
  },
]

/* Group into pages of 3 */
const pages = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
  testimonials.slice(6, 9),
]

export default function Testimonials() {
  const [page, setPage] = useState(0)

  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <div className="testimonials__container">
        <span className="section-label" id="testimonials-heading">Testimonials</span>

        <div className="testimonials__grid">
          {pages[page].map((t) => (
            <article key={t.id} className="testimonial-card">
              {/* Quotation mark */}
              <span className="testimonial-card__quote" aria-hidden="true">"</span>
              <p className="testimonial-card__body">{t.body}</p>
              <footer className="testimonial-card__footer">
                <p className="testimonial-card__couple">{t.couple}</p>
              </footer>
            </article>
          ))}
        </div>

        {/* Page dots */}
        <div className="testimonials__dots" role="tablist" aria-label="Testimonial page">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot${i === page ? ' testimonials__dot--active' : ''}`}
              onClick={() => setPage(i)}
              role="tab"
              aria-selected={i === page}
              aria-label={`Testimonials page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
