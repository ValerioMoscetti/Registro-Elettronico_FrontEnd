import { GestioneSegreteria } from "@/components/GestioneSegreteria"
import type { PropsWithChildren } from "react"
import Navbar from "@/components/navBar"


export function Secretary() {


    return (
        <>
            <Navbar />
            
            <GestioneSegreteria></GestioneSegreteria>
        </>
    )
}