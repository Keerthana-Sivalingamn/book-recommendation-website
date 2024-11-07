import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the HomePage CSS

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the Book Recommendation App</h1>
            <p>Discover and share great books!</p>
            <div className="nav-links">
                <Link to="/books" className="nav-button">View Book List</Link>
                <Link to="/add-book" className="nav-button">Add a New Book</Link>
            </div>
        </div>
    );
};

export default HomePage;
