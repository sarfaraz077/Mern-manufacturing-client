import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Footer from "../../shared/Footer";
import "./addReview.module.css";
const AddReview = () => {
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
    event.preventDefault();
    const ratingNumber = number;
    console.log(ratingNumber);
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
        <textarea
          class="textarea textarea-info lg:w-[50vh] w-[25vh]"
          placeholder={handlePlaceHolder()}
        ></textarea>

        <form onSubmit={handleStarSubmit}>
          <button
            className={` ${
              !number && "disabled"
            } review-button btn btn-primary mt-5`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
