import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import CountdownTimer from "../../Contdown/CountDown";

import { Button, Dialog, Pane, Paragraph, SideSheet } from "evergreen-ui";
import Register from "../../Auth/Register";
import { Link } from "react-router-dom";

const Header = () => {
  const [isShown, setIsShown] = useState(false);
  const [isDialog, setIsDialog] = useState(false);

  return (
    <>
      <div className="" id="home">
        <div class="relative w-full h-screen bg-[url(https://ik.imagekit.io/HoneyJoe/Hackathon/army-robots-with-leader.jpg?updatedAt=1736657931131)] bg-cover bg-center">
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 w-[90%] lg:w-[70%] mx-auto grid grid-cols-1  h-screen">
            <div className="text-white font-bold text-center flex flex-col items-center justify-center lg:pt-20 gap-3">
              <p className="font-[Fredoka] text-[26px] lg:text-[50px] text-center font-bold text-[#fbe072]">
                DEPARTMENT OF COMPUTER SCIENCE
              </p>

              <div className=" flex flex-col items-center gap-0">
                <p className="font-[Poppins] font-medium text-[18px] lg:text-[28px]">
                  St. Joseph's College (Autonomous)
                </p>
                <p >in</p>
                <p className="font-[Poppins] font-medium text-[18px] md:text-base italic">Collaboration with ZWORK Technology, Trichy-620021	Organizes</p>

              </div>

              <p className="font-[Stylish] text-[26px] mt-3 text-[#fbe072]">
                Cordiallly invites you
              </p>
              <div className="flex justify-center items-center flex-col gap-5">
                <div>
                  <p className="text-[50px] lg:text-[80px] text-center font-[Stylish] text-white">
                    WebSprint'25
                  </p>
                  <p className="text-white font-[Poppins] text-center">
                    A State Level Intercollegiate Hackathon
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
                      className="relative border inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-[0px_0px_20px_8px_#000] group"
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                      <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-black to-transparent opacity-5 h-1/3"></span>
                      <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-5"></span>
                      <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-black to-transparent opacity-5"></span>
                      <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-black to-transparent opacity-5"></span>
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
