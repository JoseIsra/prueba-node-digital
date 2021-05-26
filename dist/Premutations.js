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
exports.preMutations = void 0;
const fetchApi_1 = require("./API/fetchApi");
let theData;
function preMutations(connection, dataUser, teachers) {
    return __awaiter(this, void 0, void 0, function* () {
        let clasroomMutation = `
    mutation createClassroom{
        createClassroom(input: {
          active : true,
          colors: "blue, orange",
          membership: 1,
          name: "classroom_test_5",
          names: "names_test",
          option: "{}",
          url: "url_test"
        }){
          id
        }
    }`;
        const classroomQuery = JSON.stringify({ query: `${clasroomMutation}` });
        const classroomData = yield fetchApi_1.fetchApi(classroomQuery);
        console.log(classroomData);
        theData.idClassroom = classroomData['createClassroom'].id;
        //SERVICE
        let serviceMutation = `
    mutation createService{
        createService(classroomId: ${theData.idClassroom}, input: {
            classroomId: ${theData.idClassroom},
            configurations: "config_test",
            description: "description_test",
            hidden: 1,
            image: "image_test",
            name: "service_test",
            paymentMethods: "payment_test",
            pricing: "pricing_test",
            secret: 1,
            teachers: "${teachers}",
        }){
          id
        }
    }`;
        const serviceQuery = JSON.stringify({ query: `${serviceMutation}` });
        const serviceData = yield fetchApi_1.fetchApi(serviceQuery);
        console.log(serviceData);
        theData.idService = serviceData['createService'].id;
        // CONTENTGROUP
        let contentGroupMutation = `
    mutation createContentgroup{
      createContentgroup(classroomId: ${theData.idClassroom}, input: {
        name: "contentgroup_test",
        order: 1,
        serviceId: ${theData.idService}
      }){
        id
      }
    }`;
        const contentGroupQuery = JSON.stringify({ query: `${contentGroupMutation}` });
        const contentgroupData = yield fetchApi_1.fetchApi(contentGroupQuery);
        console.log(contentgroupData);
        theData.idContentGroup = contentgroupData['createContentGroup'].id;
        // USER
        let userMutation = `
    mutation createAzUser{
      createAzUser(classroomId: ${theData.idClassroom}, input: {
        documentNumber: 1,
        documentType: 1,
        email: "${dataUser.email}",
        fatherName: "${dataUser.lastname}",
        firstName: "${dataUser.firstName}",
        motherName: "${dataUser.lastname}"
        }){
            id
        }
    }`;
        const userQuery = JSON.stringify({ query: `${userMutation}` });
        const userData = yield fetchApi_1.fetchApi(userQuery);
        console.log(userData);
        theData.idUser = userData['createAzUser'].id;
        // GROUP
        let groupMutation = `
    mutation createGroup{
      createGroup(classroomId:${theData.idClassroom}, input: {
        category: 1,
        classroomId: ${theData.idClassroom},
        hidden: false,
        name: "group_test"
      }) {
        id
      }
    }`;
        const groupQuery = JSON.stringify({ query: `${groupMutation}` });
        const groupData = yield fetchApi_1.fetchApi(groupQuery);
        console.log(groupData);
        theData.idGroup = groupData['createGroup'].id;
        //SUBGROUP
        let subgroupMutation = `
    mutation createSubgroup{
      createSubgroup(classroomId:${theData.idClassroom}, input: {
        groupId: ${theData.idGroup},
        hidden: false,
        name: "subgroup_test"
      }) {
        id
      }
    }`;
        const subgroupQuery = JSON.stringify({ query: `${subgroupMutation}` });
        const subgroupData = yield fetchApi_1.fetchApi(subgroupQuery);
        console.log(subgroupData);
        theData.idSubGroup = subgroupData['createSubgroup'].id;
        // ROOM
        let roomMutation = `
    mutation createRoom{
      createRoom(classroomId:${theData.idClassroom}, input: {
        adminApproved: true,
        code: "code_test",
        configurations: "config_test",
        hidden: false,
        locked: false,
        name: "name_test",
        privateCode: "privateCode_test",
        publicCode: "publicCode_test",
        subgroupId: ${theData.idSubGroup}
      }) {
        id
      }
    }`;
        const roomQuery = JSON.stringify({ query: `${roomMutation}` });
        const roomData = yield fetchApi_1.fetchApi(roomQuery);
        console.log(roomData);
        theData.idRoom = roomData['createRoom'].id;
        // CALENDAR
        let calendarMutation = `
    mutation createCalendar{
      createCalendar(classroomId:${theData.idClassroom}, input: {
        description: "description_test",
        optionVisibility: "optionVisibility_test",
        options: "options_test",
        title: "calendar_test",
        userId: ${theData.idUser}
      }) {
        id
      }
    }`;
        const calendarQuery = JSON.stringify({ query: `${calendarMutation}` });
        const calendarData = yield fetchApi_1.fetchApi(calendarQuery);
        console.log(calendarData);
        theData.idCalendar = calendarData['createCalendar'].id;
        /*
        // CONTENT AND CHAPTER
        let chapterNContent = await getLoop(connection, theData.idClassroom, theData.idContentGroup);
        theData.idsContent = chapterNContent.idContentArray;
        theData.idsChapter = chapterNContent.idChapterArray;
        */
        console.log(theData);
        return theData;
    });
}
exports.preMutations = preMutations;
