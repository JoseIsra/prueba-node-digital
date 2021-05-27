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
exports.runPrefix = void 0;
const fetchApi_1 = require("../API/fetchApi");
function runPrefix(connection, theData) {
    console.log(theData);
    /** QUESTIONS **/
    connection.query(`
        SELECT questiontext as statement,hint, answer, length, (mmq.qtype*1) as type, mmc.fullname as courseName
        FROM mdl_question mmq 
        INNER JOIN mdl_question_hints mqh ON mmq.id = mqh.questionid
        INNER JOIN mdl_question_answers  mqa ON mmq.id = mqa.question
        INNER JOIN mdl_quiz mmz ON mmq.parent = mmz.id
        INNER JOIN mdl_course mmc ON mmc.id = mmz.course;`, (err, results) => {
        if (err)
            throw err;
        results.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            theData.idsChapter.forEach((theChapter) => __awaiter(this, void 0, void 0, function* () {
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
                            answer
                        }
                    }`;
                    const data = JSON.stringify({ query: `${theQuery}` });
                    const result = yield fetchApi_1.fetchApi(data);
                }
            }));
        }));
    });
    /** SINGLE TASK **/
    connection.query(`
        SELECT name as title, Cast(duedate as char(255)) as endDate,
        Cast(allowsubmissionsfromdate as char(255)) as initDate, mmc.fullname as courseName
        FROM mdl_assign mma
        INNER JOIN mdl_course mmc ON mma.course = mmc.id ;`, (err, results) => {
        if (err)
            throw err;
        results.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            theData.idsContent.forEach((theContent) => __awaiter(this, void 0, void 0, function* () {
                if (theContent.name == element.courseName) {
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
                            title
                        }
                    }`;
                    const data = JSON.stringify({ query: `${theQuery}` });
                    const result = yield fetchApi_1.fetchApi(data);
                }
            }));
        }));
    });
    /** TASKGROUP **/
    connection.query(`
        SELECT *
        FROM mdl_groups;`, (err, results) => {
        if (err)
            throw err;
        results.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            let theQuery = `
            mutation createTaskGroup{ 
                createTaskGroup (classroomId: ${theData.idClassroom},, input:{
                    members: "${JSON.stringify(element)}", 
                    name: "${element.name}",
                    roomId: ${theData.idRoom},
                    userId: ${theData.idUser}
                }) {
                    name
                }
            }`;
            const data = JSON.stringify({ query: `${theQuery}` });
            const result = yield fetchApi_1.fetchApi(data);
        }));
    });
    /** POST **/
    connection.query(`
        SELECT CONCAT(subject,summary,content) as description
        FROM mdl_post;`, (err, results) => {
        if (err)
            throw err;
        results.forEach((element) => __awaiter(this, void 0, void 0, function* () {
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
                    description
                }
            }`;
            const data = JSON.stringify({ query: `${theQuery}` });
            const result = yield fetchApi_1.fetchApi(data);
        }));
    });
    /** EVENT AND USER_EVENT**/
    connection.query(`
        SELECT * FROM mdl_event;`, (err, results) => {
        if (err)
            throw err;
        results.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            let theQuery = `
            mutation createEvent{
                createEvent(classroomId: ${theData.idClassroom}, input: {
                    calendarId: ${theData.idCalendar},
                    data: "${element.description}",
                    options: "options", 
                    schedule: "schedule_test",
                }){
                    id
                }
            }`;
            const eventQuery = JSON.stringify({ query: `${theQuery}` });
            const eventData = yield fetchApi_1.fetchApi(eventQuery);
            const idEvent = eventData['createEvent'].id;
            let theQuery2 = `
            mutation createUserEvent{
                createUserEvent(classroomId: ${theData.idClassroom}, input:{
                    calendarId: ${theData.idCalendar},
                    eventId: ${idEvent},
                    options: "options", 
                    permissionEvent: "permissionEvent_test",
                    userid: ${theData.idUser}
                }) {
                    id
                }
            }`;
            const userEventQuery = JSON.stringify({ query: `${theQuery2}` });
            const userEventData = yield fetchApi_1.fetchApi(userEventQuery);
        }));
    });
    connection.end();
}
exports.runPrefix = runPrefix;
