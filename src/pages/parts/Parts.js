import React from "react";
import { useQuery } from "react-query";
import LoginLoding from "../../shared/LoginLoding";
import Part from "./Part";

const Parts = () => {
  const {
    isLoading,

    data: parts,
  } = useQuery(["part", "parts"], () =>
    fetch("http://localhost:5000/part").then((res) => res.json())
  );
  if (isLoading) {
    return <LoginLoding></LoginLoding>;
  }
  return (
    <>
      <h2 className="text-center text-5xl my-10 mt-20 ">Latest Tools</h2>
      <div className="lg:px-20 grid lg:grid-cols-3 gap-7 grid-cols-1 ">
        {parts?.map((part) => (
          <Part key={part?._id} part={part}></Part>
        ))}
      </div>
    </>
  );
};

export default Parts;
