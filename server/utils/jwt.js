
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (id) => {
  return jwt.sign(
    { id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d'}
  )
};

// const isAuthorized = (token) => {
//   jwt.verify(token, JWT_SECRET, (err, decoded ) => {
//     if(err) return false;
    
//     return CurrentUserContext.findOne({_})
//   })
// }

module.exports = { generateToken }; 