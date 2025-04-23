const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Adjust path
const {
    getUserCart,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    // You might have other user routes here (get profile, update profile etc.)
} = require('../controllers/userController'); // Adjust path

// --- Cart Routes ---
// All routes below are protected and require a logged-in user

// GET /api/users/me/cart - Fetch user's cart
router.get('/me/cart', protect, getUserCart);

// POST /api/users/me/cart - Add item to cart
router.post('/me/cart', protect, addItemToCart);

// PUT /api/users/me/cart/:productId - Update item quantity
router.put('/me/cart/:productId', protect, updateCartItemQuantity);

// DELETE /api/users/me/cart/:productId - Remove item from cart
router.delete('/me/cart/:productId', protect, removeItemFromCart);


// --- Other User Routes ---
// Example: router.get('/profile', protect, getUserProfile);


module.exports = router;