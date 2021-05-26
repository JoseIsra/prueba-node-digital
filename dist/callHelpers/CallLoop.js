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
exports.getLoop = void 0;
const fetchApi_1 = require("../API/fetchApi");
function getLoop(connection, idClasroom, idContentGroup) {
    return __awaiter(this, void 0, void 0, function* () {
        let chapterNContent = {
            idContentArray: [],
            idChapterArray: []
        };
        let idContentTemp = "";
        return new Promise(function (resolve, reject) {
            connection.query(`
        SELECT * FROM mdl_course`, (err, results) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                results.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    if (element.summary == "")
                        element.summary = "description_test";
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
                    const contentQuery = JSON.stringify({ query: `${contentMutation}` });
                    const contentData = yield fetchApi_1.fetchApi(contentQuery);
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
                    const chapterQuery = JSON.stringify({ query: `${chapterMutation}` });
                    const chapterData = yield fetchApi_1.fetchApi(chapterQuery);
                    chapterNContent.idChapterArray.push(chapterData['createChapter']);
                }));
                resolve(chapterNContent);
            }));
        });
    });
}
exports.getLoop = getLoop;
