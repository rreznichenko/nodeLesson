
const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res) => {
    Product.findAll()
    .then((products) => {
        res.render('shop/product-list', { prods: products, pageTitle: 'All Products', path: '/products' });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then((product) => {
        res.render('shop/product-detail', { pageTitle: "product details", product, path: "/products" })
    })
    .catch(err => {
        console.log(err)
    });
}

exports.getIndex = (req, res) => {
    Product.findAll()
    .then((products) => {
        res.render('shop/index', { prods: products, pageTitle: 'Shop', path: '/' });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart', { pageTitle: 'Your cart', path: '/cart', products });
        })
        .catch(err => {
            console.log(err)
        });
    })
    .catch(err => {
        console.log(err)
    });
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    req.user.getCart()
    .then( cart => {
        return cart.getProducts({where:{id: prodId}})
        .then(products => {
            
        })
        .catch(err => {
            console.log(err)
        });
    })
    .catch(err => {
        console.log(err)
    })
    res.redirect('/');
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
}
exports.getOrders = (req, res) => {
    res.render('shop/orders', { pageTitle: 'Your orders', path: '/orders' });
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.id;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}

