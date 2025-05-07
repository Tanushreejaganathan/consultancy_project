import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
} from '@mui/material';

export const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { 
        email, 
        password 
      });
      
      if (response.data && response.data.userId) {
        setUserId(response.data.userId);
        // After successful credential verification, show OTP input
        setShowOTP(true);
        // Trigger OTP generation and sending on the backend
        await axios.post('http://localhost:3001/auth/generate-otp', { 
          userId: response.data.userId,
          email 
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/verify-otp', { 
        userId,
        otp 
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        setIsLoggedIn(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Paper elevation={10} style={{ padding: '2rem', borderRadius: '1rem', maxWidth: '400px', width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          {showOTP ? 'Enter OTP' : 'Login'}
        </Typography>
        
        {!showOTP ? (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '0.5rem'
              }}
            >
              Login
            </Button>

            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Link href="/forgot-password" variant="body2">
                Forgot Password?
              </Link>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </form>
        ) : (
          <form onSubmit={handleOTPVerification}>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
              Please enter the OTP sent to your email
            </Typography>
            
            <TextField
              fullWidth
              margin="normal"
              label="OTP"
              type="text"
              required
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              inputProps={{ maxLength: 6 }}
              sx={{ letterSpacing: '0.5em' }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '0.5rem'
              }}
            >
              Verify OTP
            </Button>
          </form>
        )}
      </Paper>
    </Grid>
  );
};
