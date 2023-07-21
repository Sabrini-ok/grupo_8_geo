
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config();
const mainRouter = require('./routes/mainRouter');
const userController = require('./routes/userRouter');
const productsController = require('./routes/productsRouter');
// const productRouter = require('./routes/productsRouter');
//Para requerir librerias


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));   //Para hacer publicos los archivos estaticos

app.use('/', mainRouter);

app.use('/user', userController);

app.use('/product', productsController);

app.listen(process.env.PORT, () => console.log('Servidor corriendo en puerto ' + process.env.PORT)); //Levantando servidor
