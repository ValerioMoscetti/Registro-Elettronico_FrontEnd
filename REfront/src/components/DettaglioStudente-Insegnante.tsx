import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import api from "@/api";
import { useUser } from "@/context/UserContext";





type StudentType = {
    id: string;
    firstName: string;
    lastName: string;
    role: "STUDENT";
    email: string
}

export function DettaglioStudente_Insegnante(
    {
        studenteDettaglio,
        subjectClassId,
    }:
        {
            studenteDettaglio: StudentType
            subjectClassId: string
        }
) {

    const [option, setOption] = useState<"vote" | "reprimand" | "null">("null")



    return (
        <div>
            <p
                className="text-center"
            >{studenteDettaglio.firstName + " " + studenteDettaglio.lastName}</p>
            <div
                className="flex justify-center"
            >
                <Button
                    className={`m-3 ${buttonStyle("vote", option)}`}
                    onClick={() => setOption("vote")}
                >
                    Inserisci voto
                </Button>

                <Button
                    className={`m-3 ${buttonStyle("reprimand", option)}`}
                    onClick={() => setOption("reprimand")}
                >
                    Inserisci nota
                </Button>
            </div>
            <div className="flex flex-wrap">
                {option === "vote" &&
                    <AssegnaVoti
                        studenteDettaglio={studenteDettaglio}
                        subjectClassId={subjectClassId}
                    />
                }
                {option === "reprimand" &&
                    <Reprimand
                        studenteDettaglio={studenteDettaglio}
                        subjectClassId={subjectClassId}
                    />
                }
            </div>
        </div>
    )
}

type Vote_Post = {
    vote: number,
    date: Date,
    studentId: string,
    subjectClassId: string
}


////////////ASSEGNA VOTI - FIGLIO ////////////////////////

function AssegnaVoti(
    {
        studenteDettaglio,
        subjectClassId,
    }:
        {
            studenteDettaglio: StudentType
            subjectClassId: string
        }
) {

    const [voto, setVoto] = useState<number>(0)
    const [avviso, setAvviso] = useState<string>("")

    const { setUpdate } = useUser()

    const voti: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const postVoto = async () => {
        
        try {
            if (voto) {
                const voto_Post: Vote_Post = {
                    vote: voto,
                    date: new Date(),
                    studentId: studenteDettaglio.id,
                    subjectClassId: subjectClassId
                }

                const response = await api.post("/api/votes", voto_Post)
                console.log(voto_Post)
                if (response.status == 200) {
                    setAvviso("voto inserito con successo")
                    setUpdate(prev=>prev+1)
                }

            }else{
                setAvviso("inserici un voto")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex w-full mt-5 justify-center">
            <select
                title="voti"
                value={voto}
                onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setVoto(parseInt(e.target.value))}
            >
                <option value={0}>scegli voto</option>
                {
                    voti.map(v => (
                        <option key={v}value={v}>{v}</option>
                    ))
                }
            </select>
            <div className="flex-col">
                <span>{avviso}</span>
                <Button onClick={() =>( postVoto())}>Assegna</Button>
            </div>



        </div>

    )
}

type Reprimand_Post = {
    title: string,
    message: string,
    studentId: string,
    subjectClassId: string,
    createdAt: string
}


//////REPRIMAND - FIGLIO //////////////////////////////////////////////////////////////

function Reprimand(
    {
        studenteDettaglio,
        subjectClassId
    }:
        {
            studenteDettaglio: StudentType
            subjectClassId: string
        }
) {

    const [title, setTitle] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [avviso, setAvviso] = useState<string>("")

    const postReprimand = async () => {
        try {
            if (title.length > 0 && message.length > 0) {
                const reprimand_post: Reprimand_Post = {
                    title: title,
                    message: message,
                    studentId: studenteDettaglio.id,
                    subjectClassId: subjectClassId,
                    createdAt: new Date().toISOString()
                }
                console.log(reprimand_post)
                const response = await api.post("/api/reprimands", reprimand_post)


                if (response.status == 200) {
                    setAvviso("voto inserito con successo")
                    setTitle("")
                    setMessage("")
                }
            } else {
                setAvviso("metti un titolo o il contenuto")
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="flex flex-wrap w-full mt-5 justify-center">
            <input
                value={title}
                type="text" placeholder="titolo"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setTitle(e.target.value), setAvviso(""))}
            />
            <textarea
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                placeholder="scrivi nota"
                className="w-full p-3 border border-gray-300 rounded-md resize-y min-h-[120px]"
            />

            <div
                className="flex flex-col"
            >
                <span className="">{avviso}</span>
                <Button className="mt-1" onClick={() => postReprimand()}>Assegna</Button>

            </div>
        </div>
    )
}



//funzione per lo stile dei bottoni, a seconda se è visualizzato il componente reprimand o vote il bottone 
//in questione verrà colorato di bianco e i bordi e la scritta del proprio colore.
function buttonStyle(type: "vote" | "reprimand", active: "vote" | "reprimand" | "null") {
    const isActive = type === active;

    if (type === "vote") {
        return isActive
            ? "text-white bg-blue-500 border border-blue-500"
            : "text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white";
    }

    if (type === "reprimand") {
        return isActive
            ? "text-white bg-red-700 border border-red-700"
            : "text-red-700 bg-white border border-red-700 hover:bg-red-700 hover:text-white";
    }

    return "";
}
