import React, { useState, useContext } from "react";
import axios from "axios";
import Header from "./Header";
import styles from "./Signup/Signup.module.css";
import { useNavigate } from "react-router-dom";
import { User } from "./Context";
import Cookies from "universal-cookie";

export default function Login() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [accept, setaccept] = useState(false);
  const [emailerr, setemailerr] = useState("");
  const navigate = useNavigate();
  const Usernow = useContext(User);

  const cookie = new Cookies();

  async function submitForm(e) {
    let flag = true;
    e.preventDefault();
    setaccept(true);
    if (pass.length < 8) {
      flag = false;
    } else {
      flag = true;
    }

    if (flag === true) {
      try {
        let response = await axios.post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: pass,
        });
        if (response.status === 200) {
          const token = response.data.data.token;
          cookie.set("Bearer", token);
          const userdetails = response.data.data.user;
          Usernow.setauth({ token, userdetails });
          navigate("/Home");
        }
      } catch (error) {
        setemailerr(error, "errror");
      }
    }
  }

  return (
    <div>
      <Header />

      <div className={`${styles.Myform} d-flex`}>
        <form onSubmit={submitForm} style={{ width: "40%" }}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></input>
          {accept && emailerr === 401 && (
            <p className="error">this email already found</p>
          )}

          <label htmlFor="pass">pass</label>
          <input
            type="password"
            id="pass"
            value={pass}
            onChange={(e) => setpass(e.target.value)}
          />
          {pass.length < 8 && accept && (
            <p className="error">pass must be more than 8</p>
          )}

          <button className="register">Login</button>
        </form>
      </div>
    </div>
  );
}
