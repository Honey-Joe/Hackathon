import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-[100%] mx-auto bg-[#081F4D]" id="contact">
        <div className="w-[90%] lg:w-[75%] mx-auto py-[115px] gap-7" data-aos="fade-right" data-aos-delay="300"> 
            <p className=' text-white font-[Fredoka] text-3xl text-center md:text-[40px] pb-10 md:pb-16'>Contact</p>

            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

                <div className=' flex flex-col items-center '>
                    <p className=' text-white font-medium text-2xl pb-2 font-[Fredoka]'>Organizing Secretaries</p>
                    <ul className=' flex flex-col gap-2 items-center justify-center pt-2'>
                        <li className=' text-white font-[Fredoka] '> Dr. P. Joseph Charles </li>
                        <li className=' text-white font-[Fredoka] '> Ms. S. Thulasi Bharathi </li>
                    </ul>
                </div>

                <div className=' flex flex-col items-center '>
                    <p className=' text-white font-medium text-2xl pb-2 font-[Fredoka]'>Student Organizers</p>
                    <ul className=' flex flex-col gap-2 items-center justify-center pt-2'>
                        <li className=' text-white font-[Fredoka] '> Mr. Ajay James  </li>
                        <li className=' text-white font-[Fredoka] '> Mr. Karan Marshall </li>
                        <li className=' text-white font-[Fredoka] '> Mr. Eugene Rajkumar </li>
                    </ul>
                </div>

                <div className=' flex flex-col items-center '>
                    <p className=' text-white font-medium text-2xl pb-2 font-[Fredoka]'>Registration queries</p>
                    <ul className=' flex flex-col gap-2 items-center justify-center pt-2'>
                        <li className=' text-white font-[Fredoka] '> 
                            <a href="tel:+918825863892">Mr. Manoj - 8825863892</a>
                        </li>
                        <li className=' text-white font-[Fredoka] '> 
                            <a href="tel:+916382503265">Mr. Honey Joe - 6382503265</a>
                        </li>
                        <li className=' text-white font-[Fredoka] '>
                            <a href="tel:+918072146078">Mr. Sudharsan - 8072146078</a>
                        </li>
                        <li className=' text-white font-[Fredoka] '>
                            <a href="tel:+918903369700">Mr. Infant Ryan - 8903369700</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Contact