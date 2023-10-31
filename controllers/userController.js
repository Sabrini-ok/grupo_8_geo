const path = require('path');
const userModel = require('../database/models/userModels');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { log } = require('console');
const User = require('../database/models/userModelSequelize')

const controller = {

    register: (req, res) => {
        return res.render('register');
    },

    processRegister: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.userPassword, randomSalt);
        

        try {
            const user = await User.create({
                fullName: req.body.userName,
                email: req.body.email, 
                gender: req.body.gender,
                password: hashedPassword,
                avatar: req.file.filename

            })
            
            res.redirect('/user/profile/'+ user.dataValues.id)
            
              } catch (error) {
         return res.status(500).json({
            message: error.message
         })   
        }

    },

        loginPost: (req, res) => {
            console.log(req.body);
        const userInJson = userModel.findByEmail(req.body.email);
        
            console.log(userInJson);
            
        if (!userInJson) {
        return res.redirect('login'); 
        }
        const validPw = true;
      /*   const validPw = bcrypt.compareSync(req.body.password, userInJson.userPassword); */

        if (validPw) {
            // Redirige al usuario a la página de perfil o al área protegida
            res.cookie("session", "prueba", {
                maxAge: 99999999,
            })
            return res.redirect(`profile/${userInJson.id}`);
        } else {
            // Redirige al usuario de vuelta al inicio de sesión en caso de error
            return res.redirect('login?error=El email o la contraseña son incorrectos');
        } 
       
        
    },
        login: (req, res) => {
        return res.render('login'); // Renderiza la vista 'login.ejs'
    },
    
    getUsers: async (req, res) => {
    const users = await User.findAll()
    
    return res.json({
        users
    })
    },

    getUser: async (req, res) => {
        const id = req.params.id
        const user = await User.findByPk(id)
        if(!user) return res.status(404).json({
            message: 'user not found'
        }) 
        return res.json(user)
        },
    

    profile: (req, res) => {
        return res.render ('profile');
    }
}

module.exports = controller;