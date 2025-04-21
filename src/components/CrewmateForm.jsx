import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCrewmate,
  updateCrewmate,
  deleteCrewmate,
} from "../store/crewmateSlice";
import { supabase } from "../config/supabase";

const COLORS = [
  "red",
  "blue",
  "green",
  "pink",
  "orange",
  "yellow",
  "black",
  "white",
  "purple",
  "brown",
  "cyan",
  "lime",
];

const CrewmateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    speed: 1,
    color: "red",
  });
  const [error, setError] = useState(null);

  const crewmate = useSelector((state) =>
    state.crewmates.crewmates.find((c) => c.id === parseInt(id))
  );

  useEffect(() => {
    if (isEdit && crewmate) {
      setFormData({
        name: crewmate.name,
        speed: crewmate.speed,
        color: crewmate.color,
      });
    }
  }, [isEdit, crewmate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "speed" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEdit) {
        await dispatch(
          updateCrewmate({
            id: parseInt(id),
            crewmate: formData,
          })
        ).unwrap();
      } else {
        await dispatch(addCrewmate(formData)).unwrap();
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred while saving the crewmate");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crewmate?")) {
      return;
    }

    try {
      await dispatch(deleteCrewmate(parseInt(id))).unwrap();
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred while deleting the crewmate");
    }
  };

  return (
    <div className="crewmate-form-container">
      <h1>{isEdit ? "Edit Crewmate" : "Add New Crewmate"}</h1>
      {error && <div className="error-message">{error}</div>}
      <img
        src="/crewmates-group.svg"
        alt="Crewmates"
        className="crewmates-image"
      />
      {isEdit && (
        <div className="current-info">
          Current Crewmate Info:
          <p>
            Name: {formData.name}, Speed: {formData.speed}, Color:{" "}
            {formData.color}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="crewmate-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="speed">Speed:</label>
          <input
            type="number"
            id="speed"
            name="speed"
            value={formData.speed}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label>Color:</label>
          <div className="color-options">
            {COLORS.map((color) => (
              <label key={color} className="color-option">
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={formData.color === color}
                  onChange={handleChange}
                />
                <span style={{ color }}>{color}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            {isEdit ? "Update Crewmate" : "Add Crewmate"}
          </button>
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
