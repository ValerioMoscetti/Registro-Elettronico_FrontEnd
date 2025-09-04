import {Routes, Route} from "react-router-dom"
import { Login } from "@/pages/login"
import { Teacher } from "@/pages/teacher"
import { Student } from "@/pages/student"
import { Parent } from "@/pages/parent"
import { Secretary } from "@/pages/secretary"
import { PageNotFound } from "@/pages/notFount"
import { CreateTeacherForm } from "@/components/CreateTeacher"
import { CreateClass } from "@/components/CreateClass"
import { AvvisoCalendario } from "@/components/CrateAvvisoCalendario"
import { ScrutinioFinale } from "@/components/ScrutinioFinale"
import { CreateStudentForm } from "@/components/CreateStudent"
import { CreateParentForm } from "@/components/CreateParent"
import {LessonRecord} from "@/components/LessonRecod"
import { PresenzaStudenti } from "@/components/PresenzeStudenti"
import {VisualizzaStudenti} from "@/components/VisualizazioneStudenti"
import { AssegnazioneCompiti } from "@/components/AssegnazioneCompiti"
import { VisualizzaVotiInsegnante } from "@/components/VisualizzaVotiInsegnate"
import { GestioneMateriaClasse } from "@/components/GestioneMateriaClasse"

export function AppRoutes(){

    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/secretary" element={<Secretary/>}>
                <Route path="gestisciClassi" element={<CreateClass/>}/>
                <Route path="avvisoCalendario" element={<AvvisoCalendario/>}/>
                <Route path="scrutinioFinale" element={<ScrutinioFinale/>}/>
                <Route path="gestisciMateriaClasse" element={<GestioneMateriaClasse/>}/>
            </Route>
            <Route path="/student" element={<Student/>}/>
            <Route path="/parent" element={<Parent/>}/>
            <Route path="/teacher" element={<Teacher/>}>
                <Route path="presenza" element={<PresenzaStudenti/>}/>
                <Route path="lessonRecord" element={<LessonRecord/>}/>
                <Route path="gestioneClasse" element={<VisualizzaStudenti/>}/>
                <Route path="assegnazioneCompiti" element={<AssegnazioneCompiti/>}/>
            </Route>
            <Route path="/teacherForm" element={<CreateTeacherForm></CreateTeacherForm>}/>
            <Route path="/parentForm" element={<CreateParentForm/>}/>
            <Route path="/studentForm" element={<CreateStudentForm/>}/>
            <Route path="/voti" element={<VisualizzaVotiInsegnante/>}/>
            
            
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}
