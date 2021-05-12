
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  jwt.sign({id})
}

module.exports = { generateToken };