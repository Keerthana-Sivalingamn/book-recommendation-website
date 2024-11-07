import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SubmitReview({ onSubmitReview }) {
    const { bookId } = useParams();
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            bookId: parseInt(bookId),
            text: reviewText,
            rating: parseInt(rating),
            author: 'User', // Replace with actual user data if available
        };

        try {
            const response = await fetch('http://localhost:3001/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to submit review:', errorText);
                throw new Error('Failed to submit review');
            }

            // Call the function to update the state in the parent component if needed
            onSubmitReview(reviewData);

            // Redirect to the display review page
            navigate(`/display-review/${bookId}`);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('There was an error submitting your review. Please try again.');
        }
    };

    return (
        <div>
            <h2>Submit Review for Book ID: {bookId}</h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={reviewText} 
                    onChange={(e) => setReviewText(e.target.value)} 
                    placeholder="Write your review here..."
                    required
                />
                <br />
                <label>
                    Rating:
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </label>
                <br />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default SubmitReview;
