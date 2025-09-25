
import { use, useEffect, type ReactNode } from "react";
import api from "@/api";
import type { Class, Subject, SubjectClass, Teacher } from "@/types/ClassControl";
import { useState } from "react";
import { Button } from "./ui/button";


//CAMBIARE LO STIDE DEI BOTTONI -> FARE DELLE SELECT, BOTTONI BOCCIATI
export function GestioneMateriaClasse() {

    return (
        <div>

            <form> {}
                <ClassiForm></ClassiForm>
            </form>

        </div>
    )
}


//get tutte le classi
//get subjectclass by class id
//get teachers
//put subjetclass id e teacher id


function ClassiForm() {

    const [classes, setClasses] = useState<Class[]>([])
    const [classId, setClassId] = useState<string>("")
    const [SubjectForm, setSubjectForm] = useState<React.JSX.Element>(<></>)

    useEffect(() => {

        const getClasses = async () => {
            try {

                const getResponse = await api.get<Class[]>("/api/classes")
                setClasses(getResponse.data)
                console.log(getResponse.data)

            } catch (error) {
                console.log(error)
            }
        }

        getClasses()
    }, [])


    useEffect(() => {
        setSubjectForm(<SubjectClassesForm classId={classId} />)
    }, [classId])



    return (
        <>
            <p>Scegli la classe</p>
            <div className="flex flex-wrap justify-between">
                {classes.map((c, index) => (
                    <input
                        key={index}
                        className="bg-black m-1 p-2 text-white w-11 rounded-2xl cursor-pointer"
                        type="button"
                        value={c.name}
                        onClick={() => {
                            setClassId(c.id);
                            console.log(classId)
                        }}
                    />
                ))}
            </div>


            {SubjectForm}



        </>
    )
}

function SubjectClassesForm({ classId }: { classId: string }) {

    const [subjectsClasses, setSubjectsClasses] = useState<SubjectClass[]>([])
    const [subjectClass, setSubjectClass] = useState<SubjectClass | null>(null)



    useEffect(() => {

        const getSubjectByClassId = async () => {
            try {

                const getResponse = await api.get<SubjectClass[]>(`/api/subjectclass/class/${classId}`)
                setSubjectsClasses(getResponse.data)

            } catch (error) {
                console.log(error)
            }
        }

        getSubjectByClassId()


    }, [classId])



    return (
        <>
            <p>Scegli la materia</p>
            <div className="flex flex-wrap justify-between">
                {subjectsClasses.map((s, index) => (
                    <input
                        key={index}
                        className={`bg-black m-1 text-white p-2 rounded-2xl cursor-pointer${subjectClass?.id === s.id ? "bg-green-600" : "bg-gray-800"}`}
                        type="button"
                        value={s.subject.name}
                        onClick={() => {
                            setSubjectClass(s)
                        }}
                    />
                ))}
            </div>

            {subjectClass && (
                <TeacherClassForm classId={classId} subjectClass={subjectClass} />
            )}




        </>
    )
}


function TeacherClassForm({ subjectClass, classId }: { subjectClass: SubjectClass | null, classId: string }) {

    const [teachers, setTeacers] = useState<Teacher[]>([])
    const [teacher, setTeacer] = useState<Teacher | null>(null)


    useEffect(() => {
        const getTeachers = async () => {
            try {
                const response = await api.get<Teacher[]>("api/teachers")
                setTeacers(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getTeachers()
    }, [])




    const putSubjectClass = async () => {

        try {
            const response = api.put(`/api/subjectclass/${subjectClass?.id}/teacher/${teacher?.id}`)

            console.log((await response).status)

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <>
            <p>Scegli la materia</p>
            <div className="flex flex-wrap justify-between">
                {teachers.map((t, index) => (
                    <input
                        key={index}
                        className={`bg-black m-1 text-white p-2 rounded-2xl cursor-pointer${teacher?.id === t.id ? "bg-green-600" : "bg-gray-800"}`}
                        type="button"
                        value={t.lastName + t.firstName}
                        onClick={() => { setTeacer(t) }}
                    />
                ))}
            </div>

            <Button onClick={() => putSubjectClass()} type="button">Assoca CLASSE - MATERIA - INSEGNATE</Button>
        </>
    )

}

