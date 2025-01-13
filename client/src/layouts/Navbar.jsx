import { Button, Li, Menu, Paragraph, SideSheet } from "evergreen-ui";
import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <div className=" z-10 w-[100%]  lg:left-0 lg:top-0  lg:rounded-md  mx-auto px-5 lg:px-10 grid grid-cols-2 lg:grid-cols-2 py-7 lg:py-3 shadow-lg items-center  text-white  fixed">
        <div>
          <Link to={"/"}>
            <p className="font-[Stylish] text-[20px] lg:text-[24px]">
              Hackathon
            </p>
          </Link>
        </div>
        <div className=" py-5 hidden lg:flex lg:justify-end lg:bg-transparent bg-white">
          <ul className=" lg:static  hidden  flex-col lg:flex-row  lg:flex gap-5 font-[Stylish] text-[20px] text-center">
            <li className="hover:scale-125 transition">
              <Link to={"/"}>Home</Link>
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
              {user ? (
                <>
                  {userJson.email === "admin@mail.sjctni.edu" ? (
                    <>
                      <Link to={"/admin"}>Admin</Link>
                    </>
                  ) : (
                    <>
                      <Link to={"/profile"}>Your profile</Link>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </li>
            <li>
              {user ? (
                <>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to={"/register"}>Register</Link>
                </>
              )}
            </li>
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
                  <Link to={"/"}>Home</Link>
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
                {user ? (
                <>
                  {userJson.email === "admin@mail.sjctni.edu" ? (
                    <>
                      <Link to={"/admin"}>Admin</Link>
                    </>
                  ) : (
                    <>
                      <Link to={"/profile"}>Your profile</Link>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
                {user ? (
                  <>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to={"/register"}>Register</Link>
                  </>
                )}
              </ul>
            </Paragraph>
          </SideSheet>
          <Button
            onClick={() => {
              setIsShown(true);
            }}
            border={0}
            background=""
          >
            <MenuIcon></MenuIcon>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
