const express = require('express');
const router = express.Router();
const {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
} = require('../controllers/cartController');

router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

module.exports = router;
