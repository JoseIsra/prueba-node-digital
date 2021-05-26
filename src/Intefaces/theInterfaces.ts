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