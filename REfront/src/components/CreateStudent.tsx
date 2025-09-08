import z, { date, string } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Parent } from "@/types/parent";
import type { RegisterStudent } from "@/types/Register";
import type { Class } from "@/types/ClassControl";

const postStudentUrl: string = "/api/auth/register"

const StudentFormSchema = z.object({
  firstName: z.string().min(1, "il nome è obbligatorio"),
  lastName: z.string().min(1, "il nome è obbligatorio"),
  birthDate: z.string(),
  email: z.email().min(1, "il nome è obbligatorio"),
  classId: z.string().min(1, "il nome è obbligatorio"),
  parentId: z.string().min(1, "l'id non deve essere vuoto")
})

type FormShema = z.infer<typeof StudentFormSchema>

export function CreateStudentForm() {
  const location: Parent = useLocation().state;
  const [parent, setParent] = useState<Parent | undefined>(undefined);



  function verificaParent(){
    if(location){
      return location.email
    }else{
      return ""
    }
  }



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
      parentId: verificaParent() //** devo mettere il valore predefinito parent.id ma non che mi si veda l'id  */
    }
  })

  const onSubmit: SubmitHandler<FormShema> = async (data) => {

    try {

      const getClasses = await api.get<Class[]>("/api/classes")

      const classId = getClasses.data.find(c => c.name === data.classId)?.id

      if (classId) {
        const newData: RegisterStudent = { ...data, role: "STUDENT", classId: classId }

        const trueData = await getParentId(newData, location)
        console.log(trueData)

        const addStudent = await api.post(postStudentUrl, trueData)


      } else {
        console.log("classe non trovata")
      }


      /** una volta inseriti posso fare il resoconto della classe o tornare alla home */

    } catch (error: any) {
      console.log("Create student Error", error.message)
    }


  }


  return (
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


function getParentId(data: RegisterStudent, parent: Parent | undefined): Promise<RegisterStudent | undefined> {

  const getParentIds = async () => {

    try {

      if (parent) {
        const newData = data
        const reposneParent = (await api.get<Parent[]>("/api/parents")).data
          .find(p => p.email === parent.email)
          ?.id

        console.log(reposneParent)

        if (reposneParent) { newData.parentId = reposneParent }
        console.log(newData)
        return newData

      }else{
        const newData = data
        console.log(data)
        const reposneParent = (await api.get<Parent[]>("/api/parents")).data
          .find(p => p.email === newData.parentId)?.id

        console.log(reposneParent)

        if (reposneParent) { newData.parentId = reposneParent }
        console.log(newData)
        return newData

      }
    } catch (error) {
      console.log(error)
    }
  }

  return getParentIds()
}