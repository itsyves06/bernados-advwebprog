const { HttpStatus } = require('../config/constants');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    const excludedKeys = ['page', 'limit', 'sort', 'search', 'minPrice', 'maxPrice'];
    const queryCopy = { ...req.query };
    excludedKeys.forEach((key) => delete queryCopy[key]);

    Object.keys(queryCopy).forEach((key) => {
      filter[key] = queryCopy[key];
    });

    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: 'i' };
      delete queryCopy.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    if (req.query.search) {
     filter.product_name = { $regex: req.query.search, $options: 'i' };
    }

    let sortBy = { createdAt: -1 };
    if (req.query.sort) {
      sortBy = req.query.sort.split(',').join(' ');
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Products retrieved successfully.',
      count: products.length,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.status(HttpStatus.OK).json({ 
      success: true, 
      message: 'Product retrieved successfully.',
      data: product 
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(HttpStatus.CREATED).json({ 
      success: true, 
      message: 'Product created successfully.', 
      data: product 
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      message: 'Failed to create product' 
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.status(HttpStatus.OK).json({ 
      success: true, 
      message: 'Product updated successfully.',
      data: product 
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.status(HttpStatus.OK).json({ 
      success: true, 
      message: 'Product deleted successfully.' 
    });
  } catch (error) {
    next(error);
  }
};