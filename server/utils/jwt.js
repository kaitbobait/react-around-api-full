
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (id) => {jwt.sign(
    { id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d'}
  )
  console.log(`this is the user id passed into generateToken ${id}`);
};

module.exports = { generateToken }; 