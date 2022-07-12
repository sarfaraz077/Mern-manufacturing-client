import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import notFound from "../assets/notFound.svg";

const NotFound = () => {
  return (
    <div>
      <Navbar>
        <div className="lg:w-[50%]  mx-auto flex h-[100%] items-center">
          <img src={notFound} alt="" className="w-[100%]" />
        </div>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default NotFound;
