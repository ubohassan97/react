import { useEffect, useState , useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../component/Context";

export default function Users() {
  const [users, setUsers] = useState([]);
  const context = useContext(User)
  const token = context.auth.token


  const showUsers = users.map((u) => {
    function deleteUser(id) {
      axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`,{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      });
    }





    return (
      <tr key={u.id}>
        <td>{u.id}</td>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>
          <i
            onClick={() => deleteUser(u.id)}
            className="fa-solid fa-trash"
            style={{ color: "red", fontSize: "22px", cursor: "pointer" }}
          ></i>
        </td>

        <td>
          <Link to={`${u.id}`}>
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "blue", fontSize: "22px", cursor: "pointer" }}
            />
          </Link>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setUsers(data.data); 
      });
  }, []);




  


  return (
    <div style={{ width: "80%" }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Users</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
      
      </div>
  );
}
