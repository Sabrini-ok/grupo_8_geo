const path = require('path');
const userModel = require('../database/models/userModels');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../database/models/userModelSequelize');
const jwt = require('jsonwebtoken');

const controller = {
    register: (req, res) => {
        return res.render('register');
    },

    processRegister: async (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        const emailExists = await User.findOne({ where: { email: req.body.email } });

        if (emailExists) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'The email is already in use'
                    }
                },
                oldData: req.body
            });
        }

        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.userPassword, randomSalt);

        try {
            const user = await User.create({
                fullName: req.body.userName,
                email: req.body.email,
                gender: req.body.gender,
                password: hashedPassword,
                avatar: req.file.filename,
                admin: req.body.admin === 'on'
            });

            const token = jwt.sign(
                { id: user.dataValues.id, fullName: user.dataValues.fullName, admin: user.dataValues.admin },
                'secret'
            );

            res.cookie('session', token, {
                maxAge: 99999999,
            });

            res.redirect(`/user/${user.dataValues.id}/profile`);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    logout: (req, res) => {
        res.cookie('session', '', {
            maxAge: -1
        });
        res.redirect('/user/login');
    },

    loginPost: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
    
            if (!user) {
                return res.render('login', { errors: [{ msg: 'El email o la contraseña son incorrectos' }], oldData: req.body });
            }
            
            const validPw = await bcrypt.compareSync(req.body.userPassword, user.dataValues.password);
            
            if (validPw) {
                const token = jwt.sign(
                    { id: user.dataValues.id, fullName: user.dataValues.fullName, admin: user.dataValues.admin },
                    'secret'
                );
            
                res.cookie('session', token, {
                    maxAge: 99999999,
                });
            
                return res.redirect(`/user/${user.dataValues.id}/profile`);
            } else {
                return res.render('login', { errors: [{ msg: 'El email o la contraseña son incorrectos' }], oldData: req.body });
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    
    login: async (req, res) => {
        return res.render('login', {
            oldData: req.query.error ? req.body : null,
            error: req.query.error ? 'El email o la contraseña son incorrectos' : null
        });
    },

    getUsers: async (req, res) => {
        const users = await User.findAll();
        return res.json({
            users
        });
    },

    getList: async (req, res) => {
        const users = await User.findAll();
        res.render('userList', { users });
    },

    getUser: async (req, res) => {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({
            message: 'user not found'
        });
        return res.json(user);
    },

    addUser: async (req, res) => {
        res.render('addUser');
    },

    createUser: async (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('addUser', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        const emailExists = await User.findOne({ where: { email: req.body.email } });

        if (emailExists) {
            return res.render('addUser', {
                errors: {
                    email: {
                        msg: 'The email is already in use'
                    }
                },
                oldData: req.body
            });
        }

        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.userPassword, randomSalt);

        try {
            const user = await User.create({
                fullName: req.body.userName,
                email: req.body.email,
                gender: req.body.gender,
                password: hashedPassword,
                avatar: req.file.filename,
                admin: req.body.admin === 'on'
            });

            res.redirect('/user/list/');
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    profile: async (req, res) => {
        const id = req.user.id;
        const user = await User.findByPk(id);
        return res.render('profile', {
            user: user.dataValues
        });
    },

    getEdit: async (req, res) => {
        const userId = req.params.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'fullName', 'email', 'gender', 'password', 'avatar', 'admin'],
        });

        res.render('editUser', { user });
    },

    deleteUser: async (req, res) => {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/user/list');
    },

    updateUser: async (req, res) => {
        const user = await User.findByPk(req.params.id);
        const newData = {
            fullName: req.body.userName,
            email: req.body.email,
            gender: req.body.gender,
            password: req.body.password,
            admin: req.body.admin === 'on',
            image: req.file ? Date.now() + "_" + req.file.filename : user.avatar
        };
        await user.update(newData);
        await user.save();
        const updatedUser = await User.findByPk(req.params.id);
        res.redirect('/user/list');
    },
    userCount: async (req, res) => {
        const count = await User.count();
        res.json({ count });
    },
};

module.exports = controller;
