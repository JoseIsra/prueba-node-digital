import { fetchApi } from '../API/fetchApi';
import { loopOfIds, premutationsIds, questionQuery, singleTaskQuery, taskGroupQuery, postQuery, eventQuery } from '../Intefaces/theInterfaces';


export function runPrefix(connection: any, theData: premutationsIds){
    console.log(theData);
    
    /** QUESTIONS **/
    connection.query(`
        SELECT questiontext as statement,hint, answer, length, (mmq.qtype*1) as type, mmc.fullname as courseName
        FROM mdl_question mmq 
        INNER JOIN mdl_question_hints mqh ON mmq.id = mqh.questionid
        INNER JOIN mdl_question_answers  mqa ON mmq.id = mqa.question
        INNER JOIN mdl_quiz mmz ON mmq.parent = mmz.id
        INNER JOIN mdl_course mmc ON mmc.id = mmz.course;`,
        (err: any, results: questionQuery[]) => {
        if (err) throw err;

        results.forEach( async (element: questionQuery) => {
            theData.idsChapter.forEach( async (theChapter: loopOfIds) => {
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
                            answer
                        }
                    }`;
                    const data = JSON.stringify({ query: `${theQuery}`});
                    const result =  await fetchApi(data);
                }
            })
        });
    });

    /** SINGLE TASK **/
    connection.query(`
        SELECT name as title, Cast(duedate as char(255)) as endDate,
        Cast(allowsubmissionsfromdate as char(255)) as initDate, mmc.fullname as courseName
        FROM mdl_assign mma
        INNER JOIN mdl_course mmc ON mma.course = mmc.id ;`, 
        (err: any, results: singleTaskQuery[]) => {
        if (err) throw err;

        results.forEach(async (element: singleTaskQuery) => {
            theData.idsContent.forEach( async (theContent: loopOfIds) => {
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
                            title
                        }
                    }`;
                    const data = JSON.stringify({ query: `${theQuery}`});
                    const result =  await fetchApi(data);
                }
            });
        });
    });

    /** TASKGROUP **/
    connection.query(`
        SELECT *
        FROM mdl_groups;`, 
        (err: any, results: taskGroupQuery[]) => {
        if (err) throw err;

        results.forEach(async (element: taskGroupQuery) => {
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
            const data = JSON.stringify({ query: `${theQuery}`});
            const result =  await fetchApi(data);
        });
    });



    /** POST **/
    connection.query(`
        SELECT CONCAT(subject,summary,content) as description
        FROM mdl_post;`,
        (err: any, results: postQuery[]) => {
        if (err) throw err;

        results.forEach(async (element: postQuery) => {
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
            const data = JSON.stringify({ query: `${theQuery}`});
            const result =  await fetchApi(data);
        });
    });

    /** EVENT AND USER_EVENT**/
    connection.query(`
        SELECT * FROM mdl_event;`,
        (err: any, results: eventQuery[]) => {
        if (err) throw err;
        
        results.forEach( async (element: eventQuery) =>{
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
            const eventQuery = JSON.stringify({ query: `${theQuery}`});
            const eventData = await fetchApi(eventQuery);
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
            const userEventQuery = JSON.stringify({ query: `${theQuery2}`});
            const userEventData = await fetchApi(userEventQuery);
        });
    });

    connection.end();
}

