import {Routes, Route} from "react-router-dom"
import { Login } from "@/pages/login"
import { Teacher } from "@/pages/teacher"
import { Student } from "@/pages/student"
import { Parent } from "@/pages/parent"
import { Secretary } from "@/pages/secretary"
import { PageNotFound } from "@/pages/notFount"

export function AppRoutes(){

    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/secretary" element={<Secretary/>}/>
            <Route path="/student" element={<Student/>}/>
            <Route path="/parent" element={<Parent/>}/>
            <Route path="/teacher" element={<Teacher/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}
