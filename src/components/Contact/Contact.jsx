import { useState } from 'react'
import './Contact.css'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Here you can integrate EmailJS / Formspree / Backend API
    console.log(form)

    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <section id="contact" className="contact">
      <div className="container contact__grid">

        {/* Left Side */}
        <div className="contact__info">
          <p className="eyebrow">Let's Talk</p>

          <h2 className="section-heading contact__heading">
            Let's Create Something <em>Amazing</em>
          </h2>

          <p className="contact__lead">
            Whether you need photography, videography, product shoots,
            commercial projects, or creative content, we'd love to hear
            about your ideas. Fill out the form and we'll get back to you
            as soon as possible.
          </p>

          <ul className="contact__details">
          

            <li>
              <span className="contact__details-label">Email</span>
              <span>bharathstudio@gmail.com</span>
            </li>

            <li>
              <span className="contact__details-label">Phone</span>
              <span>+91 70100 92498</span>
            </li>

            <li>
              <span className="contact__details-label">Hours</span>
              <span>Mon - Sat | 9:00 AM - 7:00 PM</span>
            </li>
          </ul>

        
        </div>

        {/* Right Side Form */}
        <form className="contact__form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="contact__success">
              <p className="contact__success-heading">
                Thank You!
              </p>

              <p>
                We've received your message and will contact you shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="contact__row">
                <label className="contact__field">
                  <span>Your Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="contact__field">
                  <span>Email Address</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="contact__row">
                <label className="contact__field">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="contact__field">
                  <span>Service</span>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="Photography">
                      Photography
                    </option>
                    <option value="Videography">
                      Videography
                    </option>
                    <option value="Product Shoot">
                      Product Shoot
                    </option>
                    <option value="Photo Editing">
                      Photo Editing
                    </option>
                    <option value="Video Editing">
                      Video Editing
                    </option>
                    <option value="Commercial Shoot">
                      Commercial Shoot
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </label>
              </div>

              <label className="contact__field">
                <span>Project Details</span>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                />
              </label>

              <button
                type="submit"
                className="btn-primary contact__submit"
              >
                Send Message
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact