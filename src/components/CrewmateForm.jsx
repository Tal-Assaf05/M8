import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCrewmate,
  updateCrewmate,
  deleteCrewmate,
} from "../store/crewmateSlice";

const CrewmateForm = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const crewmates = useSelector((state) => state.crewmates.crewmates);

  const [formData, setFormData] = useState({
    name: "",
    color: "red",
    role: "crewmate",
  });

  useEffect(() => {
    if (isEdit && id) {
      const crewmate = crewmates.find((c) => c.id === parseInt(id));
      if (crewmate) {
        setFormData(crewmate);
      }
    }
  }, [isEdit, id, crewmates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateCrewmate(formData));
    } else {
      dispatch(addCrewmate(formData));
    }
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this crewmate?")) {
      dispatch(deleteCrewmate(parseInt(id)));
      navigate("/");
    }
  };

  return (
    <div className="crewmate-form">
      <h1>{isEdit ? "Edit Crewmate" : "Create New Crewmate"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Color:</label>
          <div className="color-options">
            {["red", "blue", "green", "yellow", "black", "white"].map(
              (color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${
                    formData.color === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                />
              )
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Role:</label>
          <div className="role-options">
            {["crewmate", "imposter", "scientist", "engineer"].map((role) => (
              <button
                key={role}
                type="button"
                className={`role-option ${
                  formData.role === role ? "selected" : ""
                }`}
                onClick={() => setFormData({ ...formData, role })}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">{isEdit ? "Update" : "Create"}</button>
          {isEdit && (
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CrewmateForm;
