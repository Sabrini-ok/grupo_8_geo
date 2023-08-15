const fs = require('fs');
const path = require('path');

const modelo = {

    fileRoute: path.join(__dirname, '../data/users.json'),

    findAll: () => {
   
        const jsonData = fs.readFileSync(modelo.fileRoute, 'utf-8');
       
        const users = JSON.parse(jsonData);

        return users; 
    },

    findById: (id) => {
        const users = modelo.findAll();
        const selectedUser = users.find(currentUser => currentUser.id == id);

        return selectedUser;
    },

    createUser: (bodyData) => { 
        let users = modelo.findAll(); 

        const lastUserId = users[users.length - 1].id;

        const newUser = {
            id: lastUserId + 1, 
            ...bodyData 
        }
        
        users.push(newUser);

        const jsonData = JSON.stringify(users);
        fs.writeFileSync(modelo.fileRoute, jsonData, 'utf-8'); 
        
        return newUser;
    }
};


module.exports = modelo;