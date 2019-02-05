
const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', { prods: products, pageTitle: 'All Products', path: '/products' });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', { pageTitle: "product details", product, path: "/products" })
    })
}

exports.getIndex = (req, res) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index', { prods: rows, pageTitle: 'Shop', path: '/' });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if (cartProductData) {
                    console.log(cartProductData)
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', { pageTitle: 'Your cart', path: '/cart', products: cartProducts });
        })
    })
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        if (product) {
            Cart.addProduct(prodId, product.price);
        }
    });
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

