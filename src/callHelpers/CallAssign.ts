import { singleTaskQuery } from '../Intefaces/theInterfaces';

export function callAssignFromMoodle(connection: any, hasPrefix: boolean, databaseName:string): Promise<singleTaskQuery[]> {

  if (hasPrefix) {
    return new Promise( function (resolve,reject) {
        connection.query(`
            SELECT name as title, Cast(duedate as char(255)) as endDate,
            Cast(allowsubmissionsfromdate as char(255)) as initDate, mmc.fullname as courseName
            FROM mdl_assign mma
            INNER JOIN mdl_course mmc ON mma.course = mmc.id ;`, 
            (err: any, results: singleTaskQuery[]) => {
            if (err) throw err;
            resolve(results);    
        });
    })

  } else {

    return new Promise( function (resolve,reject) {
      connection.query(`
          SELECT name as title, Cast(duedate as char(255)) as endDate,
          Cast(allowsubmissionsfromdate as char(255)) as initDate, mmc.fullname as courseName
          FROM ${databaseName}.assign mma
          INNER JOIN ${databaseName}.course mmc ON mma.course = mmc.id ;`, 
          (err: any, results: singleTaskQuery[]) => {
          if (err) throw err;
          resolve(results);    
      });
  })

  }
}
  