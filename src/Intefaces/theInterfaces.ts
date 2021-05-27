export interface premutationsIds{
    idClassroom: string;
    idService: string; 
    idContentGroup: string; 
    idsContent: loopOfIds[];
    idsChapter: loopOfIds[];
    idRoom: string;
    idUser: string;
    idGroup: string;
    idSubGroup: string;
    idCalendar: string;
}

export interface loopOfIds{
    id: number;
    name: string;
}

export interface questionQuery{
    statement: string;
    hint: string; 
    answer: string;
    length: number; 
    type: string; 
    courseName: string;
}

export interface singleTaskQuery{
    title: string; 
    endDate: string;
    initDate: string; 
    courseName: string;
}

export interface taskGroupQuery{
    name: string;
}

export interface postQuery{
  options:string;
  summary: string;
}

export interface eventQuery{
  name:string;
  options: string;
}

export interface ChapterNContent {
    idContentArray: loopOfIds[];
    idChapterArray: loopOfIds[];
}

export interface User {
  firstname?: string;
  firstName:string;
  idNUmber?:string; 
  lastname?:string;
  email:string;
  phone1?:string; 
  address?:string; 
  imagealt?:string;
  documentNumber: number;
  documentType: number;
  fatherName:string;
  motherName:string;
}

export interface Course{
  fullname:string;
  options:string;
}

export interface teacher{
    name:string;
}

export interface MembersQuery {
  firstname: string;
}