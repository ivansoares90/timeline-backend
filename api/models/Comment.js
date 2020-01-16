/**
 * Comment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    postId: {
      model: 'post'
    },
    text: {
      required: true,
      type: 'string'
    },
    timestamp: {
      type: 'string',
      columnType: 'datetime'
    },
    userId: {
      model: 'user'
    },
  }
};

