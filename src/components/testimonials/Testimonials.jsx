import { motion } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="section-title">WORDS OF LOVE</h2>
      <div className="testimonial-grid">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="testimonial-card"
        >
          <p className="quote-text">"Their work isn't just photography; it's art. They captured the true essence of our day."</p>
          <span className="client-name">— PRASANNA & HARINI</span>
        </motion.div>
        
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="testimonial-card"
        >
          <p className="quote-text">"An incredible storytelling experience. We felt so comfortable and the results are timeless."</p>
          <span className="client-name">— MURALI & MEENA</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;