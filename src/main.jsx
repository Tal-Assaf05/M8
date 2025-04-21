import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Add dark theme to root HTML element
document.documentElement.style.backgroundColor = "#1a1a1a";
document.body.style.margin = "0";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
