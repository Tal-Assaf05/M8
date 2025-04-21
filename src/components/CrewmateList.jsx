import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CrewmateList = () => {
  const crewmates = useSelector((state) => state.crewmates.crewmates);

  return (
    <div className="crewmate-list">
      <h1>Crewmate List</h1>
      <div className="crewmate-grid">
        {crewmates.map((crewmate) => (
          <div key={crewmate.id} className="crewmate-card">
            <Link to={`/crewmate/${crewmate.id}`}>
              <h2>{crewmate.name}</h2>
              <p>Color: {crewmate.color}</p>
              <p>Role: {crewmate.role}</p>
            </Link>
            <div className="crewmate-actions">
              <Link
                to={`/crewmate/${crewmate.id}/edit`}
                className="edit-button"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewmateList;
