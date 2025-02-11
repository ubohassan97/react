import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";
import "./Mystyle.css";
import { User } from "./Context";
import Cookies from "universal-cookie";
import { useContext } from "react";
import axios from "axios";

export default function Header() {
  const cookie = new Cookies()
  const { auth, setAuth } = useContext(User); // Destructure auth and setAuth from context
  const myuser = auth?.userdetails; // Use optional chaining to avoid errors if auth is null
  const token = cookie.get("Bearer");
  const navigate = useNavigate();

  async function HandelLogOut() {
 
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  cookie.remove("Bearer")



 
    // Redirect to the Signup page
    navigate("/Signup");
  }

  return (
    <div className="container MyHeader">
      <nav className="d-flex">
        <div className="d-flex">
          <NavLink className="Header_navlink" to="/Home">
            Home
          </NavLink>
          <NavLink className="Header_navlink" to="/About">
            About
          </NavLink>
          <NavLink className="Header_navlink" to="/Dashboard">
            Dashboard
          </NavLink>
        </div>

        {!token ? (
          // Show Register and Login if user is not authenticated
          <div className="d-flex" style={{ margin: "0" }}>
            <NavLink to="/Signup" className="Login-nav">
              Register
            </NavLink>
            <NavLink to="/Login" className="Login-nav">
              Login
            </NavLink>
          </div>
        ) : (
          // Show Logout if user is authenticated
          <div className="Login-nav" onClick={HandelLogOut}>
            Logout
          </div>
        )}
      </nav>
    </div>
  );
}
