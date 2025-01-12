import { ArrowRight } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const Eventlistcard = (props) => {
  return (
    <>
      <div className="hover:-translate-y-3 transition h-fit shadow-lg relative">
        <div className="overflow-hidden group">
        <LazyLoadImage
            alt={"image non tech event"}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            src={props.imgurl}
            className="w-[100%] h-[250px]  object-cover z-20 rounded-xl"
          />
        </div>
        <div className="rounded-xl flex flex-col shadow-lg  transition w-[90%] mx-auto absolute -bottom-4 left-[5%]  bg-white">
          <div className="flex flex-col p-5 gap-5 items-center">
            
            <div>
              <p className="font-[Fredoka] text-[18px] md:text-[22px] lg:text-[24px] text-[#2a254d] hover:text-[#4f5de4] font-medium">
                {props.blogtitle}
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link to={"/event/" + props.eventid}>
              <div>
                <a
                  href="#_"
                  className="relative inline-flex items-center justify-center px-3 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-[#081E4C] rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#081E4C] group-hover:translate-x-0 ease">
                    <ArrowRight></ArrowRight>
                  </span>
                  <span className="ab1solute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease text-[11px] font-[Fredoka]">
                    Rules And Regulation
                  </span>
                </a>
              </div> 
              </Link>
              
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Eventlistcard;
