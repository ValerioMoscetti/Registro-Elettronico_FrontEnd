import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role, User } from "@/types/User";
import { jwtDecode } from "jwt-decode"

import { Navigate, replace, useNavigate } from "react-router-dom";
import { Replace } from "lucide-react";
import api from "@/api";
import type { SubjectClass } from "@/types/ClassControl";


interface UserContextType {
    user: User | null;
    toggleUser: (user: User) => void;
    setUserFromUser: (user: User) => void;
    subjectClasses: SubjectClass[]
    logout: () => void | ReactNode
    setUpdate: (number:React.SetStateAction<number>)=>void
    update:number
}

interface DecodedToken { //il token è stato implementato a metà
    id: string
    firstName: string
    lastName: string
    role: Role
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserPovider({ children }: { children: ReactNode }) {

    const navigate = useNavigate()//navigate per la logout
    const [user, setUser] = useState<User | null>(null)
    const [subjectClasses, setSubjectClass] = useState<SubjectClass[]>([]) //subject class per la teacher
    const [update,setUpdate] = useState<number>(0)//contatore che ci permette di triggherare useEffects

    //per cambiare lo user
    const toggleUser = (user: User) => setUser(user)

    //per cambiare lo user 
    const setUserFromUser = (user: User) => {
        const userData: User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email
        }

        setUser(userData)


    }

    //FARE CIO NEL GESTIONE PROFESSORE?? 

    useEffect(() => {

        //get by teacherId
        const getSubjectByTeacherId = async () => {

            

            if(user){
                const response = (await api.get<SubjectClass[]>(`/api/subjectclass/teacher/${user?.id}`)).data
                console.log(response)
                setSubjectClass(response)
                console.log(response)
                
            }
            
            
        }
        if (user?.role == "TEACHER") {
            getSubjectByTeacherId()
        }


    }, [user])

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null)
        navigate("/")
        return <Navigate to={"/"} replace />
    };


    useEffect(() => {
        const token = localStorage.getItem("authToken")

    }, [])

    return (
        <UserContext.Provider value={{ user, subjectClasses, update, setUpdate, toggleUser, setUserFromUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}



export const useUser = (): UserContextType => {

    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser deve essere usato all'interno di UserProvider");
    }

    return context
}