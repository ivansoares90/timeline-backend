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
    'GET /me': 'UserController.findLoggedInUser',
    'PATCH /me': 'UserController.updateLoggedInUser',

   // 'GET /users/:id': 'UserController.findOne',
  //  'DELETE /users/:id': 'UserController.delete',

    'POST /login': 'UserController.login',
    'DELETE /logout': 'UserController.logout',

    'POST /posts': 'PostController.create',
    'GET /posts': 'PostController.find'
};
