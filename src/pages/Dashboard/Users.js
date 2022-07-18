import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LoginLoding from "../../shared/LoginLoding";
import User from "./User";

const Users = () => {
  // const [users, setUsers] = useState([]);

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("user", () =>
    fetch("https://dry-garden-16157.herokuapp.com/user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <LoginLoding></LoginLoding>;
  }

  // useEffect(() => {
  //   fetch(`https://dry-garden-16157.herokuapp.com/user`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data));
  // }, []);

  return (
    <div>
      <div class="overflow-x-auto w-lg mt-20 lg:mt-100">
        <table class="table w-full ">
          <thead>
            <tr>
              <th>NO.</th>

              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Make Admin</th>
              <th>Remove Admin</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((singleUser, index) => (
              <User
                singleUser={singleUser}
                key={singleUser._id}
                index={index}
                refetch={refetch}
              ></User>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
