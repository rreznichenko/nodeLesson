const express = require('express');
const adminContorller = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminContorller.getAddProduct);
router.get('/edit-product/:productId', adminContorller.getEditProduct);
router.get('/products', adminContorller.getProducts);

router.post('/add-product', adminContorller.postAddProduct);
router.post('/edit-product', adminContorller.postEditProduct);
router.post('/delete-product', adminContorller.postDeleteProduct);

module.exports = router;