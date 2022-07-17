import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const User = ({ singleUser, index, refetch }) => {
  const { email, address, displayName, img, role } = singleUser;

  const handleDeleteAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert ${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `${email} has been removed`, "success");
        fetch(
          `https://dry-garden-16157.herokuapp.com/user/remove-admin/${email}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((res) => {
            if (res.status === 403) {
              toast.error("Failed to Make an admin");
            }
            return res.json();
          })
          .then((data) => {
            // if (data.modifiedCount > 0) {
            //   refetch();
            //   toast.success(`Successfully made an admin`);
            // }
            refetch();
            console.log(data);
          });
        console.log(email);
      }
    });
  };

  const makeAdmin = () => {
    fetch(`https://dry-garden-16157.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully made an admin`);
        }
      });
  };
  return (
    <tr>
      <th>{index + 1}</th>

      <td>{displayName ? displayName : "N/N"}</td>
      <td>{email}</td>
      <td>{address ? address : "N/A"}</td>
      <td>
        {role !== "admin" ? (
          <button className="btn btn-xs" onClick={makeAdmin}>
            Make Admin
          </button>
        ) : (
          <span className="text-success">Already Admin</span>
        )}
      </td>
      <td>
        {role === "admin" && (
          <button
            onClick={handleDeleteAdmin}
            className=" btn-xs rounded glass"
            style={{
              background: "#FA5C5C",
              color: "#FFFFFF",
            }}
          >
            X
          </button>
        )}
      </td>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </tr>
  );
};

export default User;
