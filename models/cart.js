const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p,(err, fileContent) => {
            let cart = {products: [], quantity: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(p => p.id == id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct; 
            if(existingProduct) {
                updatedProduct = { ...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1; 
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]; 
            }

            cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
        });
    }
}