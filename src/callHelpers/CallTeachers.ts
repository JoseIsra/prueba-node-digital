import { teacher } from '../Intefaces/theInterfaces';

export function callTeacherFromMoodle(connection: any, hasPrefix: boolean, databaseName:string): Promise<string>{
  if(hasPrefix){
    return new Promise((resolve, reject) => {
      connection.query(`
        SELECT CONCAT(firstname,' ',lastname) as name
        FROM mdl_role mdr 
        INNER JOIN mdl_role_assignments mra ON mra.roleid = mdr.id  
        INNER JOIN mdl_user mdu ON  mdu.id = mra.userid 
        where shortname ="teacher";`,
        (err: any, results:teacher[]) => {
        if (err) throw err;
        
        let teacherString = results.reduce((teachers: string, teacher: teacher) => {
          teachers += teacher.name +" ";
          return teachers;
        }, "");
  
        resolve(teacherString);
      });
    });
  }else{
    return new Promise((resolve, reject) => {
      connection.query(`
        SELECT CONCAT(firstname,' ',lastname) as name
        FROM ${databaseName}.role mdr 
        INNER JOIN ${databaseName}.role_assignments mra ON mra.roleid = mdr.id  
        INNER JOIN ${databaseName}.user mdu ON  mdu.id = mra.userid 
        where shortname ="teacher";`,
        (err: any, results:teacher[]) => {
        if (err) throw err;
        
        let teacherString = results.reduce((teachers: string, teacher: teacher) => {
          teachers += teacher.name +" ";
          return teachers;
        }, "");
  
        resolve(teacherString);
      });
    });
  }
};

