"use strict";
const mysql = require('mysql');
let database_name = 'moodle';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: `${database_name}`,
});
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected sucesfully');
});
