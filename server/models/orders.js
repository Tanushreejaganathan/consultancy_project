// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model (if you have one)
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    userInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
      },
      address: {
        type: String,
        required: true,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields automatically
);

module.exports = mongoose.model('Order', orderSchema);