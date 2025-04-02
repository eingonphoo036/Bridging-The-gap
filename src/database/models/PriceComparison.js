const mongoose = require('mongoose');

const priceComparisonSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    prices: {
      tesco: Number,
      primark: Number,
      argos: Number,
      sainsburys: Number,
      aldi: Number,
      'b&m': Number,
      currys: Number,
      johnlewis: Number
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('PriceComparison', priceComparisonSchema); 