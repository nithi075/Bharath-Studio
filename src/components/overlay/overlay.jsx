import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./overlay.css";

export default function OverlayForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventDate: "",
    event: "",
    crowd: "",
    location: "",
    budget: "",
    customBudget: "",
    message: ""
  });

  const eventOptions = [
    "Wedding & Reception",
    "Reception",
    "Engagement",
    "Christian Weddings",
    "Birthday",
    "Modeling & Portfolio Shoots",
    "Baby Shoot",
    "Ear Piercing Ceremony",
    "Half Saree Ceremony",
    "Name Ceremony",
    "Corporate Events"
  ];

  const weddingBudgets = [
    "Bronze ₹55K - ₹65K",
    "Silver ₹70K - ₹80K",
    "Gold ₹80K - ₹90K",
    "Diamond ₹130K - ₹150K",
    "Luxury ₹2L - ₹3L",
    "Royal ₹3L - ₹12L",
    "Custom"
  ];

  const christianWeddingBudgets = [
    "Bronze ₹30K",
    "Silver ₹40K",
    "Gold ₹50K - ₹60K",
    "Platinum ₹65K - ₹1L",
    "Diamond Above ₹1.5L",
    "Luxury ₹2L - ₹3L",
    "Royal ₹3L - ₹12L",
    "Custom"
  ];

  const modelingBudgets = [
    "Bronze ₹20K - ₹30K",
    "Silver ₹30K - ₹45K",
    "Gold ₹45K - ₹60K",
    "Diamond ₹60K - ₹90K",
    "Royal Above ₹1L",
    "Custom"
  ];

  const normalBudgets = [
    "Bronze ₹18K - ₹24K",
    "Silver ₹28K - ₹32K",
    "Gold ₹40K - ₹50K",
    "Diamond ₹65K - ₹75K",
    "Custom"
  ];

  const getBudgetOptions = () => {
    if (formData.event === "Wedding & Reception")
      return weddingBudgets;

    if (formData.event === "Christian Weddings")
      return christianWeddingBudgets;

    if (formData.event === "Modeling & Portfolio Shoots")
      return modelingBudgets;

    return normalBudgets;
  };

  const selectedBudgetOptions = getBudgetOptions();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "event" ? { budget: "" } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "918680068246";

    const whatsappMessage = `🚨 New Inquiry

👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📅 Event Date: ${formData.eventDate}
🎉 Event Type: ${formData.event}
👥 Crowd: ${formData.crowd}
📍 Location: ${formData.location}
💰 Budget: ${
      formData.budget === "Custom"
        ? formData.customBudget
        : formData.budget
    }

📝 Message:
${formData.message}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );
  };

  return (
    <div className="overlay-form">
      <div
        className="overlay-bg"
        onClick={() => navigate("/")}
      />

      <div className="form-container">

        <button
          className="form-close-btn"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        <h2>Book Your Event</h2>

        <p className="form-subtitle">
          We don’t shoot weddings.
          We craft cinematic legacies.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Whatsapp Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Event Date *</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Event Type *</label>

            <select
              name="event"
              value={formData.event}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Event
              </option>

              {eventOptions.map((event) => (
                <option
                  key={event}
                  value={event}
                >
                  {event}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Expected Crowd *</label>

            <input
              type="number"
              name="crowd"
              placeholder="Approx Guests"
              value={formData.crowd}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Event Location *</label>

            <input
              type="text"
              name="location"
              placeholder="Chennai"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Expected Budget</label>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="">
                Select Budget
              </option>

              {selectedBudgetOptions.map((budget) => (
                <option
                  key={budget}
                  value={budget}
                >
                  {budget}
                </option>
              ))}
            </select>
          </div>

          {formData.budget === "Custom" && (
            <div className="input-group">
              <label>Custom Budget</label>

              <input
                type="text"
                name="customBudget"
                placeholder="Enter budget"
                value={formData.customBudget}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="input-group">
            <label>Additional Details</label>

            <textarea
              rows="5"
              name="message"
              placeholder="Tell us about your event..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            SEND TO WHATSAPP
          </button>
        </form>
      </div>
    </div>
  );
}