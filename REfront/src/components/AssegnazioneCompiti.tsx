import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocation } from "react-router-dom"
import api from "@/api"

type Test = "ORAL" | "WRITTEN" | "PRACTICAL"


type HomeWorkAndTest = {
  subjectClassId: string
  message?: string
  type?: Test
  dueDate: Date | undefined
  createdAt: Date
  path?: "homeworks" | "tests"
}

const test: Test[] = ["ORAL", "WRITTEN", "PRACTICAL"]


export function AssegnazioneCompiti() {

  const [testType, setTestType] = useState<Test | null>(null)
  const [message, setMessage] = useState<string>("")
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState<string>("09:00")
  const [endTime, setEndTime] = useState<string>("10:00")
  const [homeWorkTest, setHomeWorkTest] = useState<HomeWorkAndTest | null>(null)

  const location = useLocation()

  const handleSubmit = async () => {

    try {
      const homeWorkTest: HomeWorkAndTest = {
        subjectClassId: location.state as string,
        dueDate: dueDate,
        createdAt: new Date()
      }

      if (testType !== null) {
        homeWorkTest.type = testType
        homeWorkTest.path = "tests"

      } else if (message !== "") {
        homeWorkTest.message = message
        homeWorkTest.path = "homeworks"
      } else {
        console.log("sia test sia message non vanno bene")
      }
    
      setHomeWorkTest(homeWorkTest)
      console.log(homeWorkTest)
      const response = await api.post(`/api/${homeWorkTest.path}`, homeWorkTest)

      console.log(response.data)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex justify-center items-start gap-8 mt-8">
      <div>
        <p className="text-center">Scegli il giorno della scadenza:</p>
        <Card className="w-fit py-4">
          <CardContent className="px-4">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
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
      </div>




      <div className="flex flex-col gap-4 max-w-sm">

        <input
          placeholder="Descrizione compito"
          type="text"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
            setMessage(e.target.value),
            setTestType(null)
          )}
        />

        <select
          title="tipologia test"
          value={testType as string}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (
            setTestType(e.target.value as Test),
            setMessage("")
          )}
        >
          <option value="">Scegli la tipologai del test</option>
          {test.map((t, index) => (
            <option key={index} value={t}>{t}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Invia dati della lezione
        </button>

        {homeWorkTest ? (
          <ul className="space-y-1">
            {
            testType!==null? (<li>Tipologia test: {homeWorkTest.type}</li>):
            (<li>Tipologia test: {homeWorkTest.message}</li>)
            }
            <li>Per il giorno {homeWorkTest.dueDate?.toLocaleDateString('it-IT', { weekday: 'long' })} {homeWorkTest.dueDate?.getDate()}</li>
            
          </ul>
        ) : (
          <span className="text-muted-foreground">Devi scegliere la data e compilare i campi</span>
        )}

      </div>
    </div>
  )
}