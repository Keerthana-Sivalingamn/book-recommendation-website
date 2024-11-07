import React, { useEffect, useState } from 'react';

const RecommendedBooks = () => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0); // Track the current page for pagination

    // Function to fetch popular books from Google Books API with timeout
    const fetchPopularBooks = async (page = 0) => {
        let timeoutId; // Declare timeoutId here to fix ESLint warning
        const maxResults = 40; // Max number of results per request
        const startIndex = page * maxResults; // Calculate the starting index for pagination

        try {
            const controller = new AbortController();
            timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout after 10 seconds

            // Fetch popular books from Google Books API
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=bestsellers+OR+fiction+OR+nonfiction+OR+fantasy+OR+adventure&maxResults=${maxResults}&startIndex=${startIndex}`, {
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error('Failed to fetch popular books');
            }

            const data = await response.json();
            console.log('Fetched data:', data); // Log the data received from the API

            // Check if books are returned
            if (data.items && data.items.length > 0) {
                setRecommendedBooks(prevBooks => [...prevBooks, ...data.items]); // Append new books to the existing list
            } else {
                setError('No books found');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                setError('Request timed out');
            } else {
                setError(error.message);
            }
        } finally {
            clearTimeout(timeoutId); // Clear the timeout
            setLoading(false);
        }
    };

    // Fetch books on initial load and on page change
    useEffect(() => {
        fetchPopularBooks(page);
    }, [page]);

    // Display loading skeleton while books are being fetched
    if (loading) {
        return (
            <div className="recommended-books">
                <h2>Loading Recommended Books...</h2>
                <ul>
                    {[...Array(10)].map((_, index) => (
                        <li key={index} className="skeleton-item">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-author"></div>
                            <div className="skeleton-image"></div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    // Display error message if fetching fails
    if (error) {
        return <div>Error fetching recommended books: {error}</div>;
    }

    // Display books once data is fetched successfully
    return (
        <div className="recommended-books">
            <h2>Recommended Popular Books</h2>
            {recommendedBooks.length === 0 ? (
                <p>No recommended books available.</p>
            ) : (
                <ul>
                    {recommendedBooks.map((book) => {
                        const volumeInfo = book.volumeInfo || {}; // Safely access volumeInfo
                        const title = volumeInfo.title || 'No title available';
                        const authors = volumeInfo.authors?.join(', ') || 'Unknown';
                        const description = volumeInfo.description || 'No description available';
                        const imageLink = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';

                        return (
                            <li key={book.id} className="book-item">
                                <img 
                                    src={imageLink} 
                                    alt={title} 
                                    className="book-image"
                                />
                                <div className="book-details">
                                    <h3>{title}</h3>
                                    <p className="author">Author: {authors}</p>
                                    <p className="description">{description}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            {/* Button to load next set of books */}
            <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
        </div>
    );
};

export default RecommendedBooks;
