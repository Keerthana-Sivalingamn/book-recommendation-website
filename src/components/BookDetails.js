import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = ({ onAddBook }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const book = location.state?.book;

    if (!book) {
        return <p>Book details not found.</p>;
    }

    const { title, authors, description, imageLinks, previewLink } = book.volumeInfo || {};

    const handleAdd = () => {
        if (onAddBook) {
            onAddBook(book);
        }
    };

    const handleRead = () => {
        if (previewLink) {
            window.open(previewLink, '_blank');
        } else {
            alert('No preview available for this book.');
        }
    };

    const handleComment = () => {
        // Redirect to SubmitReview page with bookId
        navigate(`/submit-review/${book.id}`);
    };

    return (
        <div className="book-details-container">
            <div className="book-image-container">
                {imageLinks?.thumbnail ? (
                    <img
                        src={imageLinks.thumbnail}
                        alt={title}
                        className="details-image"
                    />
                ) : (
                    <div className="placeholder-image">No Image</div>
                )}
            </div>

            <div className="details-content">
                <h3>{title}</h3>
                <p><strong>Author(s):</strong> {authors?.join(', ') || 'Unknown'}</p>
                <p><strong>Description:</strong> {description || 'No description available.'}</p>

                {/* Add, Comment, and Read Preview buttons */}
                <div className="button-container">
                    <button className="add-button" onClick={handleAdd}>Add to Wishlist</button>
                    <button className="comment-button" onClick={handleComment}>Add Review</button>
                    <button className="read-button" onClick={handleRead}>Read Preview</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
