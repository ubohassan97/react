import Header from "../component/Header";
import React from "react";
import styles from "../component/Signup/Signup.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../component/Context";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [passR, setpassR] = useState("");
  const [emailerr, setemailerr] = useState("");
  const cookie = new Cookies();

  const navigate = useNavigate();

  const Usernow = useContext(User);
  const token = cookie.get("Bearer");
  const token2 = Usernow.auth.token;
 

  async function submitForm(e) {
    e.preventDefault();
    // setaccept(true);

    let flag = true;

    if (name === "" || name.length < 3 || pass.length < 8 || passR !== pass) {
      flag = false;
    }

    if (flag) {
      try {
        let response = await axios.post(
          "http://127.0.0.1:8000/api/user/create",
          {
            name: name,
            email: email,
            password: pass,
            password_confirmation: passR,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const token = response.data.data.token;
          cookie.set("Bearer", token);
          const userdetails = response.data.data.user;

          Usernow.setauth({ token, userdetails });
          navigate("/Dashboard/Users");
        }
      } catch (error) {
        if (error.response) {
          setemailerr(error.response.status);
        } else {
          setemailerr("Unknown error");
        }
      }
    }
  }

  return (
    <div>
      <div className={styles.Myform}>
        {/* //////////////////////////////////// */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "1200px",
          }}
        >
          <h1>Welcome</h1>
          <form onSubmit={submitForm}>
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            {/* {name.length < 3 && accept && (
          <p className="error">Name must be more than 3 characters</p>
        )} */}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {/* {accept && emailerr === 422 && (
          <p className="error">This email is already in use</p>
        )} */}

            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
            />
            {/* {pass.length < 8 && accept && (
          <p className="error">Password must be more than 8 characters</p>
        )} */}

            <label htmlFor="repass">Confirm Password</label>
            <input
              type="password"
              id="repass"
              value={passR}
              onChange={(e) => setpassR(e.target.value)}
            />
            {passR !== pass && <p className="error">Passwords do not match</p>}

            <button className="register" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
