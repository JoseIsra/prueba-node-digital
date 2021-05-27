const mysql = require('mysql');
import { preMutations } from './PreMutations/Premutations';
import { PostMutations } from './PostMutations/PostMutations';
import { premutationsIds } from './Intefaces/theInterfaces';

let databaseName = 'mydb';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : `${databaseName}`,
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
  WHERE table_schema = "${databaseName}" AND table_name = 'course'
  LIMIT 1;`,  async (err:Error, results:any) =>{
  if(err) console.log('error');
  
  let hasPrefix = results.length == 0;
  let premutationsIds: premutationsIds = await preMutations(connection, hasPrefix, databaseName);
  PostMutations(connection, premutationsIds, hasPrefix, databaseName);
});




