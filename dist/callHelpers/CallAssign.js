"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callAssignFromMoodle = void 0;
function callAssignFromMoodle(connection, hasPrefix) {
    return new Promise(function (resolve, reject) {
        connection.query(`
            SELECT name as title, Cast(duedate as char(255)) as endDate,
            Cast(allowsubmissionsfromdate as char(255)) as initDate, mmc.fullname as courseName
            FROM mdl_assign mma
            INNER JOIN mdl_course mmc ON mma.course = mmc.id ;`, (err, results) => {
            if (err)
                throw err;
            resolve(results);
        });
    });
}
exports.callAssignFromMoodle = callAssignFromMoodle;
