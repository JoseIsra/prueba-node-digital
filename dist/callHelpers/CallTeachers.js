"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callTeacherFromMoodle = void 0;
function callTeacherFromMoodle(connection, hasPrefix, databaseName) {
    if (hasPrefix) {
        return new Promise((resolve, reject) => {
            connection.query(`
        SELECT CONCAT(firstname,' ',lastname) as name
        FROM mdl_role mdr 
        INNER JOIN mdl_role_assignments mra ON mra.roleid = mdr.id  
        INNER JOIN mdl_user mdu ON  mdu.id = mra.userid 
        where shortname ="teacher";`, (err, results) => {
                if (err)
                    throw err;
                let teacherString = results.reduce((teachers, teacher) => {
                    teachers += teacher.name + " ";
                    return teachers;
                }, "");
                resolve(teacherString);
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            connection.query(`
        SELECT CONCAT(firstname,' ',lastname) as name
        FROM ${databaseName}.role mdr 
        INNER JOIN ${databaseName}.role_assignments mra ON mra.roleid = mdr.id  
        INNER JOIN ${databaseName}.user mdu ON  mdu.id = mra.userid 
        where shortname ="teacher";`, (err, results) => {
                if (err)
                    throw err;
                let teacherString = results.reduce((teachers, teacher) => {
                    teachers += teacher.name + " ";
                    return teachers;
                }, "");
                resolve(teacherString);
            });
        });
    }
}
exports.callTeacherFromMoodle = callTeacherFromMoodle;
;
