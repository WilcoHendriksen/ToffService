'use strict';

var router                  = require('express').Router();
var config                  = require('../config');
var AuthController          = require('../controllers/authController');
var allowOnly               = require('../services/routesHelper').allowOnly;
var UserController          = require('../controllers/userController');
var AdminController         = require('../controllers/adminController');
var ClientController        = require('../controllers/clientController');
var AppointmentController   = require('../controllers/appointmentController');

var APIRoutes = function (passport) {
    
    // require no authentication
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);

    // requires a user role
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    
    // requires a admin role
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));
    
    // client endpoints
    router.post('/client', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, ClientController.addClient));
    router.get('/client/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, ClientController.getClient));
    router.put('/client/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, ClientController.updateClient));
    router.delete('/client/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, ClientController.deleteClient));
    // clients endpoint
    router.get('/clients', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, ClientController.getClients));
    
    // appointment 
    router.post('/appointment', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AppointmentController.addAppointment));
    router.get('/appointment/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AppointmentController.getAppointment));
    router.put('/appointment/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AppointmentController.updateAppointment));
    router.delete('/appointment/:id', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AppointmentController.deleteAppointment));
    // all appointments of a client
    router.get('/client/:id/appointments', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AppointmentController.appointmentsByClient));
    
    return router;
};

module.exports = APIRoutes;