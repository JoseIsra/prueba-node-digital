import { MembersQuery } from '../Intefaces/theInterfaces';

export function callGroupMembersFromMoodle(connection:any, hasPrefix:boolean, databaseName:string) {
  if (hasPrefix) {
    return new Promise((resolve, reject) => {
      connection.query(`
      SELECT firstname
      from mdl_groups_members mgm
      inner join mdl_groups mg on mg.id = mgm.groupid
      inner join mdl_user mu on mu.id = mgm.userid;
      `,(err:Error , results:MembersQuery[]) => {
        if (err) throw err;
        
        let memberString = results.reduce((members: string, member: MembersQuery) => {
          members += member.firstname +" ";
          return members;
        }, "");
        resolve(memberString);
      });
    });

  } else {

    return new Promise((resolve, reject) => {
      connection.query(`
      SELECT firstname
      from ${databaseName}.groups_members mgm
      inner join ${databaseName}.groups mg on mg.id = mgm.groupid
      inner join ${databaseName}.user mu on mu.id = mgm.userid;
      `,(err:Error , results:MembersQuery[]) => {
        if (err) throw err;
        
        let memberString = results.reduce((members: string, member: MembersQuery) => {
          members += member.firstname +" ";
          return members;
        }, "");
        resolve(memberString);
      });
    });

  }
}