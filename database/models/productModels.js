const fs = require('fs');
const path = require('path');

const modelo = {

    fileRoute: path.join(__dirname, '../../data/products.json'), //Guardo ruta que se repite en una variable

    findAll: () => {
        //Buscamos el contenido del archivo JSON
        const jsonData = fs.readFileSync(modelo.fileRoute, 'utf-8');
        //Convertimos el JSON en JS
        const products = JSON.parse(jsonData);

        return products; //Retorno un array con los productos
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
    },
    // Delete
    destroy: (id) => {
        let products = modelo.findAll();

        // Filtramos el producto de ID seleccionado
        products = products.filter(productoActual => productoActual.id !== id);

        const jsonProducts = JSON.stringify(products);

        fs.writeFileSync(modelo.fileRoute, jsonProducts, 'utf-8');
    },

    // Edit
    updateProduct: (updatedProduct) => {
        // Buscar array de productos ya existentes
        let products = modelo.findAll();
        // Conseguir en qué indice de ese array, está guardado el producto del id en cuestión
        const prodIndex = products.findIndex(productoActual => productoActual.id === updatedProduct.id);
        // Modificar el elemento del array en ese índice, por el que nos pasaron por parámetro
        products[prodIndex] = updatedProduct;
        // Convertir este nuevo array en JSON
        const productsJson = JSON.stringify(products);
        // Guardar todo al JSON
        fs.writeFileSync(modelo.fileRoute, productsJson, 'utf-8');
    }


};


module.exports = modelo;