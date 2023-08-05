
const fs = require('fs');
const path = require('path');

const modelo = {

    fileRoute: path.join(__dirname, '../data/products.json'), //Guardo ruta que se repite en una variable

    findAll: () => {
        //Buscamos el contenido del archivo JSON
        const jsonData = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
        //Convertimos el JSON en JS
        const products = JSON.parse(jsonData);

        return products;
    },

    findById: (id) => {
        const products = modelo.findAll();
        const selectedProduct = products.find(productoActual => productoActual.id == id);//Para ver si el id que se busca por parametro coincide con alguno de los id de los productos del json

        return selectedProduct;
    },

    createProduct: (newProduct) => {
        let products = model.findAll(); //Al array de productos ya existentes hay que pushearle el nuevo prod
        products.push(newProduct);
        const jsonData = JSON.stringify(products); //Convierte JS a formato json
        fs.writeFileSync(model.fileRoute, jsonData, 'utf-8'); //Recibe 3 parametros. La ruta esta guardada en variable
    }
};


module.exports = modelo;