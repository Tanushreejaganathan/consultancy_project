/*

import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navButtonStyle = (path) => ({
    color: '#fff',
    fontSize: '1rem',
    fontWeight: location.pathname === path ? 'bold' : 600,
    textTransform: 'none',
    borderBottom: location.pathname === path ? '3px solid #fff' : 'none',
    borderRadius: 0,
    px: 1.5,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  });

  const authButtonStyle = {
    marginLeft: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0.4rem 1.2rem',
    borderRadius: '8px',
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#1976d2',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: '64px', // tighter height
          px: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}
          onClick={() => navigate('/')}
        >
          VELAANS HP NO.1
        </Typography>

      
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" sx={navButtonStyle('/')}>Home</Button>
          <Button component={Link} to="/about" sx={navButtonStyle('/about')}>About</Button>
          <Button component={Link} to="/categories" sx={navButtonStyle('/categories')}>Categories</Button>
          <Button component={Link} to="/products" sx={navButtonStyle('/products')}>Products</Button>
          <Button component={Link} to="/contact" sx={navButtonStyle('/contact')}>Contact</Button>
        </Box>

       
        {!isLoggedIn && (
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="contained"
              color="error"
              to="/login"
              component={Link}
              style={authButtonStyle}
            >
              LOGIN
            </Button>
            <Button
              variant="contained"
              color="success"
              to="/signup"
              component={Link}
              style={authButtonStyle}
            >
              SIGNUP
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
*/

import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Badge
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext'; // ✅ make sure path is correct

export const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart(); // ✅ get cart items

  const navButtonStyle = (path) => ({
    color: '#fff',
    fontSize: '1rem',
    fontWeight: location.pathname === path ? 'bold' : 600,
    textTransform: 'none',
    borderBottom: location.pathname === path ? '3px solid #fff' : 'none',
    borderRadius: 0,
    px: 1.5,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  });

  const authButtonStyle = {
    marginLeft: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0.4rem 1.2rem',
    borderRadius: '8px',
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#1976d2',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: '64px',
          px: 3,
        }}
      >
        {/* Left - Logo */}
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}
          onClick={() => navigate('/')}
        >
          VELAANS HP NO.1
        </Typography>

        {/* Center - Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" sx={navButtonStyle('/')}>Home</Button>
          <Button component={Link} to="/about" sx={navButtonStyle('/about')}>About</Button>
          <Button component={Link} to="/categories" sx={navButtonStyle('/categories')}>Categories</Button>
          <Button component={Link} to="/products" sx={navButtonStyle('/products')}>Products</Button>
          <Button component={Link} to="/contact" sx={navButtonStyle('/contact')}>Contact</Button>
        </Box>

        {/* Right - Cart Icon + Auth Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            sx={{ color: 'white' }}
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {!isLoggedIn && (
            <>
              <Button
                variant="contained"
                color="error"
                to="/login"
                component={Link}
                style={authButtonStyle}
              >
                LOGIN
              </Button>
              <Button
                variant="contained"
                color="success"
                to="/signup"
                component={Link}
                style={authButtonStyle}
              >
                SIGNUP
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
