import { useEffect, useState } from "react"
import api from "@/api"
import type { Class } from "@/types/ClassControl"

const classId = "1"

export const VisualizzaStudenti = () => {

    const [classes, setClasses] = useState()


    useEffect(() => {


        const getClass = async () => {
            try {
                const response = await api.get("/api/students/class/" + classId)
                setClasses(response.data)
            } catch (error) {
                console.log(error)

            }
        }

        getClass()

    }, [])



    return (
        <div>

        </div>
    )
}