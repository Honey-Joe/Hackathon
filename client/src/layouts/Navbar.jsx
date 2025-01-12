import { Button, Menu, Paragraph, SideSheet } from 'evergreen-ui';
import { MenuIcon } from 'lucide-react';
import React, { useState } from 'react'

const Navbar = () => {
  const [isShown, setIsShown] = useState(false);
    const [isDialog, setIsDialog] = useState(false);
  return (
    <div>
      <div className=" z-10 w-[100%]  lg:left-0 lg:top-0  lg:rounded-md  mx-auto px-5 lg:px-10 grid grid-cols-2 lg:grid-cols-2 py-7 lg:py-3 shadow-lg items-center  text-white  fixed">
            <div>
              <p className="font-[Stylish] text-[20px] lg:text-[24px]">
                Hackathon
              </p>
            </div>
            <div className=" py-5 hidden lg:flex lg:justify-end lg:bg-transparent bg-white">
              <ul className=" lg:static  hidden  flex-col lg:flex-row  lg:flex gap-5 font-[Stylish] text-[20px] text-center">
                <li className='hover:scale-125 transition'>
                  <a href="" >Home</a>
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
                background=""
              >
                <MenuIcon></MenuIcon>
              </Button>
            </div>
          </div>
    </div>
  )
}

export default Navbar
