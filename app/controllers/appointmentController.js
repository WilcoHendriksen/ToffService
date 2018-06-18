'use strict';

var db = require('../database');
var Appointment = require('../models/appointment');
var Client = require('../models/client');

//relations
Client.hasMany(Appointment);

// The appointment controller.
var AppointmentController = {};

//gets a single appointment
AppointmentController.getAppointment = function (req, res) {
    let id = req.params.id;
    if (!id) {
        res.status(404).json({ message: 'please provide an appointment id.' });
    } else {
        Appointment.findById(+id).then((appointment) => {
            if (appointment) {
                res.status(200).json(appointment);
            } else {
                res.status(404).json({ message: 'no appointment found!' })
            }
        }).catch(function (error) {
            console.log(error);
            res.status(500).json({ message: 'Error getAppointment', stacktrace: error });
        });
    }
}

// deletes a single appointment
AppointmentController.deleteAppointment = function (req, res) {
    let id = req.params.id;
    if (!id) {
        res.status(404).json({ message: 'please provide an appointment id.' });
    } else {
        Appointment.findById(+id).then((appointment) => {
            appointment.destroy().then(() => {
                res.status(200).json(appointment);
            });
        }).catch(function (error) {
            console.log(error);
            res.status(500).json({ message: 'Error deleting Appointment', stacktrace: error });
        });
    }
}

// update an appointment
AppointmentController.updateAppointment = function (req, res) {
    // need some better validation    
    let _id = +req.params.id;
    if (_id > 0) {
        if (!req.body.startTime || !req.body.endTime || !req.body.clientId) {
            res.status(404).json({ message: 'Please provide a start, endtime and client.' });
        } else {
            let updatedAppointment = {
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                subject: req.body.subject,
                description: req.body.description,
                clientId: req.body.clientId
            };

            Appointment.update(updatedAppointment, { where: { id: _id } }).then((appointment) => {
                res.status(201).json(updatedAppointment);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json({ message: 'Error updating Appointment', stacktrace: error });
            });
        }
    } else {
        res.status(404).json({ message: 'please provide an appointment id.' });
    }
}

// adds an appointment
AppointmentController.addAppointment = function (req, res) {
    // need some better validation
    if (!req.body.startTime || !req.body.endTime) {
        res.status(404).json({ message: 'Please provide a start and endtime.' });
    } else {
        // update database
        db.sync().then(function () {
            var newAppointment = {
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                subject: req.body.subject,
                description: req.body.description,
                clientId: req.body.clientId
            };

            //response message
            return Appointment.create(newAppointment).then(function (appointment) {
                res.status(201).json(appointment);
            });

        }).catch(function (error) {
            console.log(error);
            res.status(500).json({ message: 'Error add appointment', stacktrace: error });
        });
    }
}

// get all appointments by client
AppointmentController.appointmentsByClient = function(req, res) {
    let _id = +req.params.id;
    if (_id > 0) {
        db.sync().then(() => {
            Client.findAll({
                where: { id: _id },
                include: [Appointment]
            }).then(clients => {
                if(clients > 0) {
                    res.status(200).json(clients);   
                } else { 
                    res.status(404).json({message: 'no clients found with appointments'});
                }
            });
        }, (error) => {
            res.status(500).json({message: 'something went wrong', stacktrace: error });
        });
    } else {
        res.status(500).json({message: 'something went wrong'});
    }
}

module.exports = AppointmentController;