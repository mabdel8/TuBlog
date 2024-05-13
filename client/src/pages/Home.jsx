import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Posts from "../Posts";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../AuthContext";
import {
  Newspaper,
  Vote,
  Bike,
  Briefcase,
  Bookmark,
  Heart,
} from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import SportsComponent from "../SportsComponent";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSports, setShowSports] = useState(false);
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["fun", "politics", "sports", "job", "technology"];
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://tu-blog-server.vercel.app/api/posts");
        // const response = await axios.get("http://localhost:5500/api/posts");
        setPosts(response.data);
        // Sort posts by date and get the latest ones
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestPosts(sortedPosts.slice(0, 5)); // Get the 5 latest posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      // Introduce a slight delay to ensure cookies are loaded
      // await new Promise(resolve => setTimeout(resolve, 200)); // 200ms delay

      try {
        const { data } = await axios.post(
          "https://tu-blog-server.vercel.app",
          // "http://localhost:5500/",
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );

        const { status, user } = data;
        if (status) {
          setUsername(user);
          console.log("User verified:", user);
        } else {
          console.log("Invalid token");
          removeCookie("token", { path: "/" });
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token", { path: "/" });
        navigate("/login");
      }
    };

    verifyToken();
  }, [cookies, navigate, removeCookie]);

  const Logout = async () => {
    try {
      const { data } = await axios.post(
        // "http://localhost:5500/logout",
        "https://tu-blog-server.vercel.app/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      if (data.status) {
        removeCookie("token", { path: "/" });
        setUsername(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      removeCookie("token", { path: "/" });
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const response = await axios.get("http://localhost:5500/api/posts");
        const response = await axios.get("https://tu-blog-server.vercel.app/api/posts");
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
      // Add currentUser.id to the new post data
      // console.log(currentUser);
      const res = await axios.get(
        // `http://localhost:5500/api/users/${username}`
        `https://tu-blog-server.vercel.app/api/users/${username}`
      );
      console.log(res.data);
      const postData = {
        ...newPost,
        author: res.data._id,
      };
      const response = await axios.post(
        // "http://localhost:5500/api/posts",
        "https://tu-blog-server.vercel.app/api/posts",
        postData,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      console.log(response);
      if (response.status == 201) {
        setPosts([...posts, response.data]); // Update posts state with new post
        setNewPost({ title: "", content: "", category: "" });
        setShowForm(false);
        console.log("Added article");
      } else {
        console.error("Failed to add article");
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  const handleSportClick = () => {
    setShowSports(!showSports);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        // `http://localhost:5500/api/posts/${postId}`,
        `https://tu-blog-server.vercel.app/api/posts/${postId}`,
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

  // Filter posts based on search query and selected category
  const filteredPosts = posts.filter((post) => {
    return (
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory ? post.category === selectedCategory : true)
    );
  });

  return (
    <div className="App">
      {/* <Navbar /> */}
      <nav className="flex justify-between max-w-7xl mx-auto mt-1">
        <div className="text-4xl content-center">
          <Link to="/">TuBlog</Link>{" "}
        </div>
        <div className="mt-4 flex flex-col justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border min-w-64 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          />
        </div>
      </nav>

      <header className="App-header">
        <h1 id="main-heading">
          Welcome back <span id="tiger-heading">tiger</span>,
        </h1>
      </header>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative w-auto z-10">
        <div className="hidden overflow-visible relative lg:flex lg:flex-col lg:gap-6 lg:col-span-2 pr-4 mt-10">
          <Link className="flex" onClick={() => setShowSports(false)}>
            <Newspaper
              className="self-center mr-1"
              size={24}
              color="#000000"
              strokeWidth={1}
              absoluteStrokeWidth
            />
            <div className="text-2xl">Home</div>
          </Link>
          <hr />

          <Link className="flex" href="/">
            <Vote
              className="self-center mr-1"
              size={24}
              color="#000000"
              strokeWidth={1}
              absoluteStrokeWidth
            />
            <div className="text-2xl">Politics</div>
          </Link>

          <Link className="flex" onClick={() => setShowSports(true)}>
            <Bike
              className="self-center mr-1"
              size={24}
              color="#000000"
              strokeWidth={1}
              absoluteStrokeWidth
            />
            <div className="text-2xl">Sports</div>
          </Link>

          <Link className="flex" href="/">
            <Briefcase
              className="self-center mr-1"
              size={24}
              color="#000000"
              strokeWidth={1}
              absoluteStrokeWidth
            />
            <div className="text-2xl">JobBoard</div>
          </Link>

          <div className="nav-links">
            {/* <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link> */}

            <div className="text-xl mb-2 ml-2 mt-10">
              <span id="user_name">{username}</span>
            </div>
            <button
              className="bg-transparent hover:bg-blue-500 text-amber-400 font-semibold hover:text-white py-2 px-4 border border-amber-400 hover:border-transparent rounded mx-2"
              onClick={Logout}
            >
              LOGOUT
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-wrap content-center gap-4 col-span-10 lg:col-span-10 xl:col-span-8 lg:px-16 mt-10">
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
              <select
                name="category"
                value={newPost.category}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg py-2 px-4 text-center text-white bg-blue-400 hover:bg-blue-500"
              >
                Submit
              </button>
            </form>
          )}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          >
            <option value="">All Categories</option>
            {/* Add options dynamically based on available categories */}
            {[...new Set(posts.map((post) => post.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
          {!showSports &&
            filteredPosts.map((post) => (
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
                <div className="flex gap-2 justify-end">
                  {post.category === "job" && (
                    <a
                      href=""
                      className="bg-blue-500 text-white p-2 rounded-lg"
                    >
                      Apply
                    </a>
                  )}
                  <a href="">
                    <Bookmark
                      className="self-center mr-1 relative top-2"
                      size={24}
                      color="#000000"
                      strokeWidth={1}
                      absoluteStrokeWidth
                    />
                  </a>
                  <a href="">
                    <Heart
                      className="self-center mr-1 relative top-2"
                      size={24}
                      color="#000000"
                      strokeWidth={1}
                      absoluteStrokeWidth
                    />
                  </a>
                </div>
              </div>
            ))}
          {showSports && <SportsComponent />}
        </div>
        {/* <Posts /> */}
        <div className="hidden lg:block lg:col-span-2 mt-10">
          <div className="border rounded-xl p-2 h-auto w-auto">
            <h2 className="font-bold text-lg p-1">Latest on TuBlog</h2>
            <hr />
            <div className="mt-2 space-y-2">
              {latestPosts.map((post) => (
                <div key={post._id} className="p-2 border-b">
                  <p className="font-light text-gray-600">
                    <span className="font-bold text-md">
                      {post.author.username}
                    </span>{" "}
                    <span className="text-sm">
                      {post.createdAt
                        ? formatDistanceToNow(parseISO(post.createdAt))
                        : "just now"}{" "}
                      ago
                    </span>
                  </p>
                  <p className="text-lg font-normal text-gray-800">
                    {post.title.slice(0, 45)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
