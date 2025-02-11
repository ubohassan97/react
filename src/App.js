import { Route, Routes } from "react-router-dom";
import Signup from "./component/Signup/Signup";
import Login from "./component/Login";
import Home from "./pages/Home";
import About from "./component/About";
import Dashboard from "./Dashboard/Dashboard";
import Users from "./pages/Users";
import Update from "./component/Updatefolder/Updated";
import CreatUser from "./pages/CreatUser";
import RequireAuth from "./component/RequireAuth";
import PersistLogin from "./component/Signup/Presistlogin"; // Fixed typo in component name

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />

        {/* PersistLogin should wrap everything to handle auth persistence */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/Dashboard" element={<Dashboard />}>
              <Route path="Users" element={<Users />} />
              <Route path="Users/:id" element={<Update />} />
              <Route path="User/create" element={<CreatUser />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
