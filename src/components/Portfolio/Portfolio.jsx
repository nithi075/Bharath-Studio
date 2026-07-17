import { useState } from "react";
import "./Portfolio.css";

import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/p4.jpg";
import p5 from "../../assets/p5.jpg";
import p6 from "../../assets/p6.jpg";
import p7 from "../../assets/p7.jpg";
import p8 from "../../assets/p8.jpg";

const FILTERS = ['All', 'Classic', 'Garden', 'Ballroom']

const WEDDINGS = [
  {
    id: 1,
    image: p1,
   
    size: "tall",
  },
  {
    id: 2,
    image: p2,
 
    size: "short",
  },
  {
    id: 3,
    image: p3,
  
    size: "wide",
  },
  {
    id: 4,
    image: p4,
   
    size: "short",
  },
  {
    id: 5,
    image: p5,
   
    size: "tall",
  },
  {
    id: 6,
    image: p6,
  
    size: "short",
  },
  {
    id: 7,
    image: p7,
  
    size: "wide",
  },
  {
    id: 8,
    image: p8,
 
    size: "short",
  },
];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleWeddings =
    activeFilter === 'All'
      ? WEDDINGS
      : WEDDINGS.filter((w) => w.category === activeFilter)

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio__header">
          <div>
            <p className="eyebrow">Real Weddings</p>
            <h2 className="section-heading">A few days we've <em>witnessed</em></h2>
          </div>

        
        </div>

        <div className="portfolio__grid">
          {visibleWeddings.map((wedding) => (
            <div className={`portfolio__item portfolio__item--${wedding.size}`} key={wedding.id}>
              <img
  src={wedding.image}
  className="portfolio__image"
/>
              <div className="portfolio__overlay">
                <span className="portfolio__zoom" aria-hidden="true">+</span>
                <p className="portfolio__couple">{wedding.couple}</p>
                <p className="portfolio__venue">{wedding.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
