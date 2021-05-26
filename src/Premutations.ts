const getLoop = require('./callHelpers/CallLoop');
import { premutationsIds, User } from './Intefaces/theInterfaces';
import { fetchApi } from './API/fetchApi';

let theData: premutationsIds;

export async function preMutations(connection: any, dataUser:User, teachers: string){
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
    const serviceQuery = JSON.stringify({ query: `${serviceMutation}`});
    const serviceData = await fetchApi(serviceQuery);
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
    const contentGroupQuery = JSON.stringify({ query: `${contentGroupMutation}`});
    const contentgroupData = await fetchApi(contentGroupQuery);
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

    const userQuery = JSON.stringify({ query: `${userMutation}`});
    const userData = await fetchApi(userQuery);
    console.log(userData);
    theData.idUser = userData['createAzUser'].id;


    // GROUP
    let groupMutation =`
    mutation createGroup{
      createGroup(classroomId:${theData.idClassroom}, input: {
        category: 1,
        classroomId: ${theData.idClassroom},
        hidden: false,
        name: "group_test"
      }) {
        id
      }
    }`

    const groupQuery = JSON.stringify({ query: `${groupMutation}`});
    const groupData = await fetchApi(groupQuery);
    console.log(groupData);
    theData.idGroup = groupData['createGroup'].id;


    //SUBGROUP
    let subgroupMutation =`
    mutation createSubgroup{
      createSubgroup(classroomId:${theData.idClassroom}, input: {
        groupId: ${theData.idGroup},
        hidden: false,
        name: "subgroup_test"
      }) {
        id
      }
    }`

    const subgroupQuery = JSON.stringify({ query: `${subgroupMutation}`});
    const subgroupData = await fetchApi(subgroupQuery);
    console.log(subgroupData);
    theData.idSubGroup = subgroupData['createSubgroup'].id;


    // ROOM
    let roomMutation =`
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
    }`

    const roomQuery = JSON.stringify({ query: `${roomMutation}`});
    const roomData = await fetchApi(roomQuery);
    console.log(roomData);
    theData.idRoom =  roomData['createRoom'].id;


    // CALENDAR
    let calendarMutation =`
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

    const calendarQuery = JSON.stringify({ query: `${calendarMutation}`});
    const calendarData = await fetchApi(calendarQuery);
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
}

