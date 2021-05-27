"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callCourseFromMoodle = void 0;
function callCourseFromMoodle(connection, hasPrefix, databaseName) {
    if (hasPrefix) {
        return new Promise(function (resolve, reject) {
            connection.query(`
      SELECT fullname, CONCAT("{ category:",category,
      ",sortorder:",sortorder,",fullname:",fullname,",shortname:",
      shortname,",summaryformat:",summaryformat,",format:",format,
      ",showgrades:",showgrades,",newsitems:",newsitems,",startdate:",
      startdate,",enddate:",enddate,",relativedatesmode:",relativedatesmode,
      ",marker:",marker,",maxbytes:",maxbytes,",legacyfiles:",legacyfiles,",showreports:",showreports,",visible:",visible,",visibleold:"
      ,visibleold,",downloadcontent:",IFNULL(downloadcontent," empty"),
      ",groupmode:",groupmode,",groupmodeforce:",groupmodeforce,",defaultgrouping:",defaultgroupingid,
      ",timecreated:",timecreated,",timemodified:",timemodified,",requested:",requested,",enablecompletion:",enablecompletion,",completionnotify:",completionnotify,
      "}") as options
      FROM mdl_course;
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
        SELECT fullname, CONCAT("{ category:",category,
        ",sortorder:",sortorder,",fullname:",fullname,",shortname:",
        shortname,",summaryformat:",summaryformat,",format:",format,
        ",showgrades:",showgrades,",newsitems:",newsitems,",startdate:",
        startdate,",enddate:",enddate,",relativedatesmode:",relativedatesmode,
        ",marker:",marker,",maxbytes:",maxbytes,",legacyfiles:",legacyfiles,",showreports:",showreports,",visible:",visible,",visibleold:"
        ,visibleold,",downloadcontent:",IFNULL(downloadcontent," empty"),
        ",groupmode:",groupmode,",groupmodeforce:",groupmodeforce,",defaultgrouping:",defaultgroupingid,
        ",timecreated:",timecreated,",timemodified:",timemodified,",requested:",requested,",enablecompletion:",enablecompletion,",completionnotify:",completionnotify,
        "}") as options
        FROM ${databaseName}.course;
        `, (err, results) => {
                if (err)
                    throw err;
                resolve(results);
            });
        });
    }
}
exports.callCourseFromMoodle = callCourseFromMoodle;
