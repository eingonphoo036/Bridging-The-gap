const mongoose = require('mongoose');
const PriceComparison = require('../models/PriceComparison');
require('dotenv').config();

const sampleData = [
  {
    category: 'Bedding',
    items: [
      {
        name: 'Single Duvet Set',
        image: 'https://images.unsplash.com/photo-1629949009765-40fc74c9ec21?w=500',
        prices: {
          argos: 29.99,
          primark: 24.99,
          tesco: 19.99
        }
      },
      {
        name: 'Pillows (2 pack)',
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=500',
        prices: {
          argos: 12.99,
          primark: 9.99,
          tesco: 8.99
        }
      },
      {
        name: 'Mattress Protector',
        image: 'https://images.unsplash.com/photo-1616628188859-7b11b5b5b5b5?w=500',
        prices: {
          argos: 15.99,
          primark: 12.99,
          tesco: 10.99
        }
      }
    ]
  },
  {
    category: 'Kitchenware',
    items: [
      {
        name: 'Basic Cutlery Set',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          tesco: 8.99,
          sainsburys: 7.99,
          aldi: 6.99
        }
      },
      {
        name: 'Non-stick Pan',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          argos: 12.99,
          tesco: 14.99,
          sainsburys: 15.99
        }
      },
      {
        name: 'Mugs (4 pack)',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
        prices: {
          primark: 6.99,
          tesco: 5.99,
          sainsburys: 7.99
        }
      }
    ]
  },
  {
    category: 'Storage',
    items: [
      {
        name: 'Storage Boxes (3 pack)',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          argos: 9.99,
          primark: 8.99,
          tesco: 7.99
        }
      },
      {
        name: 'Hanging Organiser',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          primark: 7.99,
          argos: 6.99,
          tesco: 5.99
        }
      },
      {
        name: 'Desk Organiser',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          argos: 5.99,
          primark: 4.99,
          tesco: 3.99
        }
      }
    ]
  },
  {
    category: 'Study Supplies',
    items: [
      {
        name: 'Notebooks (5 pack)',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          tesco: 4.99,
          sainsburys: 5.99,
          aldi: 3.99
        }
      },
      {
        name: 'Pens (10 pack)',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          tesco: 2.99,
          sainsburys: 3.99,
          aldi: 1.99
        }
      },
      {
        name: 'Desk Lamp',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          argos: 12.99,
          tesco: 14.99,
          sainsburys: 15.99
        }
      }
    ]
  },
  {
    category: 'Bathroom',
    items: [
      {
        name: 'Towels (2 pack)',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          primark: 12.99,
          argos: 9.99,
          tesco: 8.99
        }
      },
      {
        name: 'Shower Caddy',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          argos: 8.99,
          primark: 7.99,
          tesco: 6.99
        }
      },
      {
        name: 'Bath Mat',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500',
        prices: {
          primark: 6.99,
          argos: 5.99,
          tesco: 4.99
        }
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await PriceComparison.deleteMany({});
    console.log('Cleared existing price comparisons');

    // Insert new data
    await PriceComparison.insertMany(sampleData);
    console.log('Seeded price comparison data');

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 