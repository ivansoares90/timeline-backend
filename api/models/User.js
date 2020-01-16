/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    username: {
      required: true,
      unique: true,
      type: 'string'
    },
    password: {
      required: true,
      type: 'string'
    },
    posts: {
      model: 'Post'
    },
  },
  customToJSON: function () {
    return _.omit(this, ['password']);
  },
};

