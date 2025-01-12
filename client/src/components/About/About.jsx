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
                    <p>Hackathon 24 <br />A State Level Intercollegiate Technical Symposium</p>
                </div>

                <div className="h-[3px] bg-[#118AEF] w-[50%]"></div>
            </div>
            <div>
                <div>
                    <p className="font-[Fredoka] text-white text-[16px] leading-8 font-medium text-center lg:text-justify">The Hackathon at St. Joseph's College was a dynamic event centered around web and mobile app development, designed to inspire creativity and foster innovation among students. This 24-hour competition brought together tech enthusiasts, designers, and developers to collaboratively tackle real-world challenges and create impactful solutions.</p>
                </div>
            </div>

        </div>
    </div>
      
    </>
  )
}

export default About
