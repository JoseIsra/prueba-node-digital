import { fetchApi } from '../API/fetchApi';
import { loopOfIds, premutationsIds, questionQuery, singleTaskQuery, taskGroupQuery, postQuery, eventQuery } from '../Intefaces/theInterfaces';
import { callQuestionsFromMoodle } from '../callHelpers/CallQuestions';
import { callAssignFromMoodle } from '../callHelpers/CallAssign';
import { callGroupFromMoodle } from '../callHelpers/CallGroups';
import { callPostFromMoodle } from '../callHelpers/CallPost';
import { callEventFromMoodle } from '../callHelpers/CallEvent';
import { callGroupMembersFromMoodle } from '../callHelpers/CallMembers';

export async function PostMutations(connection: any, theData: premutationsIds, hasPrefix: boolean, databaseName: string){
    console.log(theData);
    
    
    //QUESTIONS
    let questionMoodle =  await callQuestionsFromMoodle(connection, hasPrefix, databaseName);
    await Promise.all(questionMoodle.map(async (element: questionQuery)=>{
        await Promise.all(theData.idsChapter.map(async (theChapter: loopOfIds)=>{
            if(theChapter.name == element.courseName){
                let theQuery = `
                mutation createQuestion{
                    createQuestion(classroomId: ${theData.idClassroom}, input:{
                        active: 1,
                        alternatives: "alternatives_test",
                        answer: "${element.answer}",
                        chapterId: ${theChapter.id},
                        hints: "${element.hint}",
                        level: 1,
                        order: 1,
                        size: ${element.length},
                        statement: "${element.statement}",
                        statementUrl: "statementUrl_test",
                        type: ${element.type}
                    }) {
                        id
                    }
                }`;
                const data = JSON.stringify({ query: `${theQuery}`});
                const result =  await fetchApi(data);
            }
        }));
    }));
    console.log("questions");

    /*
    //SINGLE TASK 
    let assignMoodle = await callAssignFromMoodle(connection, hasPrefix, databaseName);
    console.log(assignMoodle);
    await Promise.all(assignMoodle.map(async (element: singleTaskQuery)=>{
        await Promise.all(theData.idsContent.map(async (theContent: loopOfIds)=>{
            if(theContent.name == element.courseName){
                let theQuery = `
                mutation createSingletask{
                    createSingletask(classroomId: ${theData.idClassroom}, input:{
                        active: true,
                        contentId: ${theContent.id},
                        endDate: "${element.endDate}",
                        hidden: false,
                        initDate: "${element.initDate}",
                        membersAll: true,
                        roomId: ${theData.idRoom},
                        scoreMicrotemplate: 1,
                        scoreSubtemplate: 1,
                        scoreTemplate: 1,
                        title: "${element.title}",
                        typeId: 1,
                        userId: ${theData.idUser}
                    }) {
                        id
                    }
                }`;
                console.log(theQuery);
                const data = JSON.stringify({ query: `${theQuery}`});
                const result =  await fetchApi(data);
            }
        }));
    }));
    console.log("single_task");
    */
    
    //TASKGROUP 
    let groupsMoodle = await callGroupFromMoodle(connection, hasPrefix, databaseName);
    let allMembers = await callGroupMembersFromMoodle(connection, hasPrefix, databaseName);
    await Promise.all(groupsMoodle.map(async (element: taskGroupQuery)=>{
        let theQuery = `
        mutation createTaskGroup{ 
            createTaskGroup (classroomId: ${theData.idClassroom},, input:{
                members: "${allMembers}", 
                name: "${element.name}",
                roomId: ${theData.idRoom},
                userId: ${theData.idUser}
            }) {
                name
            }
        }`;
        const data = JSON.stringify({ query: `${theQuery}`});
        const result =  await fetchApi(data);
    }));
    console.log("task_group");


    // POST 
    let postMoodle = await callPostFromMoodle(connection, hasPrefix, databaseName);
    await Promise.all(postMoodle.map(async (element: postQuery)=>{
        let theQuery = `
        mutation createPost{
            createPost(classroomId: ${theData.idClassroom}, input: {
                active: true,
                backgroundId: 0,
                category: 0,
                classroomId: ${theData.idClassroom},
                description: "${element.summary}",
                isVideo: false,
                option: "${element.options}",
                privacy: false,
                url: "url_test",
                userId: ${theData.idUser}
            }){
                id
            }
        }`;
        const data = JSON.stringify({ query: `${theQuery}`});
        const result =  await fetchApi(data);
    }));
    console.log("post");
    
    
    
    // EVENT AND USER_EVENT
    let eventMoodle = await callEventFromMoodle(connection, hasPrefix, databaseName);
    await Promise.all(eventMoodle.map(async (element: eventQuery)=>{
        let theQuery = `
        mutation createEvent{
            createEvent(classroomId: ${theData.idClassroom}, input: {
                calendarId: ${theData.idCalendar},
                data: "${element.name}",
                options: "${element.options}", 
                schedule: "schedule_test",
            }){
                id
            }
        }`;
        const eventQuery = JSON.stringify({ query: `${theQuery}`});
        const eventData = await fetchApi(eventQuery);
        const idEvent = eventData['createEvent'].id;
        
        /*
        let theQuery2 = `
        mutation createUserEvent{
            createUserEvent(classroomId: ${theData.idClassroom}, input:{
                calendarId: ${theData.idCalendar},
                eventId: ${idEvent},
                options: "options", 
                permissionEvent: "permissionEvent_test",
                userId: ${theData.idUser}
            }) {
                id
            }
        }`;
        console.log(theQuery2);
        const userEventQuery = JSON.stringify({ query: `${theQuery2}`});
        const userEventData = await fetchApi(userEventQuery);
        */
    }));
    console.log("event");
    
    
    connection.end();
}

