const path = require('path');
const userModel = require('../database/models/userModels');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { log } = require('console');
const User = require('../database/models/userModelSequelize')
const jwt = require('jsonwebtoken')

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

        loginPost: async (req, res) => {
        const user = await User.findOne({
          where: {
            email: req.body.email
          }
        });
        console.log(user,req.body)

        if (!user) {
        return res.redirect('login?error=El email o la contraseña son incorrectos');
        }
        
        const validPw = await bcrypt.compareSync(req.body.userPassword, user.dataValues.password);

        if (validPw) {
            const token = jwt.sign({id: user.dataValues.id}, 'secret');
            
            res.cookie("session", token, {
                maxAge: 99999999,
            })
            return res.redirect(`profile/${user.id}`);
        } else {
            // Redirige al usuario de vuelta al inicio de sesión en caso de error
            return res.redirect('login?error=El email o la contraseña son incorrectos');
        } 
       
        
    },
        login: async (req, res) => {
        const user = await User.findByPk(req.user)

        if (user) {
            return res.redirect(`profile/${user.id}`);
        }

        res.clearCookie('session');

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