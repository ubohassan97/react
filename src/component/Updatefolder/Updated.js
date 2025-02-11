import { useContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import styles from "./update.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Update() {
  const id = window.location.pathname.split("/").splice(-1)[0];
   
    const [emailerr, setemailerr] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [passR, setpassR] = useState("");
  const [accept, setaccept] = useState(false);
  const cookie = new Cookies()
  const token = cookie.get("Bearer");

const navigate = useNavigate()

  useEffect(() => {

    // Fetch user data when the component loads
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setname(data[0].name);
        setemail(data[0].email);
      });
  }, [id]);

  async function submitForm(e) {
    let flag = true;
    e.preventDefault();
    setaccept(true);

    // Validation logic
    if (name === "" || pass.length < 8 || passR !== pass) {
      flag = false;
    }

    if (flag) {
      try {
        // Make the API request
        let response = await axios.post(
          `http://127.0.0.1:8000/api/user/update/${id}`,
          {
            name: name,
            email: email,
            password: pass,
            password_confirmation: passR,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
    
        // Check if the request was successful
        if (response.status === 200) {
          
          navigate("/Dashboard/Users");
        }
      } catch (error) {
        console.error("Update failed:", error);
    
        // Handle specific error cases (e.g., display error messages to the user)
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something else happened
          console.error("Error:", error.message);
        }
      }
    }
  }

  return (
    <div>
      <div className={styles.Myform}>
      {/* //////////////////////////////////// */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', width: "1200px" }}>
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

        <button className="register" type="submit">Update</button>
      </form>
    </div></div>
    </div>
  );
}
