import z, { email } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "@/api"
import { useUser } from "@/context/UserContext"
import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"
import type { User } from "@/types/User"


const isLogged = (role: string | undefined) => {
  if (role) {
    if (role === "TEACHER") {
      return <Navigate to={"/teacher"} replace></Navigate>
    }
    if (role === "STUDENT") {
      return <Navigate to={"/student"} replace></Navigate>
    }
    if (role === "PARENT") {
      return <Navigate to={"/parent"} replace></Navigate>
    }
    if (role === "SECRETARY") {
      return <Navigate to={"/secretary"} replace></Navigate>
    }
    else {
      return <Navigate to={"/"} replace />
    }
  }

}



const loginUrl: string = "/api/auth/login"


const loginFormSchema = z.object({

  username: z.email().regex(/^[\w\.-]+@[\w\.-]+\.\w{2,}$/, "Email non valida"),
  password: z.string().min(1, "password obbligatoria")
})

type FormShema = z.infer<typeof loginFormSchema>




export function LoginForm() {

  const { user, setUserFromUser } = useUser()

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormShema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<FormShema> = async (data) => {

    try {

      const response = await api.post(loginUrl, data)
      const token = response.data.token

      const user: User = response.data.user
      localStorage.setItem("authToken", token)
      setUserFromUser(user)

      console.log(jwtDecode(token))
      console.log(user)



    } catch (error) {
      console.log("Login Error", error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("username", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            type="email"
          />
          {errors.username && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.username.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Accedi
        </button>
      </form>
      {isLogged(user?.role)}
    </div>


  )


}


