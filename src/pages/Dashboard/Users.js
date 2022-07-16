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
    fetch("https://limitless-ocean-30960.herokuapp.com/user", {
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
  //   fetch(`https://limitless-ocean-30960.herokuapp.com/user`, {
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
      <div class="overflow-x-auto ">
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
