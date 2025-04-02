require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const PriceComparison = require('./models/PriceComparison');

const importPriceComparisons = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Read price comparisons from JSON file
    const priceComparisonsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../data/pricecomparisons.json'), 'utf8')
    );

    // Clear existing price comparisons
    await PriceComparison.deleteMany({});
    console.log('Cleared existing price comparisons');

    // Import price comparisons
    for (const comparison of priceComparisonsData) {
      const priceComparison = new PriceComparison(comparison);
      await priceComparison.save();
      console.log(`Imported category: ${comparison.category}`);
    }

    console.log('Price comparisons import completed');
    process.exit(0);
  } catch (error) {
    console.error('Error importing price comparisons:', error);
    process.exit(1);
  }
};

importPriceComparisons(); 