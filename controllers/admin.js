const Product = require('../models/product');


exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {pageTitle: 'Add Product', path:'/admin/add-product'});
}

exports.postAddProduct =  (req, res) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imgUrl, description, price);
    product.save();
    res.redirect('/')
}

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin product list', path: '/admin/products'});
    });
}