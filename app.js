
const express = require('express');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config();
//Para requerir librerias

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));   //Para hacer publicos los archivos estaticos


app.get('/', (req, res) => {
    const ruta = path.join(__dirname, '/views/index.html');
    res.sendFile(ruta); //Ruta al home 1
});


app.get('/index', (req, res) => {
    const ruta = path.join(__dirname, '/views/index.html');
    res.sendFile(ruta); //Ruta al home 2
});


app.get('/home', (req, res) => {
    const ruta = path.join(__dirname, '/views/index.html');
    res.sendFile(ruta);  //Ruta al home 3
});


app.get('/register', (req, res) => {
    const ruta = path.join(__dirname, '/views/register.html');
    res.sendFile(ruta);
});


app.get('/cart', (req, res) => {
    const ruta = path.join(__dirname, '/views/productCart.html');
    res.sendFile(ruta);
});


app.get('/login', (req, res) => {
    const ruta = path.join(__dirname, '/views/login.html');
    res.sendFile(ruta);
});


app.get('/productDetail', (req, res) => {
    const ruta = path.join(__dirname, '/views/productDetail.html');
    res.sendFile(ruta);
});


app.listen(process.env.PORT, () => console.log('Servidor corriendo en puerto ' + process.env.PORT)); //Levantando servidor
