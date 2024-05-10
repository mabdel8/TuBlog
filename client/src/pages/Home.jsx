import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Posts from "../Posts";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../Navbar.css";
import { useAuth } from "../AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
  });
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        newPost,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      if (response.data.success) {
        setPosts([...posts, response.data.post]);
        setNewPost({ title: "", content: "", category: "" });
        setShowForm(false);
      } else {
        console.error("Failed to add article");
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${postId}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      if (response.data.success) {
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        console.error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
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
          <button
            className="bg-transparent hover:bg-blue-500 text-amber-400 font-semibold hover:text-white py-2 px-4 border border-amber-400 hover:border-transparent rounded mx-2"
            onClick={Logout}
          >
            LOGOUT
          </button>
        </div>
      </nav>

      <header className="App-header">
        <h1 id="main-heading">
          Welcome back <span id="tiger-heading">tiger</span>,
        </h1>
      </header>
      <div className="grid grid-cols-12 gap-4 mx-64 relative w-auto z-10">
        <div className="hidden overflow-visible relative lg:flex lg:flex-col lg:gap-3 lg:col-span-2 pr-4 mt-10">
          Side bar
        </div>

        <div className="flex flex-col justify-center flex-wrap content-center gap-4 col-span-10 lg:col-span-8 xl:col-span-6 lg:px-16 mt-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-4 rounded-lg py-2 px-4 text-center text-white bg-green-400 hover:bg-green-500"
          >
            {showForm ? "Cancel" : "Add New Article"}
          </button>

          {showForm && (
            <form
              onSubmit={handleFormSubmit}
              className="bg-white shadow-md rounded-2xl p-5 mb-4"
            >
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full mb-2 p-2 border rounded"
              />
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                placeholder="Content"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="category"
                value={newPost.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="w-full mb-2 p-2 border rounded"
              />
              <button
                type="submit"
                className="rounded-lg py-2 px-4 text-center text-white bg-blue-400 hover:bg-blue-500"
              >
                Submit
              </button>
            </form>
          )}
          {posts.map((post) => (
            <div
              key={post._id}
              className="container bg-white shadow-md rounded-2xl p-5"
            >
              <Link to={`/article/${post._id}`}>
                <h1 className="font-bold text-xl text-yellow-500">
                  {post.title}
                </h1>
              </Link>
              <p className="font-light text-gray-500">{post.content}</p>
              <p className="font-medium text-gray-700">
                Author: {post.author.username}
              </p>
              <p className="mb-2">Category: {post.category}</p>
              <textarea
                id="post"
                rows="1"
                className="resize-none outline-none w-full px-0  text-gray-900 mt-2 bg-white border-0 block font-sans text-base antialiased font-light leading-relaxed text-inherit"
                placeholder={`Add A Comment...`}
                required
              ></textarea>
            </div>
          ))}
        </div>
        {/* <Posts /> */}
        <div className="hidden lg:block lg:col-span-4 mt-10">Side bar 2</div>
      </div>
    </div>
  );
};

export default Home;
