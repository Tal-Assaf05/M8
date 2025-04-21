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
          <nav>
            <Link to="/">Crewmate List</Link>
            <Link to="/create">Create New Crewmate</Link>
          </nav>
          <Routes>
            <Route path="/" element={<CrewmateList />} />
            <Route path="/create" element={<CrewmateForm />} />
            <Route path="/crewmate/:id" element={<CrewmateDetail />} />
            <Route
              path="/crewmate/:id/edit"
              element={<CrewmateForm isEdit={true} />}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
