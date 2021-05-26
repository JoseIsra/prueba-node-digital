import { fetchApi } from '../API/fetchApi';
import { ChapterNContent, Course } from '../Intefaces/theInterfaces';

export async function getLoop(connection: any, idClasroom: string, idContentGroup: string): Promise<ChapterNContent> {

    let chapterNContent: ChapterNContent = {
        idContentArray: [],
        idChapterArray: []
    }
    let idContentTemp:string = "";

    return new Promise(function (resolve,reject) {
        connection.query(`
        SELECT * FROM mdl_course`,
        async (err: any, results: Course[]) => {
        if (err) throw err;

        results.forEach(async (element: Course) => {
            if(element.summary == "") element.summary = "description_test";
            let options = JSON.stringify(element);

            let contentMutation = `
            mutation createContent{
              createContent(classroomId: ${idClasroom}, input: {
                category: 1,
                contentgroupId: ${idContentGroup},
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
            
            const contentQuery = JSON.stringify({ query: `${contentMutation}`});
            const contentData = await fetchApi(contentQuery);
            chapterNContent.idContentArray.push(contentData['createContent']);
            idContentTemp = contentData['createContent'].id;

            
            let chapterMutation = `
            mutation createChapter{
                createChapter(classroomId: ${idClasroom}, input: {
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

            const chapterQuery = JSON.stringify({ query: `${chapterMutation}`});
            const chapterData = await fetchApi(chapterQuery);
            chapterNContent.idChapterArray.push(chapterData['createChapter']);
            
        });
    
        resolve(chapterNContent);

      });
    })
}
  
