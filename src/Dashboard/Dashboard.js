import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
  return (
    <div>
      <Topbar />
      <div style={{display:"flex"}}>
        {" "}
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
