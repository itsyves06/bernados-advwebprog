const Article = require('../models/Article');

// Fetch all articles
const getArticles = async (req, res) => {
  try {
    const filters = {};
    if (req.query.public === 'true') {
      filters.isActive = true;
    }
    
    const articles = await Article.find(filters).sort({ createdAt: -1 });
    
    // Admin dashboard layout adjustments: inject pre-formatted structural column data
    if (req.query.public !== 'true') {
      const formattedArticles = articles.map(article => {
        const plainArticle = article.toObject();
        return {
          _id: plainArticle._id,
          slug: plainArticle.slug,
          title: plainArticle.title,
          thumbnail: plainArticle.thumbnail,
          content: plainArticle.content,
          paragraphs: plainArticle.content ? plainArticle.content.length : 0,
          preview: plainArticle.content && plainArticle.content[0] 
            ? plainArticle.content[0].substring(0, 60) + '...' 
            : '',
          isActive: plainArticle.isActive
        };
      });
      return res.json(formattedArticles);
    }

    // Public list page directly gets the full database array records
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new article record
const createArticle = async (req, res) => {
  try {
    const { slug, title, content, thumbnail, isActive } = req.body;
    const paragraphArray = Array.isArray(content) 
      ? content 
      : content.split('\n').filter(p => p.trim() !== '');

    const newArticle = await Article.create({
      slug,
      title,
      thumbnail,
      content: paragraphArray,
      isActive
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an article record by ID
const updateArticle = async (req, res) => {
  try {
    if (req.body.content && !Array.isArray(req.body.content)) {
      req.body.content = req.body.content.split('\n').filter(p => p.trim() !== '');
    }
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove an article entirely
const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article removed successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle };