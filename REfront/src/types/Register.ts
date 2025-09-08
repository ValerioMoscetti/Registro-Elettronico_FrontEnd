

//tipi per la registrazione:

//insegnante:

type Subject = {

    subjectId: string,
    classeIds: string[]
}

export type RegisterTeacher = {
    role: "TEACHER",
    firstName: string,
    lastName: string,
    email: string,
    subjects: Subject[]

}

//studente:

export type RegisterStudent = {
    role: "STUDENT",
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
    parentId: string,
    classId: string
}