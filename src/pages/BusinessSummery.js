import wave from "../assets/Business/waves.svg";
import React from "react";
import { BiWorld } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiComputerFill } from "react-icons/ri";
import country from "../assets/Business/country.svg";
import communication from "../assets/Business/communication.svg";
import project from "../assets/Business/project.svg";
import TypeWriter from "react-typewriter";
import Card from "react-animated-3d-card";
import CountUp, { useCountUp } from "react-countup";
import { useTypewriter } from "react-simple-typewriter";

const BusinessSummery = () => {
  //   const countUpRef = React.useRef(null);
  //   const { start1, pauseResume1, reset1, update1 } = useCountUp({
  //     ref: countUpRef,
  //     start: 0,
  //     end: 700,
  //     duration: 2,
  //   });
  const { text } = useTypewriter({
    words: ["Hand Over", "Provide", "Serve"],
    loop: "2",
    onLoopDone: () => console.log(`loop completed after 3 runs.`),
  });

  return (
    <>
      <h2 className=" text-center my-10 text-3xl lg:text-5xl">
        We
        <span
          className="text-5xl lg:text-7xl"
          style={{
            backgroundImage: "linear-gradient(to right, #ba81cf, #6886d4)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          {" "}
          {text}
        </span>
      </h2>
      <div className=" rounded-2xl grid grid-cols-1 lg:grid-cols-3 gap-10 lg:px-20  p-5 ">
        <Card
          style={{
            cursor: "pointer",

            backgroundImage:
              "linear-gradient(135deg, #536976 10%, #292E49 100%)",
          }}
        >
          <div
            class="card  shadow-xl image-full "
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
            }}
          >
            <figure>
              <img
                src={country}
                alt="Shoes"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #536976 10%, #292E49 100%)",
                }}
              />
            </figure>
            <div class="card-body w-full ">
              <BiWorld className=" text-5xl mx-auto mb-3"></BiWorld>

              <h3 class="text-4xl text-center">
                <CountUp start={0} end={70} duration={8}></CountUp>
              </h3>
              <span className="text-[#333] text-center font-bold text-2xl">
                Countries
              </span>
            </div>
          </div>
        </Card>

        <Card
          style={{
            cursor: "pointer",
            backgroundImage:
              "linear-gradient(135deg, #536976 10%, #292E49 100%)",
          }}
        >
          <div
            class="card   shadow-xl image-full "
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
            }}
          >
            <figure>
              <img
                src={communication}
                alt="Shoes"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #536976 10%, #292E49 100%)",
                }}
              />
            </figure>

            <div class="card-body w-full">
              <BsFillPeopleFill className=" text-5xl mx-auto mb-3"></BsFillPeopleFill>

              <h3 class="text-4xl text-center">
                <CountUp start={0} end={1200} duration={8}></CountUp>
              </h3>
              <span className="text-[#333] font-bold text-2xl text-center">
                Happy Clients
              </span>
            </div>
          </div>
        </Card>

        <Card
          style={{
            cursor: "pointer",
            backgroundImage:
              "linear-gradient(135deg, #536976 10%, #292E49 100%)",
          }}
        >
          <div
            class="card   shadow-xl image-full "
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
            }}
          >
            <figure>
              <img
                src={project}
                alt="Shoes"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #536976 10%, #292E49 100%)",
                }}
              />
            </figure>
            <div class="card-body w-full">
              <RiComputerFill className=" text-5xl mx-auto mb-3"></RiComputerFill>
              <h3 class="text-4xl text-center">
                <CountUp start={0} end={900} duration={8}></CountUp>
              </h3>
              <span className="text-[#333] text-center font-bold text-2xl">
                Successful projects
              </span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BusinessSummery;
