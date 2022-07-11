import React from "react";
import hero from "../assets/hero.svg";

const Hero = () => {
  return (
    <>
      <div class="hero min-h-screen">
        <div class="hero-content flex-col-reverse gap-7 lg:flex-row-reverse">
          <img src={hero} class="lg:max-w-lg " alt="" />
          <div>
            <h1
              class="text-3xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-delay="1000"
              data-aos-duration="1000"
            >
              Box Office News!
            </h1>
            <p
              className="text-xl mb-3"
              data-aos="fade-right"
              data-aos-delay="700"
              data-aos-duration="800"
            >
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button
              class="btn btn-primary"
              data-aos-delay="1500"
              data-aos="zoom-out"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
