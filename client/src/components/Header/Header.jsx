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
      <div className="pt-16 md:pt-16 lg:pt-20" id="home">
        <div className="relative w-full h-screen bg-[url(https://ik.imagekit.io/HoneyJoe/Hackathon/army-robots-with-leader.jpg?updatedAt=1736657931131)] bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 w-[95%] md:w-[80%] lg:w-[70%] mx-auto flex items-center justify-center">
            <div className="text-white font-bold text-center flex flex-col items-center py-10 md:py-16 lg:py-20 gap-3">
              <p className="font-[Fredoka] text-[20px] md:text-[28px] lg:text-[36px] text-center font-bold text-[#fbe072]">
                DEPARTMENT OF COMPUTER SCIENCE
              </p>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <p className="font-[Poppins] font-medium text-[16px] md:text-[20px] lg:text-[24px]">
                  St. Joseph's College (Autonomous)
                </p>
                <p className="text-[14px] md:text-[16px]">in</p>
                <p className="font-[Poppins] font-medium text-[14px] md:text-[16px] lg:text-[18px] italic text-center">
                  Collaboration with ZWORK Technology, Trichy-620021 Organizes
                </p>
              </div>

              <p className="font-[Stylish] text-[20px] md:text-[24px] mt-3 text-[#fbe072]">
                Cordially invites you
              </p>
              <div className="flex justify-center items-center flex-col gap-5">
                <div>
                  <p className="text-[32px] md:text-[40px] lg:text-[60px] text-center font-[Stylish] text-white">
                    WebSprint'25
                  </p>
                  <p className="text-white font-[Poppins] text-center text-[14px] md:text-[16px]">
                    A State Level Intercollegiate Hackathon
                  </p>
                </div>
                <div>
                  <CountdownTimer />
                </div>
                <div className="flex justify-center mt-6 lg:mt-0">
                  <Link to={"/register"}>
                    <a
                      href="#_"
                      className="relative border inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 text-[16px] md:text-[18px] font-bold text-white rounded-md shadow-[0px_0px_20px_8px_#000] group"
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                      <span className="relative font-[Stylish] text-[16px] md:text-[20px]">
                        Register Now
                      </span>
                    </a>
                  </Link>
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
