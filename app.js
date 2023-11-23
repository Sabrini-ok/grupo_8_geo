const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv').config();
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productsRouter');
const connection = require('./database/connection');
const userApiRouter = require('./routes/userApiRouter');
const productApiRouter = require('./routes/productApiRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mysql = require('mysql2');
const Category = require('./database/models/categoryModelSequelize');

async function testConnection() {
    try {
        await connection.authenticate();
        connection.sync();
    } catch (error) {
        console.log("Error: ", error);
    }
}

testConnection();

app.use(cookieParser());

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/partials'),
    path.join(__dirname, './views/main'),
    path.join(__dirname, './views/users'),
    path.join(__dirname, './views/products')
]);

app.use(session({
    secret: 'secret0_secret1',
    resave: false,
    saveUninitialized: true,
}));

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/api/users', userApiRouter);
app.use('/api/products', productApiRouter);

app.get('/api/categories', async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    try {
        const [results] = await connection.query(query, [email]);

        if (results.length > 0) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
        }

        const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        await connection.query(insertQuery, [email, password]);

        return res.status(200).json({ message: 'Registro exitoso.' });
    } catch (error) {
        console.error('Error al registrar nuevo usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }

});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.get("*", (req, res) => {
    res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor corriendo en puerto ' + PORT));