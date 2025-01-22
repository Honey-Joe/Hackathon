import React from 'react'

const Schedule = () => {
  return (
    <div className="max-w-[100%] mx-auto bg-[#081F4D]" id="schedule">
        <div className="w-[90%] lg:w-[75%] mx-auto py-[115px] gap-7" data-aos="fade-right" data-aos-delay="300"> 
            <p className=' text-white font-[Fredoka] text-center text-3xl font-bold pb-4'>Schedule</p> 

            <div className=' flex flex-col lg:items-center gap-5'>
                <div className=' flex items-center gap-5 lg:flex-nowrap flex-nowrap py-2 lg:w-[500px]'>
                    <div className='border h-[80px] w-[80px] md:w-[110px] md:h-[110px] rounded-full flex justify-center shadow-md shadow-blue-500' data-aos="fade-right" data-aos-delay="200">
                        <div className=' flex flex-col justify-center items-center' >
                            <p className=' text-white font-[Fredoka] md:text-4xl text-xl font-bold shadow-lg'>9:30</p>
                            <p className=' text-white font-[Fredoka] md:text-2xl text-xl font-bold'>AM</p>
                        </div>
                    </div>
                    <div>
                        <p className=' font-[Fredoka] text-xl md:text-3xl text-white font-medium flex-wrap'>Inauguration Ceremony</p>
                        <p className=' font-[Fredoka] text-white'></p>
                    </div>
                </div>

                <div className=' flex items-center gap-5 lg:flex-nowrap flex-nowrap py-2 lg:w-[500px]'>
                    <div className=' border h-[80px] w-[80px] md:w-[110px] md:h-[110px] rounded-full flex justify-center shadow-md shadow-blue-500' data-aos="fade-right" data-aos-delay="200">
                        <div className=' flex flex-col justify-center items-center' >
                            <p className=' text-white font-[Fredoka] md:text-4xl text-xl font-bold shadow-lg'>9:45</p>
                            <p className=' text-white font-[Fredoka] md:text-2xl text-xl font-bold'>AM</p>
                        </div>
                    </div>
                    <div>
                        <p className=' font-[Fredoka] text-xl md:text-3xl text-white font-medium'>Problem Addressing</p>
                        <p className=' font-[Fredoka] text-white'></p>
                    </div>
                </div>

                <div className=' flex items-center gap-5 lg:flex-nowrap flex-wrap py-2 lg:w-[500px]'>
                    <div className=' border h-[80px] w-[80px] md:w-[110px] md:h-[110px] rounded-full flex justify-center shadow-md shadow-blue-500' data-aos="fade-right" data-aos-delay="200">
                        <div className=' flex flex-col justify-center items-center' >
                            <p className=' text-white font-[Fredoka] md:text-4xl text-xl font-bold shadow-lg'>11:15</p>
                            <p className=' text-white font-[Fredoka] md:text-2xl text-xl font-bold'>AM</p>
                        </div>
                    </div>
                    <div>
                        <p className=' font-[Fredoka] text-xl md:text-3xl text-white font-medium'>Coffee Break</p>
                        <p className=' font-[Fredoka] text-white'>15 mins</p>
                    </div>
                </div>

                <div className=' flex items-center gap-5 lg:flex-nowrap flex-wrap py-2 lg:w-[500px]'>
                    <div className=' border h-[80px] w-[80px] md:w-[110px] md:h-[110px] rounded-full flex justify-center shadow-md shadow-blue-500' data-aos="fade-right" data-aos-delay="200">
                        <div className=' flex flex-col justify-center items-center' >
                            <p className=' text-white font-[Fredoka] md:text-4xl text-xl font-bold shadow-lg'>1:00</p>
                            <p className=' text-white font-[Fredoka] md:text-2xl text-xl font-bold'>PM</p>
                        </div>
                    </div>
                    <div>
                        <p className=' font-[Fredoka] text-xl md:text-3xl text-white font-medium'>Lunch</p>
                        <p className=' font-[Fredoka] text-white'>45 mins</p>
                    </div>
                </div>

                <div className=' flex items-center gap-5 lg:flex-nowrap flex-nowrap py-2 lg:w-[500px]'>
                    <div className=' border h-[80px] w-[80px] md:w-[110px] md:h-[110px] rounded-full flex justify-center shadow-md shadow-blue-500' data-aos="fade-right" data-aos-delay="200">
                        <div className=' flex flex-col justify-center items-center' >
                            <p className=' text-white font-[Fredoka] md:text-4xl text-xl font-bold shadow-lg'>4:00</p>
                            <p className=' text-white font-[Fredoka] md:text-2xl text-xl font-bold'>PM</p>
                        </div>
                    </div>
                    <div>
                        <p className=' font-[Fredoka] text-xl md:text-3xl text-white font-medium'>Validatory Ceremony</p>
                        <p className=' font-[Fredoka] text-white'></p>
                    </div>
                </div>

            </div>

            <div className=' flex justify-center pt-10'>
                {/* <button className=' px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg shadow-lg border border-white/20 transition-transform transform hover:scale-105 hover:bg-white/20'>
                    <a
                    href="WebSprint-Hackaton.pdf"
                    download="WebSprint-Hackaton.pdf"
                    className=' text-white text-2xl font-[Fredoka] '
                    >
                    Rules and Guidelines
                    </a>
                </button> */}
                <a
                    href="WebSprint-Hackaton.pdf"
                    download="WebSprint-Hackaton.pdf"
                    className=' text-white font-[Fredoka] '
                    >
                    <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg rounded-full shadow-lg hover:shadow-xl transform transition-transform hover:scale-105">
                        Rules and Guidelines
                    </button>
                </a>

            </div>
        </div>
    </div>
  )
}

export default Schedule