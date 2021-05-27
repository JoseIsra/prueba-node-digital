"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callEventFromMoodle = void 0;
function callEventFromMoodle(connection, hasPrefix, databaseName) {
    if (hasPrefix) {
        return new Promise(function (resolve, reject) {
            connection.query(`
        SELECT name, CONCAT(
          "{name:",name,",format:",format,",categoryid:",categoryid,",courseid:",courseid,
          ",groupid:",groupid,",userid:",userid,",repeatid:",repeatid,",component:",IFNULL(component,"empty"),
          ",modulename:",modulename,",instance:",instance,",type:",type,",eventtype:",eventtype,",timestart:",timestart,
          ",timeduration:",timeduration,",timesort:",IFNULL(timesort,"empty"),",visible:",visible,
          ",sequence:",sequence,",timemodified:",timemodified,",subscriptionid:",IFNULL(subscriptionid,"empty"),
          ",priority:",IFNULL(priority, "empty"), "}"
          ) as options
          FROM moodle.mdl_event;
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
      SELECT name, CONCAT(
        "{name:",name,",format:",format,",categoryid:",categoryid,",courseid:",courseid,
        ",groupid:",groupid,",userid:",userid,",repeatid:",repeatid,",component:",IFNULL(component,"empty"),
        ",modulename:",modulename,",instance:",instance,",type:",type,",eventtype:",eventtype,",timestart:",timestart,
        ",timeduration:",timeduration,",timesort:",IFNULL(timesort,"empty"),",visible:",visible,
        ",sequence:",sequence,",timemodified:",timemodified,",subscriptionid:",IFNULL(subscriptionid,"empty"),
        ",priority:",IFNULL(priority, "empty"), "}"
        ) as options
        FROM ${databaseName}.event;
          `, (err, results) => {
                if (err)
                    throw err;
                resolve(results);
            });
        });
    }
}
exports.callEventFromMoodle = callEventFromMoodle;
