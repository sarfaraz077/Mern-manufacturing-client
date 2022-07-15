import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import BackToTopButton from "../../shared/BackToTopButton";
import LoginLoding from "../../shared/LoginLoding";
import Part from "./Part";
import SinglePart from "./SinglePart";

const Parts = () => {
  const {
    isLoading,

    data: parts,
  } = useQuery(["part", "parts"], () =>
    fetch(`https://limitless-ocean-30960.herokuapp.com/part`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <LoginLoding></LoginLoding>;
  }
  return (
    <div id="tools">
      <h2 className="text-center text-5xl my-10 mt-20 ">Latest Tools</h2>

      <div className=" lg:w-[100%] lg:px-20  grid lg:grid-cols-3 grid-cols-1 gap-10 ">
        {parts?.map((part) => (
          <Part key={part?._id} part={part}></Part>
        ))}
      </div>

      <div className="flex items-center justify-center my-7">
        <Link className="btn" to="/parts">
          More Tools
        </Link>
      </div>

      <BackToTopButton></BackToTopButton>
    </div>
  );
};

export default Parts;
