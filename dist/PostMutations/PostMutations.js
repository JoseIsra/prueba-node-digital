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
const CallQuestions_1 = require("../callHelpers/CallQuestions");
const CallGroups_1 = require("../callHelpers/CallGroups");
const CallPost_1 = require("../callHelpers/CallPost");
const CallEvent_1 = require("../callHelpers/CallEvent");
const CallMembers_1 = require("../callHelpers/CallMembers");
function PostMutations(connection, theData, hasPrefix, databaseName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(theData);
        //QUESTIONS
        let questionMoodle = yield CallQuestions_1.callQuestionsFromMoodle(connection, hasPrefix, databaseName);
        yield Promise.all(questionMoodle.map((element) => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(theData.idsChapter.map((theChapter) => __awaiter(this, void 0, void 0, function* () {
                if (theChapter.name == element.courseName) {
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
                    const data = JSON.stringify({ query: `${theQuery}` });
                    const result = yield fetchApi_1.fetchApi(data);
                }
            })));
        })));
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
        let groupsMoodle = yield CallGroups_1.callGroupFromMoodle(connection, hasPrefix, databaseName);
        let allMembers = yield CallMembers_1.callGroupMembersFromMoodle(connection, hasPrefix, databaseName);
        yield Promise.all(groupsMoodle.map((element) => __awaiter(this, void 0, void 0, function* () {
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
            const data = JSON.stringify({ query: `${theQuery}` });
            const result = yield fetchApi_1.fetchApi(data);
        })));
        // POST 
        let postMoodle = yield CallPost_1.callPostFromMoodle(connection, hasPrefix, databaseName);
        yield Promise.all(postMoodle.map((element) => __awaiter(this, void 0, void 0, function* () {
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
            const data = JSON.stringify({ query: `${theQuery}` });
            const result = yield fetchApi_1.fetchApi(data);
        })));
        // EVENT AND USER_EVENT
        let eventMoodle = yield CallEvent_1.callEventFromMoodle(connection, hasPrefix, databaseName);
        yield Promise.all(eventMoodle.map((element) => __awaiter(this, void 0, void 0, function* () {
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
            const eventQuery = JSON.stringify({ query: `${theQuery}` });
            const eventData = yield fetchApi_1.fetchApi(eventQuery);
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
        })));
        connection.end();
    });
}
exports.PostMutations = PostMutations;
