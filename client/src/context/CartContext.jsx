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
            console.log("No token, skipping cart fetch.");
            setCartItems([]); // Clear cart if no token is available
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3001/api/users/me/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Format and set cart data with safety checks
            const formattedCart = response.data
                .filter(item => item.productId) // Ensure productId exists
                .map(item => ({
                    id: item.productId._id || '', // fallback to empty string if needed
                    name: item.productId.name || 'Unnamed Product',
                    price: item.productId.price || 0,
                    image: item.productId.imageUrl || '/images/default-product.jpg',
                    quantity: item.quantity || 1
                }));

            setCartItems(formattedCart); // Set the formatted cart items in state
        } catch (err) {
            console.error("Error fetching cart:", err);
            setError("Could not load cart.");
            setCartItems([]); // Clear cart on error
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
