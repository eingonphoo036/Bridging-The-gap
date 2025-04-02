const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config');
const Accommodation = require('./models/Accommodation');
const PriceComparison = require('./models/PriceComparison');
const User = require('./models/User');
const fs = require('fs');
const path = require('path');

dotenv.config();

const sampleAccommodations = [
  {
    name: 'Apollo Works',
    location: 'Coventry City Centre',
    address: '1 Apollo Way, Coventry CV1 5DL',
    price: 165,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1555852105-64f35b45c695'
    ],
    amenities: ['Gym', 'Study Room', 'Common Room', 'Laundry'],
    description: 'Modern student accommodation in the heart of Coventry',
    distance: '0.3 miles',
    walkingTime: '5 minutes',
    cyclingTime: '2 minutes',
    drivingTime: '1 minute',
    coordinates: {
      lat: 52.4081,
      lng: -1.5106
    }
  },
  {
    name: 'City Views',
    location: 'Coventry City Centre',
    address: 'New Union Street, Coventry, CV1 2NT',
    price: 180,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1555852105-64f35b45c695'
    ],
    amenities: ['En-suite', 'Gym', 'Cinema Room', 'Study Area'],
    description: 'Luxury student accommodation with panoramic city views',
    distance: '0.2 miles',
    walkingTime: '5 minutes',
    cyclingTime: '3 minutes',
    drivingTime: '2 minutes',
    coordinates: {
      lat: 52.4081,
      lng: -1.5106
    }
  },
  {
    name: 'Student Village',
    location: 'Coventry University Area',
    address: 'Priory Street, Coventry, CV1 5FB',
    price: 155,
    rating: 4.3,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1555852105-64f35b45c695'
    ],
    amenities: ['Common Room', 'Study Area', 'Laundry', 'Bike Storage'],
    description: 'Traditional student accommodation with great community feel',
    distance: '0.4 miles',
    walkingTime: '8 minutes',
    cyclingTime: '4 minutes',
    drivingTime: '3 minutes',
    coordinates: {
      lat: 52.4081,
      lng: -1.5106
    }
  }
];

const priceComparisons = [
  {
    category: "Bedding",
    items: [
      {
        name: "Bed Sheets Set (Queen)",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c",
        prices: {
          walmart: 39.99,
          target: 44.99,
          ikea: 41.99
        }
      },
      {
        name: "Pillow (Standard)",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c",
        prices: {
          walmart: 12.99,
          target: 14.99,
          ikea: 13.99
        }
      },
      {
        name: "Blanket (Queen)",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c",
        prices: {
          walmart: 24.99,
          target: 29.99,
          ikea: 26.99
        }
      }
    ]
  },
  {
    category: "Kitchenware",
    items: [
      {
        name: "Dinnerware Set (4 pieces)",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
        prices: {
          walmart: 29.99,
          target: 34.99,
          ikea: 31.99
        }
      },
      {
        name: "Utensils Set",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
        prices: {
          walmart: 14.99,
          target: 17.99,
          ikea: 15.99
        }
      }
    ]
  },
  {
    category: "Appliances",
    items: [
      {
        name: "Electric Kettle",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
        prices: {
          walmart: 24.99,
          target: 29.99,
          ikea: 26.99
        }
      },
      {
        name: "Mini Fridge",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
        prices: {
          walmart: 89.99,
          target: 94.99,
          ikea: 91.99
        }
      }
    ]
  }
];

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Test Student',
    email: 'student@example.com',
    password: 'student123',
    role: 'student'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Accommodation.deleteMany({});
    await PriceComparison.deleteMany({});
    await User.deleteMany({});

    // Insert new data
    console.log('Inserting new data...');
    
    // Insert price comparisons
    const insertedPriceComparisons = await PriceComparison.insertMany(priceComparisons);
    console.log(`Inserted ${insertedPriceComparisons.length} price comparisons`);

    // Insert accommodations
    const accommodations = await Accommodation.insertMany(sampleAccommodations);
    console.log(`Inserted ${accommodations.length} accommodations`);

    // Insert users
    const users = await User.insertMany(sampleUsers);
    console.log(`Inserted ${users.length} users`);

    // Verify data was inserted
    const priceCount = await PriceComparison.countDocuments();
    const accommodationCount = await Accommodation.countDocuments();
    const userCount = await User.countDocuments();

    console.log('\nVerification:');
    console.log(`Price Comparisons in database: ${priceCount}`);
    console.log(`Accommodations in database: ${accommodationCount}`);
    console.log(`Users in database: ${userCount}`);

    console.log('\nDatabase seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 