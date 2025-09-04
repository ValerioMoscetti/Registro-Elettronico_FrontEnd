import z, { email } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "@/api"
import type { RegisterTeacher } from "@/types/Register"
import { useState } from "react"
//nome cognome email classe e materia





const postTeacherUrl: string = ""

const MateriaSchema = z.object({
  materiaId: z.string(),
  classi: z.array(z.string()).optional()
});

const teacherFormSchema = z.object({
  firstName: z.string().min(1, "il nome è obbligatorio"),
  lastName: z.string().min(1, "il cognome è obbligatorio"),
  email: z.string().min(1, "email obbligatoria").email("email non valida"),
});

type FormShema = z.infer<typeof teacherFormSchema>

export function CreateTeacherForm() {

  const [response, setResponse] = useState()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormShema>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    }
  })

  const onSubmit: SubmitHandler<FormShema> = async (data) => {



    const newData = {

    };
    console.log("risultato Form:")
    console.log(newData)

    try {

      const addTeacher = await api.post(postTeacherUrl, newData)

    } catch (error) {
      console.log("Create student Error", error)
    }


  }


  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Inserimento Insegnante</h2>

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            {...register("firstName", { required: true })}
            placeholder="Nome dell'insegnante"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* Cognome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cognome</label>
          <input
            {...register("lastName", { required: true })}
            placeholder="Cognome dell'insegnante"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email", { required: true })}
            placeholder="Email dell'insegnante"
            type="email"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>


        <div>

        </div>



        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Inserisci il professore
        </button>
      </form>
    </div>
  )
}

