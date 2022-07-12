import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <div class="card lg:max-w-lg header shadow-xl mt-5">
        <div class="card-body flex flex-row gap-5 items-center justify-center">
          <div className="avatar">
            <div class="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="photoURl" />
            </div>
          </div>

          <div>
            <h1>Name : {user?.displayName ? user?.displayName : "N/N"}</h1>
            <h1 className="my-3">
              Email :{" "}
              <span className="text-success">
                {" "}
                {user?.email ? user?.email : "N/E"}
              </span>
            </h1>
            <div class="card-actions justify-end">
              <button class="btn bt-primary">Update Profile</button>
            </div>
          </div>
          {/* <h2 class="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
