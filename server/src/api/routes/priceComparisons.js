const express = require('express');
const router = express.Router();
const PriceComparison = require('../../database/models/PriceComparison');

// Get all price comparisons
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all price comparisons...');
    const priceComparisons = await PriceComparison.find();
    console.log(`Found ${priceComparisons.length} price comparisons`);
    
    if (!priceComparisons || priceComparisons.length === 0) {
      console.log('No price comparisons found in database');
      return res.status(404).json({ message: 'No price comparisons found' });
    }
    
    res.json(priceComparisons);
  } catch (error) {
    console.error('Error in GET /price-comparisons:', error);
    res.status(500).json({ 
      message: 'Error fetching price comparisons',
      error: error.message 
    });
  }
});

// Get price comparisons by category
router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;
    console.log(`Fetching price comparisons for category: ${category}`);
    
    const priceComparison = await PriceComparison.findOne({ category });
    if (!priceComparison) {
      console.log(`Category not found: ${category}`);
      return res.status(404).json({ message: 'Category not found' });
    }
    
    console.log(`Found price comparison for category: ${category}`);
    res.json(priceComparison);
  } catch (error) {
    console.error(`Error in GET /price-comparisons/${req.params.category}:`, error);
    res.status(500).json({ 
      message: 'Error fetching category',
      error: error.message 
    });
  }
});

// Add new price comparison
router.post('/', async (req, res) => {
  try {
    const { category, items } = req.body;
    console.log('Adding new price comparison:', { category, itemsCount: items?.length });

    // Check if category already exists
    const existingCategory = await PriceComparison.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newComparison = new PriceComparison({
      category,
      items
    });

    await newComparison.save();
    console.log('New price comparison saved:', newComparison);
    res.status(201).json(newComparison);
  } catch (error) {
    console.error('Error in POST /price-comparisons:', error);
    res.status(500).json({ 
      message: 'Error adding price comparison',
      error: error.message 
    });
  }
});

// Delete price comparison
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting price comparison:', id);

    const deletedComparison = await PriceComparison.findByIdAndDelete(id);
    if (!deletedComparison) {
      return res.status(404).json({ message: 'Price comparison not found' });
    }

    console.log('Price comparison deleted:', deletedComparison);
    res.json({ message: 'Price comparison deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /price-comparisons/:id:', error);
    res.status(500).json({ 
      message: 'Error deleting price comparison',
      error: error.message 
    });
  }
});

module.exports = router; 