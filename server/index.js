const dotenv = require('dotenv');
dotenv.config(); // Load environment variables at the very top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT authentication
const userRoutes = require('./routes/userRoutes'); 
// Import Models
const UserModel = require('./models/User'); // User model
const Product = require('./models/Product'); // Product model
const Order = require('./models/orders'); // Order model
const { removeItemFromCart } = require('./controllers/userController');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process if database connection fails
    });

// --- Helper Functions ---
// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Middleware to Authenticate Token
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token required' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(500).json({ message: 'Server error during authentication' });
    }
};

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

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email }).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            cart: user.cart,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
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
        res.status(500).json({ message: "Server error fetching product" });
    }
});

// --- Cart Routes ---
// Get User Cart
app.get('/api/users/me/cart', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.cart);
    } catch (error) {
        console.error('Error fetching user cart:', error);
        res.status(500).json({ message: 'Server error fetching cart' });
    }
});

// Add to Cart
app.post('/api/users/me/cart', authenticateToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingItemIndex = user.cart.findIndex(item =>
            item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        await user.populate('cart.productId');

        res.status(201).json(user.cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Server error adding to cart' });
    }
});
//detele item from cart
app.delete('/api/users/me/cart/:productId', removeItemFromCart);
// --- Order Routes ---
// Create an Order
app.post('/api/orders', authenticateToken, async (req, res) => {
    try {
      const { productId, quantity, userInfo } = req.body;
  
      // Validate request body
      if (!productId || !quantity || !userInfo) {
        return res.status(400).json({ message: 'Product ID, quantity, and user info are required.' });
      }
  
      if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive number.' });
      }
  
      const { name, email, phone, address } = userInfo;
  
      if (!name || !email || !phone || !address) {
        return res.status(400).json({ message: 'All user info fields are required.' });
      }
  
      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing.' });
      }
  
      // Create and save the order
      const order = new Order({
        userId: req.userId,
        productId,
        quantity,
        userInfo,
      });
  
      await order.save();
  
      res.status(201).json({ message: 'Order placed successfully.', order });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
  });


// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Update users with missing `cart` field
UserModel.updateMany({ cart: { $exists: false } }, { $set: { cart: [] } })
    .then(() => console.log("Updated users with cart field"))
    .catch(err => console.error("Error updating users:", err));