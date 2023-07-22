
const path = require('path');

const controller = {
    productDetail: (req, res) => {
        res.render(path.resolve(__dirname, '../views/productDetail'));
    },
    cart: (req, res) => {
        res.render(path.resolve(__dirname, '../views/productCart'));
    }
}


module.exports = controller;