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
exports.PostMutations = void 0;
const fetchApi_1 = require("../API/fetchApi");
const CallEvent_1 = require("../callHelpers/CallEvent");
function PostMutations(connection, theData) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(theData);
        /*
        //QUESTIONS
        let questionMoodle =  await callQuestionsFromMoodle(connection, true);
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
    
        
        //SINGLE TASK
        let assignMoodle = await callAssignFromMoodle(connection, true);
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
        
        
        //TASKGROUP
        let groupsMoodle = await callGroupFromMoodle(connection, true);
        await Promise.all(groupsMoodle.map(async (element: taskGroupQuery)=>{
            let theQuery = `
            mutation createTaskGroup{
                createTaskGroup (classroomId: ${theData.idClassroom},, input:{
                    members: "options",
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
        let postMoodle = await callPostFromMoodle(connection, true);
        await Promise.all(postMoodle.map(async (element: postQuery)=>{
            let theQuery = `
            mutation createPost{
                createPost(classroomId: ${theData.idClassroom}, input: {
                    active: true,
                    backgroundId: 0,
                    category: 0,
                    classroomId: ${theData.idClassroom},
                    description: "${element.description}",
                    isVideo: false,
                    option: "options",
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
        */
        // EVENT AND USER_EVENT
        let eventMoodle = yield CallEvent_1.callEventFromMoodle(connection, true);
        yield Promise.all(eventMoodle.map((element) => __awaiter(this, void 0, void 0, function* () {
            let theQuery = `
        mutation createEvent{
            createEvent(classroomId: ${theData.idClassroom}, input: {
                calendarId: ${theData.idCalendar},
                data: "description_test",
                options: "options", 
                schedule: "schedule_test",
            }){
                id
            }
        }`;
            const eventQuery = JSON.stringify({ query: `${theQuery}` });
            const eventData = yield fetchApi_1.fetchApi(eventQuery);
            const idEvent = eventData['createEvent'].id;
            console.log("event-1");
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
            const userEventQuery = JSON.stringify({ query: `${theQuery2}` });
            const userEventData = yield fetchApi_1.fetchApi(userEventQuery);
            console.log("user-event-1");
        })));
        console.log("event_user_event");
        connection.end();
    });
}
exports.PostMutations = PostMutations;
