const { HttpStatus } = require('../config/constants');
const Review = require('../models/Review');

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(HttpStatus.OK).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Review not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.status(HttpStatus.CREATED).json({ message: 'Review created successfully', data: review });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create review' });
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Review not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Review not found' });
    }

    res.status(HttpStatus.OK).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
