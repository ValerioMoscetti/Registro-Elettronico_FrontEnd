import { useEffect, useState } from "react"
import api from "@/api"
import { ElencoStudenti } from "./ElencoStudenti"
import { useLocation } from "react-router-dom";
import { DettaglioStudente_Insegnante } from "./DettaglioStudente-Insegnante";

type StudentType = {
    id: string;
    firstName: string;
    lastName: string;
    role: "STUDENT";
    email: string
}



export const VisualizzaStudenti = () => {

    const [students, setStudents] = useState<StudentType[] | null>(null)
    const [subjectClassId, setSubjectClassId] = useState<string | null>(null)

    //per passare lo studente al dettaglio, servirà anche il subjectClassId
    const [studentDettaglio, setStudentDettaglio] = useState<StudentType | null>(null)

    

    const location = useLocation()

    useEffect(()=>{
        console.log(studentDettaglio)
    },[studentDettaglio])



    useEffect(() => {


        const getStudent = async () => {
            try {


                const response = await api.get<StudentType[]>("/api/students/class/" + location.state.classId as string)

                console.log("studenti in visualizza:", response.data)

                setStudents(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        setSubjectClassId(location.state.subjectClassId as string)

        getStudent()
    }, [])



    if (students && subjectClassId) {
        return (
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 w-full">
                    <ElencoStudenti
                        students={students}
                        subjectClassId={subjectClassId}
                        onClick={setStudentDettaglio}
                        
                    />
                </div>
                <div className="md:w-2/3 w-full">
                    {
                    studentDettaglio
                    && 
                    <DettaglioStudente_Insegnante 
                    studenteDettaglio={studentDettaglio} 
                    subjectClassId={subjectClassId}
                    
                    /> 
                    || 
                    <p
                    className="text-center w-full font-medium size-0.5"
                    >Scegli uno studente
                    </p>}
                </div>
            </div>

        )
    } else {
        return (<p>Caricamento...</p>)
    }
}