import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Footer from "../../shared/Footer";
import Card from "react-animated-3d-card";
import "./addReview.module.css";
import auth from "../../firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";

const AddReview = () => {
  const [updateloading, setUpdateLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  //   console.log(number, hoverStar);

  const handleText = () => {
    switch (number || hoverStar) {
      case 0:
        return "Evaluate 🧐";
      case 1:
        return "Dissatifation 🥱 ";
      case 2:
        return "Unsatisfied 😞";
      case 3:
        return "Normal 👍";
      case 4:
        return "Satisfied 🙂";
      case 5:
        return "Very Satisfied 🤗";
      default:
        return "Evaluate 🧐";
    }
  };
  const handlePlaceHolder = () => {
    switch (number || hoverStar) {
      case 0:
        return "Comment here...";
      case 1:
      case 2:
      case 3:
      case 4:
        return "What is your problem about this product?";
      case 5:
        return "Why do you like the product?";
      default:
        return "Comment here...";
    }
  };
  const handleStarSubmit = (event) => {
    setUpdateLoading(true);
    event.preventDefault();
    const ratingNumber = number;
    const currentEmail = user?.email;
    const textArea = event.target?.rev?.value;

    const reviewData = {
      ratingNumber: ratingNumber,
      currentEmail: currentEmail,
      textArea: textArea,
      photo: user?.photoURL,
    };

    fetch(`https://dry-garden-16157.herokuapp.com/add-review/${currentEmail}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!ratingNumber || !textArea === null) {
          toast(`Hey!${user?.email} fellas kindly add some star!`);
        }
        if (data.insertedId) {
          toast.success(`Thank You ${user?.email} for your review!🤗`);
          setUpdateLoading(false);
        }
        console.log(data);
      });
    event.target.reset();
  };
  return (
    <div className="header lg:max-w-lg rounded-xl p-20">
      <div className="  flex flex-col h-[100%] justify-center items-center">
        <h1 className="my-5 text-center">{handleText()}</h1>
        <div className="star flex mb-3">
          {Array(5)
            .fill()
            .map((_, index) =>
              number >= index + 1 || hoverStar >= index + 1 ? (
                <AiFillStar
                  onMouseOver={() => !number && setHoverStar(index + 1)}
                  onMouseLeave={() => setHoverStar(undefined)}
                  style={{ color: "orange" }}
                  onClick={() => setNumber(index + 1)}
                />
              ) : (
                <AiOutlineStar
                  onMouseOver={() => !number && setHoverStar(index + 1)}
                  onMouseLeave={() => setHoverStar(undefined)}
                  style={{ color: "orange" }}
                  onClick={() => setNumber(index + 1)}
                />
              )
            )}
        </div>
        <form onSubmit={handleStarSubmit}>
          <p>
            <textarea
              class="textarea textarea-info lg:w-[50vh] w-[25vh]"
              placeholder={handlePlaceHolder()}
              name="rev"
            ></textarea>
          </p>

          <p>
            {" "}
            <button
              className={` ${
                !number && "disabled"
              } review-button btn btn-primary mt-5 text-center`}
            >
              {updateloading ? "Submitting........" : "Submit"}
            </button>
          </p>
        </form>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
};

export default AddReview;
