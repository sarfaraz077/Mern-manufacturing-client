import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import LoginLoding from "../../shared/LoginLoding";
import Part from "./Part";
import SinglePart from "./SinglePart";

const Parts = () => {
  const {
    isLoading,

    data: parts,
  } = useQuery(["part", "parts"], () =>
    fetch(`http://localhost:5000/part`).then((res) => res.json())
  );
  if (isLoading) {
    return <LoginLoding></LoginLoding>;
  }
  return (
    <>
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
    </>
  );
};

export default Parts;
