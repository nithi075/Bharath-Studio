import { motion } from 'framer-motion';
import './Instagram.css';

import gallery1 from '../../assets/gal1.jpg';
import gallery2 from '../../assets/gal2.jpg';
import gallery3 from '../../assets/gal3.jpg';
import gallery4 from '../../assets/gal6.jpg';
import gallery5 from '../../assets/gal4.jpg';
import gallery6 from '../../assets/gal5.jpg';

const Instagram = () => {
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
  ];

  return (
    <section className="insta-feed" id="instagram">

      <h2 className="insta-feed__title">
        VISUAL NARRATIVES
      </h2>

      <a
        href="https://www.instagram.com/zoomin_momentz/"
        target="_blank"
        rel="noopener noreferrer"
        className="insta-feed__handle"
      >
        @zoomin_momentz
      </a>

      <div className="insta-feed__grid">

        {images.map((img, i) => (

          <motion.div
            key={i}
            className="insta-feed__item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className="insta-feed__image">
              <img
                src={img}
                alt={`Instagram Post ${i + 1}`}
                loading="lazy"
              />
            </div>
          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default Instagram;