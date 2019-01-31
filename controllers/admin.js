const fs = require('fs'); 
const path = require('path');

const pathToFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        edit: false
    });
}

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imgUrl, description, price);
    product.save();
    res.redirect('/')
}

exports.postEditProduct = (req, res) => {
    const prodId =  req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImgUrl = req.body.imgUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImgUrl, updatedDesc, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products')
    
}

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if (!product) {
            return redirect('/');
        }
    
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            edit: editMode,
            product
        });
    });
}

exports.postDeleteProduct = (req, res) => {
    const id = req.body.id;
    Product.deleteById(id);
    res.redirect('/admin/products');
}

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin product list',
            path: '/admin/products'
        });
    });
}