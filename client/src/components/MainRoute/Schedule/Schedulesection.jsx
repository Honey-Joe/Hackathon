import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "aos/dist/aos.css"
import { useEffect } from "react";
import Aos from "aos";



const Eventlist = () => {
  useEffect(()=>{
    Aos.init();
  },[])
}
const Schedulesection = (props) => {
  return (
    <>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5 items-center bg-[#081F4D]  py-6 px-0 lg:px-6 rounded-lg" data-aos="fade-up-left" data-aos-delay="400">
            <div className="flex justify-center lg:justify-normal ">
                <p className="bg-[#118BEE] lg:px-20 lg:py-10 text-[24px] w-[90%] py-3 flex  justify-center rounded-lg font-[Fredoka] text-white font-medium">{props.time}</p>
            </div>
            <div className="flex justify-center">
                <p className="font-[Fredoka] text-white font-medium text-[24px] text-center">{props.venue}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="flex justify-center">
                <LazyLoadImage
            alt={"image non tech event"}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            src={props.eventimg}
            className="w-[300px] h-[180px]  rounded-lg lg:rounded-full"
          />
                </div> 
                <div className="flex justify-center items-center">
                    <p className="font-[Fredoka] text-white font-medium text-[24px]">{props.eventname}</p>
                </div>
                
            </div>
        </div>
      
    </>
  )
}

export default Schedulesection
