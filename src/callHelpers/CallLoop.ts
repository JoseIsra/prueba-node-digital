import { Course } from '../Intefaces/theInterfaces';

export function getLoop(connection: any, hasPrefix: boolean): Promise<Course[]> {

    return new Promise( function (resolve,reject) {
        connection.query(`
        SELECT * FROM mdl_course`,
        (err: any, results: Course[]) => {
        if (err) throw err;
        resolve(results);
      });
    })
}
  
