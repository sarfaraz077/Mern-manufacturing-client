import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageAllOrder = ({ index, order, refetch }) => {
  const { email, paid, _id, product } = order;

  const handleDeleteOrder = (_id) => {
    const url = `https://dry-garden-16157.herokuapp.com/delete-order/${_id}`;
    console.log(url);
    console.log(_id);

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
        fetch(url, {
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
      <td>{email}</td>
      <td>
        {paid ? (
          <>
            <span className="text-success">Paid</span>
          </>
        ) : (
          <>
            <span className="text-red-500">Unpaid</span>
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
          </>
        )}
      </td>
      <td>Blue</td>
    </tr>
  );
};

export default ManageAllOrder;
