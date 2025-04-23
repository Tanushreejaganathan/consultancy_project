import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        // Use _id instead of id if that's what your backend uses
        navigate(`/products/${product._id}`);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
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