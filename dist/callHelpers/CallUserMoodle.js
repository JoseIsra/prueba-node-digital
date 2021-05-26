"use strict";
const User = require('../Intefaces/theInterfaces');
function callUser(connection, hasPrefix) {
    return new Promise(function (resolve, reject) {
        if (hasPrefix) {
            connection.query(`
        SELECT firstname, idNUmber*1, lastname, email, phone1, address, imagealt
        FROM mdl_user 
        where username="admin";`, (err, results) => {
                if (err)
                    throw err;
                const dataUser = {
                    documentNumber: 1,
                    documentType: 1,
                    email: `${results[0].email}`,
                    fatherName: `${results[0].lastname}`,
                    firstName: `${results[0].firstname}`,
                    motherName: `${results[0].lastname}`,
                };
                resolve(dataUser);
            });
        }
        else {
            console.log("no prefijo");
        }
    });
}
module.exports = callUser;
