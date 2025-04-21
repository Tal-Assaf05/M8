import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const CrewmateDetail = () => {
  const { id } = useParams();
  const crewmates = useSelector((state) => state.crewmates.crewmates);
  const crewmate = crewmates.find((c) => c.id === parseInt(id));

  if (!crewmate) {
    return <div>Crewmate not found</div>;
  }

  return (
    <div className="crewmate-detail">
      <h1>{crewmate.name}</h1>
      <div className="crewmate-info">
        <div className="info-group">
          <h3>Color</h3>
          <div
            className="color-display"
            style={{ backgroundColor: crewmate.color }}
          />
        </div>
        <div className="info-group">
          <h3>Role</h3>
          <p>{crewmate.role}</p>
        </div>
        <div className="info-group">
          <h3>Created At</h3>
          <p>{new Date(crewmate.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="detail-actions">
        <Link to={`/crewmate/${id}/edit`} className="edit-button">
          Edit Crewmate
        </Link>
        <Link to="/" className="back-button">
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default CrewmateDetail;
