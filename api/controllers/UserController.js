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
                const user = await User.create({
                    username,
                    password: encryptedPassword,
                }).fetch().catch(err => res.serverError(err));
        
                return res.status(200).json(user);
            }
        })
       
    }
};

