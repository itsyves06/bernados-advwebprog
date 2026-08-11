const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpStatus } = require('../config/constants');
const User = require('../models/User');

//REGISTRATION
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(HttpStatus.BAD_REQUEST || 400).json({ 
        success: false, 
        message: 'Email is already registered' 
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Customer',
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(HttpStatus.CREATED || 201).json({ 
      success: true,
      message: 'User registered successfully', 
      data: userResponse 
    });
  } catch (error) {
    next(error);
  }
};

//LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED || 401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(HttpStatus.UNAUTHORIZED || 401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const tokenPayload = { userId: user._id, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'your_super_secret_key', {
      expiresIn: '1d',
    });

    res.status(HttpStatus.OK || 200).json({ 
      success: true, 
      message: 'Login successful',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(HttpStatus.OK).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
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
    }).select('-password');

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