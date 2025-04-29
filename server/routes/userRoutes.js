const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const {
    getUserCart,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
} = require('../controllers/userController'); 

// GET /api/users/me/cart - Fetch user's cart
router.get('/me/cart', protect, getUserCart);

// POST /api/users/me/cart - Add item to cart
router.post('/me/cart', protect, addItemToCart);

// PUT /api/users/me/cart/:productId - Update item quantity
router.put('/me/cart/:productId', protect, updateCartItemQuantity);

// DELETE /api/users/me/cart/:productId - Remove item from cart
router.delete('/me/cart/:productId', protect, removeItemFromCart);




module.exports = router;