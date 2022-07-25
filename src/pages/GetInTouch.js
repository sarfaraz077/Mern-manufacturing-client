import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Card from "react-animated-3d-card";
import { useAuthState } from "react-firebase-hooks/auth";
import { TbBrandTelegram } from "react-icons/tb";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.init";

import { Typewriter, useTypewriter, Cursor } from "react-simple-typewriter";

const GetInTouch = () => {
  const [user] = useAuthState(auth);
  const form = useRef();
  const { text } = useTypewriter({
    words: ["touch", "connect"],
    loop: "1",
    onLoopDone: () => console.log(`loop completed after 3 runs.`),
  });

  // const [submitLoading, setSubmitLoading] = useState(false);
  const sendEmail = (event) => {
    event.preventDefault();

    // for sending email:
    emailjs
      .sendForm(
        "service_q0vasps",
        "template_mbbkouk",
        form.current,
        "hFFjSSMaoe6QmaHSE"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    const name = document.getElementById("text").value;
    const email = document.getElementById("email").value;

    if (name && email) {
      Swal.fire({
        customClass: {
          title: "swal2-title",
        },
        position: "middle",
        icon: "success",
        title: `${user?.email ? user?.email : ""} we received your message`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    event.target.reset();
  };

  return (
    <div className="mt-20">
      {" "}
      <h1 className="text-center text-white my-10   text-2xl lg:text-5xl mt-20">
        Get in{" "}
        <span
          className="text-4xl lg:text-7xl"
          style={{
            backgroundImage: "linear-gradient(to right, #ba81cf, #6886d4)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          {text}
        </span>{" "}
      </h1>
      <form
        className=" lg:px-20 flex flex-col items-center justify-center"
        ref={form}
        onSubmit={sendEmail}
      >
        <input
          type="text"
          placeholder="Name"
          class="input w-full max-w-md my-2"
          id="text"
          name="name"
        />

        <input
          type="email"
          placeholder="Email"
          class="input w-full max-w-md my-2"
          id="email"
          name="email"
        />
        <textarea
          class="textarea textarea-bordered h-[10rem]  my-2 w-full max-w-md"
          placeholder="Message"
          name="message"
        ></textarea>
        <div>
          <button className="btn btn-xl">
            Send <TbBrandTelegram className="mx-1"></TbBrandTelegram>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetInTouch;
