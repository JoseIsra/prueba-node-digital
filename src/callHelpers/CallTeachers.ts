import { teacher } from '../Intefaces/theInterfaces';

export function callTeacherFromMoodle(connection: any, hasPrefix: boolean): Promise<string>{
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
};

