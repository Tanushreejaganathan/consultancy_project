const mongoose = require('mongoose');
const specSchema = new mongoose.Schema({
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  });
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    specs: {
        type: [specSchema],
        default: []
      }
    //  Add other product fields as needed
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);