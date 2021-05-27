import { eventQuery } from '../Intefaces/theInterfaces';

export function callEventFromMoodle(connection: any, hasPrefix: boolean): Promise<eventQuery[]> {

    return new Promise( function (resolve,reject) {
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
            `,
            (err: any, results: eventQuery[]) => {
            if (err) throw err;
            resolve(results);    
        });
    })
}
  