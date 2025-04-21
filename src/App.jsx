import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import CrewmateList from "./components/CrewmateList";
import CrewmateForm from "./components/CrewmateForm";
import CrewmateDetail from "./components/CrewmateDetail";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <nav className="sidebar">
            <Link to="/">Home</Link>
            <Link to="/create">Create a Crewmate!</Link>
            <Link to="/gallery">Crewmate Gallery</Link>
            <div className="logo-container">
              <img
                src="/crewmate-logo.svg"
                alt="Crewmate Logo"
                className="nav-logo"
              />
            </div>
          </nav>
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={<h1>Welcome to the Crewmate Creator!</h1>}
              />
              <Route path="/create" element={<CrewmateForm />} />
              <Route path="/gallery" element={<CrewmateList />} />
              <Route path="/crewmate/:id" element={<CrewmateDetail />} />
              <Route
                path="/crewmate/:id/edit"
                element={<CrewmateForm isEdit={true} />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
