import { postQuery } from '../Intefaces/theInterfaces';

export function callPostFromMoodle(connection: any, hasPrefix: boolean, databaseName:string): Promise<postQuery[]> {

    if(hasPrefix) {
      return new Promise( function (resolve,reject) {
          connection.query(`
          SELECT summary, CONCAT(
            "{userid:",userid,",courseid:",courseid,",groupid:",groupid,",moduleid:",moduleid,
            ",coursemoduleid:",coursemoduleid,",subject:",subject,",content:",content,",rating:",rating,
            ",format:",format,",summaryformat:",summaryformat,",attachment:",IFNULL(attachment,"empty"),
            ",publishstate:",publishstate,",lastmodified:",lastmodified,",created:",created,",usermodified:",IFNULL(usermodified,"empty")
            ,"}"
            ) as options
            FROM mdl_post;
              `,(err: any, results: postQuery[]) => {
              if (err) throw err;
              resolve(results);    
          });
      })

    } else {

      return new Promise( function (resolve,reject) {
        connection.query(`
        SELECT summary, CONCAT(
          "{userid:",userid,",courseid:",courseid,",groupid:",groupid,",moduleid:",moduleid,
          ",coursemoduleid:",coursemoduleid,",subject:",subject,",content:",content,",rating:",rating,
          ",format:",format,",summaryformat:",summaryformat,",attachment:",IFNULL(attachment,"empty"),
          ",publishstate:",publishstate,",lastmodified:",lastmodified,",created:",created,",usermodified:",IFNULL(usermodified,"empty")
          ,"}"
          ) as options
          FROM ${databaseName}.post;
            `,(err: any, results: postQuery[]) => {
            if (err) throw err;
            resolve(results);    
        });
    })

    }
}
  