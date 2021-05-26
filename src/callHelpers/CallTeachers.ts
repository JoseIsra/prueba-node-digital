const Teacher = require('../Intefaces/theInterfaces');

function callTeacherFromMoodle(connection:any) {
  return new Promise((resolve, reject) => {
    connection.query(`
    SELECT CONCAT(firstname,' ',lastname) as name
    FROM mdl_role mdr 
    INNER JOIN mdl_role_assignments mra ON mra.roleid = mdr.id  
    INNER JOIN mdl_user mdu ON  mdu.id = mra.userid 
    where shortname ="teacher";
    `,
    (err:Error, results:typeof Teacher[]) => {
    if (err) throw err;
    let teacherString = results.reduce((teachers:string, teacher:typeof Teacher) => {
      teachers += teacher.name +" ";
      return teachers;
    }, "");
    resolve(teacherString);
  });
  });
};

module.exports = callTeacherFromMoodle;