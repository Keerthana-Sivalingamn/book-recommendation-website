import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Login from './components/Login';
import Signup from './components/Signup';
import RecommendedBooks from './components/RecommendedBooks';
import PopularBooks from './components/PopularBooks';
import MyBooks from './components/MyBooks';
import DisplayReview from './components/DisplayReviews';
import SubmitReview from './components/SubmitReview';
import BookDetails from './components/BookDetails';

import './App.css';

function App() {
    const [addedBooks, setAddedBooks] = useState([]);
    const [reviews, setReviews] = useState([]);
    const userId = 1;

    const handleAddBook = (book) => {
        if (!addedBooks.some(b => b.id === book.id)) {
            setAddedBooks([...addedBooks, book]);
        } else {
            alert(`${book.title} is already in your My Books list.`);
        }
    };

    const handleSubmitReview = (bookId, reviewText, rating) => {
        const newReview = {
            id: reviews.length + 1,
            userId,
            bookId,
            reviewText,
            rating,
            createdAt: new Date().toISOString(),
        };
        setReviews([...reviews, newReview]);
    };

    return (
        <Router>
            <div className="App">
                <nav className="navbar">
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/books">Books</Link></li>
                        <li><Link to="/add-book">Add Book</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/recommended">Recommended Books</Link></li>
                        <li><Link to="/popular-books">Popular Books</Link></li>
                        <li><Link to="/my-books">My Books</Link></li>
                        <li><Link to="/submit-review/1">Submit Review</Link></li>
                        <li><Link to="/display-review/1">Display Review</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<BookList onAddBook={handleAddBook} />} />
                    <Route path="/add-book" element={<AddBook addedBooks={addedBooks} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/recommended" element={<RecommendedBooks />} />
                    <Route path="/popular-books" element={<PopularBooks />} />
                    <Route path="/my-books" element={<MyBooks myBooks={addedBooks} />} />
                    <Route 
                        path="/submit-review/:bookId" 
                        element={<SubmitReview onSubmitReview={handleSubmitReview} />} 
                    />
                    <Route 
                        path="/display-review/:bookId" 
                        element={<DisplayReview reviews={reviews} />} 
                    />
                    <Route 
                        path="/book-details" 
                        element={<BookDetails onAddBook={handleAddBook} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
