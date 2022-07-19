import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LoginLoding from "../../shared/LoginLoding";
import ManageAllOrder from "./ManageAllOrder";

const ManageAllOrders = () => {
  //   const [orders, setOrders] = useState([]);
  //   useEffect(() => {
  //     fetch("https://dry-garden-16157.herokuapp.com/manage-orders", {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setOrders(data));
  //   }, []);

  //   console.log(orders);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("manage-orders", () =>
    fetch("https://dry-garden-16157.herokuapp.com/manage-orders", {
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
  return (
    <div class="overflow-x-auto mt-3">
      <table class="table w-full ">
        <thead>
          <tr>
            <th>No.</th>
            <th>Email</th>
            <th>Status</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <ManageAllOrder
              order={order}
              index={index}
              key={order.id}
              refetch={refetch}
            ></ManageAllOrder>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAllOrders;
