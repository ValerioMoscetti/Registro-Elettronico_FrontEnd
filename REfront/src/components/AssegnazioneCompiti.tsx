import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type HomeWorkType = "compito per casa" | "esame orale" | "esame scritto"

const hwt: HomeWorkType[] = ["compito per casa", "esame orale", "esame scritto"]

type SubjectLesson = {
  day: number
  monthName: string
  startHour: string
  endHour: string
  homeWorkType: string
  homeWork: string | undefined

}

export function AssegnazioneCompiti() {


  const [homeWorkType, setHomeWorkType] = useState<string>("compito per casa")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [homeWork, setHomeWork] = useState<string>("nessuna descrizione")
  const [startTime, setStartTime] = useState<string>("10:30:00")
  const [endTime, setEndTime] = useState<string>("12:30:00")
  const [submittedLesson, setSubmittedLesson] = useState<SubjectLesson | null>(null)



  const handleSubmit = () => {
    if (!date) return

    const subjectLesson: SubjectLesson = {
      day: date.getDate(),
      monthName: date.toLocaleString("it-IT", { month: "long" }),
      startHour: startTime,
      endHour: endTime,
      homeWorkType: homeWorkType,
      homeWork: homeWork

    }

    setSubmittedLesson(subjectLesson)


    console.log(subjectLesson)
  }


  return (
    <div className="flex justify-center items-start gap-8 mt-8">
      
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

      
      <div className="flex flex-col gap-4 max-w-sm">

        <select title="tipoCompito" name="tipoCompito"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { () => setHomeWorkType(e.target.value) }}
        >
          <option value="">scegli la tipologia del compito</option>
          {hwt.map((h, index) => {
            return <option key={index} value={h}>{h}</option>
          })}
        </select>

        <Input
          placeholder="Descrizione compito"
          type="text"
          value={homeWork}
          onChange={(e) => setHomeWork(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Invia dati della lezione
        </button>

        {submittedLesson ? (
          <ul className="space-y-1">
            <li> Giorno: {submittedLesson.day}</li>
            <li> Mese: {submittedLesson.monthName}</li>
            <li> Ora inizio: {submittedLesson.startHour}</li>
            <li> Ora fine: {submittedLesson.endHour}</li>
            <li> Tipo Compito: {submittedLesson.homeWorkType}</li>
            <li> Descrizione Compito: {submittedLesson.homeWork}</li>
          </ul>
        ) : (
          <span className="text-muted-foreground">Devi scegliere la data e compilare i campi</span>
        )}

      </div>
    </div>
  )
}