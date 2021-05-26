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
    description: string;
}

export interface eventQuery{
    description: string;
}