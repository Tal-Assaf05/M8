import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCrewmates } from "../store/crewmateSlice";

const CrewmateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { crewmates, status, error } = useSelector((state) => state.crewmates);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCrewmates());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading crewmates...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (crewmates.length === 0) {
    return (
      <div className="empty-gallery">
        <h1>Your Crewmate Gallery!</h1>
        <p>You haven't made a crewmate yet!</p>
        <Link to="/create" className="create-link">
          Create one here!
        </Link>
      </div>
    );
  }

  const handleCardClick = (id) => {
    navigate(`/crewmate/${id}`);
  };

  return (
    <div className="gallery">
      <h1>Your Crewmate Gallery!</h1>
      <div className="crewmate-grid">
        {crewmates.map((crewmate) => (
          <div
            key={crewmate.id}
            className="crewmate-card"
            style={{
              borderColor: crewmate.color.toLowerCase(),
              boxShadow: `0 0 10px ${crewmate.color.toLowerCase()}`,
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(crewmate.id)}
          >
            <div className="crewmate-icon" />
            <div className="crewmate-info">
              <p>Name of Crewmate: {crewmate.name}</p>
              <p>Speed of Crewmate: {crewmate.speed} mph</p>
              <p>Color of Crewmate: {crewmate.color}</p>
              <p className="created-at">
                Created: {new Date(crewmate.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="card-actions">
              <Link
                to={`/crewmate/${crewmate.id}/edit`}
                className="edit-button"
                onClick={(e) => e.stopPropagation()}
              >
                Edit Crewmate
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewmateList;
