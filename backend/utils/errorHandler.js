// backend/utils/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
  };
  
  module.exports = errorHandler;
  