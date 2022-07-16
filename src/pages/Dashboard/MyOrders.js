import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import MyOrder from "./MyOrder";
import { Link, NavLink } from "react-router-dom";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(
      `https://limitless-ocean-30960.herokuapp.com/orders-part/${user?.email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user?.email]);
  console.log(orders);
  return (
    <div>
      {orders?.length > 0 ? (
        <div class="overflow-x-auto mt-5">
          <table class="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>NO.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {orders?.map((order, index) => (
                <MyOrder order={order} index={index}></MyOrder>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-10 text-xl">
          Please Make some Order{" "}
          <Link
            to="/parts"
            className="animate-pulse"
            style={{
              fontSize: "2rem",
              background: "linear-gradient(to right, #7ed56f, #28b485)",

              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "rgba(255, 255, 255, 0)",
            }}
          >
            Here
          </Link>
        </p>
      )}
    </div>
  );
};

export default MyOrders;
