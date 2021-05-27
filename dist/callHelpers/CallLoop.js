"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoop = void 0;
function getLoop(connection, hasPrefix) {
    return new Promise(function (resolve, reject) {
        connection.query(`
        SELECT * FROM mdl_course`, (err, results) => {
            if (err)
                throw err;
            resolve(results);
        });
    });
}
exports.getLoop = getLoop;
