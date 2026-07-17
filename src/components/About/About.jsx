import "./About.css";
import aboutVideo from "../../assets/about.mp4"; // உங்கள் video

const STATS = [
  { value: "194", suffix: "", label: "Creative Projects Completed" },
  { value: "3.8", suffix: "K+", label: "Instagram Community" },
  { value: "12", suffix: "+", label: "Photography Services Offered" },
];

function About() {
  return (
    <section id="about" className="about">
      <div className="container about__grid">

        <div className="about__image-wrap">

          <video
            className="about__video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={aboutVideo} type="video/mp4" />
          </video>

          <span className="about__image-caption">
            Capturing Stories Through Our Lens
          </span>

          <div className="about__image-accent" />

        </div>

        <div className="about__content">
          <p className="eyebrow">Bharath Studio • Tirunelveli</p>

          <h2 className="section-heading about__heading">
            Turning Your <em>Moments</em> Into <br />
            Timeless Memories.
          </h2>

          <p className="about__paragraph">
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