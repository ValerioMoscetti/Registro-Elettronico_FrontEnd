// import { useEffect, useState } from "react"
// import api from "@/api"
// import { set } from "zod"






// function useFetch() {

//     const [type, setType] = useState<unknown>()
//     const [error, setError] = useState<any>()
//     const [getData, setGetData] = useState<typeof type>()
//     const [postData, setPostData] = useState<any>()
//     const [putData, setPutData] = useState<any>()

//     const getFunction = async (uri: string, type:unknown) => {
//         const tipo = identità(type)
        
//         try {

//             const getResponse = await api.get<typeof tipo>(uri)
//             setType(tipo)
//             setGetData(getResponse.data as typeof tipo)
//         } catch (error) {
//             setError(error)
//         }
//     }

//     const postFunction = async (uri: string, dataPost?: any) => {
//         try {

//             const postResponse = await api.post(uri, dataPost)
//             setPostData(postResponse.data)
//         } catch (error) {
//             setError(error)
//         }
//     }

//     const putFunction = async (uri: string, dataPut?: any) => {
//         try {

//             const postResponse = await api.put(uri, dataPut)
//             setPostData(postResponse.data)
//         } catch (error) {
//             setError(error)
//         }
//     }

//     return { error, getData, postData, putData, setGetData, getFunction, postFunction, putFunction }
// }



// function identità<T>(valore: T): T {
//   return valore;
// }

// export default useFetch