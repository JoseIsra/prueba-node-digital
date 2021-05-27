"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
let database_name = 'mydb';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: `${database_name}`,
});
connection.connect(function (err) {
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
  LIMIT 1;`, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
    if (err)
        console.log('error');
    let hasPrefix = results.length == 0;
    console.log(hasPrefix);
    //let premutationsIds: premutationsIds = await preMutations(connection, hasPrefix);
    //PostMutations(connection, premutationsIds, hasPrefix);
}));
