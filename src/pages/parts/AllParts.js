import React from "react";
import Navbar from "../../shared/Navbar";
import { useQuery } from "react-query";
import LoginLoding from "../../shared/LoginLoding";
import Part from "./Part";
import SinglePart from "./SinglePart";

const AllParts = () => {
  const {
    isLoading,

    data: parts,
  } = useQuery(["part", "parts"], () =>
    fetch(`https://limitless-ocean-30960.herokuapp.com/parts`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <LoginLoding></LoginLoding>;
  }
  return (
    <div>
      <Navbar>
        <>
          <h2 className="text-center text-5xl my-10 mt-20 ">All Tools</h2>

          <div className=" lg:w-[100%] lg:px-20  grid lg:grid-cols-3 grid-cols-1 gap-10 ">
            {parts?.map((part) => (
              <Part key={part?._id} part={part}></Part>
            ))}
          </div>
        </>
      </Navbar>
    </div>
  );
};

export default AllParts;
