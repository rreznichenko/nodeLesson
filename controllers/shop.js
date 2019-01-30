
const Product = require('../models/product');
const Cart = require('../models/cart')
 
exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'All Products', path: '/products'});
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {pageTitle: "product details", product : product, path: "/products"})
    })
}

exports.getIndex = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'});
    });
}

exports.getCart = (req, res) => {
    res.render('shop/cart', { pageTitle: 'Your cart', path: '/cart'});
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId,  (product)=> {
        if(product) {
            Cart.addProduct(prodId, product.price);
        }
    });
    res.redirect('/');
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout'});
}
exports.getOrders = (req, res) => {
    res.render('shop/orders', { pageTitle: 'Your orders', path: '/orders'});
}

