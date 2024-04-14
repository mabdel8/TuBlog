import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">TuBlog</Link> {/* Clickable logo that redirects to the homepage */}
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
