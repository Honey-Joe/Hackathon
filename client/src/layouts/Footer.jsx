import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='max-w-[100%] bg-[#08123B] overflow-hidden'>
        <div className='w-[75%] grid grid-cols-1 lg:grid-cols-3 mx-auto py-[60px] gap-5'>

          <div className='flex flex-col gap-5 text-white font-[Fredoka]'>
            <div>
              <p className='text-[24px]'>Hackathon</p>
            </div>
            <div>
              <p>The Hackathon at St. Joseph's College was a dynamic event centered around web development, designed to inspire creativity and foster innovation among students. This 6-hour competition brought together tech enthusiasts, designers, and developers to collaboratively tackle real-world challenges and create impactful solutions.</p>
            </div>
          </div>
          <div className=' lg:flex justify-center'>
            <ul className=' flex flex-col items-start gap-5 font-[Fredoka]'>
                <p className=' text-white text-[24px]'>Links</p>
                <li>
                  <a href='#home' className=' text-white '>Home</a>
                </li>
                <li>
                  <a href="#about" className=' text-white'>About</a>
                </li>
                <li>
                  <a href="#event" className=' text-white'>Event</a>
                </li>
                <li>
                  <a href="#schedule" className=' text-white'>Schedule</a>
                </li>
            </ul>
          </div>
          <div className='flex lg:items-end  flex-col gap-5 text-white font-[Fredoka] '>
            <div>
              <p className='text-[24px]'>Contact</p>
            </div>
            <div>
              <p>Ajay James - +91 70104 37314</p>
            </div>
            <div>
              <p>Manoj - +91 88258 63892</p>
            </div>
            <div>
              <p>Honey Joe - 6382503265</p>
            </div>
          </div>

        </div>
      </div>
  
    </>
  )
}

export default Footer
