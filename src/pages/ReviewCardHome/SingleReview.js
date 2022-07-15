import React, { useEffect, useState } from "react";
import Card from "react-animated-3d-card";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillStar } from "react-icons/ai";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import auth from "../../firebase/firebase.init";

const SingleReview = ({ review }) => {
  // getting form update user photo and show it to the reviewCard:
  // const [users, setUsers] = useState([]);
  // const [user] = useAuthState(auth);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/user/${user?.email}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data);
  //       console.log(data);
  //     });
  // }, [user.email]);

  // console.log(users);

  const { ratingNumber, currentEmail, textArea, photo } = review;
  let showStar;
  if (ratingNumber === 1) {
    showStar = <AiFillStar></AiFillStar>;
  } else if (ratingNumber === 2) {
    showStar = (
      <>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
      </>
    );
  } else if (ratingNumber === 3) {
    showStar = (
      <>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
      </>
    );
  } else if (ratingNumber === 4) {
    showStar = (
      <>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
      </>
    );
  } else if (ratingNumber === 5) {
    showStar = (
      <>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
        <AiFillStar></AiFillStar>
      </>
    );
  }
  return (
    <div className="flex items-center justify-center mt-10">
      <Card>
        <div class="card w-96 header">
          <div class="card-body">
            {photo && (
              <div class="avatar">
                <div class="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2 mx-auto mb-3">
                  <img src={photo} alt="" />
                </div>
              </div>
            )}

            <h2 class="flex items-center justify-center text-center">
              Ratings :{" "}
              <span
                className="text-xl"
                style={{ color: "orange", display: "flex" }}
              >
                {showStar}
              </span>
            </h2>
            <h1 className="text-center">Email : {currentEmail}</h1>
            <h3
              className="text-center text-xl text-[#2BCAC2] font-bold"
              style={{
                background: "linear-gradient(to right, #7ed56f, #28b485)",

                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "rgba(255, 255, 255, 0)",
              }}
            >
              🙶 {textArea} 🙷
            </h3>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SingleReview;
