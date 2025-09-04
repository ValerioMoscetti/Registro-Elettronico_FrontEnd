

type Student = {
    studentName:string,
    studentLastName:string,
}

export type Class = {
    id:string,
    name: string,
    yearEnd: string,
    yearStart: string
}


type SchoolClass = {
    id: string;
    name: string;
};

export type Subject = {
    name: string;
};

export type Teacher = {
    id: string;
    firstName: string;
    lastName: string;
};

export type SubjectClass = {
    id: string;
    schoolClass: SchoolClass;
    subject: Subject;
    teacher: Teacher;
};