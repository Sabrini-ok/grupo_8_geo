const path = require('path');
const productModel = require('../models/productModels');

const controller = {
  
    cart: (req, res) => {
        res.render('productCart');
    },

    edit: (req, res) => {
        res.render('editProduct');
    },

    getList: (req, res) => {
        const products = productModel.findAll();
        res.render('productList', {products}); //Hacerlo asi es lo mismo que poner {products: products}
    },

    getDetail: (req, res) => {
        const productId = req.params.id;
        const selectedProduct = productModel.findById(productId);
        res.render('productDetail', {product: selectedProduct});
    },

    getCreate: (req, res) => {
        res.render('createProduct');
    },

    postProduct: (req, res) => {
        res.send('Se esta creando el producto');
    }
}

module.exports = controller;