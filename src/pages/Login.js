import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import login from "../../src/assets/login.svg";
import { useForm } from "react-hook-form";
import "./Login.css";
import { BiShow, BiHide } from "react-icons/bi";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import auth from "../firebase/firebase.init";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending, passwordResetError] =
    useSendPasswordResetEmail(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let backendError;

  if (googleError || error) {
    backendError = (
      <span className="text-red-500">
        <small>{googleError?.message || error?.message}</small>
      </span>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data?.email, data?.password);
    console.log(data);
  };

  const resetPassword = async (data) => {
    await sendPasswordResetEmail(data.email);

    if (data?.email) {
      toast.success(`${data.email} sent a reset password Link`, {
        id: "reset-pass1",
      });
    }
  };

  return (
    <div>
      <Navbar>
        <div className="grid lg:grid-cols-2 lg:px-20 lg:gap-20 sm:gap-5 md:gap-5">
          {/* for img */}
          <div className="w-11/12 lg:mx-auto  sm:w-full mx-auto ">
            <img src={login} alt="" className="w-screen " />
          </div>

          <div className="flex items-center h-screen  lg:max-w-lg mx-auto ">
            <div class="card lg:max-w-lg header shadow-xl login mt-10">
              <div class="card-body">
                <p class="text-white text-2xl text-center login-text">Login</p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" w-full max-w-xs px-5 py-5"
                >
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
                      Login
                    </button>
                  </p>
                  <>
                    <h1 className="mt-5">
                      New to Clean Co.?{" "}
                      <Link to="/signup">
                        {" "}
                        <small className="text-success"> SignUp first</small>
                      </Link>
                    </h1>
                    <h1 className="mt-2">
                      Forget Password?{" "}
                      <Link to="" onClick={handleSubmit(resetPassword)}>
                        <small className="text-error"> Reset Password</small>
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

export default Login;
