"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGroupFromMoodle = void 0;
function callGroupFromMoodle(connection, hasPrefix, databaseName) {
    if (hasPrefix) {
        return new Promise(function (resolve, reject) {
            connection.query(`
            SELECT *
            FROM mdl_groups;`, (err, results) => {
                if (err)
                    throw err;
                resolve(results);
            });
        });
    }
    else {
        return new Promise(function (resolve, reject) {
            connection.query(`
          SELECT *
          FROM ${databaseName}.groups;`, (err, results) => {
                if (err)
                    throw err;
                resolve(results);
            });
        });
    }
}
exports.callGroupFromMoodle = callGroupFromMoodle;
