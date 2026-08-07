const { HttpStatus } = require('../config/constants');
const Order = require('../models/Orders');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(HttpStatus.OK).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Order not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(HttpStatus.CREATED).json({ message: 'Order created successfully', data: order });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create order' });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Order not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Order not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};
