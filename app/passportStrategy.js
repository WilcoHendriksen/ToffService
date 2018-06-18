'use strict';

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;
var User        = require('./models/user');
var config      = require('./config');
var Sequelize   = require('sequelize');

function hookJWTStrategy(passport) {
    var options = {};

    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.ignoreExpiration = false;
    
    passport.use(new JwtStrategy(options, function (JWTPayload, callback) {
        User.findOne({ where: { Username: JWTPayload.username } })
            .then(function (user) {
                if (!user) {
                    callback(null, false);
                    return;
                }

                callback(null, user);
            });
    }));
}

module.exports = hookJWTStrategy;