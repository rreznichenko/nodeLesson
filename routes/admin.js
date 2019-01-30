const express = require('express');
const adminContorller = require('../controllers/admin');
const router = express.Router();

router.get('/add-product', adminContorller.getAddProduct);
router.get('/products', adminContorller.getProducts);

router.post('/add-product', adminContorller.postAddProduct);

module.exports = router;