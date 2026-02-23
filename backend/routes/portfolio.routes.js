const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolio.controller');
const { protect } = require('../middleware/auth.middleware');

// User portfolios
router.get('/user', protect, portfolioController.getUserPortfolios);

// Public: published portfolio by id
router.get('/:id', portfolioController.getPublishedPortfolio);

// Create / save portfolio for current user
router.post('/', protect, portfolioController.createPortfolio);

// Delete a portfolio
router.delete('/:id', protect, portfolioController.deletePortfolio);

module.exports = router;

