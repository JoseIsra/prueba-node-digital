import { fetchApi } from '../API/fetchApi';
import { ChapterNContent, Course } from '../Intefaces/theInterfaces';

export async function getLoop(connection: any, idClasroom: number, idContentGroup: number) {

    let chapterNContent: ChapterNContent = {
        idContentArray: [],
        idChapterArray: []
    }
    let idContentTemp:string = "";

    return new Promise(function (resolve,reject) {
        connection.query(`
        SELECT * FROM mdl_course`,
        (err: any, results: Course[]) => {
        if (err) throw err;

        results.forEach(async (element: Course) => {
            let contentMutation = `
            mutation createContent{
              createContent(classroomId: ${idClasroom}, input: {
                category: 1,
                contentgroupId: ${idContentGroup},
                description: "${element.summary}",
                hidden: false,
                name: "${element.fullname}",
                options: "${JSON.stringify(element)}", 
                order: 1,
                url: "",
                }){
                    id,
                    name
                }
            }`;
        
            const contentQuery = JSON.stringify({ query: `${contentMutation}`});
            const contentData = await fetchApi(contentQuery);
            chapterNContent.idContentArray.push(contentData['createContent']);
            idContentTemp = contentData['createContent'].id;


            let chapterMutation = `
            mutation createChapter{
                createChapter(classroomId: ${idClasroom}, input: {
                    contentId:  ${idContentTemp},
                    hidden: 1,
                    name: "${element.fullname}",
                    option: "${JSON.stringify(element)}", 
                    order: 1
                    }){
                        id,
                        name
                    }
            }`;

            const chapterQuery = JSON.stringify({ query: `${chapterMutation}`});
            const chapterData = await fetchApi(chapterQuery);
            chapterNContent.idChapterArray.push(chapterData['createChapter']);
        });
    
        resolve(chapterNContent);

      });
    })
}
  
