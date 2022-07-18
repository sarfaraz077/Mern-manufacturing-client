import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import MyOrder from "./MyOrder";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import LoginLoding from "../../shared/LoginLoding";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  // const [orders, setOrders] = useState([]);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["orders-part", "user?.email"], () =>
    fetch(`https://dry-garden-16157.herokuapp.com/orders-part/${user?.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <LoginLoding></LoginLoding>;
  }

  // useEffect(() => {
  //   fetch(`https://dry-garden-16157.herokuapp.com/orders-part/${user?.email}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setOrders(data));
  // }, [user?.email]);
  console.log(orders);
  return (
    <div>
      {orders?.length > 0 ? (
        <div class="overflow-x-auto mt-20 lg:mt-80  max-w-sm">
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
                <th>Transaction Id</th>
                <th>Deliver</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {orders?.map((order, index) => (
                <MyOrder
                  order={order}
                  index={index}
                  refetch={refetch}
                ></MyOrder>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-10 text-xl ">
          Please Make some Order{" "}
          <Link
            to="/parts"
            style={{
              fontSize: "2rem",
              background: "linear-gradient(to right, #7ed56f, #28b485)",

              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "rgba(255, 255, 255, 0)",
            }}
          >
            Here 👈
          </Link>
        </p>
      )}
    </div>
  );
};

export default MyOrders;
