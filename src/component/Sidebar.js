import "./Dashboard.css";
import { Link, NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div>
        {" "}
        <i className="fa-solid fa-user"></i>{" "}
        <NavLink
          to="/Dashboard/Users"
          className="link-item"
        >
          Users
        </NavLink>
      </div>
      <div>
        {" "}
        <i className="fa-solid fa-plus"></i>
        <NavLink
          to="/Dashboard/User/create"
          className="link-item"
        >
          New-Users
        </NavLink>
      </div>
    </div>
  );
}
