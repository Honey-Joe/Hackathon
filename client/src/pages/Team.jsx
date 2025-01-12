import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../BASE_URL'

const Team = () => {
    const userId = useParams()
    const [data,setData] = useState([])
    const fetchdata = async()=>{
        const res = await axios.get(BASE_URL+"/api/users/member/"+userId.userId);
        setData(res.data);
        console.log(res.data);
    } 
    useEffect(()=>{
        fetchdata();
    },[1]);
    console.log(userId.userId)
  return (
    <div>
      {
        data.name
      }
    </div>
  )
}


export default Team
