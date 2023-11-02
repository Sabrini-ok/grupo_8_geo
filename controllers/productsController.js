const path = require('path');
const productModel = require('../database/models/productModels');
const { validationResult } = require('express-validator');
const { log } = require('console');
const Product = require('../database/models/productModelSequelize')

const controller = {
  
    cart: (req, res) => {
        res.render('productCart');
    },

    getList: (req, res) => {
        const products = productModel.findAll(); //Accedo a un metodo de productModel
        res.render('productList', {products}); //Hacerlo asi es lo mismo que poner {products: products}
    },

    getDetail: async(req, res) => {
        const productId = req.params.id;
        const result = await Product.findByPk(productId)
        res.render('productDetail', {products: result.dataValues});
    },



    getProducts: async (req, res) => {
        const products = await Product.findAll()
        
        return res.json({
            products
        })
        },
    
    getProductDetail: async (req, res) => {
            const id = req.params.id
            const product = await Product.findByPk(id)
            if(!product) return res.status(404).json({
                message: 'Product not found'
            }) 
            return res.json(product)
            },

    getCreate: (req, res) => {
        res.render('createProduct');
    },

    postProduct: async(req, res) => {
        

            try {
                const product = await Product.create({
                    productName: req.body.productName,
                    price: req.body.productPrice,
                    description: req.body.productDescription,
                    category: req.body.productCategory,
                    image: req.file.filename,    
                })  
                res.redirect('/product/' + product.id + '/detail');

                  } catch (error) {
             return res.status(500).json({
                message: error.message
             })   
            }



        
        
        //Desde los POST no renderizamos vistas, solo redireccionamos
        // res.redirect('/products');
    },

    getEdit: (req, res) => {
        const product = productModel.findById(Number(req.params.id));

        res.render('editProduct', { product });
    },

    deleteProduct: (req, res) => {
        productModel.destroy(Number(req.params.id));
        res.redirect('/product/list');
    },

    updateProduct: (req, res) => {
        let updatedProduct = {
            id: Number(req.params.id)
        };

        updatedProduct = {
            ...updatedProduct,
            ...req.body
        };

        /* 
            const updatedProduct = req.body;
            updatedProduct.id = Number(req.params.id); 
        */

        productModel.updateProduct(updatedProduct);

        res.redirect('/products/' + updatedProduct.id + '/detail');
    }


}

module.exports = controller;