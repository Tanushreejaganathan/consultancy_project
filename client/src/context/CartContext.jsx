import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create CartContext to manage the cart state
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Initialize cart state with stored data from localStorage or empty array
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Helper to get the authentication token from localStorage
    const getAuthToken = () => localStorage.getItem('token');

    // Fetch cart data from the backend
    const fetchCart = async () => {
        const token = getAuthToken();
        if (!token) {
            console.log("No token found, redirecting to login");
            setCartItems([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3001/api/users/me/cart', {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data) {
                throw new Error('No data received from server');
            }

            console.log("Cart data received:", response.data);
            // Format the cart data properly
            const formattedCart = Array.isArray(response.data) ? response.data.map(item => ({
                id: item.productId?._id || '',
                name: item.productId?.name || 'Product Not Found',
                price: item.productId?.price || 0,
                image: item.productId?.imageUrl || '/images/default-product.jpg',
                quantity: item.quantity || 0
            })).filter(item => item.id) : [];

            setCartItems(formattedCart);
        } catch (err) {
            console.error("Cart fetch error:", err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token'); // Clear invalid token
                setError("Session expired. Please login again.");
            } else {
                setError("Failed to load cart. Please try again.");
            }
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch cart when component mounts
    useEffect(() => {
        fetchCart();
    }, []);

    // Sync cartItems with localStorage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart
    const addToCart = async (product, quantity) => {
        const token = getAuthToken();
        if (!token) {
            alert("Please log in to add items to cart.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/users/me/cart', {
                productId: product.id,
                quantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update cartItems with the newly added product
            setCartItems(response.data.map(item => ({
                id: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                image: item.productId.imageUrl || '/images/default-product.jpg',
                quantity: item.quantity
            })));
        } catch (err) {
            console.error("Error adding to cart:", err);
            setError("Failed to add item to cart.");
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId) => {
        const token = getAuthToken();
        if (!token) return;

        // Temporarily remove item from cart before making the API request
        const previousCart = [...cartItems];
        setCartItems(prev => prev.filter(item => item.id !== productId));

        try {
            await axios.delete(`http://localhost:3001/api/users/me/cart/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error("Error removing from cart:", err);
            setError("Failed to remove item.");
            setCartItems(previousCart); // Rollback in case of error
        }
    };

    // Update quantity of a cart item
    const updateQuantity = async (productId, newQuantity) => {
        const token = getAuthToken();
        if (!token) return;

        if (newQuantity < 1) {
            removeFromCart(productId); // Remove item if quantity goes below 1
            return;
        }

        // Temporarily update the quantity in the cart
        const previousCart = [...cartItems];
        setCartItems(prev =>
            prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
        );

        try {
            await axios.put(`http://localhost:3001/api/users/me/cart/${productId}`, {
                quantity: newQuantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error("Error updating quantity:", err);
            setError("Failed to update quantity.");
            setCartItems(previousCart); // Rollback in case of error
        }
    };

    // Clear cart locally
    const clearCartLocally = () => {
        setCartItems([]);
        console.log("Cart cleared.");
    };

    // Optional: manually update cart from server (e.g., after login)
    const updateCartFromServer = (serverCart) => {
        const formatted = serverCart.map(item => ({
            id: item?.productId?._id || '',
            name: item?.productId?.name || 'Unknown',
            price: item?.productId?.price || 0,
            image: item?.productId?.imageUrl || '/images/default-product.jpg',
            quantity: item?.quantity || 1
        }));
        setCartItems(formatted);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            error,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCartLocally,
            updateCartFromServer,
            fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
