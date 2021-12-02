const db = require('../models/index');
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helper = require('../helpers/response');

module.exports = {
    register: async (req, res) => {
        try {
            const {
                username,
                password,
                email,
                institutionName,
                role
            } = req.body;
            const user = await User.findOne({
                where: {
                    email
                }
            });
            if (user) {
                return res.status(400).send({
                    message: 'Email already exist'
                });
            }
            const hashPassword = await bcrypt.hash(password, 10);
            let newUser = await User.create({
                username,
                password: hashPassword,
                email,
                institutionName,
                role
            });

            delete newUser.dataValues.password;
            delete newUser.dataValues.createdAt;
            delete newUser.dataValues.updatedAt;

            return helper.response(res, 201, 'User has been created', newUser);
        } catch (error) {
            console.log(error);
            return helper.response(res, 400, 'Bad Request', error);
        }
    },

    login: async (req, res) => {
        try {
            const {
                username,
                password
            } = req.body;
            let user = await User.findOne({
                where: {
                    username
                }
            });
            if (!user) {
                return helper.response(res, 404, 'User not found');
            }
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword) {
                return helper.response(res, 400, 'Wrong password');
            }
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                institutionName: user.institutionName,
                role: user.role
            }, process.env.SECRET_KEY, {
                expiresIn: '1d'
            });

            delete user.dataValues.password;
            delete user.dataValues.createdAt;
            delete user.dataValues.updatedAt;

            let response = { ...user.dataValues, token };
            return helper.response(res, 200, 'Login Success', response);
        } catch (error) {
            console.log(error);
            return helper.response(res, 400, 'Bad Request', error);
        }
    },

    getUserVendor: async (req, res) => {
        try {
            const vendor = await User.findAll({
                where: {
                    role: 'vendor'
                },
                attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
            });

            return helper.response(res, 200, 'Success', vendor);
        } catch (error) {
            console.log(error);
            return helper.response(res, 400, 'Bad Request', error);
        }
    },
};