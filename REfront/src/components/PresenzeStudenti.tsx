"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Assenza = {
  day: number
  monthName: string
  startHour: string
  endHour: string
  studentId: string | null
  classId: string | null
}

type StudentProva = {
  nome: string,
  id: string
}

type ClassProva = {
  nome: string,
  id: string
}

const arrayStudenti: StudentProva[] = [
  { nome: "gianni", id: "1a3f2b60-9c4e-4f3e-8c1a-2d7f8a9b6e3c" },
  { nome: "pino", id: "7e9d4c12-3b8f-4a2e-bd1f-9c0e1a7d2f45" }
]

const arrayClass: ClassProva[] = [
  { nome: "1A", id: "c6a8e3d9-5f2b-4c1e-9a3d-8b7f2e6c1d90" },
  { nome: "2A", id: "f2d3a1b7-8c9e-4d2f-b1a3-7e6c9d0f2b18" }
]





// select dello studente - select della classe
export function PresenzaStudenti() {

  //fare le fetch per ottenere l'oggetto studenti e classi e mettere i nomi nelle option della select
  // e l'uuid nel value del'option 





  const [studenti, setStudenti] = useState<StudentProva[]>(arrayStudenti)
  const [classi, setClassi] = useState<ClassProva[]>(arrayClass)





  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState<string>(new Date().toLocaleTimeString())
  const [endTime, setEndTime] = useState<string>(new Date().toLocaleTimeString())
  const [studentId, setStudentId] = useState<string | null>(null)
  const [classId, setClassId] = useState<string | null>(null)
  const [assenzaStudente, setAssenzaStudente] = useState<Assenza | null>(null)

  const handleSubmit = () => {
    if (!date) return

    const assenza: Assenza = {
      day: date.getDate(),
      monthName: date.toLocaleString("it-IT", { month: "long" }),
      startHour: startTime,
      endHour: endTime,
      studentId: studentId,
      classId: classId
    }

    setAssenzaStudente(assenza)

    console.log(assenza)
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
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStudentId(e.target.value)}>
          <option value="">Seleziona uno studente</option>
          {studenti.map((s, index) => (<option key={index} value={s.id}>{s.nome}</option>))}
        </select>

        <select title="cl" name="classSelect" id="class"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setClassId(e.target.value)}>
          <option value="">Seleziona una classe</option>
          {classi.map((s, index) => (<option key={index} value={s.id}>{s.nome}</option>))}
        </select>


        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Invia assenza
        </button>

        {assenzaStudente ? (
          <ul className="space-y-1">
            <li> Giorno: {assenzaStudente.day}</li>
            <li> Mese: {assenzaStudente.monthName}</li>
            <li> Ora inizio: {assenzaStudente.startHour}</li>
            <li> Ora fine: {assenzaStudente.endHour}</li>
          </ul>
        ) : (
          <span className="text-muted-foreground">Devi scegliere la data e compilare i campi</span>
        )}
      </div>
    </div>
  )
}
