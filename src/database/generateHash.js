const bcrypt = require('bcryptjs');

const generateHash = async () => {
  const password = 'test123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Hashed password:', hash);
};

generateHash(); 