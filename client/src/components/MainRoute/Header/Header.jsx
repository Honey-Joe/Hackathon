import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import CountdownTimer from "../Contdown/CountDown";

import { Button, Dialog, Pane, Paragraph, SideSheet } from "evergreen-ui";
import "./baackground.css";
import Register from "../Auth/Register";
import { Link } from "react-router-dom";

const Header = () => {
  const [isShown, setIsShown] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  
  return (
    <>
      <div className="">
        <div className="h-screen " id="main">
          <div className="area">
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className=" z-10 w-[100%]  lg:left-0 lg:top-0  lg:rounded-md  mx-auto px-5 lg:px-10 grid grid-cols-2 lg:grid-cols-2 py-7 lg:py-3 shadow-lg items-center bg-[#08123B] text-white  fixed">
            <div>
              <p className="font-[Stylish] text-[20px] lg:text-[24px]">
                Techx 24
              </p>
            </div>
            <div className=" py-5 hidden lg:flex lg:justify-end lg:bg-transparent bg-white">
              <ul className=" lg:static  hidden  flex-col lg:flex-row  lg:flex gap-5 font-[Stylish] text-[20px] text-center">
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#event">Event</a>
                </li>
                <li>
                  <a href="#schedule">Schedule</a>
                </li>
                <li>
                  <a href="#venue">Venue</a>
                </li>
                <li onClick={() => setIsDialog(true)} className="cursor-pointer">Register</li>
              </ul>
            </div>
            <div className="flex justify-end lg:hidden ">
              <SideSheet
                isShown={isShown}
                onCloseComplete={() => setIsShown(false)}
                width={270}
                className="bg-black"
                shouldCloseOnOverlayClick={true}
                onBeforeClose={false}
                isClosing={true}
              >
                <Paragraph height="100vh" backgroundColor="#08123B">
                  <ul className=" flex   flex-col  gap-5 font-[Stylish] text-[20px] text-center py-5 text-white">
                    <li>
                      <a href="">Home</a>
                    </li>
                    <li>
                      <a href="#about">About</a>
                    </li>
                    <li>
                      <a href="#event">Event</a>
                    </li>
                    <li>
                      <a href="#schedule">Schedule</a>
                    </li>
                    <li>
                      <a href="#venue">Venue</a>
                    </li>
                    <li onClick={() => setIsDialog(true)}>Register</li>
                  </ul>
                </Paragraph>
              </SideSheet>
              <Button
                onClick={() => {
                  setIsShown(true);
                }}
                border={0}
                background="#08123B"
              >
                <Menu></Menu>
              </Button>
            </div>
          </div>
          <div className="w-[90%] lg:w-[70%] mx-auto grid grid-cols-1  h-screen">
            <div className="text-white font-bold text-center flex flex-col items-center justify-center lg:pt-20 gap-3">
              <p className="font-[Fredoka] text-[26px] lg:text-[52px] text-center font-bold text-[#fbe072]">
                DEPARTMENT OF COMPUTER SCIENCE
              </p>

              <p className="font-[Poppins] font-medium text-[18px] lg:text-[28px]">
                St. Joseph's College (Autonomous)
              </p>
              <div className="hidden lg:block">
                <p className="font-[Stylish] text-[12px]">
                  College with Potential for Excellence by UGC
                </p>
                <p className="font-[Stylish] text-[12px]">
                  Accredited at A++ Grade (Cycle IV) by NAAC
                </p>
                <p className="font-[Stylish] text-[12px]">
                  Tiruchirappalli - 620002
                </p>
              </div>
              <p className="font-[Stylish] text-[26px] mt-3 text-[#fbe072]">
                Cordiallly invites you
              </p>
            <div className="flex justify-center items-center flex-col gap-5">
              <div>
                <p className="text-[50px] lg:text-[100px] text-center font-[Stylish] text-white">
                  TECHX'24
                </p>
                <p className="text-white font-[Poppins] text-center">
                  A State Level Intercollegiate Technical Symposium
                </p>
              </div>
              <div>
                <span></span>
                <CountdownTimer></CountdownTimer>
              </div>
              <div className="flex justify-center mt-10  lg:mt-0 lg:pt-0 ">
                <Link to={"/register"}>
                <a
                    href="#_"
                    className="relative border inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-[0px_0px_20px_8px_#fff] group"
                  >
                    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                    <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                    <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                    <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                    <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                    <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                    <span className="relative font-[Stylish] text-[22px]">
                      Register Now
                    </span>
                  </a>
                
                </Link>
                
              
                `
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
