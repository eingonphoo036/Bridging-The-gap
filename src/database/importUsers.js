require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const importUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Read users from JSON file
    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../data/users.json'), 'utf8')
    );

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and import users
    for (const userData of usersData) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = new User({
        ...userData,
        password: hashedPassword
      });

      await user.save();
      console.log(`Imported user: ${userData.email}`);
    }

    console.log('User import completed');
    process.exit(0);
  } catch (error) {
    console.error('Error importing users:', error);
    process.exit(1);
  }
};

importUsers(); 