import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role, User } from "@/types/User";
import { jwtDecode} from "jwt-decode"

import { Navigate, replace, useNavigate } from "react-router-dom";
import { Replace } from "lucide-react";
import api from "@/api";
import type { SubjectClass } from "@/types/ClassControl";


interface UserContextType{
    user:User | null;
    toggleUser:(user:User)=>void;
    setUserFromUser: (user: User) => void;
    subjectClass: SubjectClass | null
    logout: () => void | ReactNode
}

interface DecodedToken {
    id: string
    firstName: string
    lastName:string
    role: Role
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserPovider({children}:{children:ReactNode}){

    const navigate = useNavigate()
    const [user,setUser] = useState<User | null>(null) 
    const [subjectClass, setSubjectClass] = useState<SubjectClass | null>(null)
    

    const toggleUser = (user:User) => setUser(user)

    const setUserFromUser = (user:User) => {
        const userData:User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email
        }

        setUser(userData)

        //FARE CIO NEL GESTIONE PROFESSORE 
        // if(user.role == "TEACHER"){

        //     useEffect(()=>{
        //         //get by teacherId
        //         const getSubjectByTeacherId = async () => { 

        //             const response = await api.get(`/api/subjectclass/teacher/${user.id}`)

        //             setSubjectClass(response.data)
        //             console.log(response.data)
        //         }

        //         getSubjectByTeacherId()
        //     },[user])

            
        // } 

        
    }

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null)
        navigate("/")
        return <Navigate to={"/"} replace/>
    };


    useEffect(()=>{
        const token = localStorage.getItem("authToken")

    },[])

    return(
        <UserContext.Provider value={{user, subjectClass, toggleUser, setUserFromUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}



export const useUser = ():UserContextType =>{
    
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser deve essere usato all'interno di UserProvider");
    }

    return context
}