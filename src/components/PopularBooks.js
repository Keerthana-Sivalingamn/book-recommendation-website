import './RecommendedBooks.css';
import React, { useEffect, useState } from 'react';
import './PopularBooks.css'; // Import the CSS file

const PopularBooks = () => {
    const [popularBooks, setPopularBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularBooks = () => {
            setPopularBooks([
                {
                    id: 1,
                    title: "Lord of the Rings",
                    author: "J.R.R. Tolkien",
                    description: "An epic high-fantasy novel that follows the quest to destroy the One Ring.",
                    category: "Fantasy",
                    image_link: "https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg"
                },
                {
                    id: 2,
                    title: "The God of Small Things",
                    author: "Arundhati Roy",
                    description: "A tale of childhood and family, steeped in the culture and politics of India.",
                    category: "Fiction",
                    image_link: "https://m.media-amazon.com/images/I/91saO95VziL._AC_UF1000,1000_QL80_.jpg"
                },
                {
                    id: 3,
                    title: "Harry Potter and the Philosopher's Stone",
                    author: "J.K. Rowling",
                    description: "The first book in the beloved series about a young wizard's journey.",
                    category: "Fantasy",
                    image_link: "https://covers.openlibrary.org/b/id/7984916-L.jpg"
                },
                {
                    id: 4,
                    title: "The Power of Subconscious Mind",
                    author: "Joseph Murphy",
                    description: "A guide to using the power of your subconscious mind to achieve your dreams.",
                    category: "Self-Help",
                    image_link: "https://m.media-amazon.com/images/I/81gTwYAhU7L._AC_UF1000,1000_QL80_.jpg"
                },
                {
                    id: 5,
                    title: "The Alchemist",
                    author: "Paulo Coelho",
                    description: "A journey of self-discovery and following one's dreams.",
                    category: "Adventure",
                    image_link: "https://itstyle.co.in/cdn/shop/files/51FXs5gTmdL._AC_UF1000_1000_QL80_1080x.jpg?v=1686040869"
                },
                {
                    id: 6,
                    title: "To Kill a Mockingbird",
                    author: "Harper Lee",
                    description: "A novel about racial injustice and moral growth in the American South.",
                    category: "Fiction",
                    image_link: "https://assets.scriptslug.com/live/img/posters/to-kill-a-mockingbird-1962.jpg?utime=20240519142249"
                },
                {
                    id: 7,
                    title: "1984",
                    author: "George Orwell",
                    description: "A dystopian novel about totalitarianism and surveillance.",
                    category: "Dystopian",
                    image_link: "https://m.media-amazon.com/images/I/61ZewDE3beL._SL1200_.jpg"
                },
                {
                    id: 8,
                    title: "Pride and Prejudice",
                    author: "Jane Austen",
                    description: "A classic novel about love and social standing in early 19th century England.",
                    category: "Romance",
                    image_link: "https://rukminim2.flixcart.com/image/850/1000/kkec4280/book/d/h/d/pride-prejudice-original-imafzra6pfewjjwb.jpeg?q=90&crop=false"
                },
                {
                    id: 9,
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    description: "A novel about the American dream and the jazz age.",
                    category: "Fiction",
                    image_link: "https://m.media-amazon.com/images/I/81Q6WkLhX4L._UF1000,1000_QL80_.jpg"
                },
                {
                    id: 10,
                    title: "Sapiens",
                    author: "Yuval Noah Harari",
                    description: "A brief history of humankind from the Stone Age to the modern age.",
                    category: "Non-Fiction",
                    image_link: "https://covers.openlibrary.org/b/id/8508518-L.jpg"
                },
            ]);
            setLoading(false);
        };

        fetchPopularBooks();
    }, []);

    if (loading) return <p>Loading popular books...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="popular-books-container">
            <h2>Popular Books</h2>
            <div className="books-grid">
                {popularBooks.map(book => (
                    <div className="book-card" key={book.id}>
                        {book.image_link && (
                            <img
                                src={book.image_link}
                                alt={book.title}
                                className="book-image"
                            />
                        )}
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">Author: {book.author}</p>
                        <p className="book-description">{book.description}</p>
                        <p className="book-category">Category: {book.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularBooks;
