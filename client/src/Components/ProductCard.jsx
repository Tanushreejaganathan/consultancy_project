import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/products/${product._id}`);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.name}
                sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    maxHeight: 250 // Optional: limit max height if needed
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                    ₹ {product.price.toFixed(2)}
                </Typography>
                <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={handleViewDetails}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
