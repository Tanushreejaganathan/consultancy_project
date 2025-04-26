import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openDialog, setOpenDialog] = useState(false); // State for opening/closing dialog
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
  });
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          setError('Product data not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        if (err.response) {
          if (err.response.status === 404) {
            setError('Product not found');
          } else if (err.response.status === 500) {
            setError('Server error. Please try again later');
          } else {
            setError('Failed to load product details');
          }
        } else if (err.request) {
          setError('Network error. Please check your connection');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({ ...product, id: product._id }, quantity);
    }
  };

  const handleBuyNow = () => {
    setOpenDialog(true); // Open the dialog for user information
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate user info
    if (!userInfo.name || !userInfo.email || !userInfo.address) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      // Retrieve the JWT token from localStorage (or wherever it is stored)
      const token = localStorage.getItem('token'); // Assuming the token is stored as 'token'
  
      if (!token) {
        alert('You must be logged in to place an order.');
        return;
      }
  
      // Simulate sending user info to the server
      const response = await axios.post(
        'http://localhost:3001/api/orders',
        {
          productId: product._id,
          quantity,
          userInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
  
      handleDialogClose(); // Close the dialog after successful submission
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
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
    return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
  }

  if (!product) {
    return <Alert severity="warning" sx={{ m: 4 }}>Product not found</Alert>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        {product.name}
      </Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
      <Box
  sx={{
    width: '50%',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start', // align image to the top
    justifyContent: 'center',
    paddingTop: 4, // optional padding for spacing from top
  }}
>
  <img
    src={product.imageUrl}
    alt={product.name}
    style={{ maxHeight: '90vh', maxWidth: '100%', objectFit: 'contain' }}
  />
</Box>



        <Box sx={{ width: '50%' }}>
          <Typography variant="h5" gutterBottom>
            ₹ {product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" >
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, e.target.value))}
              inputProps={{ min: 1 }}
              sx={{ width: '100px' }}
            />
            <Button
              variant="contained"
              onClick={handleAddToCart}
              sx={{ height: '56px' }}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBuyNow}
              sx={{ height: '56px' }}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Dialog for collecting user information */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Enter Your Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            value={userInfo.name}
            onChange={handleUserInfoChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={userInfo.email}
            onChange={handleUserInfoChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Shipping Address"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={userInfo.address}
            onChange={handleUserInfoChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetail;