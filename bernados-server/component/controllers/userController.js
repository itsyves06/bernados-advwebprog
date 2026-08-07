const { HttpStatus } = require('../config/constants');
const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(HttpStatus.OK).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(HttpStatus.CREATED).json({ message: 'User created successfully', data: user });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create user' });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
