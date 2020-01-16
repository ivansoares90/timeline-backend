const Passwords = require('machinepack-passwords');
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async create(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(402).json({
                msg: 'Invalid params.'
            })
        }

        Passwords.encryptPassword({
            password
        }).exec({
            error: (err) => {
                return res.serverError(err);
            },
            success: async (encryptedPassword) => {
                const createdUser = await User.create({
                    username,
                    password: encryptedPassword,
                }).fetch().catch(err => res.serverError(err));
        
                req.session.user = createdUser.id;

                return res.ok(createdUser);
            }
        })  
    },

    async login(req, res) {
        const { username, password } = req.body;

        const user = await User.findOne({
            username
        }).catch(err => res.serverError(err));

        if(!user) return res.forbidden();

        Passwords.checkPassword({
            passwordAttempt: password,
            encryptedPassword: user.password
        }).exec({
            error: function (err) {
                return res.serverError(err);
            },
       
            incorrect: function () {
                return res.forbidden();
            },
       
            success: function () {
                req.session.user = user.id;
       
                return res.ok(user);
            }
        })
    },

    async logout(req, res) {
        req.session.user = null;

        return res.ok();
    }
    /*async find(req, res) {
        const users = await User.find().catch(err => res.serverError(err));
 
        if(users.length === 0) return res.notFound();
        return res.status(200).json(users);
    }*/
};

