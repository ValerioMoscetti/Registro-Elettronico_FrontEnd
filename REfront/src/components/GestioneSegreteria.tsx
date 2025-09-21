import { Link, Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/context/UserContext";


export function GestioneSegreteria() {

  const { user } = useUser()

  const redirect = () => {
    return user === null ? <Navigate to={"/"} replace /> : <></>
  }


  return (

    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">GESTIONE SEGRETERIA</h2>


      <nav className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-8 text-center">
        <Link
          to="gestisciClassi"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
        >
          Registrazione utenti
        </Link>
        <Link
          to="gestisciMateriaClasse"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
        >
          Gestione Classi
        </Link>
        <Link
          to="avvisoCalendario"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
        >
          Calendario scolastico
        </Link>
        <Link
          to="scrutinioFinale"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
        >
          Scrutinio finale
        </Link>
      </nav>


      <div className="bg-white shadow-md rounded-lg p-6 mx-auto w-full sm:w-11/12 md:w-4/5 lg:w-3/4">
        <Outlet />
      </div>
      {redirect()}
    </div>

  )
}