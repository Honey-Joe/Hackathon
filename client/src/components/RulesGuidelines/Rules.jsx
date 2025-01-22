import { ShieldEllipsis } from 'lucide-react'
import React from 'react'
import { RulesApi } from './RulesApi'

const Rules = () => {
  return (
    <div className="max-w-[100%] mx-auto bg-[#08123B]" id="rules">
        <div className="w-[90%] lg:w-[75%] mx-auto py-[115px] gap-7" data-aos="fade-right" data-aos-delay="300"> 
            <p className=' text-white font-[Fredoka] text-3xl text-center md:text-[40px] pb-20'>Rules and Guidelines</p>

            <div className=' grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-16'>
                {
                    RulesApi.map((e,index)=>(
                        <div key={index}>
                            <div className=' flex lg:flex-nowrap flex-nowrap md:flex-wrap items-start gap-4'>
                                <div className='border h-[40px] w-[40px] md:w-[50px] p-2 md:h-[50px] lg:w-[50px] lg:h-[50px] rounded-full flex justify-center shadow-md shadow-blue-500 items-center'>
                                    <img src={e.icon} alt="" className=' text-white stroke-white md:max-w-12 md:h-10 md:p-1 p-2 max-w-10 h-10' />
                                </div>
                                <div className=' flex items-start flex-col gap-2'>
                                    <p className=' text-white md:text-[32px] text-xl font-medium'>{e.heading}</p>
                                    <ul className=' list-disc ml-5'>
                                        <li className=' text-white font-[Fredoka] py-1'>{e.desc1}</li>
                                        <li className=' text-white font-[Fredoka] py-1'>{e.desc}</li>
                                        {e.desc5 ?
                                        <li className=' text-white font-[Fredoka] py-1'>{e.desc5}</li> :''
                                        }
                                        {
                                            e.desc4 ?
                                            <div>
                                                <li className=' text-white font-[Fredoka] py-1'>{e.desc3}</li>
                                                <li className=' text-white font-[Fredoka] py-1'>{e.desc4}</li>
                                            </div> : ""
                                        }

                                    </ul>

                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className=' flex justify-center pt-10'>
                    <a
                        href="WebSprint-Hackaton.pdf"
                        download="WebSprint-Hackaton.pdf"
                        className=' text-white font-[Fredoka] '
                        >
                        <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg rounded-full shadow-lg hover:shadow-md transform transition-transform hover:scale-105 hover:shadow-indigo-700">
                            Rules and Guidelines <br /> (Click here to download)
                        </button>
                    </a>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Rules