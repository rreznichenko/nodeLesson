const express = require('express');

const shopContorller = require('../controllers/shop');

const router = express.Router();

router.get('/',  shopContorller.getIndex)
router.get('/products',  shopContorller.getProducts)
router.get('/products/:productId',  shopContorller.getProduct)
router.get('/cart',  shopContorller.getCart)
router.post('/cart',  shopContorller.postCart)
router.get('/orders',  shopContorller.getOrders)
router.post('/create-order',  shopContorller.postOrder)
router.post('/cart-delete-item', shopContorller.postCartDeleteProduct)


module.exports = router