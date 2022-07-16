import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import MyProfileUpdateUser from "./MyProfileUpdateUser";
import { useQuery } from "react-query";
import SingleReview from "../ReviewCardHome/SingleReview";

const MyProfile = () => {
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`https://limitless-ocean-30960.herokuapp.com/user/${user?.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      });
  }, [user.email]);

  console.log(users);

  // const { data: userUpdate, isLoading } = useQuery(["user,user?.email"], () =>
  //   fetch(`https://limitless-ocean-30960.herokuapp.com/user/${user?.email}`).then((res) => res.json())
  // );
  // console.log(userUpdate);
  return (
    <div>
      {users?.map((userUpdate) => (
        <MyProfileUpdateUser userUpdate={userUpdate}></MyProfileUpdateUser>
      ))}
    </div>
  );
};

export default MyProfile;
