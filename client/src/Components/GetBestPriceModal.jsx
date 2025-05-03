
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // adjust path if needed

const GetBestPriceModal = ({ open, handleClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const price = product.price * quantity;

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    handleClose(); // optional
    navigate('/cart');
  };

  const handleBuyNow = () => {
  //redirect to checkout page
    handleClose(); 
    navigate('/checkout', { 
      state: {
        username: product.username,
        email: product.email,
        products: [{
          ...product,
          quantity: quantity,
          totalPrice: price
        }]
      }
    });

    
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Get Best Price</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', borderRadius: 8 }}
          />
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
          />
          <Typography variant="h6">
            Total Amount: ₹{price.toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ flexDirection: 'column', alignItems: 'stretch', gap: 1, px: 3, pb: 3 }}
      >
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleBuyNow}>
          Buy Now
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GetBestPriceModal;
