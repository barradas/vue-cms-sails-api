/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    group: {
      type: 'string',
      //required: true
    },
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      //delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  }
};



//// We don't want to store password with out encryption
//var bcrypt = require('bcrypt');
//
//module.exports = {
//
//  schema: true,
//
//  attributes: {
//    email: {
//      type: 'email',
//      required: 'true',
//      unique: true // Yes unique one
//    },
//
//    encryptedPassword: {
//      type: 'string'
//    },
//    // We don't wan't to send back encrypted password either
//    toJSON: function () {
//      var obj = this.toObject();
//      delete obj.encryptedPassword;
//      return obj;
//    }
//  },
//  // Here we encrypt password before creating a User
//  beforeCreate : function (values, next) {
//    bcrypt.genSalt(10, function (err, salt) {
//      if(err) return next(err);
//      bcrypt.hash(values.password, salt, function (err, hash) {
//        if(err) return next(err);
//        values.encryptedPassword = hash;
//        next();
//      })
//    })
//  },
//
//  comparePassword : function (password, user, cb) {
//    bcrypt.compare(password, user.encryptedPassword, function (err, match) {
//
//      if(err) cb(err);
//      if(match) {
//        cb(null, true);
//      } else {
//        cb(err);
//      }
//    })
//  }
//};

