import React, { useEffect, useState } from "react";

// using useToken custom hook because me using this custom hook in different components

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    // here first user means the useToken's user and user?.email & user?.displayName comes from the login or signup page:
    const email = user?.user?.email;
    const displayName = user?.user?.displayName;
    const currentUser = { email: email, displayName: displayName };
    if (email) {
      fetch(`https://limitless-ocean-30960.herokuapp.com/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data of the  useToken", data);
          //   this token comes from the server side's jwt:
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
