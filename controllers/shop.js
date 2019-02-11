
const Product = require('../models/product');

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
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
    .then( cart => {
        fetchedCart = cart;
        return cart.getProducts({where:{id: prodId}})
        .then(products => {
            let product;
            if(products.length) {
                product = products[0];
            }
            if(product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }   

            return Product.findByPk(prodId)
            .catch(err => {
                console.log(err)
            });
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { 
                    quantity: newQuantity
                }
            })
        })
        .then(() => {
            res.redirect('/cart');
        }) 
        .catch(err => {
            console.log(err)
        });
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postOrder = (req, res) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = {quantity: product.cartItem.quantity};
                return product
            }))
        })
        .catch(err => {
            console.log(err)
        });
    })
    .then(result => {
       return fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => {
        cosnole.log(err)
    })
}

exports.getOrders = (req, res) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        res.render('shop/orders', { pageTitle: 'Your orders', path: '/orders', orders});
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.id;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy(); 
    })
    .then(result => {
        res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })
}

