const mysql = require('mysql');
import { callTeacherFromMoodle } from './callHelpers/CallTeachers';
import { callUserFromMoodle } from './callHelpers/CallUserMoodle';

let database_name = 'moodle';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : `${database_name}`,
});

connection.connect(function(err: Error) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected sucesfully');
});


connection.query(`
  SELECT *
  FROM information_schema.tables
  WHERE table_schema = "${database_name}" AND table_name = 'course'
  LIMIT 1;`,  async (err:Error, results:any) =>{
  if(err) console.log('error');
    
    
  if(results.length == 0){
    let dataUser = await callUserFromMoodle(connection, true); 
    let teachers = await callTeacherFromMoodle(connection);
    console.log(dataUser);
    console.log(teachers);
  }else{
    console.log("Without prefix");
  }
});




