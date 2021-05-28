"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPostFromMoodle = void 0;
function callPostFromMoodle(connection, hasPrefix, databaseName) {
    if (hasPrefix) {
        return new Promise(function (resolve, reject) {
            connection.query(`
          SELECT summary, CONCAT(
            "{userid:",userid,",courseid:",courseid,",groupid:",groupid,",moduleid:",moduleid,
            ",coursemoduleid:",coursemoduleid,",subject:",subject,",content:",content,",rating:",rating,
            ",format:",format,",summaryformat:",summaryformat,",attachment:",IFNULL(attachment,"empty"),
            ",publishstate:",publishstate,",lastmodified:",lastmodified,",created:",created,",usermodified:",IFNULL(usermodified,"empty")
            ,"}"
            ) as options
            FROM mdl_post;
              `, (err, results) => {
                if (err)
                    throw err;
                resolve(results);
            });
        });
    }
    else {
        return new Promise(function (resolve, reject) {
            connection.query(`
        SELECT summary, CONCAT(
          "{userid:",userid,",courseid:",courseid,",groupid:",groupid,",moduleid:",moduleid,
          ",coursemoduleid:",coursemoduleid,",subject:",subject,",content:",content,",rating:",rating,
          ",format:",format,",summaryformat:",summaryformat,",attachment:",IFNULL(attachment,"empty"),
          ",publishstate:",publishstate,",lastmodified:",lastmodified,",created:",created,",usermodified:",IFNULL(usermodified,"empty")
          ,"}"
          ) as options
          FROM ${databaseName}.post;
            `, (err, results) => {
                if (err)
                    throw err;
                resolve(results);
            });
        });
    }
}
exports.callPostFromMoodle = callPostFromMoodle;
