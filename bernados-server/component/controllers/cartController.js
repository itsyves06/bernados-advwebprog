const Cart = require('../models/Cart');

exports.getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: carts });
  } catch (error) {
    next(error);
  }
};

exports.getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json({ message: 'Cart created successfully', data: cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create cart' });
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({ success: true, message: 'Cart deleted successfully' });
  } catch (error) {
    next(error);
  }
};
