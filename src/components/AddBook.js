import React, { useState } from 'react';
import './AddBook.css'; // Import the CSS file for styles

const AddBook = ({ onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = {
            id: Math.random(),  // Temporary unique ID for now
            title,
            author,
            genre,
            description
        };
        onAddBook(newBook);
        setTitle('');
        setAuthor('');
        setGenre('');
        setDescription('');
    };

    return (
        <div className="add-book-container">
            <h2 className="add-book-title">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="add-book-form">
                <div className="form-group">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Genre:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="form-textarea"
                    ></textarea>
                </div>
                <button type="submit" className="add-book-button">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
