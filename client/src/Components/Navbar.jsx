import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FiLogOut } from 'react-icons/fi';
import { useCart } from '../context/CartContext'; // Import useCart

export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    // Get cartItems for badge AND clearCartLocally function
    const { cartItems, clearCartLocally } = useCart();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        setIsLoggedIn(false);           // Update App state
        clearCartLocally();             // Clear the cart state in context
        navigate('/login');             // Redirect
    };

    return (
        <AppBar position="sticky" sx={{ marginTop: 0 }}>
            <Toolbar>
                {/* ... Logo/Title ... */}
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    VELAANS
                </Typography>

                {/* ... Navigation Links ... */}
                <Button color="inherit" component={Link} to="/home">Home</Button>
                <Button color="inherit" component={Link} to="/products">Products</Button>
                <Button color="inherit" component={Link} to="/categories">Categories</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>
                <Button color="inherit" component={Link} to="/contact">Contact</Button>

                {/* ... Cart Icon ... */}
                 <IconButton color="inherit" component={Link} to="/cart" sx={{ ml: 1 }}>
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                {/* ... Conditional Login/Logout ... */}
                 {isLoggedIn ? (
                    <IconButton
                        color="inherit"
                        onClick={handleLogout} // Uses updated handleLogout
                        sx={{ ml: 1 }}
                        aria-label="logout"
                    >
                        <FiLogOut />
                    </IconButton>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login" sx={{ ml: 1 }}>Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};
