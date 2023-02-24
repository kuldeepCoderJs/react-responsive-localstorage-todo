import "./app.css";
import config from "./config";
import { useState } from "react";
import Stared from "./components/stared/Stared";
import ToDoList from "./components/todoList/ToDoList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [isAsideActive, setIsAsideActive] = useState(false);

  return (
    <Router>
      <header>
        <div>
          <i
            style={{
              color: "white",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "100%",
              position: "absolute",
              left: isAsideActive ? "88%" : "13px",
            }}
            className="fa-solid fa-bars"
            onClick={(e) => setIsAsideActive((prev) => !prev)}
          ></i>
        </div>
        <div className="title">
          <span>{config.appConfig.header.headerTitle}</span>
        </div>
        <div className="date_day">
          <span>{config.appConfig.header.data_in_dayWords}</span>
        </div>
      </header>

      <aside
        style={{
          display: isAsideActive ? "block" : "none",
          width: isAsideActive ? "75%" : "20%",
        }}
      >
        <div className="projectTitle">
          <span>{config.appConfig.aside.project} To-Do</span>
        </div>
        <ul className="tabs_list_con">
          {["todo-list", "stared"].map((el, ind) => (
            <li key={ind}>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : undefined)}
                to={el}
              >
                {el}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="todo-list" />} />
          <Route path="/todo-list" element={<ToDoList />} />
          <Route path="/stared" element={<Stared />} />
          <Route
            path="*"
            element={<h3 style={{ margin: "20px" }}>404 page-not-found</h3>}
          />
        </Routes>
      </main>
    </Router>
  );
};
export default App;
