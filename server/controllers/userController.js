const User = require('../models/User'); // Adjust path
const bcrypt = require('bcryptjs'); // For password comparison
const jwt = require('jsonwebtoken'); // For generating tokens
const Product = require('../models/Product'); // Adjust path - needed to check product existence/stock
const JWT_SECRET = process.env.JWT_SECRET;
// @desc    Get user's cart
// @route   GET /api/users/me/cart
// @access  Private
const getUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'cart.productId',
            model: 'Product', 
            select: 'name price imageUrl stock category' 
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const populatedCart = user.cart.map(item => {
            if (!item.productId) {
                console.warn(`Cart item references non-existent product ID for user ${user.id}`);
                return null;
            }
            return {
                id: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                image: item.productId.imageUrl,
                stock: item.productId.stock,
                category: item.productId.category,
                quantity: item.quantity,
                _id: item.productId._id
            };
        }).filter(item => item !== null);

        res.json(populatedCart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Server error fetching cart' });
    }
};

// @desc    Add item to user's cart
// @route   POST /api/users/me/cart
// @access  Private
const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Basic validation
    if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ message: 'Invalid product ID or quantity provided' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if item already exists in cart
        const existingItemIndex = user.cart.findIndex(item => 
            item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity if item exists
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            user.cart.push({ productId, quantity });
        }

        // Save updated user document
        await user.save();

        // Return updated cart
        const updatedUser = await User.findById(userId).populate({
            path: 'cart.productId',
            model: 'Product',
            select: 'name price imageUrl stock category'
        });

        res.status(201).json(updatedUser.cart);

    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Server error adding item to cart' });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/users/me/cart/:productId
// @access  Private
const updateCartItemQuantity = async (req, res) => {
    const { productId } = req.params; // Get productId from URL parameters
    const { quantity } = req.body;    // Get new quantity from request body
    const userId = req.user.id;

    // Validate quantity
    if (quantity === undefined || quantity < 1) {
         // If quantity is less than 1, it should ideally be handled by removeItemFromCart
         // Or you could decide to remove it here if quantity is 0.
         return res.status(400).json({ message: 'Quantity must be at least 1. To remove, use the delete endpoint.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Optional: Check stock for the new quantity
        // const product = await Product.findById(productId);
        // if (!product || product.stock < quantity) {
        //     return res.status(400).json({ message: 'Insufficient stock for requested quantity' });
        // }

        // Update the quantity
        user.cart[itemIndex].quantity = quantity;
        await user.save();

        // Fetch and return the updated cart
        const updatedUser = await User.findById(userId).populate({
             path: 'cart.productId',
             model: 'Product',
             select: 'name price imageUrl stock category'
         });
        const populatedCart = updatedUser.cart.map(item => ({
             id: item.productId._id,
             name: item.productId.name,
             price: item.productId.price,
             image: item.productId.imageUrl,
             stock: item.productId.stock,
             category: item.productId.category,
             quantity: item.quantity,
             _id: item.productId._id
        })).filter(item => item.productId);

        res.json(populatedCart);

    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ message: 'Server error updating cart quantity' });
    }
};

// @desc    Remove item from user's cart
// @route   DELETE /api/users/me/cart/:productId
// @access  Private


const removeItemFromCart = async (req, res) => {
    console.log('Incoming request to remove item from cart');
    console.log('req.params:', req.params);

    const { productId } = req.params;

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.error('No Authorization header');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.error('Token missing in Authorization header');
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    let decodedUser;
    try {
        decodedUser = jwt.verify(token, JWT_SECRET); 
        console.log('Decoded user from token:', decodedUser);
    } catch (err) {
        console.error('Invalid token:', err);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const userId = decodedUser.id;

    try {
        const user = await User.findById(userId);
        console.log('Found user:', user);

        if (!user) {
            console.error('User not found with ID:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        const initialLength = user.cart.length;

        user.cart = user.cart.filter(item => item.productId && item.productId.toString() !== productId);

        if (user.cart.length === initialLength) {
            console.error('Item not found in user cart');
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await user.save();
        console.log('Item removed and user saved');

        const updatedUser = await User.findById(userId).populate({
            path: 'cart.productId',
            model: 'Product',
            select: 'name price imageUrl stock category'
        });

        const populatedCart = updatedUser.cart.map(item => ({
            id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.imageUrl,
            stock: item.productId.stock,
            category: item.productId.category,
            quantity: item.quantity,
            _id: item.productId._id
        }));

        res.json(populatedCart);

    } catch (error) {
        console.error('Server error while removing from cart:', error);
        res.status(500).json({ message: 'Server error removing item from cart' });
    }
};



// Export the controller functions
module.exports = {
    getUserCart,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    // loginUser, // Add loginUser here
    // registerUser, // If you have registration in the same file
    // Export other user controller functions if they exist in this file
    // e.g., registerUser, loginUser, getUserProfile etc.
};


// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for user by email
        const user = await User.findOne({ email });

        // If user exists and password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                // Add other user data if needed
                token: generateToken(user._id), // Generate and send JWT
            });
        } else {
            // User not found or password incorrect
            res.status(401).json({ message: 'Invalid email or password' }); // Send specific error
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Or your desired expiration
    });
};
// Make sure to export loginUser along with other functions
module.exports = {
    getUserCart,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    loginUser, // Add loginUser here
    // registerUser, // If you have registration in the same file
    // Export other user controller functions if they exist in this file
    // e.g., registerUser, loginUser, getUserProfile etc.
};