import React from "react";

const Part = ({ part }) => {
  const { name, img, price, stock, MinimumOrder } = part;
  return (
    <div>
      <div class="card lg:max-w-lg header text-primary-content">
        <div class="card-body">
          <img
            src={img}
            alt=""
            className="rounded-t-lg h-[350px] object-cover"
          />
          <h2 class="card-title text-2xl my-3">{name}</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Part;
