import './About.css'

import video1 from '../../assets/about1.mp4'
import video2 from '../../assets/about2.mp4'

export default function About() {
return ( <section className="about" id="about" aria-labelledby="about-heading"> <div className="about__container">


    {/* ---- Video Column ---- */}
    <div className="about__images">

      <div className="about__img-primary">
        <video
          className="about__video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video1} type="video/mp4" />
        </video>
      </div>

      <div className="about__img-secondary">
        <video
          className="about__video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video2} type="video/mp4" />
        </video>
      </div>

    </div>

    {/* ---- Text Column ---- */}
    <div className="about__text">
      <span className="section-label">
        Why Zoomin Momentz?
      </span>

      <h2 className="about__heading" id="about-heading">
        Capturing Love Stories With Timeless Elegance
      </h2>

      <p className="about__body">
        Every wedding tells a unique story, and our passion is turning
        those moments into lasting memories. From intimate glances and
        heartfelt emotions to grand celebrations, we blend creativity,
        storytelling, and cinematic artistry to preserve every detail
        beautifully. Our goal is to create photographs and films that
        allow you to relive your special day for years to come.
      </p>

      <a href="#contact" className="btn about__cta">
        Let's Talk
      </a>
    </div>

  </div>
</section>


)
}
