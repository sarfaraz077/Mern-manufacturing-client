import React from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import Card from "react-animated-3d-card";
import { Link } from "react-router-dom";

const Part = ({ part }) => {
  const { name, img, price, stock, MinimumOrder, description, _id } = part;
  return (
    <div>
      <div
        class="card sm:max-w-sm lg:max-w-lg bg-clip-padding backdrop-filter  backdrop-blur-xl bg-opacity-60 border border-gray-200 text-primary-content header "
        style={{ backdropFilter: "blur(20px)" }}
      >
        <div class="card-body">
          <img
            src={img}
            alt=""
            className="rounded-t-lg  object-cover  h-[250px]"
          />
          <h2 class="card-title text-2xl my-3">{name}</h2>
          <h2>{description}</h2>

          <h2 className="text-xl">
            price :{" "}
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "800",
                letterSpacing: "0.1rem",
                backgroundImage: "linear-gradient(to right, #ba81cf, #6886d4)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
              }}
            >
              {price}
            </span>
          </h2>
          <h2 class="text-xl my-2">Stock : {stock}</h2>
          <h4 class="text-xl">Minimum Order : {MinimumOrder}</h4>

          <Link className="btn mt-2" to={`/part/${_id}`}>
            <BsFillBagCheckFill className="mx-2"></BsFillBagCheckFill>
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Part;
