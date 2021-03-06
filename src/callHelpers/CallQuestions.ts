import { questionQuery } from '../Intefaces/theInterfaces';

export function callQuestionsFromMoodle(connection: any, hasPrefix: boolean,databaseName:string): Promise<questionQuery[]> {
  if (hasPrefix) {
    return new Promise( function (resolve,reject) {
        connection.query(`
            SELECT questiontext as statement,hint, answer, length, (mmq.qtype*1) as type, mmc.fullname as courseName
            FROM mdl_question mmq 
            INNER JOIN mdl_question_hints mqh ON mmq.id = mqh.questionid
            INNER JOIN mdl_question_answers  mqa ON mmq.id = mqa.question
            INNER JOIN mdl_quiz mmz ON mmq.parent = mmz.id
            INNER JOIN mdl_course mmc ON mmc.id = mmz.course;`,
            (err: any, results: questionQuery[]) => {
            if (err) throw err;
            resolve(results);    
        });
    })
  } else {
    return new Promise( function (resolve,reject) {
      connection.query(`
          SELECT questiontext as statement,hint, answer, length, (mmq.qtype*1) as type, mmc.fullname as courseName
          FROM ${databaseName}.question mmq 
          INNER JOIN ${databaseName}.question_hints mqh ON mmq.id = mqh.questionid
          INNER JOIN ${databaseName}.question_answers  mqa ON mmq.id = mqa.question
          INNER JOIN ${databaseName}.quiz mmz ON mmq.parent = mmz.id
          INNER JOIN ${databaseName}.course mmc ON mmc.id = mmz.course;`,
          (err: any, results: questionQuery[]) => {
          if (err) throw err;
          resolve(results);    
      });
  })
  }
}
  