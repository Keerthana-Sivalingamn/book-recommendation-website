const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Keerthana@28',
    database: 'book_recommendation',
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.code, err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

// Signup route
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (error) => {
            if (error) {
                return res.status(500).json({ message: 'Error signing up', error });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
});

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error logging in', error });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error checking password', err });
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            res.status(200).json({ message: 'Login successful', userId: results[0].id });
        });
    });
});

// Fetch Recommended Books based on previous searches or preferences
app.post('/api/recommendations', (req, res) => {
    const userId = req.body.userId;

    const sql = `
        SELECT * FROM books 
        WHERE title LIKE '%mahabharat%' OR title LIKE '%ramayana%' OR title LIKE '%harry potter%' 
        ORDER BY popularity DESC 
        LIMIT 10;
    `;

    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error fetching recommended books', error });
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
