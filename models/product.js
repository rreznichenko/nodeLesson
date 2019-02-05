const db = require('./../util/database')
const Cart = require('./cart')


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
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
    }

    static deleteById(id) {
    } 
} 