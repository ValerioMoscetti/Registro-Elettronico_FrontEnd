import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role, User } from "@/types/User";
import { jwtDecode} from "jwt-decode"


interface UserContextType{
    user:User | null;
    toggleUser:(user:User)=>void;
    setUserFromToken: (token: string) => void;
    logout: () => void
}

interface DecodedToken {
    id: string
    firstName: string
    lastName:string
    role: Role
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserPovider({children}:{children:ReactNode}){

    const [user,setUser] = useState<User | null>(null)


    const toggleUser = (user:User) => setUser(user)

    const setUserFromToken = (token:string) => {
        const decoded = jwtDecode<DecodedToken>(token)
        const userData:User = {
            id: decoded.id,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            role: decoded.role
        }

        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("authToken");
    setUser(null);
};


    useEffect(()=>{
        const token = localStorage.getItem("authToken")
        if(token){
            setUserFromToken(token)
        }
    },[])

    return(
        <UserContext.Provider value={{user, toggleUser, setUserFromToken, logout}}>
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