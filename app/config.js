'use strict';

var config = module.exports;

config.db = {
    user: 'marleen',
    password: 'xxx',
    name: 'Toff'
}

//// local
config.db.details = {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql',
    operatorsAliases: false
}

//// synology nas
// config.db.details = {
//     host: '192.168.1.124',
//     port: 3307,
//     dialect: 'mysql',
//     operatorsAliases: false
// }

config.keys = {
    secret: 'RGl0SXNNaWpuR2VoZWlt'
}

var userRoles = config.userRoles = {
    guest: 1,    // ...001
    user: 2,     // ...010
    admin: 4     // ...100
}

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user: userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
}
