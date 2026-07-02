/* =============================================
   Gallery — "Selected Works" masonry grid
   21 photos, hover overlay, lightbox-style zoom
   ============================================= */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Gallery.css'
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img12.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'
import img5 from '../../assets/img5.jpg'
import img6 from '../../assets/img6.jpg'
import img7 from '../../assets/img11.jpg'
import img8 from '../../assets/img8.jpg'
import img9 from '../../assets/img7.jpg'
import img10 from '../../assets/img10.jpg'
import img11 from '../../assets/img9.jpg'
import img12 from '../../assets/img2.jpg'
import img13 from '../../assets/img13.jpg'
import img14 from '../../assets/img15.jpg'
import img15 from '../../assets/img17.jpg'
import img16 from '../../assets/img16.jpg'
import img17 from '../../assets/img14.jpg'
import img18 from '../../assets/img18.jpg'
import img19 from '../../assets/img19.jpg'
import img20 from '../../assets/img20.jpg'
import img21 from '../../assets/img21.jpg'
import img22 from '../../assets/img22.jpg'

const photos = [
  { id: 1, src: img1, alt: 'Wedding Photography' },
  { id: 2, src: img2, alt: 'Wedding Photography' },
  { id: 3, src: img3, alt: 'Wedding Photography' },
  { id: 4, src: img4, alt: 'Wedding Photography' },
  { id: 5, src: img5, alt: 'Wedding Photography' },
  { id: 6, src: img6, alt: 'Wedding Photography' },
  { id: 7, src: img7, alt: 'Wedding Photography' },
  { id: 8, src: img8, alt: 'Wedding Photography' },
  { id: 9, src: img9, alt: 'Wedding Photography' },
  { id: 10, src: img10, alt: 'Wedding Photography' },
  { id: 11, src: img11, alt: 'Wedding Photography' },
  { id: 12, src: img12, alt: 'Wedding Photography' },
  { id: 13, src: img13, alt: 'Wedding Photography' },
  { id: 14, src: img14, alt: 'Wedding Photography' },
  { id: 15, src: img15, alt: 'Wedding Photography' },
  { id: 16, src: img16, alt: 'Wedding Photography' },
  { id: 17, src: img17, alt: 'Wedding Photography' },
  { id: 18, src: img18, alt: 'Wedding Photography' },
  { id: 19, src: img19, alt: 'Wedding Photography' },
  { id: 20, src: img20, alt: 'Wedding Photography' },
  { id: 21, src: img21, alt: 'Wedding Photography' },
  { id: 22, src: img22, alt: 'Wedding Photography' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (photo) => setLightbox(photo)
  const closeLightbox = () => setLightbox(null)

  /* Keyboard: Escape closes, arrows navigate */
  const handleKeyDown = (e) => {
    if (!lightbox) return
    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowRight') {
      const idx = photos.findIndex(p => p.id === lightbox.id)
      setLightbox(photos[(idx + 1) % photos.length])
    } else if (e.key === 'ArrowLeft') {
      const idx = photos.findIndex(p => p.id === lightbox.id)
      setLightbox(photos[(idx - 1 + photos.length) % photos.length])
    }
  }

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-heading">
      <div className="gallery__header">
        <h2 className="gallery__heading" id="gallery-heading">Selected works</h2>
      </div>

      {/* Masonry-style CSS grid */}
      <div className="gallery__grid">
        {photos.map((photo) => (
          <button
            key={photo.id}
            className="gallery__item"
            onClick={() => openLightbox(photo)}
            aria-label={`View photo: ${photo.alt}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="gallery__img"
            />
            <div className="gallery__item-overlay" aria-hidden="true">
              <span className="gallery__item-zoom">+</span>
            </div>
          </button>
        ))}
      </div>

    <div className="gallery__footer">
  <Link to="/portfolio" className="btn">
    View Portfolio
  </Link>
</div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            className="gallery__lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="gallery__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Prev / Next */}
          <button
            className="gallery__lightbox-nav gallery__lightbox-nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              const idx = photos.findIndex(p => p.id === lightbox.id)
              setLightbox(photos[(idx - 1 + photos.length) % photos.length])
            }}
            aria-label="Previous photo"
          >‹</button>
          <button
            className="gallery__lightbox-nav gallery__lightbox-nav--next"
            onClick={(e) => {
              e.stopPropagation()
              const idx = photos.findIndex(p => p.id === lightbox.id)
              setLightbox(photos[(idx + 1) % photos.length])
            }}
            aria-label="Next photo"
          >›</button>
        </div>
      )}
    </section>
  )
}
