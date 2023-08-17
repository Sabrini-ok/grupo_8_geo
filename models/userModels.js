const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const bcrypt = require('bcrypt')

const modelo = {

    fileRoute: path.join(__dirname, '../data/users.json'),

    create: (userData) => {
        const emailInUse = modelo.findByEmail(userData.email);

        if (emailInUse) {
            return ({
                error: 'Email is already in use'
            });
        }
        let users = JSON.parse(fs.readFileSync(modelo.fileRoute, 'utf-8'));

        const newUser = {
            id: uuid.v4(),
            ...userData
        };

        newUser.password = bcrypt.hashSync(newUser.password, 12);

        users.push(newUser);

        const usersJson = JSON.stringify(users);

        fs.writeFileSync(model.fileRoute, usersJson, 'utf-8');

        return newUser;

    },

    findByEmail: (email) => {
        const users = JSON.parse(fs.readFileSync(modelo.fileRoute, 'utf-8'));

        const coincidence = users.find(usuarioActual => usuarioActual.email === email);

        return coincidence || null;

    },

    findAll: () => {
        
    },

    findByPk: (id) => {

    }

};


module.exports = modelo;