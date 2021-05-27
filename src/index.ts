const mysql = require('mysql');
import { preMutations } from './PreMutations/Premutations';
import { PostMutations } from './PostMutations/PostMutations';
import { premutationsIds } from './Intefaces/theInterfaces';

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
    
    //let premutationsIds: premutationsIds = await preMutations(connection);
    
    let myData: premutationsIds = {
      idClassroom: '7',
      idService: '58',
      idContentGroup: '46',
      idsContent: [ { id: 66, name: 'Demo Moodle' }, { id: 67, name: 'Tesis 5' } ],
      idsChapter: [ { id: 64, name: 'Demo Moodle' }, { id: 65, name: 'Tesis 5' } ],
      idRoom: '38',
      idUser: '6',
      idGroup: '32',
      idSubGroup: '33',
      idCalendar: '63'
    }
    
    PostMutations(connection, myData);
    
  }else{
    console.log("Without prefix");
  }
});




