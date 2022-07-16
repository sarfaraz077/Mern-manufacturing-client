import React from "react";
import Navbar from "../shared/Navbar";
import Services from "../pages/Services";
import Hero from "./Hero";
import BusinessSummery from "./BusinessSummery";
import Footer from "../shared/Footer";
import Parts from "./parts/Parts";
import ReviewCardHome from "./ReviewCardHome/ReviewCardHome";
import BackToTopButton from "../shared/BackToTopButton";
import { Helmet } from "react-helmet-async";
import PageTitle from "../shared/PageTitle";
import MessengerCustomerChat from "react-messenger-customer-chat";
// import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    <div>
      {/* <ScrollToTop smooth top="20" /> */}
      <PageTitle title={"Home"}></PageTitle>
      <Navbar>
        <div>
          <Hero className="lg:px-20"></Hero>
          <BusinessSummery></BusinessSummery>
          <BackToTopButton></BackToTopButton>
          <Parts></Parts>
          <ReviewCardHome className="lg:px-20"></ReviewCardHome>

          <Footer></Footer>
        </div>
      </Navbar>
      <MessengerCustomerChat
        pageId="103969108741738"
        appId="827389114895107"
        htmlRef="<REF_STRING>"
      />
      ,
    </div>
  );
};

export default Home;
