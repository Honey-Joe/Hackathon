import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../BASE_URL'

const Profile = () => {

    // const [userdata, setUserData] = useState([])

    // const fetchUser = async ()=>{
    //     try {
    //         const data = await axios.get(BASE_URL + "/member/:userId")
    //         setUserData(data.data)
    //     } catch (error) {
    //         console.log("User Error");
            
    //     }
    // }

    // useEffect(()=>{
    //     fetchUser()
    // },[])

  return (
    <div>
        <div>
            <p>profile page</p>
        </div>
    </div>
  )
}

export default Profile