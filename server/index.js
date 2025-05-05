const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateInvoicePDF = require("./invoice/generateinvoice"); // Adjust the path as necessary
const userRoutes = require("./routes/userRoutes");
const UserModel = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/orders");
const { removeItemFromCart } = require("./controllers/userController");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Authorization token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res
      .status(500)
      .json({ message: "Server error during authentication" });
  }
};
app.post(
  "/api/orders/generate-invoice",
  authenticateToken,
  async (req, res) => {
    try {
      const order = req.body;
      if (!order || !order.items || order.items.length === 0) {
        return res.status(400).json({ message: "Invalid order data" });
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
      generateInvoicePDF(res, order);
    } catch (error) {
      console.error("Error generating invoice:", error);
      res.status(500).json({ message: "Server error generating invoice" });
    }
  }
);

// --- Auth Routes ---
app.post("/consultancy/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const { password: _, ...userWithoutPassword } = savedUser._doc;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Server error during signup" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await UserModel.findOne({ email }).populate("cart.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // Modified response format to match frontend expectations
    res.status(200).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        username: user.name,
        email: user.email,
        cart: user.cart,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res
        .status(400)
        .json({ error: "Email and new password are required" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

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
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching products" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching product" });
  }
});

// --- Cart Routes ---
app.get("/api/users/me/cart", authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate(
      "cart.productId"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching cart" });
  }
});

app.post("/api/users/me/cart", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    await user.populate("cart.productId");
    res.status(201).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Server error adding to cart" });
  }
});

app.delete("/api/users/me/cart/:productId", removeItemFromCart);

// --- Order Routes ---
app.post("/api/orders", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity, userInfo } = req.body;
    const { name, email, phone, address, city, state, pincode } =
      userInfo || {};

    if (
      !productId ||
      !quantity ||
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res
        .status(400)
        .json({ message: "All order fields are required." });
    }

    const order = new Order({
      userId: req.userId,
      productId,
      quantity,
      userInfo: { name, email, phone, address, city, state, pincode },
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully.", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to place order", error: error.message });
  }
});

app.post("/api/", authenticateToken, async (req, res) => {
  try {
    const order = req.body;
    if (!order || !order.items || order.items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
    generateInvoicePDF(res, order);
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ message: "Server error generating invoice" });
  }
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Ensure all users have a cart array
UserModel.updateMany({ cart: { $exists: false } }, { $set: { cart: [] } })
  .then(() => console.log("Ensured users have cart field"))
  .catch((err) => console.error("Error updating users:", err));
