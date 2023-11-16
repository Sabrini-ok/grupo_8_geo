const path = require('path');
const productModel = require('../database/models/productModels');
const { validationResult, body } = require('express-validator');
const { log } = require('console');
const Product = require('../database/models/productModelSequelize');
const sequelize = require('../database/connection');
const Category = require('../database/models/categoryModelSequelize');

const controller = {

    cart: (req, res) => {
        res.render('productCart', { user: req.user });
    },

    getList: async (req, res) => {
        const products = await Product.findAll(); //Accedo a un metodo de productModel
        console.log("products", products);
        res.render('productList', { products }); //Hacerlo asi es lo mismo que poner {products: products}
    },

    getDetail: async (req, res) => {
        const productId = req.params.id;
        const result = await Product.findByPk(productId, {
            attributes: ['id', 'productName', 'price', 'description', 'image', 'categoryId'],
            include: {
                model: Category,
                attributes: ['name'],
                as: 'category'
            }
        })
        res.render('productDetail', { products: result.dataValues, user: req.user });
    },



    getProducts: async (req, res) => {
        const { count, rows: products } = await Product.findAndCountAll()
        const countsByCategory = await Product.findAll({
            group: ['categoryId'],
            include: [{ model: Category, attributes: ['name'] }],
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('categoryId')), 'count'],
                'categoryId'
            ]
        })

        console.log(countsByCategory);
        const countByCategory = countsByCategory.reduce((prev, curr, index) => {
            prev[curr.dataValues.category.name] = curr.dataValues.count
            return prev;
        }, {})



        return res.json({
            products, count, countByCategory
        })
    },

    getProductDetail: async (req, res) => {
        const id = req.params.id
        const product = await Product.findByPk(id)
        if (!product) return res.status(404).json({
            message: 'Product not found'
        })
        return res.json(product)
    },

    getCreate: async (req, res) => {
        const categories = await Category.findAll();
        res.render('createProduct', { categories });
    },

    postProduct: async (req, res) => {
        try {
            const product = await Product.create({
                productName: req.body.productName,
                price: req.body.productPrice,
                description: req.body.productDescription,
                categoryId: req.body.productCategory,
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

    getEdit: async (req, res) => {
        const productId = req.params.id;
        const categories = await Category.findAll();
        const product = await Product.findByPk(productId, {
            attributes: ['id', 'productName', 'price', 'description', 'image', 'categoryId'],
        })

        res.render('editProduct', { product, categories });
    },

    deleteProduct: async (req, res) => {
        const productDelete = await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/product/list');
    },

    updateProduct: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        console.log(req.file)
        const newData = {
            productName: req.body.productName,
            price: req.body.productPrice,
            description: req.body.productDescription,
            categoryId: req.body.productCategory,
            image: req.file ? req.file.filename : product.image
        }
        await product.update(newData);

        await product.save();

        res.redirect('/product/' + product.id + '/detail');
    }


}

module.exports = controller;