import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import MyOrder from "./MyOrder";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/orders-part/${user?.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user?.email]);
  console.log(orders);
  return (
    <div>
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
    </div>
  );
};

export default MyOrders;
