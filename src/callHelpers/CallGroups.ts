import { taskGroupQuery } from '../Intefaces/theInterfaces';

export function callGroupFromMoodle(connection: any, hasPrefix: boolean): Promise<taskGroupQuery[]> {

    return new Promise( function (resolve,reject) {
        connection.query(`
            SELECT *
            FROM mdl_groups;`, 
            (err: any, results: taskGroupQuery[]) => {
            if (err) throw err;
            resolve(results);    
        });
    })
}
  