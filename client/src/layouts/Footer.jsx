import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='max-w-[100%] bg-[#08123B] overflow-hidden'>
        <div className='w-[75%] grid grid-cols-1 lg:grid-cols-2 mx-auto py-[60px] gap-5' data-aos="fade-up-left" data-aos-delay="300">

          <div className='flex flex-col gap-5 text-white font-[Fredoka]'>
            <div>
              <p className='text-[24px]'>TechX'24</p>
            </div>
            <div>
              <p>TechX '24 is the premier inter-college symposium, bringing together the brightest minds in technology, innovation, and creativity.</p>
            </div>
          </div>
          <div className='flex  flex-col gap-5 text-white font-[Fredoka] '>
            <div>
              <p className='text-[24px]'>Contact</p>
            </div>
          </div>

        </div>
      </div>
  
    </>
  )
}

export default Footer
