import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";
const About = () => {
    useEffect(()=>{
        Aos.init();
      },[])
  return (
    
    <>
    <div className="max-w-[100%] mx-auto bg-[#08123B] border-t border-white" id="about"  >
        <div className="w-[90%] lg:w-[75%] mx-auto grid grid-cols-1 lg:grid-cols-2 py-[80px] gap-7" data-aos="fade-up" data-aos-delay="300">
            <div className="flex flex-col gap-5 items-center lg:items-start">
                <div>
                    <p className="font-[Fredoka] text-[17px] text-white font-bold text-nowrap">About The Event</p>
                </div>
                <div className="font-[Fredoka] text-white text-[28px] lg:text-[32px] text-center lg:text-left font-bold">
                    <p>TECHX '24 <br />A State Level Intercollegiate Technical Symposium</p>
                </div>

                <div className="h-[3px] bg-[#118AEF] w-[50%]"></div>
            </div>
            <div>
                <div>
                    <p className="font-[Fredoka] text-white text-[16px] leading-8 font-medium text-center lg:text-justify">TechX '24 is the premier inter-college symposium, bringing together the brightest minds in technology, innovation, and creativity. Designed to foster collaboration, competition, and cutting-edge exploration, TechX '24 provides a dynamic platform for students to showcase their technical prowess, exchange groundbreaking ideas, and solve real-world challenges.</p>
                </div>
            </div>

        </div>
    </div>
      
    </>
  )
}

export default About
