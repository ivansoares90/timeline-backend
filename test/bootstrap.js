var sails = require('sails');
var _ = require('lodash');

global.chai = require('chai');
global.should = chai.should();

before(function (done) {
    this.timeout(5000);

    sails.lift({
        log: {
            level: 'silent'
        },
        hooks: {
            grunt: false
        },

    }, function (err, server) {
        console.log("Sailed");
        if (err) return done(err);
        done(err, sails);
    });
});


after(function (done) {
    if (sails && _.isFunction(sails.lower)) {
        sails.lower(done);
    }
});