"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callEventFromMoodle = void 0;
function callEventFromMoodle(connection, hasPrefix) {
    return new Promise(function (resolve, reject) {
        connection.query(`
            SELECT * FROM mdl_event;`, (err, results) => {
            if (err)
                throw err;
            resolve(results);
        });
    });
}
exports.callEventFromMoodle = callEventFromMoodle;
