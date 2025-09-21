import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/api"
import { useLocation } from "react-router-dom"

type PresenceStatus = "PRESENT" | "ABSENT" | "EXCUSED"

type PresenceType = {
  status: PresenceStatus
  studentId: string;
  date: string; // formato ISO -> "YYYY-MM-DD"
};


type StudentType = {
  id: string;
  firstName: string;
  lastName: string;
  role: "STUDENT";
  email: string
}

export function PresenzaStudenti() {

  //studente get
  const [students, setStudents] = useState<StudentType[] | null>(null)
  //nome studente 
  const [studentsNames, setStudentsNames] = useState<string[]>([])

  //parametri temporali
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState<string>(new Date().toLocaleTimeString())
  const [endTime, setEndTime] = useState<string>(new Date().toLocaleTimeString())
  //array degli studenti assenti - FONDAMENTALE
  const [assenzaStudenti, setAssenzaStudenti] = useState<PresenceType[]>([])


  const location = useLocation()

  useEffect(() => {
    const getStudent = async () => {
      try {


        const response = await api.get<StudentType[]>("/api/students/class/" + location.state.classId as string)

        console.log(response.data)

        setStudents(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getStudent()
  }, [])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id: string=e.target.value
    if (date && students) {
      const aS: PresenceType = {
        date: date.toISOString().split("T")[0],
        status: "ABSENT",
        studentId: id
      }
      
      setAssenzaStudenti(prev => [...prev, aS])
      
      const newStudents:StudentType[] = students
      .filter(s=>s.id!==id)

      const newStudentsNames: string[] = students
      .filter(s=>s.id===id).map(s=>s.firstName + " " + s.lastName)

      setStudents(newStudents)
      setStudentsNames(newStudentsNames)
    }


  }

  const handleSubmit = async () => {

    try {
      console.log(assenzaStudenti)

      const resposne = await api.post("/api/presences", assenzaStudenti)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-start gap-8 mt-8">
      {/* Calendario a sinistra */}
      <Card className="w-fit py-4">
        <CardContent className="px-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-transparent p-0 [--cell-size:--spacing(10.5)]"
          />
        </CardContent>
        <CardFooter className="flex gap-2 border-t px-4 !pt-4 *:[div]:w-full">
          <div>
            <Label htmlFor="time-from" className="sr-only">
              Start Time
            </Label>
            <Input
              id="time-from"
              type="time"
              step="1"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>
          <span>-</span>
          <div>
            <Label htmlFor="time-to" className="sr-only">
              End Time
            </Label>
            <Input
              id="time-to"
              type="time"
              step="1"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>
        </CardFooter>
      </Card>

      {/* Form a destra */}
      <div className="flex flex-col gap-4 max-w-sm">

        <p>Definisci i dati dell'assenza</p>

        <select title="st" name="studentSelect" id="student"
          onChange={(e)=>handleSelect(e)}>
          <option value="">Seleziona uno studente</option>
          {students?.map((s, index) => (<option key={index} value={s.id}>{s.firstName}</option>))}
        </select>


        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Invia assenza
        </button>

        {studentsNames.length>0 ? (
          <ul className="space-y-1">
            Gli studenti:
            {studentsNames.map(s=>(
              <li>{s}</li>
            ))}
            sono assenti.
          </ul>
        ) : (
          <span className="text-muted-foreground">Devi scegliere la data e compilare i campi</span>
        )}
      </div>
    </div>
  )
}
