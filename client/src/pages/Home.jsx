import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Posts from "../Posts";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../Navbar.css";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <div className="App">
      {/* <Navbar /> */}
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">TuBlog</Link>{" "}
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>

          <Link>
            Welcome <span id="user_name">{username}</span>
          </Link>
          <button onClick={Logout}>LOGOUT</button>
        </div>
      </nav>


      <header className="App-header">
        <h1 id="main-heading">
          Welcome back <span id="tiger-heading">tiger</span>,
        </h1>
      </header>
      <Posts />
    </div>
  );
};

export default Home;
