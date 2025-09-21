import { Link, Outlet, Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import type { SubjectClass } from "@/types/ClassControl";


type Info = {
  class: string,
  classId: string
  subjectClassId: string
}

type SubjectInfo = {
  subjectName: string,
  info: Info[]
}


// gestione studenti(visusalizza voti e assegnazione voti)
export function GestioneProfessore() {

  const { user, subjectClasses } = useUser()
  // const [subjectClass, setSubjectClasse] = useState<SubjectClass | null>(null)
  const [subjectName, setSubjectName] = useState<string>("")
  const [info, setInfo] = useState<Info[]>([])
  const [subjectClassId, setSubjectClassId] = useState<string>("")
  const [options, setOptions] = useState<React.JSX.Element>(<></>)
  const [subjectClassInfo, setSubjectInfo] = useState<SubjectInfo[] | null>(null)
  const [classId, setClassId] = useState<string | null>()

  const redirect = () => {
    return user === null ? <Navigate to={"/"} replace /> : <></>
  }

  useEffect(() => {

    const result: SubjectInfo[] = subjectClasses.reduce((acc, curr) => {
      const { subject, schoolClass, id: subjectClassId } = curr;

      // Trova se esiste già un SubjectInfo con lo stesso subjectName
      let subjectInfo = acc.find(s => s.subjectName === subject.name);

      const infoEntry: Info = {
        class: schoolClass.name,
        classId: schoolClass.id,
        subjectClassId
      };

      if (subjectInfo) {
        subjectInfo.info.push(infoEntry);
      } else {
        acc.push({
          subjectName: subject.name,
          info: [infoEntry]
        });
      }

      console.log(acc)
      return acc;

    }, [] as SubjectInfo[]);


    console.log(result)
    setSubjectInfo(result)
  }, [subjectClasses])

  useEffect(() => {


    if (subjectClassInfo) {
      const info: Info[] | undefined = subjectClassInfo
        .find(s => s.subjectName === subjectName)
        ?.info

      if (info) { setInfo(info) }
    }




  }, [subjectName])

  function message(): string {

    return subjectName ? "Scegli classe" : "Scegli prima la materia"
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">REGISTRO</h2>

      <div className="flex justify-center mb-1">
        <select
          title="subjects"
          value={subjectName}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (setSubjectName(e.target.value))}
        >
          <option value="">Scegli materia</option>
          {subjectClassInfo?.map((s, index) => (
            <option key={index} value={s.subjectName}>{s.subjectName}</option>
          ))}
        </select>

        <select
          title="classes"
          value={subjectClassId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (setSubjectClassId(e.target.value), console.log(e.target.value))}
        >
          <option value="">{message()}</option>
          {info.map((i, index) => (
            <option key={index} value={i.subjectClassId}>{i.class}</option>
          ))}
        </select>
      </div>

      {redirect()}


      {(subjectClassId !== "" && <OptionsFunction subjectClassId={subjectClassId} classId={(searcClassId(info, subjectClassId))} />)}

    </div>
  )




}




function OptionsFunction({ subjectClassId, classId }: { subjectClassId: string, classId: string }): React.JSX.Element {

  return (
    <>
      <nav className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-8 text-center">
        <Link
          to="lessonRecord"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
          state={subjectClassId}
        >
          Inserisci lezione
        </Link>
        <Link
          to="assegnazioneCompiti"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
          state={subjectClassId}
        >
          Assegna compiti
        </Link>
        <Link
          to="presenza"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
          state={
            {
              subjectClassId,
              classId
            }
          }
        >
          Gestione presenze
        </Link>
        <Link
          to="gestisciStudenti"
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
          state={
            {
              subjectClassId,
              classId
            }
          }
        >
          Gestione classe
        </Link>

      </nav>


      <div className="bg-white shadow-md rounded-lg p-6 mx-auto w-full max-w-screen-lg min-h-[300px] flex flex-col justify-start">
        {/* il className lo devo mettere diretamente ai 4 componenti, altrimeenti si vede il compoennte vuto (brutto), altrienti uso uno useNavgate o navigate */}
        <Outlet />
      </div>
    </>
  )
}


function searcClassId(info: Info[], subjectClassId: string): string {

  const inf: Info | undefined = info.find(i => i.subjectClassId === subjectClassId)

  if (inf) {
    const id = inf.classId
    return id
  }
  return ""
}