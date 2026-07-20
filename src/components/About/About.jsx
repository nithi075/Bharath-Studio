import "./About.css";

import aboutVideo1 from "../../assets/about.mp4";
import aboutVideo2 from "../../assets/about2.mp4";

const STATS = [
  { value: "194", suffix: "", label: "Creative Projects Completed" },
  { value: "3.8", suffix: "K+", label: "Instagram Community" },
  { value: "12", suffix: "+", label: "Photography Services Offered" },
];

function About() {
  return (
    <section id="about" className="about">
      <div className="container about__grid">

        {/* Videos */}
        <div className="about__videos">

          <div className="about__video-wrap">
            <video
              className="about__video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={aboutVideo1} type="video/mp4" />
            </video>
          </div>

          <div className="about__video-wrap about__video-wrap--offset">
            <video
              className="about__video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={aboutVideo2} type="video/mp4" />
            </video>
          </div>

          <span className="about__image-caption">
            Capturing Stories Through Our Lens
          </span>

        </div>

        {/* Content */}
        <div className="about__content">
          <p className="eyebrow">Bharath Studio • Tirunelveli</p>

          <h2 className="section-heading about__heading">
            Turning Your <em>Moments</em> Into <br />
            Timeless Memories.
          </h2>

          <p className="about__paragraph about__paragraph--lead">
            Bharath Studio is a passionate photography company based in
            Tirunelveli, dedicated to capturing emotions, celebrations, and
            unforgettable memories through creative storytelling.
          </p>

          <p className="about__paragraph">
            From grand weddings and outdoor shoots to corporate events,
            advertising campaigns, and cinematic portraits, our experienced
            team blends creativity with professionalism.
          </p>

          <div className="about__stats">
            {STATS.map((stat) => (
              <div className="about__stat" key={stat.label}>
                <span className="about__stat-value">
                  {stat.value}
                  <span className="about__stat-suffix">{stat.suffix}</span>
                </span>

                <span className="about__stat-label">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;