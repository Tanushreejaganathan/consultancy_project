import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert, Button, TextField } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
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
                    setError("Product data not found");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                if (err.response) {
                    if (err.response.status === 404) {
                        setError("Product not found");
                    } else if (err.response.status === 500) {
                        setError("Server error. Please try again later");
                    } else {
                        setError("Failed to load product details");
                    }
                } else if (err.request) {
                    setError("Network error. Please check your connection");
                } else {
                    setError("An unexpected error occurred");
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
            alert(`${quantity} ${product.name}(s) added to cart!`);
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
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
                <Box sx={{ width: '50%' }}>
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Box>
                <Box sx={{ width: '50%' }}>
                    <Typography variant="h5" gutterBottom>
                        ₹ {product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" paragraph>
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
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;