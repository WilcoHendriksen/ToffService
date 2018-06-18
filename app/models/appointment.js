'use strict';

let Seq     = require('sequelize');
let db      = require('../database');

let appointmentDefinition = {
    startTime:{
        type: Seq.DATE,
        allowNull: false,
        defaultValue: Seq.NOW
    },
    endTime:{
        type: Seq.DATE,
        allowNull: false,
        defaultValue: Seq.NOW      
    },
    subject:{
        type: Seq.STRING,
        allowNull: true       
    },
    description:{
        type: Seq.STRING,
        allowNull: true       
    }
};

let AppointmentModel = db.define('appointment', appointmentDefinition);

module.exports = AppointmentModel;