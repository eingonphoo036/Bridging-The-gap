const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parse');
const User = require('./models/User');
const PriceComparison = require('./models/PriceComparison');
const Accommodation = require('./models/Accommodation');
require('dotenv').config();

const transformPriceComparisons = async () => {
  const records = [];
  fs.createReadStream('data/price_comparisons.csv')
    .pipe(csv.parse({ columns: true }))
    .on('data', (record) => records.push(record))
    .on('end', async () => {
      const groupedData = {};
      records.forEach(record => {
        if (!groupedData[record.category]) {
          groupedData[record.category] = {
            category: record.category,
            items: {}
          };
        }
        if (!groupedData[record.category].items[record.item_name]) {
          groupedData[record.category].items[record.item_name] = {
            name: record.item_name,
            image: record.image_url,
            prices: {}
          };
        }
        groupedData[record.category].items[record.item_name].prices[record.store] = parseFloat(record.price);
      });

      const formattedData = Object.values(groupedData).map(category => ({
        category: category.category,
        items: Object.values(category.items)
      }));

      await PriceComparison.deleteMany({});
      await PriceComparison.insertMany(formattedData);
      console.log('Price comparisons transformed and inserted');
    });
};

const importUsers = async () => {
  const records = [];
  fs.createReadStream('data/users.csv')
    .pipe(csv.parse({ columns: true }))
    .on('data', (record) => records.push(record))
    .on('end', async () => {
      await User.deleteMany({});
      await User.insertMany(records);
      console.log('Users imported');
    });
};

const importAccommodations = async () => {
  const records = [];
  fs.createReadStream('data/accommodations.csv')
    .pipe(csv.parse({ columns: true }))
    .on('data', (record) => records.push(record))
    .on('end', async () => {
      await Accommodation.deleteMany({});
      await Accommodation.insertMany(records);
      console.log('Accommodations imported');
    });
};

const importAllData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      transformPriceComparisons(),
      importUsers(),
      importAccommodations()
    ]);

    console.log('All data imported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importAllData(); 