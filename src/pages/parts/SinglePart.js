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

const SinglePart = () => {
  const [submitQuantity, setSubmitQuantity] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [singlePart, setSinglePart] = useState({});

  useEffect(() => {
    fetch(`https://limitless-ocean-30960.herokuapp.com/part/${id}`)
      .then((res) => res.json())
      .then((data) => setSinglePart(data));
  }, [id]);

  if (!singlePart) {
    return <LoginLoding></LoginLoding>;
  }
  let quantity;
  const handleSubmitForm = (event) => {
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

  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(parseInt(submitQuantity));
  console.log(singlePart?.MinimumOrder * singlePart?.price);

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
                  onSubmit={handleSubmit(onSubmit)}
                  className=" w-full max-w-xs px-5 py-5"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    class="input input-bordered w-full max-w-xs input-border-style"
                    value={user?.displayName ? user?.displayName : ""}
                    disabled
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Name must be at least six character",
                      },
                    })}
                  />

                  <p className="mt-3">
                    <input
                      className="input input-bordered w-full max-w-xs input-border-style "
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Please provide a valid email address",
                        },
                      })}
                      placeholder="Email"
                      type="email"
                      class="input input-bordered w-full max-w-xs"
                      value={user?.email && user?.email}
                      disabled
                    />
                  </p>
                  <p className="mt-3">
                    <input
                      className="input input-bordered w-full max-w-xs input-border-style mt-5"
                      {...register("quantity", {
                        required: {
                          value: true,
                          message: "quantity is required",
                        },
                      })}
                      placeholder="Quantity"
                      type="text"
                      class="input input-bordered w-full max-w-xs"
                      value={submitQuantity ? submitQuantity : ""}
                      disabled
                    />
                  </p>
                  <p className="mt-3">
                    <input
                      className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none "
                      {...register("price", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Please provide a valid email address",
                        },
                      })}
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
                    />
                  </p>
                  <p className="mt-3">
                    <input
                      className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none"
                      {...register("address", {
                        required: {
                          value: true,
                          message: "Address is required",
                        },
                      })}
                      placeholder="address"
                      type="text"
                      class="input input-bordered w-full max-w-xs"
                    />
                  </p>

                  <label className="level">
                    {errors.address?.type === "required" && (
                      <span class="label-text-alt text-red-500 font-bold error-message">
                        {errors?.address?.message}
                      </span>
                    )}
                  </label>

                  <p className="mt-3">
                    <input
                      className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none mt-5"
                      {...register("number", {
                        required: {
                          value: true,
                          message: "Contact Number is required",
                        },
                      })}
                      placeholder="Contact Number"
                      type="text"
                      class="input input-bordered w-full max-w-xs"
                    />
                  </p>

                  <label className="level">
                    {errors.number?.type === "required" && (
                      <span class="label-text-alt text-red-500 font-bold error-message">
                        {errors?.number?.message}
                      </span>
                    )}
                  </label>
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
