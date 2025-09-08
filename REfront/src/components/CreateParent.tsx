import z, { email } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "@/api"
import type { SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom"
import { useState, type ReactNode } from "react"

const postParentUri: string = "/api/auth/register"

const parentFormSchema = z.object({
  firstName: z.string().min(1, "il nome è obbligatorio"),
  lastName: z.string().min(1, "il cognome è obbligatorio"),
  email: z.email().min(1, "la mail è obbligatoria"),
})


type FormShema = z.infer<typeof parentFormSchema>

export function CreateParentForm() {

  const [link, setLink] = useState<ReactNode>(<></>)

  const {
    register,
    handleSubmit,
    formState: { errors },
  }
    = useForm<FormShema>({
      resolver: zodResolver(parentFormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
      }
    })


  const onSubmit: SubmitHandler<FormShema> = async (data) => {

    const newData = {...data, role: "PARENT"}

    try {

      const addStudent = await api.post(postParentUri, newData)

      console.log(newData)



    } catch (error) {
      console.log("Create parent Error", error)
    }

    setLink(<Link to="/studentForm" state={data}>Inserisci lo studente</Link>)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Inserimento Genitore</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            {...register("firstName", { required: true })}
            placeholder="nome del genitore"
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
            placeholder="cognome del genitore"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email", { required: true })}
            placeholder="email del genitore"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Inserisci Genitore
        </button>
      </form>

      <div className="flex justify-center space-x-4 text-blue-500 underline mt-2">
        {link}
      </div>

    </div>

  )
}