import { eventQuery } from '../Intefaces/theInterfaces';

export function callEventFromMoodle(connection: any, hasPrefix: boolean): Promise<eventQuery[]> {

    return new Promise( function (resolve,reject) {
        connection.query(`
            SELECT * FROM mdl_event;`,
            (err: any, results: eventQuery[]) => {
            if (err) throw err;
            resolve(results);    
        });
    })
}
  