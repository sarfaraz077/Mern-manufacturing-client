import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import LoginLoding from "../../shared/LoginLoding";
import Navbar from "../../shared/Navbar";
import Part from "./Part";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Card from "react-animated-3d-card";
import { FaGoogle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

const SinglePart = () => {
  const [submitQuantity, setSubmitQuantity] = useState(0);

  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [singlePart, setSinglePart] = useState({});

  useEffect(() => {
    fetch(`https://dry-garden-16157.herokuapp.com/part/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSinglePart(data);
      });
  }, [id]);

  if (!singlePart) {
    return <LoginLoding></LoginLoding>;
  }
  let quantity;
  const handleSubmitForm = (event) => {
    // console.log(event.target.imgS.src);
    event.preventDefault();
    quantity = parseInt(event.target.quantity.value);

    if (!quantity) {
      toast.info("Please enter a quantity", { id: "info-1" });
    }

    if (singlePart?.MinimumOrder > quantity) {
      toast.error(
        `Sorry ! ${user?.displayName} you have to order minimum quantity ${singlePart?.MinimumOrder}`
      );
      // event.target means select the whole form:
      event.target.reset();
    }

    if (singlePart?.MinimumOrder <= quantity) {
      setSubmitQuantity(quantity);
      //  event.target means select the whole form:
      event.target.reset();
    }
  };

  const handleSubmitProductForm = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const name = event.target.name.value;
    const quantity = event.target.quantity.value;
    const price = event.target.price.value;
    const address = event.target.address.value;
    const number = event.target.number.value;

    const data = {
      email: email,
      name: name,
      quantity: quantity,
      price: price,
      address: address,
      number: number,
      product: singlePart?.name,
      img: singlePart?.img,
    };

    fetch("https://dry-garden-16157.herokuapp.com/part", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((purchaseData) => {
        console.log(purchaseData);
        if (purchaseData.insertedId && (address || number)) {
          toast.success(
            `${data.email} purchase Successfully ${singlePart?.name}`,
            { id: "purchse-1" }
          );
          event.target.reset();
        }
      });
  };
  console.log(singlePart?.img);
  // console.log(parseInt(submitQuantity));
  // console.log(singlePart?.MinimumOrder * singlePart?.price);

  return (
    <div>
      <Navbar>
        <div className="my-3 grid lg:grid-cols-2 lg:px-20 lg:gap-20 sm:gap-5 md:gap-5 grid-cols-1">
          <div
            class="card login sm:max-w-sm lg:max-w-lg bg-clip-padding backdrop-filter  backdrop-blur-xl bg-opacity-60 border border-gray-200 text-primary-content header "
            style={{
              backdropFilter: "blur(20px)",
            }}
          >
            <div class="card-body">
              <img
                id="imgS"
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
              <form onSubmit={handleSubmitForm}>
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

          {/* for purchase form: */}

          <div
            className=" flex items-center h-screen  lg:max-w-lg mx-auto lg:max-w-lg"
            submitQuantity={submitQuantity}
          >
            <div class="card lg:max-w-lg header shadow-xl login mt-10">
              <div class="card-body">
                <p class="text-white text-2xl text-center login-text">
                  Purchase Form
                </p>
                <form
                  onSubmit={handleSubmitProductForm}
                  className=" w-full max-w-xs px-5 py-5"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    class="input input-bordered w-full max-w-xs input-border-style"
                    value={user?.displayName ? user?.displayName : ""}
                    disabled
                    name="name"
                  />

                  <p className="mt-3">
                    <input
                      type="email"
                      placeholder="Email"
                      class="input input-bordered w-full max-w-xs"
                      name="email"
                      value={user?.email ? user?.email : ""}
                    />
                  </p>
                  <p className="mt-3">
                    <input
                      className="input input-bordered w-full max-w-xs input-border-style mt-5"
                      placeholder="Quantity"
                      type="text"
                      class="input input-bordered w-full max-w-xs"
                      value={submitQuantity ? submitQuantity : ""}
                      disabled
                      name="quantity"
                    />
                  </p>
                  <p className="mt-3">
                    <input
                      className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none "
                      placeholder="price"
                      type="text"
                      class="input input-bordered w-full max-w-xs"
                      value={
                        submitQuantity
                          ? parseInt(submitQuantity) *
                            parseInt(singlePart?.price)
                          : ""
                      }
                      disabled
                      name="price"
                    />
                  </p>
                  <p className="mt-3">
                    <input
                      className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none"
                      placeholder="address"
                      type="text"
                      class="input input-bordered w-full max-w-xs"
                      name="address"
                      required
                    />
                  </p>

                  <p className="mt-3">
                    <input
                      className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none mt-5"
                      placeholder="Contact Number"
                      type="number"
                      class="input input-bordered w-full max-w-xs"
                      name="number"
                      required
                    />
                  </p>

                  <p className="mt-3">
                    {" "}
                    <button class="btn btn-primary text-center  w-full max-w-xs ">
                      Purchase
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SinglePart;
