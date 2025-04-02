const express = require('express');
const router = express.Router();
const PriceComparison = require('../../database/models/PriceComparison');

// Get all price comparisons
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all price comparisons...');
    const priceComparisons = await PriceComparison.find();
    console.log(`Found ${priceComparisons.length} price comparisons`);
    res.json(priceComparisons);
  } catch (error) {
    console.error('Error in GET /price-comparisons:', error);
    res.status(500).json({ message: 'Error fetching price comparisons' });
  }
});

// Get price comparisons by category
router.get('/:category', async (req, res) => {
  try {
    console.log(`Fetching price comparisons for category: ${req.params.category}`);
    const priceComparison = await PriceComparison.findOne({ category: req.params.category });
    if (!priceComparison) {
      console.log(`Category not found: ${req.params.category}`);
      return res.status(404).json({ message: 'Category not found' });
    }
    console.log(`Found price comparison for category: ${req.params.category}`);
    res.json(priceComparison);
  } catch (error) {
    console.error(`Error in GET /price-comparisons/${req.params.category}:`, error);
    res.status(500).json({ message: 'Error fetching category' });
  }
});

module.exports = router; 