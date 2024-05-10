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
            Welcome, <span id="user_name">{username}</span>
          </Link>
          <button className="bg-transparent hover:bg-blue-500 text-amber-400 font-semibold hover:text-white py-2 px-4 border border-amber-400 hover:border-transparent rounded mx-2" onClick={Logout}>LOGOUT</button>
        </div>
      </nav>


      <header className="App-header">
        <h1 id="main-heading">
          Welcome back <span id="tiger-heading">tiger</span>,
        </h1>
          </header>
          <div className="grid grid-cols-12 gap-4 mx-64 relative w-auto z-10">
              <div className="hidden overflow-visible relative lg:flex lg:flex-col lg:gap-3 lg:col-span-2 pr-4 mt-10">Side bar</div>
              <Posts /> 
              <div className="hidden lg:block lg:col-span-4 mt-10">Side bar 2</div>
          </div>

    </div>
  );
};

export default Home;
