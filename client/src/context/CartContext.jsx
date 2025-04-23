import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Add this useEffect to sync cart with server on token change
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchCart();
        }
    }, [localStorage.getItem('token')]);

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:3001/api/users/me/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Ensure the cart data matches the expected format
            const formattedCart = response.data.map(item => ({
                id: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                image: item.productId.imageUrl || '/images/default-product.jpg',
                quantity: item.quantity
            }));
            
            setCartItems(formattedCart);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const updateCartFromServer = (serverCart) => {
        const formattedCart = serverCart.map(item => ({
            id: item?.productId?._id || '',
            name: item?.productId?.name || 'Unknown Product',
            price: item?.productId?.price || 0,
            image: item?.productId?.imageUrl || '/images/default-product.jpg',
            quantity: item?.quantity || 1
        }));
        
        setCartItems(formattedCart);
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Helper to get Auth Token ---
    // Ensure this uses the correct key 'token'
    const getAuthToken = () => localStorage.getItem('token');

    // --- Fetch Initial Cart from Backend ---
    useEffect(() => {
        const fetchCart = async () => {
            const token = getAuthToken(); // Use the helper
            if (!token) {
                setCartItems([]); // Clear cart if no token
                console.log("No token found, skipping cart fetch.");
                return;
            }

            setLoading(true);
            setError(null);
            try {
                console.log("Fetching cart with token...");
                const response = await axios.get('http://localhost:3001/api/users/me/cart', { // Adjust URL
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data || []);
                console.log("Cart fetched successfully:", response.data);
            } catch (err) {
                console.error("Error fetching cart:", err);
                setError("Could not load cart.");
                if (err.response?.status === 401) {
                    console.log("Unauthorized fetching cart, clearing token/state might be needed.");
                    // Optional: Clear invalid token and log out user
                    // localStorage.removeItem('token');
                    // Potentially call a global logout function if available
                }
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
        // Re-fetch cart if the token becomes available later (e.g., after login)
        // This requires listening to login state changes, which is complex here.
        // The initial fetch on context load/reload should handle most cases
        // if App.jsx correctly manages isLoggedIn state passed down.

    }, []); // Runs once when the provider mounts

    // --- Add Item ---
    const addToCart = async (product, quantity) => {
        const token = getAuthToken();
        if (!token) {
            alert("Please log in to add items to your cart.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/users/me/cart', {
                productId: product.id,
                quantity: quantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local state with response data
            setCartItems(response.data);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError('Failed to add item to cart');
        }
    };

    // --- Remove Item ---
    const removeFromCart = async (productId) => {
        const token = getAuthToken();
         if (!token) {
             console.log("Remove from cart blocked: No token.");
             return;
         }
         // Optimistic UI update
         const previousCart = [...cartItems];
         setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
         try {
             await axios.delete(`http://localhost:3001/api/users/me/cart/${productId}`, {
                 headers: { Authorization: `Bearer ${token}` }
             });
         } catch (err) {
             console.error("Error removing item from cart:", err);
             setError("Failed to remove item.");
             setCartItems(previousCart); // Revert
         }
    };

    // --- Update Quantity ---
    const updateQuantity = async (productId, newQuantity) => {
        const token = getAuthToken();
        if (!token) {
             console.log("Update quantity blocked: No token.");
             return;
         }
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        // Optimistic UI update
        const previousCart = [...cartItems];
        setCartItems(prevItems =>
             prevItems.map(item =>
                 item.id === productId ? { ...item, quantity: newQuantity } : item
             )
         );
         try {
             await axios.put(`http://localhost:3001/api/users/me/cart/${productId}`, {
                 quantity: newQuantity
             }, {
                 headers: { Authorization: `Bearer ${token}` }
             });
         } catch (err) {
             console.error("Error updating item quantity:", err);
             setError("Failed to update quantity.");
             setCartItems(previousCart); // Revert
         }
    };

     // --- Clear Cart (e.g., after logout or placing order) ---
     // This should be called explicitly when needed (e.g., in handleLogout)
    const clearCartLocally = () => {
        setCartItems([]);
        console.log("Local cart cleared.");
        // No backend call needed here unless you have a specific "clear cart" endpoint
    };

    return (
        // Pass clearCartLocally if needed by other components
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            loading, 
            error, 
            clearCartLocally,
            updateCartFromServer,
            fetchCart // Add this to the context value
        }}>
            {children}
        </CartContext.Provider>
    );
};
