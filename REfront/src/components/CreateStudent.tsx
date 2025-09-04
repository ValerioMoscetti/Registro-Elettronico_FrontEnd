import z, { date, string } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api";

const postStudentUrl:string = ""

const StudentFormSchema = z.object({
    firstName: z.string().min(1, "il nome è obbligatorio"),
    lastName: z.string().min(1, "il nome è obbligatorio"),
    birthDate: z.string(),
    email: z.email().min(1, "il nome è obbligatorio"),
    classId: z.string().min(1, "il nome è obbligatorio"),
    parentId: z.string().min(1,"l'id non deve essere vuoto")
})

type FormShema = z.infer<typeof StudentFormSchema>

export function CreateStudentForm(){
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormShema>({
            resolver: zodResolver(StudentFormSchema),
            defaultValues: {
                firstName: "",
                lastName: "",
                birthDate: "gg/mm/aaaa",
                email: "",
                classId: "",
                parentId: ""
            }
        })

    const onSubmit: SubmitHandler<FormShema> = async (data) => {

        try{

          console.log(data)

          const addStudent = await api.post(postStudentUrl, data)

          
          /** una volta inseriti posso fare il resoconto della classe o tornare alla home */

            
        }catch(error){
          console.log("Create student Error", error)
        }


    }


    return(
<div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <h2 className="text-2xl font-bold text-center text-gray-800">Inserimento Studente</h2>

    <div>
      <label className="block text-sm font-medium text-gray-700">Nome</label>
      <input
        {...register("firstName", { required: true })}
        placeholder="nome dello studente"
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.firstName && (
        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Cognome</label>
      <input
        {...register("lastName", { required: true })}
        placeholder="cognome dello studente"
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.lastName && (
        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Data di nascita</label>
      <input
        {...register("birthDate", { required: true })}
        placeholder="data di nascita dello studente"
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        type="date"
      />
      {errors.birthDate && (
        <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        {...register("email", { required: true })}
        placeholder="email dello studente"
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        type="email"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Classe</label>
      <input
        {...register("classId", { required: true })}
        placeholder="classe"
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.classId && (
        <p className="text-red-500 text-sm mt-1">{errors.classId.message}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Genitore ID</label>
      <input
        {...register("parentId", { required: true })}
        placeholder="ID del genitore"
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.parentId && (
        <p className="text-red-500 text-sm mt-1">{errors.parentId.message}</p>
      )}
    </div>

    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
    >
      Inserisci lo studente
    </button>
  </form>
</div>

    )
}