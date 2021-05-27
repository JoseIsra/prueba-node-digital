import { postQuery } from '../Intefaces/theInterfaces';

export function callPostFromMoodle(connection: any, hasPrefix: boolean): Promise<postQuery[]> {

    return new Promise( function (resolve,reject) {
        connection.query(`
            SELECT CONCAT(subject,summary,content) as description
            FROM mdl_post;`,
            (err: any, results: postQuery[]) => {
            if (err) throw err;
            resolve(results);    
        });
    })
}
  