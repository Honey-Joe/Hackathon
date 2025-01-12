import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../BASE_URL';

const NonEventDetails = () => {

    const datap = useParams();

    const [data,setData] = useState([]);
    

  const fetchdata = async()=>{
    const res = await axios.get(BASE_URL+"/nonevent/" + datap.id);
    setData(res.data)
  }
  console.log(data.event)

 
  useEffect(()=>{
    fetchdata();
  },[])
  return (
    <div className="bg-[#08123B]">
      <div className="w-[90%] lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-1">
        <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full  p-4 transition duration-500 ease-in-out transform hover:scale-105">
          <img
            src={data.event?.eventurl}
            className="rounded-lg w-full h-64 sm:h-80 md:h-96 object-cover shadow-lg"
            alt="Event Brochure"
          />
        </div>
        <div className="w-full  p-4 mt-6 md:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[Fredoka] pulse bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {data.event?.eventname}
          </h1>
          <p className="text-lg sm:text-lg mt-6 font-[Fredoka] text-white ">
            {data.event?.eventdesc}
          </p>
        </div>

        </div>
        <div className="flex justify-center flex-col items-center py-5">
          <p className="text-3xl sm:text-4xl font-bold font-[Fredoka] mb-12 pulse bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center">
            Rules
          </p>
          <div>
            <ul className="flex flex-col gap-5">
              <div>
                
                <div className="grid grid-cols-1 gap-3">
                  <li className="">
                    <p className="text-lg font-semibold font-[Fredoka] text-white">
                      {data.event?.rules?.r1}
                    </p>
                  </li>
                  <li className="">
                    <p className="text-lg font-semibold font-[Fredoka] text-white">
                      {data.event?.rules?.r2}
                    </p>
                  </li>
                  <li className="">
                    <p className="text-lg font-semibold font-[Fredoka] text-white">
                      {data.event?.rules?.r3}
                    </p>
                  </li>
                </div>
              </div>
              <div>
                
                <div className="grid grid-cols-1 gap-3">
                  <li className="">
                    <p className="text-lg font-semibold font-[Fredoka] text-white">
                      {data.event?.rules?.r4}
                    </p>
                  </li>
                  <li className="">
                    <p className="text-lg font-semibold font-[Fredoka] text-white">
                      {data.event?.rules?.r5}
                    </p>
                  </li>
                  <li className="">
                    <p className="text-lg font-semibold font-[Fredoka] text-white">
                      {data.event?.rules?.r6}
                    </p>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NonEventDetails
