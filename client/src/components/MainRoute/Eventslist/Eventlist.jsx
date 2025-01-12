import { Eventlistdata } from "../../../API/Eventlistdata";
import Eventlistcard from "./EventlistCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import './styles.css';
import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../BASE_URL";


const Eventlist = () => {
  const [data,setData] = useState([]);

  const fetchdata = async()=>{
    const res = await axios.get(BASE_URL+"/event");
    setData(res.data)
  }
 
  useEffect(()=>{
    fetchdata();
    Aos.init();
  },[])
  return (
    <>
      <div className="max-w-[100%] bg-[#081F4D]" id="event">
        <div className="w-[100%] mx-auto grid grid-cols-1 py-10 gap-5" data-aos="fade-up-right" data-aos-delay="300">
          <div className="flex justify-center">
            <div className="">
              <h5 className="flex  items-center justify-center gap-3">
                <p className="font-[Fredoka] text-[32px]  md:text-[22px] lg:text-[24px] font-semibold text-white ">
                  Events
                </p>
              </h5>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="font-[Fredoka] text-[24px]  md:text-[32px] lg:text-[40px] text-white font-semibold">
              Technical Events
            </p>
          </div>
          <div className="h-[3px] bg-[#118AEF] w-[90%] lg:w-[40%] mx-auto my-5 lg:my-5"></div>
          <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"2"}
              coverflowEffect={{
                rotate: 10,
                stretch: 10,
                depth: 100,
                modifier: 3,
                slideShadows: false,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
            >
              
                {data.map((e) => {
                  return (
                    <>
                    <SwiperSlide>
                      
                      
                    <Eventlistcard
                      imgurl={e.eventurl}
                      blogtitle={e.eventname}
                      eventid = {e.eventid}
                    ></Eventlistcard>
                    
                    </SwiperSlide>
                    </>
                  );
                })}
            
            </Swiper>
        </div>
      </div>
    </>
  );
};

export default Eventlist;
