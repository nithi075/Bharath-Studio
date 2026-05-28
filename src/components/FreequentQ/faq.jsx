import { useState } from 'react';
import './faq.css';

const FAQ = () => {

  const faqData = [

    {
      question: "HOW DO WE BOOK?",
      answer:
        "We invite you to reach out via our contact form to discuss your wedding date and vision.",
    },

    {
      question: "DO YOU TRAVEL?",
      answer:
        "Yes, we document stories worldwide and love capturing celebrations in new destinations.",
    },

    {
      question: "DELIVERY TIME?",
      answer:
        "Your curated collection of images will be delivered within 8-10 weeks after the wedding.",
    },

  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (

    <section className="faq-section">

      {/* HEADER */}

      <div className="faq-header">

        <p className="faq-mini">
          Information
        </p>

        <h2 className="faq-title">
          THE DETAILS
        </h2>

      </div>

      {/* FAQ LIST */}

      <div className="faq-list">

        {faqData.map((item, index) => (

          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >

            {/* QUESTION */}

            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >

              <span>{item.question}</span>

              <span className="faq-icon">
                {activeIndex === index ? '−' : '+'}
              </span>

            </button>

            {/* ANSWER */}

            <div
              className={`faq-answer ${
                activeIndex === index ? 'show' : ''
              }`}
            >

              <p>{item.answer}</p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default FAQ;
