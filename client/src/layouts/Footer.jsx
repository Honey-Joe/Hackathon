import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='max-w-[100%] bg-[#08123B] overflow-hidden'>
        <div className='w-[75%] grid grid-cols-1 lg:grid-cols-2 mx-auto py-[60px] gap-5'>

          <div className='flex flex-col gap-5 text-white font-[Fredoka]'>
            <div>
              <p className='text-[24px]'>Hackathon</p>
            </div>
            <div>
              <p>The Hackathon at St. Joseph's College was a dynamic event centered around web and mobile app development, designed to inspire creativity and foster innovation among students. This 24-hour competition brought together tech enthusiasts, designers, and developers to collaboratively tackle real-world challenges and create impactful solutions.</p>
            </div>
          </div>
          <div className='flex items-end  flex-col gap-5 text-white font-[Fredoka] '>
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
