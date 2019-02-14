const mongoConnect = require('../util/database')

class Product {
    constructor(title, price, desc, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = desc;
        this.imageUrl = imageUrl;
    }   

    save() {

    }
}


const Product = sequlize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull:false
    },
    imgUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Product;