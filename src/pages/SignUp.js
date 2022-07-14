import React, { useState } from "react";

import Navbar from "../shared/Navbar";

import { useForm } from "react-hook-form";

import { BiShow, BiHide } from "react-icons/bi";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import auth from "../firebase/firebase.init";
import { FiLogIn } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import LoginLoding from "../shared/LoginLoding";
import authentication from "../assets/authentication.svg";
const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(data?.email, data?.password);

    console.log(data);
    reset();
  };
  let backendError;
  // for error:
  if (googleError || error) {
    backendError = (
      <span className="text-red-500">
        <small>{googleError?.message || error?.message}</small>
      </span>
    );
  }

  // for redirecting:

  const from = location.state?.from?.pathname || "/";

  if (googleUser || user) {
    navigate(from, { replace: true });
  }

  // for loading:

  if (loading || googleLoading) {
    return <LoginLoding></LoginLoding>;
  }
  return (
    <div>
      <Navbar>
        <div className="grid lg:grid-cols-2 lg:px-20 lg:gap-20 sm:gap-5 md:gap-5">
          {/* for img */}
          <div className="w-11/12 lg:mx-auto  sm:w-full mx-auto h-screen">
            <img src={authentication} alt="" className="w-screen h-screen" />
          </div>

          <div className="flex items-center h-screen  lg:max-w-lg mx-auto ">
            <div class="card lg:max-w-lg header shadow-xl login mt-10">
              <div class="card-body">
                <p class="text-white text-2xl text-center login-text">
                  Sign Up
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" w-full max-w-xs px-5 py-5"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    class="input input-bordered w-full max-w-xs input-border-style"
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
                  <label class="label">
                    {errors.name?.type === "required" && (
                      <span class="label-text-alt text-red-500 font-bold error-message">
                        {errors?.name?.message}
                      </span>
                    )}

                    {errors.name?.type === "minLength" && (
                      <span class="label-text-alt text-red-500 error-message">
                        {errors?.name?.message}
                      </span>
                    )}
                  </label>
                  <input
                    className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Please provide a valid email address",
                      },
                    })}
                    placeholder="Email"
                    type="email"
                    class="input input-bordered w-full max-w-xs"
                  />

                  <label className="level">
                    {errors.email?.type === "required" && (
                      <span class="label-text-alt text-red-500 font-bold error-message">
                        {errors?.email?.message}
                      </span>
                    )}
                  </label>

                  <label className="level">
                    {errors.email?.type === "pattern" && (
                      <span class="label-text-alt text-red-500 font-bold error-message">
                        {errors?.email?.message}
                      </span>
                    )}
                  </label>

                  <div className="relative">
                    <input
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 6,

                          message: "Password Must be at least 6 characters",
                        },
                      })}
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      class="input input-bordered w-full max-w-xs my-5"
                    />
                    {!showPass ? (
                      <BiShow
                        className="text-[#142850] absolute top-9 right-2 cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      ></BiShow>
                    ) : (
                      <BiHide
                        className="text-[#142850] absolute top-9 right-2 cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      ></BiHide>
                    )}
                  </div>

                  <label className="level">
                    {errors.password?.type === "required" && (
                      <span class="label-text-alt text-red-500 font-bold error-message">
                        {errors?.password?.message}
                      </span>
                    )}
                  </label>

                  <label className="level">
                    {errors.password?.type === "minLength" && (
                      <span class="label-text-alt text-red-500 font-bold error-message">
                        {errors?.password?.message}
                      </span>
                    )}
                  </label>
                  {backendError}
                  <p>
                    {" "}
                    <button class="btn btn-primary text-center  w-full max-w-xs ">
                      <FiLogIn className="mx-2"></FiLogIn>
                      Sign Up
                    </button>
                  </p>
                  <>
                    <h1 className="mt-5">
                      Already have an account.?{" "}
                      <Link to="/login">
                        {" "}
                        <small className="text-success">Please Login</small>
                      </Link>
                    </h1>
                  </>
                </form>

                <div class="divider divider-dark">OR</div>
                <button
                  onClick={() => signInWithGoogle()}
                  className="btn btn-outline"
                >
                  <FaGoogle className="mx-2"></FaGoogle>
                  Continue with google
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </Navbar>
    </div>
  );
};

export default SignUp;
