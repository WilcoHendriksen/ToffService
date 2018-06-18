'use strict';

var jwt = require('jsonwebtoken');
var randomstring = require('randomstring');

var config = require('../config'),
    db = require('../database'),
    User = require('../models/user');

// The authentication controller
var AuthController = {};

// Register a user
AuthController.signUp = function(req, res) {
    if(!req.body.username || !req.body.password) {
        res.json({ message: 'Username and password are required.' });
    } else {
        db.sync().then(function() {
            var newUser = {
                username: req.body.username,
                password: req.body.password,
                refreshtoken: jwt.sign({ username: req.body.username }, config.keys.secret)
            };

            return User.create(newUser).then(function() {
                res.status(201).json({ message: 'Account created!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'Username already exists!' });
        });
    }
}

// Authenticate a user
AuthController.authenticateUser = function(req, res) {

    if(!req.body.granttype) {
        res.status(404).json({ message: 'Login failed!' });
    } else {
        if (req.body.granttype == 'password') {
            authenticatePassword(req, res);
        } else if (req.body.granttype == 'refreshtoken') {
            authenticateRefreshToken(req, res);
        }      
    }

}

// function to authenticate process password
function authenticatePassword(req, res) {

    if(!req.body.username || !req.body.password) {
        res.status(404).json({ message: 'Username and password are required!' });
    } else {
        let username = req.body.username,
            password = req.body.password,
            potentialUser = { where: { username: username } };
        User.findOne(potentialUser).then(function(user) {
            if(!user) {
                res.status(404).json({ message: 'Authentication failed!' });
            } else {
                console.log('found user: ' + user.username);
                user.comparePasswords(password, function(error, isMatch) {
                    if(isMatch && !error) {
                        let token = jwt.sign({ username: user.username }, config.keys.secret, { expiresIn: '30m' });
                        
                        res.json({
                            success: true,
                            access_token: 'bearer ' + token,
                            role: user.role,
                            refresh_token: user.refreshtoken
                        });
                    } else {
                        res.status(404).json({ message: 'Login failed!' });
                    }
                });
            }
        }).catch(function(error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error!' });
        });
    }

}

// function to handle refresh tokens
function authenticateRefreshToken(req, res) {
    
    if (!req.body.refreshtoken) {
        res.status(404).json({ message: 'Refreshtoken is required!' });
    } else {
        let potentialUser = { where: { refreshtoken: req.body.refreshtoken } };

        User.findOne(potentialUser).then(function(user) {
            if(!user) {
                res.status(404).json({ message: 'Authentication failed!' });
            } else {
                console.log('found user: ' + user.username);
                let token = jwt.sign({ username: user.username }, config.keys.secret, { expiresIn: '30m' });
                res.json({
                    success: true,
                    access_token: 'bearer ' + token,
                    role: user.role,
                    refresh_token: user.refreshtoken
                });
            }
        }).catch(function(error) {
            console.log(error);
            res.status(500).json({ message: 'There was an error!' });
        });
    }

}

module.exports = AuthController;