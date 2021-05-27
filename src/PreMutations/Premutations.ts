import { callCourseFromMoodle } from '../callHelpers/CallCourses';
import { premutationsIds, User, loopOfIds, Course } from '../Intefaces/theInterfaces';
import { fetchApi } from '../API/fetchApi';
import { callUserFromMoodle } from '../callHelpers/CallUser';
import { callTeacherFromMoodle } from '../callHelpers/CallTeachers';

let theData = {
  idClassroom: "",
  idService: "",  
  idContentGroup: "", 
  idsContent: [] as loopOfIds[], 
  idsChapter: [] as loopOfIds[],
  idRoom: "",
  idUser: "",
  idGroup: "",
  idSubGroup: "",
  idCalendar: "",
};

export async function preMutations(connection: any, hasPrefix: boolean, databaseName: string): Promise<premutationsIds>{
    
  let dataUser: User = await callUserFromMoodle(connection, hasPrefix, databaseName);
  let teachers: string = await callTeacherFromMoodle(connection, hasPrefix, databaseName);

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
            name: "service_test_34",
            paymentMethods: "payment_test",
            previewVideo: "previewVideo_test",
            pricing: "pricing_test",
            secret: 1,
            teachers: "${teachers}",
        }){
          id
        }
    }`;
    const serviceQuery = JSON.stringify({ query: `${serviceMutation}`});
    const serviceData = await fetchApi(serviceQuery);
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
    const contentGroupQuery = JSON.stringify({ query: `${contentGroupMutation}`});
    const contentgroupData = await fetchApi(contentGroupQuery);
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
    let groupMutation =`
    mutation createGroup{
      createGroup(classroomId:${theData.idClassroom}, input: {
        category: 1,
        classroomId: ${theData.idClassroom},
        hidden: 1,
        name: "group_test"
      }) {
        id
      }
    }`

    const groupQuery = JSON.stringify({ query: `${groupMutation}`});
    const groupData = await fetchApi(groupQuery);
    console.log(groupData['createGroup'].id);
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
    console.log(subgroupData['createSubgroup'].id);
    theData.idSubGroup = subgroupData['createSubgroup'].id;


    // ROOM
    let roomMutation =`
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
    }`

    const roomQuery = JSON.stringify({ query: `${roomMutation}`});
    const roomData = await fetchApi(roomQuery);
    console.log(roomData['createRoom'].id);
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
    console.log(calendarData['createCalendar'].id);
    theData.idCalendar = calendarData['createCalendar'].id;
       
    // CONTENT AND CHAPTER
    let results: Course[] = await callCourseFromMoodle(connection, true, databaseName);
    
    await Promise.all(results.map(async (element: Course)=>{
      let idContentTemp: string; 

      let contentMutation = `
      mutation createContent{
        createContent(classroomId: ${theData.idClassroom}, input: {
          category: 1,
          contentgroupId: ${theData.idContentGroup},
          description: "${element.fullname}",
          hidden: false,
          name: "${element.fullname}",
          options: "${element.options}", 
          order: 1,
          url: "url_test",
          }){
              id,
              name
          }
      }`;
      
      const contentQuery = JSON.stringify({ query: `${contentMutation}`});
      const contentData = await fetchApi(contentQuery);
      theData.idsContent.push(contentData['createContent']);
      idContentTemp = contentData['createContent'].id;

      
      let chapterMutation = `
      mutation createChapter{
          createChapter(classroomId: ${theData.idClassroom}, input: {
              contentId: ${idContentTemp},
              hidden: 1,
              name: "${element.fullname}",
              option: "${element.options}", 
              order: 1
              }){
                  id,
                  name
              }
      }`;

      const chapterQuery = JSON.stringify({ query: `${chapterMutation}`});
      const chapterData = await fetchApi(chapterQuery);
      theData.idsChapter.push(chapterData['createChapter']);
    }));
        
    return theData;
}

