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
        const products = productModel.findAll(); //Accedo a un metodo de productModel
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
        const newProduct = { //Guardamos en una variable lo que ingresa el cliente en el formulario
            productName: req.body.productName, //De esta forma se le puede agregar un poco de seguridad al formulario
            productDescription: req.body.productDescription,
            productCategory: req.body.productCategory,
            productPrice: req.body.productPrice,
            imageUpload: req.body.imageUpload,
            masBuscado: req.body.masBuscado
        }

        const createdProduct = productModel.createProduct(newProduct); //Le pasamos la variable donde almacenamos lo que ingreso el cliente a la funcion del modelo de createProduct. Mediante esta linea de codigo ahora el controller si puede acceder al id del producto
        
        res.redirect('/product/' + createdProduct.id + '/detail');
        //Desde los POST no renderizamos vistas, solo redireccionamos
        // res.redirect('/products');
    }
}

module.exports = controller;