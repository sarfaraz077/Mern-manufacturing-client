import React from "react";
import Navbar from "../shared/Navbar";
import Services from "../pages/Services";
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      <Navbar>
        <div className="lg:px-20">
          <Hero></Hero>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
