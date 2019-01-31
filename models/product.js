const fs = require('fs'); 
const path = require('path');

const Cart = require('./cart')

const pathToFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
        fs.readFile(pathToFile, (err, fileContent) => {
            if(err) {
                return cb([]);
            }

            cb(JSON.parse(fileContent));
        })
}

module.exports = class Product {
    constructor(id, productTitle, imgUrl, description, price) {
        this.id = id;
        this.title = productTitle;
        this.imgUrl = imgUrl;
        this.desc = description;
        this.price = price;
        this.qty = 0;
    }

    save() {
        getProductsFromFile((products) => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(pathToFile, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                })
            }else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(pathToFile, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }

    static deleteById(id) {
        Product.fetchAll((products) => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(prod => prod.id !== id );
            fs.writeFile(pathToFile, JSON.stringify(updatedProducts), (err) => {
                if(!err) {
                    Cart.deleteProduct(id, product.price)
                }
            }) 
        })
    } 
} 