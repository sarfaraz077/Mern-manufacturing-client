import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ReviewCardHome.css";
import Card from "react-animated-3d-card";
import { useQuery } from "react-query";
import LoginLoding from "../../shared/LoginLoding";
import SingleReview from "./SingleReview";

const ReviewCardHome = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/get-review`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((getReview) => setReviews(getReview));
  }, []);

  console.log(reviews);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }} className="ul-clr">
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
  };
  return (
    <div>
      <div className="lg:px-20 ">
        <h1 className="text-center text-3xl mt-20">What Our Customer Says</h1>

        <Slider {...settings}>
          {/* <div>
            <img src="https://i.ibb.co/NCLHdYY/pd2.jpg" alt="" />
          </div>

          <div>
            <img src="https://i.ibb.co/NCLHdYY/pd2.jpg" alt="" />
          </div>
          <div>
            <img src="https://i.ibb.co/NCLHdYY/pd2.jpg" alt="" />
          </div>
          <div>
            <img src="https://i.ibb.co/NCLHdYY/pd2.jpg" alt="" />
          </div>
          <div>
            <img src="https://i.ibb.co/NCLHdYY/pd2.jpg" alt="" />
          </div>
          <div>
            <img src="https://i.ibb.co/NCLHdYY/pd2.jpg" alt="" />
          </div>
          <div>
            <img src="https://i.ibb.co/NCLHdYY/pd2.jpg" alt="" />
          </div>
          <div>
            <img src="https://i.ibb.co/NCLHdYY/pd2.jpg" alt="" />
          </div> */}

          {reviews?.map((review) => (
            <SingleReview review={review} key={review._id}></SingleReview>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewCardHome;
