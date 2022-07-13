import React from "react";
import Navbar from "../shared/Navbar";
import Services from "../pages/Services";
import Hero from "./Hero";
import BusinessSummery from "./BusinessSummery";
import Footer from "../shared/Footer";
import Parts from "./parts/Parts";

const Home = () => {
  return (
    <div>
      <Navbar>
        <div>
          <Hero className="lg:px-20"></Hero>
          <BusinessSummery></BusinessSummery>
          <Parts></Parts>
          <Footer></Footer>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
