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
    const desc = req.body.description;
    Product.create({
        title,
        price,
        imgUrl,
        desc
    })
    .then(result => {
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    }) 
}

exports.postEditProduct = (req, res) => {
    const prodId =  req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImgUrl = req.body.imgUrl;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imgUrl = updatedImgUrl;
        product.desc = updatedDesc;
        return product.save();
    })
    .then(() => {
        console.log("updated");
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then((product) => {
        if (!product) {
            return redirect('/');
        }
    
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            edit: editMode,
            product
        });
    }).catch(err => {
        console.log(err)
    });
}

exports.postDeleteProduct = (req, res) => {
    const id = req.body.id;
    Product.destroy({where: {
        id
    }}).then(() => {
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err)
    });
}

exports.getProducts = (req, res) => {
    Product.findAll()
    .then((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin product list',
            path: '/admin/products'
        });
    })
    .catch(err => {
        console.log(err);
    });
}