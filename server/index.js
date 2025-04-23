

const dotenv = require('dotenv');
dotenv.config(); // This must be at the very top, before any other code
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt
const UserModel = require('./models/User'); // Corrected path
const Product = require('./models/Product'); // Import the Product model
const jwt = require('jsonwebtoken'); // Make sure jwt is imported

const app = express();
app.use(cors());
app.use(express.json());

// Consider using environment variables for the connection string
mongoose.connect("mongodb://127.0.0.1:27017/employee")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// --- User Routes ---

// Signup Route
app.post("/consultancy/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        // Exclude password from response
        const { password: _, ...userWithoutPassword } = savedUser._doc;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Server error during signup" });
    }
});


// Helper function to generate JWT (can be placed above or below the route)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Example expiration
    });
};


// Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await UserModel.findOne({ email }).populate('cart.productId');

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                res.status(200).json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    cart: user.cart, // Include cart in response
                    token: generateToken(user._id)
                });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
});
// Remove the duplicate login route
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }
//         const user = await UserModel.findOne({ email });

//         if (user) {
//             const passwordMatch = await bcrypt.compare(password, user.password);
//             if (passwordMatch) {
//                 res.status(200).json({
//                     _id: user.id,
//                     name: user.name,
//                     email: user.email,
//                     token: generateToken(user._id)
//                 });
//             } else {
//                 res.status(401).json({ message: "Incorrect password" });
//             }
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ message: "Server error during login" });
//     }
// });

// Add database connection error handling
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
    strictPopulate: false
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process if database connection fails
    });

// Reset Password Route
app.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ error: "Email and new password are required" });
        }
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ error: "Server error during password reset" });
    }
});

// --- End User Routes ---


// --- Product Routes ---

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error fetching products" });
    }
});

// GET a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        // Validate if the ID is a valid MongoDB ObjectId format before querying
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
             return res.status(400).json({ message: "Invalid product ID format" });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("Error fetching product by ID:", err);
        // Catch potential errors during the database query itself
        res.status(500).json({ message: "Server error fetching product" });
    }
});

// --- End Product Routes ---

// Define the port
const PORT = process.env.PORT || 3001; // Use environment variable or default to 3001

// Start Server - Make sure this is after all route definitions
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Add this code to update existing users
UserModel.updateMany({ cart: { $exists: false } }, { $set: { cart: [] } })
    .then(() => console.log("Updated users with cart field"))
    .catch(err => console.error("Error updating users:", err));


// Cart Routes
// Add to Cart Route
app.post('/api/users/me/cart', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get User Cart Route
        app.get('/api/users/me/cart', async (req, res) => {
            try {
                const token = req.headers.authorization?.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ message: 'Authorization token required' });
                }

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const userId = decoded.id;

                const user = await UserModel.findById(userId).populate('cart.productId');
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.status(200).json(user.cart);
            } catch (error) {
                console.error('Error fetching user cart:', error);
                res.status(500).json({ message: 'Server error fetching cart' });
            }
        });
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

        await user.save();

        res.status(201).json(user.cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Server error adding to cart' });
    }
});
