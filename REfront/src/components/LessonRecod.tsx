"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocation } from "react-router-dom"
import api from "@/api"

type LessonRecord = {
  message: string,
  subjectClassId: string,
  date?: Date //"2025-09-16T19:08:13.386Z"
}



export function LessonRecord() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [lesson, setLesson] = useState<string>("nessuna descrizione")
  const [startTime, setStartTime] = useState<string>("10:30:00")
  const [endTime, setEndTime] = useState<string>("12:30:00")
  const [submittedLesson, setSubmittedLesson] = useState<LessonRecord | null>(null)

  const location = useLocation()

  const handleSubmit = async () => {
    try {
      const lessonPost: LessonRecord = {
        message: lesson,
        subjectClassId: location.state,
        date: new Date()
      }

      setSubmittedLesson(lessonPost)
      console.log("pre", lessonPost)

      const response = await api.post("/api/lessons", lessonPost)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mt-8">
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
        <Input
          placeholder="Lezione svolta"
          type="text"
          value={lesson}
          onChange={(e) => setLesson(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md hover:cursor-pointer"
        >
          Invia dati della lezione
        </button>

        {submittedLesson ? (
          <ul className="space-y-1">
            <li> Giorno: {date?.toLocaleDateString('it-IT', { weekday: 'long' })} {date?.getDate()}</li>
            <li> Mese: {date?.toLocaleDateString('it-IT', { month: 'long' })}</li>
            <li> Ora inizio: {startTime}</li>
            <li> Ora fine: {endTime}</li>
            <li> Lezione: {submittedLesson.message}</li>
          </ul>
        ) : (
          <span className="text-muted-foreground">Devi scegliere la data e compilare i campi</span>
        )}

      </div>
    </div>
  )
}
