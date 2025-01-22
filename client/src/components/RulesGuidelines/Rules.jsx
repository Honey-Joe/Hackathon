import { ShieldEllipsis } from 'lucide-react'
import React from 'react'
import { RulesApi } from './RulesApi'

const Rules = () => {
  return (
    <div className="max-w-[100%] mx-auto bg-[#08123B]" id="rules">
        <div className="w-[90%] lg:w-[75%] mx-auto py-[115px] gap-7" data-aos="fade-right" data-aos-delay="300"> 
            <p className=' text-white font-[Fredoka] text-lg text-center md:text-[40px] pb-20'>Rules and Guidelines</p>

            <div className=' grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-16'>
                {
                    RulesApi.map((e,index)=>(
                        <div key={index}>
                            <div className=' flex lg:flex-nowrap flex-wrap items-start gap-4'>
                                <div className='border h-[40px] w-[40px] md:w-[50px] p-2 md:h-[50px] lg:w-[50px] lg:h-[50px] rounded-full flex justify-center shadow-md shadow-blue-500 items-center'>
                                    <img src={e.icon} alt="" className=' text-white stroke-white md:max-w-12 md:h-10 p-1' />
                                </div>
                                <div className=' flex items-start flex-col gap-2'>
                                    <p className=' text-white md:text-[32px] text-base font-medium'>{e.heading}</p>
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
            </div>
        </div>
    </div>
  )
}

export default Rules