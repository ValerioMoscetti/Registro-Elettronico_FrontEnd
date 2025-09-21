import { GestioneSegreteria } from "@/components/GestioneSegreteria"
import type { PropsWithChildren } from "react"
import Navbar from "@/components/navBar"


export function Secretary({ children }: PropsWithChildren) {


    return (
        <>
            <Navbar />
            {children} {/*gli sto dicendo che è stensibile con PropsWithChildren, 
            dovrei tipizzare meglio crenado un tipo, (sto studiando e sto facendo delle prove) */}
            <GestioneSegreteria></GestioneSegreteria>
        </>
    )
}