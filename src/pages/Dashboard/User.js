import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const User = ({ singleUser, index, refetch }) => {
  const { email, address, displayName, img, role } = singleUser;

  const makeAdmin = () => {
    fetch(`https://limitless-ocean-30960.herokuapp.com/user/admin/${email}`, {
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
        {!role ? (
          <button className="btn btn-xs" onClick={makeAdmin}>
            Make Admin
          </button>
        ) : (
          <span className="text-success">Already Admin</span>
        )}
      </td>
      <td>
        <button
          className=" btn-xs rounded glass"
          style={{
            background: "#FA5C5C",
            color: "#FFFFFF",
          }}
        >
          X
        </button>
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
