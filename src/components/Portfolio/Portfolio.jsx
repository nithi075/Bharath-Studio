/* =============================================
   Portfolio — Category filter tabs + photo grid
   8 categories: Portraits, Pre Weddings,
   Tamil/Telugu/Brahmin/Christian/Muslim Weddings,
   Engagement
   ============================================= */
import { useState } from 'react'
import './Portfolio.css'
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'
import img5 from '../../assets/img5.jpg'
import img6 from '../../assets/img6.jpg'
import img7 from '../../assets/img7.jpg'
import img8 from '../../assets/img8.jpg'
import img9 from '../../assets/img9.jpg'
import img10 from '../../assets/img10.jpg'
import img11 from '../../assets/img11.jpg'
import img12 from '../../assets/img12.jpg'
import img13 from '../../assets/img13.jpg'
import img14 from '../../assets/img14.jpg'
import img15 from '../../assets/img15.jpg'
import img16 from '../../assets/img16.jpg'
import img17 from '../../assets/img17.jpg'
import img18 from '../../assets/img18.jpg'
import img19 from '../../assets/img19.jpg'
import img20 from '../../assets/img20.jpg'
import img21 from '../../assets/img21.jpg'
import img22 from '../../assets/img22.jpg'

const categories = [
  { id: 'all', label: 'All' },

  { id: 'wedding', label: 'Wedding' },
  { id: 'reception', label: 'Reception' },
  { id: 'prewedding', label: 'Pre Wedding' },
  { id: 'postwedding', label: 'Post Wedding' },
  { id: 'engagement', label: 'Engagement' },

  { id: 'corporate', label: 'Corporate Event' },
  { id: 'birthday', label: 'Birthday' },

  { id: 'maternity', label: 'Maternity' },
  { id: 'babyshower', label: 'Baby Shower' },
]

const categoryDescriptions = {
  all: 'Explore our complete collection of weddings, celebrations and special moments.',

  wedding:
    'Timeless wedding photography capturing emotions, traditions and unforgettable moments.',

  reception:
    'Elegant reception coverage filled with celebrations, candid moments and grand memories.',

  prewedding:
    'Creative pre-wedding sessions that beautifully tell your love story.',

  postwedding:
    'Romantic post-wedding portraits captured without the rush of the wedding day.',

  engagement:
    'Memorable engagement photography celebrating the beginning of a beautiful journey.',

  corporate:
    'Professional corporate event photography for conferences, launches and business gatherings.',

  birthday:
    'Fun and vibrant birthday photography capturing every joyful celebration.',

  maternity:
    'Beautiful maternity portraits celebrating motherhood and new beginnings.',

  babyshower:
    'Heartwarming baby shower photography filled with love, laughter and family moments.'
}

const portfolioItems = [
  { id: 1, cat: 'wedding', src: img1 },
  { id: 2, cat: 'wedding', src: img2 },
  { id: 3, cat: 'wedding', src: img5 },

  { id: 4, cat: 'prewedding', src: img2 },
  { id: 5, cat: 'prewedding', src: img4 },
  { id: 6, cat: 'wedding', src: img6 },

  { id: 7, cat: 'wedding', src: img10 },
  { id: 8, cat: 'wedding', src: img11 },
  { id: 9, cat: 'wedding', src: img12 },

  { id: 10, cat: 'engagement', src: img10 },
  { id: 11, cat: 'engagement', src: img11 },
  { id: 12, cat: 'engagement', src: img12 },

  { id: 13, cat: 'reception', src: img13 },
  { id: 14, cat: 'reception', src: img14 },
  { id: 15, cat: 'reception', src: img15 },

  { id: 16, cat: 'maternity', src: img16 },
  { id: 17, cat: 'maternity', src: img17 },
  { id: 18, cat: 'maternity', src: img18 },

  { id: 19, cat: 'birthday', src: img19 },
  { id: 20, cat: 'birthday', src: img20 },

  { id: 21, cat: 'engagement', src: img21 },
  { id: 22, cat: 'engagement', src: img22 },
]

export default function Portfolio() {
  const [active,   setActive]   = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'all'
    ? portfolioItems
    : portfolioItems.filter(p => p.cat === active)

  const openLightbox  = (item) => setLightbox(item)
  const closeLightbox = ()     => setLightbox(null)

  const navigate = (dir) => {
    const list = active === 'all' ? portfolioItems : portfolioItems.filter(p => p.cat === active)
    const idx  = list.findIndex(p => p.id === lightbox.id)
    setLightbox(list[(idx + dir + list.length) % list.length])
  }

  return (
    <section className="portfolio" id="portfolio" aria-labelledby="portfolio-heading">

      {/* ---- Header ---- */}
      <div className="portfolio__header">
        <span className="section-label">Our Work</span>
        <h2 className="portfolio__heading" id="portfolio-heading">Portfolio</h2>
        <p className="portfolio__sub">
          From intimate portraits to grand celebrations — every frame tells a story.
        </p>
      </div>

      {/* ---- Filter tabs ---- */}
      <div className="portfolio__filters" role="tablist" aria-label="Portfolio categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`portfolio__filter-btn${active === cat.id ? ' portfolio__filter-btn--active' : ''}`}
            onClick={() => setActive(cat.id)}
            role="tab"
            aria-selected={active === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="portfolio__category-info">

  <p>{categoryDescriptions[active]}</p>
</div>

      {/* ---- Photo grid ---- */}
      <div className="portfolio__grid" key={active}>
  {filtered.map((item, i) => (
    <button
      key={item.id}
      className="portfolio__item"
      style={{ animationDelay: `${i * 40}ms` }}
      onClick={() => openLightbox(item)}
      aria-label={item.alt}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="portfolio__img"
      />

      <div className="portfolio__overlay">
        <span className="portfolio__overlay-icon">+</span>
      </div>
    </button>
  ))}
</div>
      {/* ---- Lightbox ---- */}
      {lightbox && (
        <div
          className="portfolio__lightbox"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          onKeyDown={e => {
            if (e.key === 'Escape')     closeLightbox()
            if (e.key === 'ArrowRight') navigate(1)
            if (e.key === 'ArrowLeft')  navigate(-1)
          }}
          tabIndex={-1}
        >
          <button className="portfolio__lb-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="portfolio__lb-img"
            onClick={e => e.stopPropagation()}
          />
          <button className="portfolio__lb-nav portfolio__lb-nav--prev"
            onClick={e => { e.stopPropagation(); navigate(-1) }} aria-label="Previous">‹</button>
          <button className="portfolio__lb-nav portfolio__lb-nav--next"
            onClick={e => { e.stopPropagation(); navigate(1) }}  aria-label="Next">›</button>
        </div>
      )}
    </section>
  )
}
