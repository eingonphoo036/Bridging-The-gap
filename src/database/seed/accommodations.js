const mongoose = require('mongoose');
const Accommodation = require('../models/Accommodation');
require('dotenv').config();

const sampleData = [
  {
    name: "Student Halls - University of Manchester",
    location: "Manchester",
    type: "University Halls",
    price: 150,
    period: "per week",
    description: "Modern student accommodation with en-suite rooms and shared kitchen facilities. Located on campus with 24/7 security.",
    amenities: [
      "En-suite bathroom",
      "Shared kitchen",
      "Study desk",
      "High-speed internet",
      "Laundry facilities",
      "24/7 security"
    ],
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
    ],
    contact: {
      email: "accommodation@manchester.ac.uk",
      phone: "+44 161 275 2888",
      address: "Oxford Road, Manchester, M13 9PL"
    },
    rating: 4.5,
    address: "Oxford Road, Manchester, M13 9PL",
    coordinates: {
      lat: 53.4668,
      lng: -2.2339
    },
    walkingTime: "15 minutes",
    cyclingTime: "5 minutes",
    drivingTime: "10 minutes"
  },
  {
    name: "Private Student Apartment - London",
    location: "London",
    type: "Private Apartment",
    price: 250,
    period: "per week",
    description: "Luxury student apartment in central London with modern amenities and excellent transport links.",
    amenities: [
      "Private kitchen",
      "En-suite bathroom",
      "Study area",
      "Gym access",
      "Bike storage",
      "24/7 concierge"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
    ],
    contact: {
      email: "info@studentapartments.com",
      phone: "+44 20 7123 4567",
      address: "123 Student Street, London, SW1A 1AA"
    },
    rating: 4.8,
    address: "123 Student Street, London, SW1A 1AA",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278
    },
    walkingTime: "20 minutes",
    cyclingTime: "8 minutes",
    drivingTime: "15 minutes"
  },
  {
    name: "Shared House - Birmingham",
    location: "Birmingham",
    type: "Shared House",
    price: 120,
    period: "per week",
    description: "Cozy shared house in a student-friendly area with good transport links to universities.",
    amenities: [
      "Shared kitchen",
      "Shared bathroom",
      "Garden",
      "Parking",
      "Bike storage",
      "Washing machine"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    contact: {
      email: "info@studenthouses.com",
      phone: "+44 121 234 5678",
      address: "456 Student Lane, Birmingham, B1 1BB"
    },
    rating: 4.2,
    address: "456 Student Lane, Birmingham, B1 1BB",
    coordinates: {
      lat: 52.4862,
      lng: -1.8904
    },
    walkingTime: "25 minutes",
    cyclingTime: "10 minutes",
    drivingTime: "12 minutes"
  },
  {
    name: "Studio Apartment - Edinburgh",
    location: "Edinburgh",
    type: "Studio",
    price: 180,
    period: "per week",
    description: "Modern studio apartment in the heart of Edinburgh, perfect for independent students.",
    amenities: [
      "Private kitchen",
      "Private bathroom",
      "Study area",
      "High-speed internet",
      "Security system",
      "Laundry facilities"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    contact: {
      email: "info@studentstudios.com",
      phone: "+44 131 234 5678",
      address: "789 Student Court, Edinburgh, EH1 1CC"
    },
    rating: 4.6,
    address: "789 Student Court, Edinburgh, EH1 1CC",
    coordinates: {
      lat: 55.9533,
      lng: -3.1883
    },
    walkingTime: "18 minutes",
    cyclingTime: "7 minutes",
    drivingTime: "8 minutes"
  },
  {
    name: "Purpose-Built Student Accommodation - Leeds",
    location: "Leeds",
    type: "PBSA",
    price: 160,
    period: "per week",
    description: "Modern purpose-built student accommodation with excellent facilities and social spaces.",
    amenities: [
      "En-suite bathroom",
      "Shared kitchen",
      "Common room",
      "Gym",
      "Study room",
      "24/7 security"
    ],
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
    ],
    contact: {
      email: "info@studentpbsa.com",
      phone: "+44 113 234 5678",
      address: "321 Student Square, Leeds, LS1 1DD"
    },
    rating: 4.7,
    address: "321 Student Square, Leeds, LS1 1DD",
    coordinates: {
      lat: 53.8008,
      lng: -1.5491
    },
    walkingTime: "22 minutes",
    cyclingTime: "9 minutes",
    drivingTime: "11 minutes"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Accommodation.deleteMany({});
    console.log('Cleared existing accommodations');

    // Insert new data
    await Accommodation.insertMany(sampleData);
    console.log('Seeded accommodation data');

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 