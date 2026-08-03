const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true,
    },
    category_description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
