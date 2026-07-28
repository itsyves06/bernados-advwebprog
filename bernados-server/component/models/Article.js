const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnail: { type: String, default: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000' }, 
  content: { type: [String], required: true }, 
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model.Article || mongoose.model('Article', articleSchema);