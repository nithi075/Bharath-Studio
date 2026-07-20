import { useState } from 'react'
import './Services.css'

// Images
import ServiceImg1 from '../../assets/p1.jpg'
import ServiceImg4 from '../../assets/p4.jpg'

// Videos
import Video1 from '../../assets/about.mp4'
import Video2 from '../../assets/about2.mp4'

const SERVICES = [
  {
    number: '01',
    title: 'Photography',
    description:
      'Professional photography for brands, products, events, portraits, and commercial projects with a creative approach.',
    type: 'image',
    media: ServiceImg1,
  },
  {
    number: '02',
    title: 'Videography',
    description:
      'High-quality cinematic video production for businesses, events, advertisements, and social media content.',
    type: 'video',
    media: Video1,
  },
  {
    number: '03',
    title: 'Product Shoots',
    description:
      'Creative product photography designed to highlight your brand and showcase every detail with precision.',
    type: 'video',
    media: Video2,
  },
  {
    number: '04',
    title: 'Photo & Video Editing',
    description:
      'Professional editing, color grading, retouching, and post-production to deliver polished final visuals.',
    type: 'image',
    media: ServiceImg4,
  },
]

function Services() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" className="services">
      <div className="container services__grid">
        {/* Left Content */}
        <div className="services__list-col">
          <p className="eyebrow">What We Offer</p>

          <h2 className="section-heading services__heading">
            Our <em>Services</em>
          </h2>

          <ul className="services__list">
            {SERVICES.map((service, index) => (
              <li
                key={service.number}
                className={`services__item ${
                  activeIndex === index ? 'is-active' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="services__number">{service.number}</span>

                <div className="services__text">
                  <h3 className="services__title">{service.title}</h3>
                  <p className="services__description">
                    {service.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Media */}
        <div className="services__image-col">
          {SERVICES.map((service, index) => (
            <div
              key={service.number}
              className={`services__image-placeholder ${
                activeIndex === index ? 'is-visible' : ''
              }`}
            >
              {service.type === 'image' ? (
                <img
                  src={service.media}
                  alt={service.title}
                  className="services__image"
                />
              ) : (
                <video
                  className="services__image"
                  src={service.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services