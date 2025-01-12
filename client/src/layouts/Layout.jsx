import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
