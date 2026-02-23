const Portfolio = require('../models/Portfolio');

// POST /api/portfolio
// Requires protect middleware
exports.createPortfolio = async (req, res, next) => {
  try {
    const { templateId, portfolioData, isPublished } = req.body;

    if (!templateId || !portfolioData) {
      return res.status(400).json({
        success: false,
        message: 'templateId and portfolioData are required',
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const portfolio = await Portfolio.create({
      userId: req.user.id,
      templateId,
      data: portfolioData,
      isPublished: !!isPublished,
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio saved',
      portfolio: {
        id: portfolio._id,
        templateId: portfolio.templateId,
        isPublished: portfolio.isPublished,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/portfolio/:id
// Public, but only returns if isPublished === true
exports.getPublishedPortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);

    if (!portfolio || !portfolio.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    res.json({
      success: true,
      portfolio,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/portfolio/user
// Requires protect middleware
exports.getUserPortfolios = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const portfolios = await Portfolio.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      portfolios,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/portfolio/:id
// Requires protect middleware
exports.deletePortfolio = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    if (portfolio.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this portfolio',
      });
    }

    await portfolio.deleteOne();

    res.json({
      success: true,
      message: 'Portfolio deleted',
    });
  } catch (err) {
    next(err);
  }
};

