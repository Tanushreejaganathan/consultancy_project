import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TableContainer,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, loading, error, fetchCart } = useCart();
    const navigate = useNavigate(); // Add this line
    console.log('Cart items:', cartItems);

    // Add this function
    const handleCheckout = () => {
        navigate('/checkout', {
            state: {
                products: cartItems
            }
        });
    };
    useEffect(() => {
        fetchCart();
    }, []);

    const handleRetry = async () => {
        try {
            await fetchCart();
        } catch (err) {
            console.error('Error retrying cart fetch:', err);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button 
                    variant="contained" 
                    onClick={handleRetry}
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <CartItem 
                                    key={item.id || `cart-item-${index}`} 
                                    item={item} 
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Your cart is empty
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {cartItems.length > 0 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CartPage;
