import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Box, Typography, CircularProgress, Alert, Card, CardContent,
    CardMedia, Grid, Button, Select, MenuItem, FormControl, InputLabel,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext'; // Add this import
import ProductCard from './ProductCard';  // Add this import

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { addToCart } = useCart();

    // State to track the currently selected product ID and its quantity
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:3001/api/products');
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                let errorMessage = "Failed to load products. Please try again later.";
                if (err.response) {
                    errorMessage = `Error: ${err.response.status} - ${err.response.data.message || 'Server Error'}`;
                } else if (err.request) {
                    errorMessage = "Network Error: Could not connect to the server.";
                } else {
                    errorMessage = `Error: ${err.message}`;
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(products.map(p => p.category));
        return ['All', ...Array.from(uniqueCategories)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'All') {
            return products;
        }
        return products.filter(product => product.category === selectedCategory);
    }, [products, selectedCategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedProductId(null); // Deselect product when category changes
    };

    // Function to handle selecting a product (now triggered by clicking the Grid item)
    const handleSelectProduct = (productId, currentStock) => {
        // Only allow selection if the product is in stock
        if (currentStock > 0) {
             // If clicking the already selected product, deselect it
            if (selectedProductId === productId) {
                setSelectedProductId(null);
            } else {
                setSelectedProductId(productId);
                setSelectedQuantity(1); // Reset quantity to 1 when selecting a new product
            }
        }
    };

    // Function to handle adding the selected product with the chosen quantity to the cart
    const handleAddToCart = (product, event) => {
        event.stopPropagation(); // Prevent the click from bubbling up to the Grid item's onClick
        addToCart({ ...product, id: product._id, image: product.imageUrl }, selectedQuantity);
        alert(`${selectedQuantity} x ${product.name} added to cart!`);
        setSelectedProductId(null); // Deselect the product after adding to cart
    };

    // Functions to handle quantity changes for the selected product
    const handleIncrement = (event) => {
        event.stopPropagation(); // Prevent click propagation
        setSelectedQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = (event) => {
        event.stopPropagation(); // Prevent click propagation
        setSelectedQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Ensure quantity doesn't go below 1
    };


    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
    }


    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h2">
                    Our Products
                </Typography>
                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel id="category-filter-label">Category</InputLabel>
                    <Select
                        labelId="category-filter-label"
                        id="category-filter-select"
                        value={selectedCategory}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {filteredProducts.length === 0 ? (
                 <Typography sx={{ textAlign: 'center', mt: 4 }}>
                    {selectedCategory === 'All' ? 'No products found.' : `No products found in the "${selectedCategory}" category.`}
                </Typography>
            ) : (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
                    margin: '0 auto'
                  }}
                >
                  {filteredProducts.map((product) => (
                    <Grid
                      key={product._id}
                      item
                      sx={{
                        width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }
                      }}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
            )}
        </Box>
    );
}

export default ProductList;