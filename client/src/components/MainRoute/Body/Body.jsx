import React, { useEffect } from "react";
import About from "../About/About";
import Eventlist from "../Eventslist/Eventlist";
import Map from "../Map/Map";
import Aos from "aos";
import "aos/dist/aos.css"
import Faq from "../Faq/Faq";
import NonTechEventlist from "../NontechEvent/NontechEvent";
import Schedule from "../Schedule/Schedule";

const Body = () => {
  useEffect(()=>{
    Aos.init();
  },[])
  return (
    <>
      <div>
        <About></About>
      </div>
      <div>
        <Eventlist></Eventlist>
      </div>
      <div>
        <NonTechEventlist></NonTechEventlist>
      </div>
      <div>
        <Schedule></Schedule>
      </div>
      <div>
        <Faq></Faq>
      </div>
      <div>
        <Map></Map>
      </div>
    </>
  );
};

export default Body;
