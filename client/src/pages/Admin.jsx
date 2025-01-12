import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../BASE_URL';

const Admin = () => {
    const [data,setData] = useState([]);
    const token = localStorage.getItem("token")
    const fetchdata = async()=>{
        const res = await axios.get(BASE_URL+"/api/users/member",{
            headers:{
                Authorization: "Bearer "+token,
            }
        });
        setData(res.data);
        console.log(res.data);
    }
    useEffect(()=>{
        fetchdata();
    },[1])
  return (
    <div>
      <Layout>
        <div>
            <div className='w-[80%] mx-auto grid grid-cols-1 h-screen'>
                <div className='bg-red-400'>
                    {
                        data.map((e)=>{
                            return(
                                <>
                                <div className='flex flex-col gap-5'>
                                    <p>{e.name}</p>
                                </div>
                                <div>
                                    <p>{e.email}</p>
                                </div>
                                <button><Link to={"/member/"+e._id}>Submit</Link> </button>
                                </>
                            )
                        })
                    }
                </div>

            </div>
        </div>
      </Layout>
    </div>
  )
}

export default Admin
