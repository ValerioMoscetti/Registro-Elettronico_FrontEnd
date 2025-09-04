import { Link, Outlet, Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";



// gestione studenti(visusalizza voti e assegnazione voti)
export function GestioneProfessore(){

  const { user } = useUser()

  const redirect = () => {
    return user === null? <Navigate to={"/"} replace/> : <></> 
  }


    return(
        
<div className="max-w-6xl mx-auto px-4 py-8">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">PROFESSORE</h2>

 
  <nav className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-8 text-center">
    <Link
      to="lessonRecord"
      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
    >
      Inserisci lezione
    </Link>
    <Link
      to="assegnazioneCompiti"
      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
    >
      Assegna compiti
    </Link>
    <Link
      to="presenza"
      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
    >
      Gestione presenze
    </Link>
        <Link
      to="gestioneClasse"
      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
    >
      Gestione classe
    </Link>
    
  </nav>

  {/* Outlet centrato */}
  <div className="bg-white shadow-md rounded-lg p-6 mx-auto w-full sm:w-11/12 md:w-4/5 lg:w-3/4">
    <Outlet />
  </div>
  {redirect()}
</div>
        
    )
}