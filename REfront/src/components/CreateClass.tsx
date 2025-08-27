import api from "@/api"

const endPointClass:string = ""

export function CreateClass(){

    const createClass = async() =>{

        try{

            const response = await api.post(endPointClass)

            
        }catch(error){
            console.log("Error on class creation", error)
        }
    }
    
    

    return(
        <><button onClick={()=>createClass()}>Crea la classe</button></>
    )
}