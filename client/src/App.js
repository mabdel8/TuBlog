import React from 'react';
import Posts from './Posts';  // Adjust the path if your file structure is different
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import ArticleDetail from "./ArticleDetail";

function App() {
  return (
    <div className="bigApp">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </div>
  );
}

export default App;
