import { User } from "../Intefaces/theInterfaces";

const  User = require('../Intefaces/theInterfaces');

function callUser(connection:any , hasPrefix:boolean):typeof User {

  return new Promise<typeof User>(function (resolve,reject) {
    if(hasPrefix) {
      connection.query(`
        SELECT firstname, idNUmber*1, lastname, email, phone1, address, imagealt
        FROM mdl_user 
        where username="admin";`,
        (err:Error, results:any) => {
        if (err) throw err;
        let dataUser = {} as User;
          dataUser = {
          documentNumber: 1,
          documentType: 1,
          email: `${results[0].email}`,
          fatherName: `${results[0].lastname}`,
          firstName: `${results[0].firstname}`,
          motherName: `${results[0].lastname}`,
        }
        resolve(dataUser);

      });
    }else{
      console.log("no prefijo");
      
    }
  })
}

module.exports = callUser;