export interface premutationsIds{
    idClassroom: number;
    idService: number; 
    idContentGroup: number; 
    idsContent: loopOfIds[],
    idsChapter: loopOfIds[],
    idRoom: number;
    idUser: number;
    idGroup: number;
    idSubGroup: number;
    idEvent: number;
    idCalendar: number;
}

interface loopOfIds{
    id: number;
    name: string;
}

export interface ChapterNContent {
  idContentArray: loopOfIds[],
  idChapterArray:loopOfIds[],
}


export interface User {
  documentNumber: number,
  documentType: number,
  email: string,
  fatherName: string,
  firstName: string,
  motherName: string,
}

export interface Course {
  id: number,
  category: number,
  sortorder: number,
  fullname: string,
  shortname: string,
  idnumber: string,
  summary: string,
  summaryformat: number,
  format: string,
  showgrades: number,
  newsitems: number,
  startdate: number,
  enddate: number,
  relativedatesmode: number,
  marker: number,
  maxbytes: number,
  legacyfiles: number,
  showreports: number,
  visible: number,
  visibleold: number,
  downloadcontent: number,
  groupmode: number,
  groupmodeforce: number,
  defaultgroupingid: number,
  lang: string,
  calendartype: string,
  theme: string,
  timecreated: number,
  timemodified: number,
  requested: number,
  enablecompletion: number,
  completionnotify: number
  cacherev: number,
  originalcourseid: number,
}

export interface Teacher {
  name:string
}