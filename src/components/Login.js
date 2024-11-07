import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Auth.css'; // Import the CSS file for styles

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous message
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });
            if (response.data.success) {
                // Store user ID or token in localStorage for future requests
                localStorage.setItem('userId', response.data.userId); // Store user ID
                navigate('/home'); // Change '/home' to your desired route
            } else {
                setMessage(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            // Improved error message to display server error
            setMessage(error.response?.data?.message || 'Error logging in. Please check your credentials and try again.');
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup'); // Redirect to the signup page
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Login</h2>
            <form onSubmit={handleLogin} className="auth-form">
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
                <button type="submit" className="auth-button">Login</button>
            </form>
            {message && <p className="auth-message">{message}</p>}
            <p className="signup-prompt">
                Don't have an account?{' '}
                <span className="signup-link" onClick={handleSignupRedirect}>
                    Sign Up
                </span>
            </p>
        </div>
    );
};

export default Login;
