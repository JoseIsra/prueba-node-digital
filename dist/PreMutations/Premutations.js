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
const CallCourses_1 = require("../callHelpers/CallCourses");
const fetchApi_1 = require("../API/fetchApi");
let theData = {
    idClassroom: "",
    idService: "",
    idContentGroup: "",
    idsContent: [],
    idsChapter: [],
    idRoom: "",
    idUser: "",
    idGroup: "",
    idSubGroup: "",
    idCalendar: "",
};
function preMutations(connection, dataUser, teachers) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
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
      
          const classroomQuery = JSON.stringify({ query: `${clasroomMutation}`});
          const classroomData = await fetchApi(classroomQuery);
          console.log(classroomData);
          theData.idClassroom = classroomData['createClassroom'].id;
          */
        // HARDCODING 
        theData.idClassroom = "7";
        //SERVICE
        let serviceMutation = `
    mutation createService{
        createService(classroomId: ${theData.idClassroom}, input: {
            classroomId: ${theData.idClassroom},
            configurations: "config_test",
            description: "description_test",
            hidden: 1,
            image: "image_test",
            name: "service_test_32",
            paymentMethods: "payment_test",
            previewVideo: "previewVideo_test",
            pricing: "pricing_test",
            secret: 1,
            teachers: "${teachers}",
        }){
          id
        }
    }`;
        const serviceQuery = JSON.stringify({ query: `${serviceMutation}` });
        const serviceData = yield fetchApi_1.fetchApi(serviceQuery);
        console.log(serviceData['createService'].id);
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
        console.log(contentgroupData['createContentgroup'].id);
        theData.idContentGroup = contentgroupData['createContentgroup'].id;
        /*
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
    
        const userQuery = JSON.stringify({ query: `${userMutation}`});
        const userData = await fetchApi(userQuery);
        console.log(userData['createAzUser'].id);
        theData.idUser = userData['createAzUser'].id;
        */
        theData.idUser = "6"; // fu.vargas.les.ter@gmail.com
        // GROUP
        let groupMutation = `
    mutation createGroup{
      createGroup(classroomId:${theData.idClassroom}, input: {
        category: 1,
        classroomId: ${theData.idClassroom},
        hidden: 1,
        name: "group_test"
      }) {
        id
      }
    }`;
        const groupQuery = JSON.stringify({ query: `${groupMutation}` });
        const groupData = yield fetchApi_1.fetchApi(groupQuery);
        console.log(groupData['createGroup'].id);
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
        console.log(subgroupData['createSubgroup'].id);
        theData.idSubGroup = subgroupData['createSubgroup'].id;
        // ROOM
        let roomMutation = `
    mutation createRoom{
      createRoom(classroomId:${theData.idClassroom}, input: {
        adminApproved: true,
        category: 1,
        classDays: "class_days_test",
        code: "code_test",
        configurations: "config_test",
        cycle: 0,
        endHour: "endHour_test",
        hidden: false,
        initHour: "initHour_test",
        limit: 100,
        locked: false,
        name: "name_test",
        privateCode: "privateCode_test",
        publicCode: "publicCode_test",
        subgroupId: ${theData.idSubGroup},
        type: "type_test"
        value: 1.0
      }) {
        id
      }
    }`;
        const roomQuery = JSON.stringify({ query: `${roomMutation}` });
        const roomData = yield fetchApi_1.fetchApi(roomQuery);
        console.log(roomData['createRoom'].id);
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
        console.log(calendarData['createCalendar'].id);
        theData.idCalendar = calendarData['createCalendar'].id;
        // CONTENT AND CHAPTER
        let results = yield CallCourses_1.callCourseFromMoodle(connection, true);
        yield Promise.all(results.map((element) => __awaiter(this, void 0, void 0, function* () {
            if (element.summary == "")
                element.summary = "description_test";
            let idContentTemp;
            //let options = JSON.stringify(element);
            let contentMutation = `
      mutation createContent{
        createContent(classroomId: ${theData.idClassroom}, input: {
          category: 1,
          contentgroupId: ${theData.idContentGroup},
          description: "${element.summary}",
          hidden: false,
          name: "${element.fullname}",
          options: "options", 
          order: 1,
          url: "url_test",
          }){
              id,
              name
          }
      }`;
            const contentQuery = JSON.stringify({ query: `${contentMutation}` });
            const contentData = yield fetchApi_1.fetchApi(contentQuery);
            theData.idsContent.push(contentData['createContent']);
            idContentTemp = contentData['createContent'].id;
            let chapterMutation = `
      mutation createChapter{
          createChapter(classroomId: ${theData.idClassroom}, input: {
              contentId: ${idContentTemp},
              hidden: 1,
              name: "${element.fullname}",
              option: "options", 
              order: 1
              }){
                  id,
                  name
              }
      }`;
            const chapterQuery = JSON.stringify({ query: `${chapterMutation}` });
            const chapterData = yield fetchApi_1.fetchApi(chapterQuery);
            theData.idsChapter.push(chapterData['createChapter']);
        })));
        return theData;
    });
}
exports.preMutations = preMutations;
