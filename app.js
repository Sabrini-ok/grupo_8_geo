const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const dotenv = require('dotenv').config();
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productsRouter');
// const productRouter = require('./routes/productsRouter');
//Para requerir librerias


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));   //Para hacer publicos los archivos estaticos


app.use(express.urlencoded({extended: true}));
app.use(express.json()); //Con estas dos lineas podemos acceder desde el controller a lo que el usuario inserta en el formulario por POST (req.body)


app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/partials'),
    path.join(__dirname, './views/main'),
    path.join(__dirname, './views/users'),
    path.join(__dirname, './views/products')
]);

app.use(methodOverride('_method')); //Se necesita ara poder eliminar o editar


app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(process.env.PORT || 3000, () => console.log('Servidor corriendo en puerto ' + process.env.PORT)); // Run the server