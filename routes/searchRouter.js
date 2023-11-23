const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController');

router.get('/', searchProducts);

module.exports = router;