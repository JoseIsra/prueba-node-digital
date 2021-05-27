import { Course } from '../Intefaces/theInterfaces';

export function callCourseFromMoodle(connection: any, hasPrefix: boolean): Promise<Course[]> {

    return new Promise( function (resolve,reject) {
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
        `,
        (err: any, results: Course[]) => {
        if (err) throw err;
        resolve(results);
      });
    })
}
  
