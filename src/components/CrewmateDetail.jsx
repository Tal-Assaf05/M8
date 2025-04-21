import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

const CrewmateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const crewmates = useSelector((state) => state.crewmates.crewmates);
  const crewmate = crewmates.find((c) => c.id === parseInt(id));

  if (!crewmate) {
    return (
      <div className="crewmate-detail error-state">
        <h1>Crewmate not found</h1>
        <p>Sorry, we couldn't find this crewmate.</p>
        <Link to="/gallery" className="primary-button">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const getSpeedComment = (speed) => {
    if (speed < 2)
      return "You may want to find a Crewmate with more speed, this one is kind of slow 😅";
    if (speed < 4) return "This Crewmate has decent speed!";
    return "Wow, this Crewmate is super fast! 🚀";
  };

  const formattedDate = new Date(crewmate.created_at).toLocaleString();

  return (
    <div className="crewmate-detail">
      <div className="detail-header">
        <h1>Crewmate: {crewmate.name}</h1>
        <div className="detail-actions">
          <Link to={`/crewmate/${id}/edit`} className="edit-button">
            Edit Crewmate
          </Link>
          <button onClick={() => navigate("/gallery")} className="back-button">
            Back to Gallery
          </button>
        </div>
      </div>

      <div className="crewmate-icon-container">
        <img
          src="/crewmate-icon.svg"
          alt={`${crewmate.name} the Crewmate`}
          className="crewmate-icon detail-icon"
          style={{ filter: `drop-shadow(0 0 10px ${crewmate.color})` }}
        />
      </div>

      <div className="stats-section">
        <h2>Stats & Information</h2>
        <div className="stat-grid">
          <div className="stat-item">
            <label>Name:</label>
            <span>{crewmate.name}</span>
          </div>
          <div className="stat-item">
            <label>Color:</label>
            <span style={{ color: crewmate.color }}>{crewmate.color}</span>
          </div>
          <div className="stat-item">
            <label>Speed:</label>
            <span>{crewmate.speed} mph</span>
          </div>
          <div className="stat-item">
            <label>Created:</label>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="speed-analysis">
          <h3>Speed Analysis</h3>
          <p className="speed-comment">{getSpeedComment(crewmate.speed)}</p>
          <div
            className="speed-meter"
            style={{ width: `${crewmate.speed * 10}%` }}
          />
        </div>
      </div>

      <img
        src="/crewmates-footer.svg"
        alt="Crewmates"
        className="footer-image"
      />
    </div>
  );
};

export default CrewmateDetail;
