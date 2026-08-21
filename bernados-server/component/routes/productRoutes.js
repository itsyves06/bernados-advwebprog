const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { loginLimiter } = require('../middleware/loginLimiter'); 

// Apply rate limiting to specific routes, such as POST, PUT, and DELETE
router.route('/')
  .get(getAllProducts)
  .post(loginLimiter, createProduct); // Rate limited product creation

router.route('/:id')
  .get(getProductById)
  .put(loginLimiter, updateProduct)    // Rate limited product update
  .delete(loginLimiter, deleteProduct); // Rate limited product deletion

module.exports = router;