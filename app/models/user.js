'use strict'; 

var Sequelize   = require('sequelize');
var bcrypt      = require('bcrypt');
var config      = require('../config');
var db          = require('../database');

var modelDefinition = {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    refreshtoken: {
        type: Sequelize.STRING,
        allowNull: false
    },

    role: {
        type: Sequelize.INTEGER,
        defaultValue: config.userRoles.user
    }
};

var modelOptions = {
    hooks: {
        beforeValidate: (user) => {
            user.password = hashPassword(user);
        }
    }
};

var UserModel = db.define('user', modelDefinition, modelOptions);

// compares a given password with the users password
UserModel.prototype.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

// returns a promise to hash the password if changed
function hashPassword(user) {
    if(user.changed('password')) {
        return bcrypt.hashSync(user.password, 9);
    }
}

module.exports = UserModel;