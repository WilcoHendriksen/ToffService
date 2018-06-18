'use strict';

var db = require('../database');
var Client = require('../models/client');

// The client controller.
var ClientController = {};

ClientController.updateClient = function (req, res) {
    // need some better validation    
    let _id = +req.params.id;
    if (_id > 0) {
        if (!req.body.firstName || !req.body.lastName) {
            res.satus(404).json({ message: 'Please provide a first and/or a lastname.' });
        } else {
            // first get the client
            let updatedClient = {
                firstName: req.body.firstName,
                prePosition: req.body.prePosition,
                lastName: req.body.lastName,
                city: req.body.city,
                street: req.body.street,
                streetNumber: req.body.streetNumber,
                phoneNumber: req.body.phoneNumber,
                mobileNumber: req.body.mobileNumber,
                firstAppointment: req.body.firstAppointment,
                birthday: req.body.birthday,
                interval: req.body.interval,
                allergy: req.body.allergy,
                diabetes: req.body.diabetes,
                particularities: req.body.particularities
            };

            Client.update(updatedClient, { where: { id: _id } }).then((client) => {
                //console.log("test:" + JSON.stringify(client));
                res.status(201).json(updatedClient);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json({ message: 'Error updating Client', stacktrace: error });
            });
        }
    } else {
        res.status(404).json({ message: 'please provide an client id.' });
    }
}

ClientController.addClient = function (req, res) {
    // need some better validation
    if (!req.body.firstName || !req.body.lastName) {
        res.status(404).json({ message: 'Please provide a first and/or a lastname.' });
    } else {
        // update database
        db.sync().then(function () {
            var newClient = {
                firstName: req.body.firstName,
                prePosition: req.body.prePosition,
                lastName: req.body.lastName,
                city: req.body.city,
                street: req.body.street,
                streetNumber: req.body.streetNumber,
                phoneNumber: req.body.phoneNumber,
                mobileNumber: req.body.mobileNumber,
                firstAppointment: req.body.firstAppointment,
                birthday: req.body.birthday,
                interval: req.body.interval,
                allergy: req.body.allergy,
                diabetes: req.body.diabetes,
                particularities: req.body.particularities
            };

            //response message
            return Client.create(newClient).then(function (client) {
                res.status(201).json(client);
            });

        }).catch(function (error) {
            console.log(error);
            res.status(500).json({ message: 'Error addClient', stacktrace: error });
        });
    }
}

ClientController.getClient = function (req, res) {
    let id = req.params.id;
    if (!id) {
        res.status(404).json({ message: 'please provide an client id.' });
    } else {
        Client.findById(+id).then((client) => {
            if (client) {
                res.status(200).json(client);
            } else {
                res.status(404).json({ message: 'no client found!' })
            }
        }).catch(function (error) {
            console.log(error);
            res.status(500).json({ message: 'Error getClient', stacktrace: error });
        });
    }
}

ClientController.getClients = function (req, res) {
    Client.findAll().then(clients => {
        if (clients.length > 0) {
            // setTimeout(function() { 
            //     console.log("Hello"); 
            //     res.status(200).json(clients);
            // }, 3000);
            res.status(200).json(clients);
        } else {
            res.status(404).json({ message: 'no clients found!' });
        }
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Error getClients', stacktrace: error });
    });
}

ClientController.deleteClient = function (req, res) {
    let id = req.params.id;
    if (!id) {
        res.status(404).json({ message: 'please provide an client id.' });
    } else {
        Client.findById(+id).then((client) => {
            client.destroy().then(() => {
                res.status(200).json(client);
            });
        }).catch(function (error) {
            console.log(error);
            res.status(500).json({ message: 'Error deleting Client', stacktrace: error });
        });
    }
}

module.exports = ClientController;