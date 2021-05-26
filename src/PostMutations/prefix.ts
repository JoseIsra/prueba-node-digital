import { fetchApi } from '../API/fetchApi';
import { premutationsIds } from '../Intefaces/theInterfaces';


export function runPrefix(connection: any, theData: premutationsIds){
    
    /** QUESTIONS **/
    connection.query(`
        SELECT questiontext as statement,hint, answer, length, (mmq.qtype*1) as type, mmc.fullname as courseName
        FROM mdl_question mmq 
        INNER JOIN mdl_question_hints mqh ON mmq.id = mqh.questionid
        INNER JOIN mdl_question_answers  mqa ON mmq.id = mqa.question
        INNER JOIN mdl_quiz mmz ON mmq.parent = mmz.id
        INNER JOIN mdl_course mmc ON mmc.id = mmz.course;`,
        (err: any, results: any) => {
        if (err) throw err;

        results.forEach( function(element: any){
            theData.idsChapter.forEach( theChapter => {
                if(theChapter.name == element.courseName){
                    let theQuery = `
                    mutation createQuestion{
                        createQuestion(classroomId: ${theData.idClassroom}, input:{
                            active: 1,
                            alternatives: "",
                            answer: "${element.answer}",
                            chapterId: ${theChapter.id},
                            hints: "${element.hint}",
                            level: 1,
                            order: 1,
                            size: ${element.length},
                            statement: "${element.statement}",
                            statementUrl: "",
                            type: ${element.type}
                        }) {
                            answer
                        }
                    }`;
                    const data = JSON.stringify({ query: `${theQuery}`});
                    console.log(theQuery);
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
        (err: any, results: any) => {
        if (err) throw err;

        results.forEach(function(element: any){
            theData.idsContent.forEach( theContent => {
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
                            name
                        }
                    }`;
                    const data = JSON.stringify({ query: `${theQuery}`});
                    console.log(theQuery);
                }
            });
        });
    });

    /** TASKGROUP **/
    connection.query(`
        SELECT mg.id, courseid as roomid, name, Cast(mg.timecreated as char(255)),Cast(mg.timemodified as char(255)),
        mdu.id as userId, CONCAT(firstname, lastname)  
        FROM mdl_groups mg 
        INNER JOIN mdl_groups_members mgm ON mg.id = mgm.groupid 
        INNER JOIN mdl_user mdu ON mgm.userid = mdu.id;`, 
        (err: any, results: any) => {
        if (err) throw err;

        results.forEach(function(element: any){
            let theQuery = `
            mutation createTaskGroup{ 
                createTaskGroup (classroomId: ${theData.idClassroom},, input:{
                    members: "",
                    name: "${element.name}",
                    roomId: ${theData.idRoom},
                    userId: ${theData.idUser}
                }) {
                    name
                }
            }`;
            const data = JSON.stringify({ query: `${theQuery}`});
            console.log(theQuery);
        });
    });



    /** POST **/
    connection.query(`
        SELECT id, userid, courseid, CONCAT(subject,summary,content) as description , lastmodified, created,
        0, 0, 0, 0, '', 0, 0, 0, 0, '', 0
        FROM mdl_post;`,
        (err: any, results: any) => {
        if (err) throw err;

        results.forEach(function(element: any){
        let theQuery = `
            mutation createPost{
                createPost(classroomId: ${theData.idClassroom}, input: {
                    active: true,
                    backgroundId: 0,
                    category: 0,
                    classroomId: ${theData.idClassroom},
                    description: "${element.description}",
                    isVideo: false,
                    privacy: false,
                    url: "",
                    userid: ${theData.idUser}
                }){
                    description
                }
            }`;
            const data = JSON.stringify({ query: `${theQuery}`});
            console.log(theQuery);
        });
    });

    /** EVENT AND USER_EVENT**/
    connection.query(`
        SELECT * FROM mdl_event;`,
        (err: any, results: any) => {
        if (err) throw err;
        
        results.forEach( async function(element: any){
            let theQuery = `
            mutation createEvent{
                createEvent(classroomId: ${theData.idClassroom}, input: {
                    calendarId: ${theData.idCalendar},
                    data: "${element.description}",
                    options: "${JSON.stringify(element)}", 
                    schedule: "",
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
                    options: "${JSON.stringify(element)}", 
                    permissionEvent: "",
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

