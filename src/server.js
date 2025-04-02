require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./api/routes/auth');
const priceComparisonRoutes = require('./api/routes/priceComparisons');
const accommodationRoutes = require('./api/routes/accommodations');
const userRoutes = require('./api/routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set mongoose strictQuery to false to suppress warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/price-comparisons', priceComparisonRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 