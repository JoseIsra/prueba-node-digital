import { taskGroupQuery } from '../Intefaces/theInterfaces';

export function callGroupFromMoodle(connection: any, hasPrefix: boolean, databaseName:string): Promise<taskGroupQuery[]> {

  if (hasPrefix) {
    return new Promise( function (resolve,reject) {
        connection.query(`
            SELECT *
            FROM mdl_groups;`, 
            (err: any, results: taskGroupQuery[]) => {
            if (err) throw err;
            resolve(results);    
        });
    })

  } else {

    return new Promise( function (resolve,reject) {
      connection.query(`
          SELECT *
          FROM ${databaseName}.groups;`, 
          (err: any, results: taskGroupQuery[]) => {
          if (err) throw err;
          resolve(results);    
      });
  })

  }
}
  