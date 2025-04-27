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
import OrderSummaryDialog from '../Components/OrderSummaryDialog';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openSummaryDialog, setOpenSummaryDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [orderSummary, setOrderSummary] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({ ...product, id: product._id }, quantity);
    }
  };

  const handleBuyNow = () => {
    setOpenUserDialog(true);
  };

  const handleUserDialogClose = () => {
    setOpenUserDialog(false);
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserInfoSubmit = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.address) {
      alert('Please fill all fields.');
      return;
    }

    const productTotal = product.price * quantity;
    const gstAmount = productTotal * 0.18;
    const shippingCharge = 50;
    const grandTotal = productTotal + gstAmount + shippingCharge;

    setOrderSummary({
      productTotal,
      gstAmount,
      shippingCharge,
      grandTotal,
    });

    setOpenUserDialog(false);
    setOpenSummaryDialog(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to place an order.');
        return;
      }

      await axios.post(
        'http://localhost:3001/api/orders',
        {
          productId: product._id,
          quantity,
          userInfo,
          orderSummary,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Order placed successfully!');
      setOpenSummaryDialog(false);
    } catch (err) {
      console.error('Error placing order:', err);
      alert(err.response?.data?.message || 'Failed to place order.');
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
      <Alert severity="error" sx={{ m: 4 }}>
        {error}
      </Alert>
    );
  }

  if (!product) {
    return (
      <Alert severity="warning" sx={{ m: 4 }}>
        Product not found
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        {product.name}
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Product Image */}
        <Box sx={{ width: '50%', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </Box>

        {/* Product Details */}
        <Box sx={{ width: '50%' }}>
          <Typography variant="h5" gutterBottom>
            ₹ {product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>

          {/* Specifications */}
          {product.specs && product.specs.length > 0 && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '8px 16px', color: '#374151', fontWeight: 500 }}>
                        {spec.label}
                      </td>
                      <td style={{ padding: '8px 16px', color: '#4B5563' }}>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}

          {/* Quantity, Add to Cart, Buy Now */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
              sx={{ width: '100px' }}
            />
            <Button variant="contained" onClick={handleAddToCart} sx={{ height: '56px' }}>
              Add to Cart
            </Button>
            <Button variant="contained" color="secondary" onClick={handleBuyNow} sx={{ height: '56px' }}>
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* User Info Dialog */}
      <Dialog open={openUserDialog} onClose={handleUserDialogClose}>
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
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            value={userInfo.phone}
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
          <Button onClick={handleUserDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleUserInfoSubmit}>
            Proceed to Summary
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Summary Dialog */}
      <OrderSummaryDialog
        open={openSummaryDialog}
        orderSummary={orderSummary}
        onClose={() => setOpenSummaryDialog(false)}
        onConfirm={handleConfirmOrder}
      />
    </Box>
  );
};

export default ProductDetail;
