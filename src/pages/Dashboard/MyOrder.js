import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyOrder = ({ order, index, refetch }) => {
  const {
    _id,
    email,
    name,
    img,
    quantity,
    price,
    address,
    number,
    product,
    paid,
    transactionId,
  } = order;

  const handleDeleteOrder = (_id) => {
    console.log("Order id:", _id);
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert ${product}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://dry-garden-16157.herokuapp.com/orders-part/${_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            email: email,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.deletedCount === 1) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            refetch();
          });
      }
    });
  };
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
        {transactionId ? (
          <span className="text-success">{transactionId}</span>
        ) : (
          <span className="text-red-500">Pay First...</span>
        )}
      </td>

      <td>
        {!transactionId && <span className="text-red-600">pending...</span>}
        {!transactionId && (
          <button
            onClick={() => handleDeleteOrder(_id)}
            className="rounded flex items-center justify-center btn-sm uppercase"
            style={{
              background: "#d0312d",
              color: "#fff",
            }}
          >
            <span className="mx-2">Cancel</span>
            <RiDeleteBin5Fill></RiDeleteBin5Fill>
          </button>
        )}
      </td>
      <td>
        {price && !paid && (
          <Link to={`/dashboard/payment/${_id}`} className="btn btn-xs">
            Pay
          </Link>
        )}
        {price && paid && <span className="text-success"> Already Paid</span>}
      </td>
    </tr>
  );
};

export default MyOrder;
