import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyOrder = ({ order, index }) => {
  const [paid, setPaid] = useState(false);
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
      <td>
        {price && !paid && (
          <Link to={`/dashboard/payment/${_id}`} className="btn btn-xs">
            Pay
          </Link>
        )}
        {price && paid && <span className="text-success"> Pay</span>}
      </td>
    </tr>
  );
};

export default MyOrder;
