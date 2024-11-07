import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DisplayReview() {
    const { bookId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/reviews/${bookId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data); // Assuming data is an array of reviews
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [bookId]);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>Error: {error}</p>;
    if (reviews.length === 0) return <p>No reviews available for this book.</p>;

    return (
        <div>
            <h2>Reviews for Book ID: {bookId}</h2>
            {reviews.map(review => (
                <div key={review.id}>
                    <p><strong>{review.author}</strong> rated it: {review.rating} stars</p>
                    <p>{review.text}</p>
                </div>
            ))}
        </div>
    );
}

export default DisplayReview;
