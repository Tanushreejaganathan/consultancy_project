import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaCar, FaLock, FaEnvelope } from 'react-icons/fa'; // React Icons

export const Login = ({ setIsLoggedIn }) => {
    const { fetchCart } = useCart();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
                await fetchCart();
                navigate('/home');
            }
        } catch (err) {
            console.error("Login error caught:", err);
            if (err.response) {
                console.error("Error response data:", err.response.data);
                console.error("Error response status:", err.response.status);
                console.error("Error response headers:", err.response.headers);
            } else if (err.request) {
                console.error("Error request:", err.request);
                setError('No response from server. Is it running?');
            } else {
                console.error('Error message:', err.message);
            }

            const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(message);
            setIsLoggedIn(false);
        }
    };

    // Inline Styles
    const containerStyle = {
        textAlign: 'center',
        background: '#f0f8ff', // Light blue background
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        margin: 'auto',
        marginTop: '50px',
    };

    const headerStyle = {
        marginBottom: '20px',
    };

    const carIconStyle = {
        fontSize: '48px',
        color: '#007bff', // Dark blue car icon
        animation: 'bounce 2s infinite',
    };

    const h1Style = {
        fontSize: '28px',
        margin: '10px 0',
        color: '#333',
    };

    const pStyle = {
        fontSize: '16px',
        color: '#666',
    };

    const formStyle = {
        marginTop: '20px',
    };

    const inputGroupStyle = {
        position: 'relative',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        border: '2px solid #007bff', // Blue border
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const inputIconStyle = {
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        fontSize: '20px',
        color: '#007bff', // Blue icon color
        padding: '12px',
        backgroundColor: '#f0f8ff', // Light blue background for icons
    };

    const inputFieldStyle = {
        width: '100%',
        padding: '12px 40px',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        background: '#007bff', // Blue button background
        color: 'white',
        fontSize: '18px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background 0.3s ease',
    };

    const linkStyle = {
        color: '#007bff', // Blue link color
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px',
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <FaCar style={carIconStyle} />
                <h1 style={h1Style}>Welcome</h1>
                <p style={pStyle}>Your one-stop shop for premium automobile products</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2>Login</h2>
                {error && <p style={errorStyle}>{error}</p>}

                {/* Email Input */}
                <div style={inputGroupStyle}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        style={inputFieldStyle}
                    />
                </div>

                {/* Password Input */}
                <div style={inputGroupStyle}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={inputFieldStyle}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" style={buttonStyle}>
                    Login <FaCar style={{ marginLeft: '10px', fontSize: '20px', color: 'white' }} />
                </button>

                {/* Links */}
                <div style={{ marginTop: '20px', fontSize: '16px' }}>
                    <Link to="/forgot-password" style={linkStyle}>Forgot Password?</Link>
                    <p>
                        Don't have an account? <Link to="/signup" style={linkStyle}>Sign Up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};