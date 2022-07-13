import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import LoginLoding from "../../shared/LoginLoding";
import Navbar from "../../shared/Navbar";
import Part from "./Part";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Card from "react-animated-3d-card";

const SinglePart = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [singlePart, setSinglePart] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/part/${id}`)
      .then((res) => res.json())
      .then((data) => setSinglePart(data));
  }, [id]);

  if (!singlePart) {
    return <LoginLoding></LoginLoding>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let quantity = parseInt(event.target.quantity.value);

    if (!quantity) {
      toast.info("Please enter a quantity", { id: "info-1" });
    }

    if (singlePart?.MinimumOrder > quantity) {
      toast.error(
        `Sorry ! ${user?.displayName} you have to order minimum quantity ${singlePart?.MinimumOrder}`
      );
    }

    // event.target means select the whole form:
    event.target.reset();
  };

  return (
    <div>
      <Navbar>
        <div className="lg:px-20 my-3">
          <div
            class="card sm:max-w-sm lg:max-w-lg bg-clip-padding backdrop-filter  backdrop-blur-xl bg-opacity-60 border border-gray-200 text-primary-content header "
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div class="card-body">
              <img
                src={singlePart?.img}
                alt=""
                className="rounded-t-lg  object-cover  h-[250px]"
              />
              <h2 class="card-title text-2xl my-3">{singlePart?.name}</h2>
              <h2>{singlePart?.description}</h2>

              <h2 className="text-xl">
                price :{" "}
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "800",
                    letterSpacing: "0.1rem",
                    backgroundImage:
                      "linear-gradient(to right, #ba81cf, #6886d4)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                  }}
                >
                  {singlePart?.price}
                </span>
              </h2>
              <h2 class="text-xl my-2">Stock : {singlePart?.stock}</h2>
              <h4 class="text-xl">
                Minimum Order : {singlePart?.MinimumOrder}
              </h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Quantity"
                  class="input input-bordered w-full max-w-xs"
                  name="quantity"
                />
                <button class="btn lg:mx-2 mt-5">Order</button>
              </form>
            </div>
          </div>
        </div>
      </Navbar>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SinglePart;
