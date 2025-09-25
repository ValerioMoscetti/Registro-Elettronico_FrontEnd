import { Link } from "react-router-dom"

// hub per la creazione di perent - teacher - student
export function CreateClass() {

  // const [azione, setAzione] = useState<ReactElement>()

  // const createClass = async () => {


  //   try {

  //     const response = await api.post(endPointClass)


  //     setAzione(<div>
  //       <Link to="/">Inserisci Insegnante</Link>
  //       <Link to="/">insersic Genitore</Link>
  //     </div>)


  //   } catch (error) {
  //     console.log("Error on class creation", error)
  //   }
  // }



  return (
    <div className="flex flex-col items-center justify-center  space-y-6">

      <div className="flex space-x-4 text-blue-500 underline">
        <Link to="/teacherForm" className="hover:text-blue-700">Inserisci Insegnante</Link>
        <Link to="/parentForm" className="hover:text-blue-700">Inserisci Genitore</Link>
        <Link to="/studentForm" className="hover:text-blue-700">Inserisci Studente</Link>
      </div>
    </div>
  )
}