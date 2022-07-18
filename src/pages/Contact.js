import React from "react";
import Navbar from "../shared/Navbar";
import contact from "../assets/contact.svg";
import Card from "react-animated-3d-card";
import { GoLocation } from "react-icons/go";

import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import Footer from "../shared/Footer";

const Contact = () => {
  return (
    <div>
      <Navbar>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:px-20 h-screen">
          <div className="shrink-0 w-[100%] lg:w-[70%] ">
            <img src={contact} alt="" className="mx-auto" />
          </div>

          <div>
            <Card>
              <div class="card lg:max-w-lg header shadow-xl">
                <div class="card-body">
                  <p className="flex items-center justify-center gap-2 my-3">
                    <GoLocation
                      style={{
                        color: "#0C7B93",
                        fontSize: "2rem",
                        fontWeight: "800",
                      }}
                    ></GoLocation>
                    <h1 className="text-xl">𝓑𝓪𝓶𝓸𝓲𝓵,𝓓𝓮𝓶𝓻𝓪-𝓓𝓱𝓪𝓴𝓪</h1>
                  </p>
                  <p className="flex items-center justify-center gap-2 my-3">
                    <MdOutlineMarkEmailUnread
                      style={{
                        color: "#0C7B93",
                        fontSize: "2rem",
                        fontWeight: "800",
                      }}
                    ></MdOutlineMarkEmailUnread>
                    <h1 className="text-xl">𝓽𝓻9836859@𝓰𝓶𝓪𝓲𝓵.𝓬𝓸𝓶</h1>
                  </p>
                  <p className="flex items-center justify-center gap-2 my-3">
                    <BsFillTelephoneFill
                      style={{
                        color: "#0C7B93",
                        fontSize: "2rem",
                        fontWeight: "800",
                      }}
                    ></BsFillTelephoneFill>
                    <h1 className="text-xl">０１８８６６３３９４９</h1>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <Footer></Footer>
      </Navbar>
    </div>
  );
};

export default Contact;
