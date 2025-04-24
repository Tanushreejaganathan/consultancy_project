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
import DeleteIcon from '@mui/icons-material/Delete';
import CartItem from './CartItem';

const CartPage = () => {
    const { cartItems, loading, error, fetchCart } = useCart();
    console.log('Cart items:', cartItems); // Debugging line
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
                            cartItems.map(item => (
                                <CartItem key={item.id} item={item} />
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
        </Box>
    );
};

// ✅ This is the important line:
export default CartPage;
