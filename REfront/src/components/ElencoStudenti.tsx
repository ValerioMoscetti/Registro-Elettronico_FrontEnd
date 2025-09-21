import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import api from "@/api"
import { useUser } from "@/context/UserContext"

type StudentType = {
  id: string
  firstName: string
  lastName: string
  role: "STUDENT"
  email: string
}

type Vote_Get = {
  id: string
  vote: number
  subject: string
  createdAt: string // date
}

type Students_Vote = {
  student: StudentType,
  votes: Vote_Get[]
}

export function ElencoStudenti(
  {
    students,
    subjectClassId,
    onClick,
  }:
    {
      students: StudentType[] | null,
      subjectClassId: string,
      onClick: (studenteDettaglio:StudentType)=>void
    }
) {

  const [students_Votes, setStudents_Votes] = useState<Students_Vote[]>([])

  const { update } = useUser()


  useEffect(() => {

    console.log("update:", update)

    setStudents_Votes([])

    const getStudent_Votes = async (student: StudentType) => {
      try {

        const response = await api.get<Vote_Get[]>(`/api/votes/student/${student.id}/subject/${subjectClassId}`)

        const vote = response.data
        console.log(response.data)

        if (student && vote) {
          const student_vote: Students_Vote = {
            student: student,
            votes: vote
          }

          console.log("student_vote: ", student_vote)

          setStudents_Votes(prev => {
            const alreadyExists = prev.some(s => s.student.id === student.id);
            return alreadyExists ? prev : [...prev, student_vote];
          });

        }else{
          console.log("update fallito")
        }




      } catch (error) {
        console.log(error)
      }
    }

    if (students) {
      students.forEach(s => {
        getStudent_Votes(s)
      });
    }


    return()=>{
      
    }



  }, [update])

  if (students_Votes) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cognome</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Media voti</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students_Votes.map((s, index) => (
            <TableRow 
            key={index}
            onClick={()=>onClick(s.student)}
            className="hover:cursor-pointer"
            >
              <TableCell className="font-medium">{s.student.lastName}</TableCell>
              <TableCell>{s.student.firstName}</TableCell>
              <TableCell className="text-right" /**devo andare al dettaglio onClick */>
                {mediaVoti(s.votes)}
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    )
  } else {
    <p>Caricamento...</p>
  }


}


function mediaVoti(votes: Vote_Get[]): string {
  return (votes.reduce((a, c) => a + c.vote, 0) / votes.length).toFixed(1)
}


