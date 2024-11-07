import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import the CSS file for styles

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous message
        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                username,
                password,
            });
            if (response.data.success) {
                setMessage('Signup successful! You can now log in.');
            } else {
                setMessage(response.data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            // Improved error message to display server error
            setMessage(error.response?.data?.message || 'Error signing up. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Signup</h2>
            <form onSubmit={handleSignup} className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-input"
                />
                <button type="submit" className="auth-button">Signup</button>
            </form>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};

export default Signup;
