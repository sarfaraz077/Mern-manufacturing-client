import React from "react";
import Navbar from "../shared/Navbar";
import Services from "../pages/Services";
import Hero from "./Hero";
import BusinessSummery from "./BusinessSummery";

const Home = () => {
  return (
    <div>
      <Navbar>
        <div>
          <Hero className="lg:px-20"></Hero>
          <BusinessSummery></BusinessSummery>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
