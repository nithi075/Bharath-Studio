import "./About.css";

import aboutVideo1 from "../../assets/about.mp4";
import aboutVideo2 from "../../assets/about2.mp4";

const STATS = [
  { value: "15", suffix: "+", label: "Years of Experience" },
  { value: "500", suffix: "+", label: "Projects Completed" },
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
            Bharath Studio is a trusted photography company based in
            Tirunelveli with over <strong>15+ years of experience</strong> in
            capturing emotions, celebrations, and unforgettable memories
            through creative storytelling.
          </p>

          <p className="about__paragraph">
            Having successfully completed <strong>500+ photography projects</strong>,
            we specialize in weddings, outdoor shoots, corporate events,
            advertising campaigns, cinematic portraits, and much more. Our
            experienced team blends creativity with professionalism to deliver
            timeless visuals that tell your unique story.
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