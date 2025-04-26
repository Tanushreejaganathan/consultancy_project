const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product'); // Adjust path if necessary

// --- Configuration ---
const mongoURI = "mongodb://127.0.0.1:27017/employee"; // Your MongoDB connection string
const productsFilePath = path.join(__dirname, 'data', 'products.json'); // Path to your JSON file
// --- End Configuration ---
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected for seeding...");

        // Optional: Clear existing products before seeding
        console.log("Clearing existing products...");
        await Product.deleteMany({});
        console.log("Existing products cleared.");

        // Read the JSON file
        console.log(`Reading products from ${productsFilePath}...`);
        const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        console.log(`Read ${productsData.Product} products from file.`);
        // Insert products into the database
        console.log("Inserting new products...");
        await Product.insertMany(productsData);
        console.log("Products seeded successfully!");

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    }
};

// Run the seeding function
seedDatabase();