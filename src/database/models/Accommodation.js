const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  distance: String,
  walkingTime: String,
  cyclingTime: String,
  drivingTime: String,
  coordinates: {
    lat: Number,
    lng: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Accommodation', accommodationSchema); 