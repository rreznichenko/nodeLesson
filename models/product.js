const fs = require('fs'); 
const path = require('path');
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
    constructor(productTitle, imgUrl, description, price) {
        this.title = productTitle;
        this.imgUrl = imgUrl;
        this.desc = description;
        this.price = price;
        this.qty = 0;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(pathToFile, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id == id);
            cb(product);
        })
    }
}