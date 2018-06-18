'use strict';

let Seq     = require('sequelize');
let db      = require('../database');

let clientDefinition = {
    firstName:{
        type: Seq.STRING,
        allowNull: false,
    },
    prePosition:{
        type: Seq.STRING,
        allowNull: true
    },
    lastName:{
        type: Seq.STRING,
        allowNull: false,
    },
    city:{
        type: Seq.STRING,
        allowNull: true
    },
    street:{
        type: Seq.STRING,
        allowNull: true
    },
    streetNumber:{
        type: Seq.STRING,
        allowNull: true
    },
    phoneNumber:{
        type: Seq.STRING,
        allowNull: true
    },
    mobileNumber:{
        type: Seq.STRING,
        allowNull: true
    },
    firstAppointment:{
        type: Seq.DATE,
        allowNull: false,
        defaultValue: Seq.NOW
    },
    birthday:{
        type: Seq.DATE,
        allowNull: false,
        defaultValue: Seq.NOW
    },
    interval:{
        type: Seq.STRING,
        allowNull: true
    },
    allergy:{
        type: Seq.STRING,
        allowNull: true
    },
    diabetes:{
        type: Seq.BOOLEAN,
        allowNull: true
    },
    particularities:{
        type: Seq.STRING,
        allowNull: true
    }
};

let ClientModel = db.define('client', clientDefinition);

module.exports = ClientModel;