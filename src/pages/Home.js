import React from "react";
import Navbar from "../shared/Navbar";
import Services from "../pages/Services";
import Hero from "./Hero";
import BusinessSummery from "./BusinessSummery";
import Footer from "../shared/Footer";
import Parts from "./parts/Parts";
import ReviewCardHome from "./ReviewCardHome/ReviewCardHome";

const Home = () => {
  return (
    <div>
      <Navbar>
        <div>
          <Hero className="lg:px-20"></Hero>
          <BusinessSummery></BusinessSummery>
          <Parts></Parts>
          <ReviewCardHome className="lg:px-20"></ReviewCardHome>
          <Footer></Footer>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
