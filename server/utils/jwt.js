
const jwt = require('jsonwebtoken');
const { CurrentUserContext } = require('../../frontend/src/contexts/CurrentUserContext');
const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (id) => {jwt.sign(
    { id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d'}
  )
  console.log(`this is the user id passed into generateToken ${id}`);
};

// const isAuthorized = (token) => {
//   jwt.verify(token, JWT_SECRET, (err, decoded ) => {
//     if(err) return false;
    
//     return CurrentUserContext.findOne({_})
//   })
// }

module.exports = { generateToken }; 