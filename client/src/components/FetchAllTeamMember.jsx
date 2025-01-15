import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../BASE_URL'

const FetchAllTeamMember = () => {
    const [data,setData]= useState([])
    const [error, setError] = useState("")
    const token = localStorage.getItem("token")
    const fetchAllTeamMember = async()=>{
        try{
            const response  = await axios.get(BASE_URL+"/api/users/all-team-member",{
                headers:{
                    Authorization: "Bearer "+token
                }
            })
            setData(response.data.teamMember)
        }catch(error){
            setError(error)
        }
        
    }
    useEffect(()=>{
        fetchAllTeamMember();
    },[1]);
  return (
    <div>
      <p className='font-[Fredoka] text-white'>Total Participants: {data.length}</p>
      <p>{error?(error):(<></>)}</p>
    </div>
  )
}

export default FetchAllTeamMember
