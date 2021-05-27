import { User } from "../Intefaces/theInterfaces";

export function callUserFromMoodle(connection:any , hasPrefix:boolean, databaseName: string): Promise<User>{

  return new Promise<User>(function (resolve,reject) {
    if(hasPrefix) {
      connection.query(`
        SELECT firstname, idNUmber*1, lastname, email, phone1, address, imagealt
        FROM mdl_user 
        where username="admin";`,
        (err: any, results: User[]) => {
        if (err) throw err;

        let dataUser: User = {
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
      connection.query(`
        SELECT firstname, idNUmber*1, lastname, email, phone1, address, imagealt
        FROM ${databaseName}.user 
        where username="admin";`,
        (err: any, results: User[]) => {
        if (err) throw err;

        let dataUser: User = {
          documentNumber: 1,
          documentType: 1,
          email: `${results[0].email}`,
          fatherName: `${results[0].lastname}`,
          firstName: `${results[0].firstname}`,
          motherName: `${results[0].lastname}`,
        }

        resolve(dataUser);
    });
    }
  })
}

