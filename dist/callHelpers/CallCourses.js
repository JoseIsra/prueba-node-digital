"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callCourseFromMoodle = void 0;
function callCourseFromMoodle(connection, hasPrefix) {
    return new Promise(function (resolve, reject) {
        connection.query(`
        SELECT * FROM mdl_course`, (err, results) => {
            if (err)
                throw err;
            resolve(results);
        });
    });
}
exports.callCourseFromMoodle = callCourseFromMoodle;
