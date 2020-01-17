/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'POST /users': 'UserController.create',
    'GET /users': 'UserController.find',
    'GET /users/:id': 'UserController.findOne',

    'POST /login': 'UserController.login',
    'DELETE /logout': 'UserController.logout'
};
