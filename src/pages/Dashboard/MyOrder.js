import React from "react";

const MyOrder = ({ order, index }) => {
  const { _id, email, name, img, quantity, price, address, number, product } =
    order;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div class="avatar">
          <div class="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
            <img src={img} alt="" />
          </div>
        </div>
      </td>
      <td>{name ? name : "N/N"}</td>
      <td>${price}</td>
      <td>{quantity}</td>
      <td>{address}</td>
      <td>{number}</td>
    </tr>
  );
};

export default MyOrder;
