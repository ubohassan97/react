import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "./Context";

export default function RequireAuth() {
    const { auth } = useContext(User);
    const location = useLocation();

    if (auth === null) return <p>Loading...</p>; // Avoids redirecting before checking auth
    return auth?.userdetails ? <Outlet /> : <Navigate to="/Login" state={{ from: location }} replace />;
}
