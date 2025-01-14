import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../BASE_URL';

const DeleteTeam = ({userId}) => {
    const [data,setData] = useState([])
    const [error, setError] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const token = localStorage.getItem("token");

    const deleteTeam = async()=>{
        setIsLoading(true)
        try{
            const response = await axios.delete(BASE_URL+"/api/users/"+userId,{
                headers:{
                    Authorization: "Bearer "+token,
                }
            })
            setData(response.data);
            window.location.reload()
        }catch(error){
            setError(error.response.data.message)
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div>
        <button onClick={deleteTeam} className='bg-red-600 px-5 py-2 rounded-lg text-white font-[Fredoka]'>
            {isLoading? (<>Deleting</>):(<>Delete this Team</>)}
        </button>
        <p>{data?(data.message):(<></>)}</p>
        <p>{error?(error):(<></>)}</p>
    </div>
  )
}

export default DeleteTeam
