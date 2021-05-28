"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGroupMembersFromMoodle = void 0;
function callGroupMembersFromMoodle(connection, hasPrefix, databaseName) {
    if (hasPrefix) {
        return new Promise((resolve, reject) => {
            connection.query(`
      SELECT firstname
      from mdl_groups_members mgm
      inner join mdl_groups mg on mg.id = mgm.groupid
      inner join mdl_user mu on mu.id = mgm.userid;
      `, (err, results) => {
                if (err)
                    throw err;
                let memberString = results.reduce((members, member) => {
                    members += member.firstname + " ";
                    return members;
                }, "");
                resolve(memberString);
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            connection.query(`
      SELECT firstname
      from ${databaseName}.groups_members mgm
      inner join ${databaseName}.groups mg on mg.id = mgm.groupid
      inner join ${databaseName}.user mu on mu.id = mgm.userid;
      `, (err, results) => {
                if (err)
                    throw err;
                let memberString = results.reduce((members, member) => {
                    members += member.firstname + " ";
                    return members;
                }, "");
                resolve(memberString);
            });
        });
    }
}
exports.callGroupMembersFromMoodle = callGroupMembersFromMoodle;
