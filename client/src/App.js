import React from 'react';
import Posts from './Posts';  // Adjust the path if your file structure is different
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import { Login, Signup } from "./pages";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bigApp">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
