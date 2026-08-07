const { HttpStatus } = require('../config/constants');
const Category = require('../models/Category');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(HttpStatus.OK).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Category not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(HttpStatus.CREATED).json({ message: 'Category created successfully', data: category });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category' });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Category not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Category not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};
