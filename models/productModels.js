
const fs = require('fs');
const path = require('path');

const modelo = {

    fileRoute: path.join(__dirname, '../data/products.json'), //Guardo ruta que se repite en una variable

    findAll: () => {
        //Buscamos el contenido del archivo JSON
        const jsonData = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
        //Convertimos el JSON en JS
        const products = JSON.parse(jsonData);

        return products; //Retorno un array con los productos productos
    },

    findById: (id) => {
        const products = modelo.findAll();
        const selectedProduct = products.find(productoActual => productoActual.id == id);//Para ver si el id que se busca por parametro coincide con alguno de los id de los productos del json

        return selectedProduct; //Retorno el producto que se encontro
    },

    createProduct: (bodyData) => { //Al array de productos ya existentes hay que pushearle el nuevo prod
        let products = modelo.findAll(); 

        const lastProId = products[products.length - 1].id; //Conseguimos el id del ultimo elemento

        const newProduct = {
            id: lastProId + 1, //Para que se cree un producto despues del ultimo id existente
            ...bodyData //Spread operator que nos tira todos los datos de este objeto
        }
        
        products.push(newProduct);

        const jsonData = JSON.stringify(products); //Convierte JS a formato json
        fs.writeFileSync(modelo.fileRoute, jsonData, 'utf-8'); //Recibe 3 parametros. La ruta esta guardada en variable

        return newProduct; //Retornamos el producto que se creo en la base de datos
    }
};


module.exports = modelo;