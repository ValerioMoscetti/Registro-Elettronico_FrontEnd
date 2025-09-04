

//tipi per la registrazione:

//insegnante:

type Subject = {
    
    subjectId: string,
    classIds: string[]
}

export type RegisterTeacher = {
    role: "Teacher",
    firstName: string,
    lastName: string,
    email:string,
    subjects: Subject[]
    
}