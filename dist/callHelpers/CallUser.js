"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callUserFromMoodle = void 0;
function callUserFromMoodle(connection, hasPrefix, databaseName) {
    return new Promise(function (resolve, reject) {
        if (hasPrefix) {
            connection.query(`
        SELECT firstname, idNUmber*1, lastname, email, phone1, address, imagealt
        FROM mdl_user 
        where username="admin";`, (err, results) => {
                if (err)
                    throw err;
                let dataUser = {
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
            connection.query(`
        SELECT firstname, idNUmber*1, lastname, email, phone1, address, imagealt
        FROM ${databaseName}.user 
        where username="admin";`, (err, results) => {
                if (err)
                    throw err;
                let dataUser = {
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
    });
}
exports.callUserFromMoodle = callUserFromMoodle;
