import axios from "axios";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { User } from "../Context";
import Loading from "./Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  const context = useContext(User);
  const mtoken = context.auth?.token;
   // Use optional chaining
  const [loading, setLoading] = useState(true);

  const cookie = new Cookies();
  const Getcook = cookie.get("Bearer");


useEffect(() => {
  async function Refresh() {
    try {
      const savedToken = cookie.get("Bearer");
      if (!savedToken) {
        setLoading(false);
        return;
      }

      console.log("Retrieved token from cookie:", savedToken); // Debugging

      const response = await axios.post("http://127.0.0.1:8000/api/refresh", null, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const newToken = response.data.token;
      const userDetails = response.data.user;

      // Store new token
      cookie.set("Bearer", newToken, { path: "/", secure: true, sameSite: "Strict" });

      // Update context
      context.setauth({
        token: newToken,
        userdetails: userDetails,
      });
    } catch (err) {
      console.error("Error refreshing token:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        console.log("Token expired or invalid. Logging out...");
        cookie.remove("Bearer");
        context.setauth(null);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!mtoken) {
    Refresh();
  } else {
    setLoading(false);
  }
}, [mtoken]);


  return loading ? <Loading /> : <Outlet />;
}