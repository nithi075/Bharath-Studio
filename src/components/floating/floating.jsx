import "./floating.css";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

export default function FloatingChat() {

  const navigate = useNavigate();

  return (
    <div className="floating-container">

      <button
        className="floating-chat-glass icon-btn"
        onClick={() => navigate("/book-event")}
        aria-label="Book Event"
      >
        <span className="shimmer-effect"></span>

        <FiCalendar className="floating-icon" />
      </button>

      <div className="floating-glow"></div>

    </div>
  );
}