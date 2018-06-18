'use strict';

var config      = require('./config');
var sequelize   = require('sequelize');

module.exports = new sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);