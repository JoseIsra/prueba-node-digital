"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPostFromMoodle = void 0;
function callPostFromMoodle(connection, hasPrefix) {
    return new Promise(function (resolve, reject) {
        connection.query(`
            SELECT CONCAT(subject,summary,content) as description
            FROM mdl_post;`, (err, results) => {
            if (err)
                throw err;
            resolve(results);
        });
    });
}
exports.callPostFromMoodle = callPostFromMoodle;
