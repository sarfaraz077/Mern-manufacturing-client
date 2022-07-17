import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.init";

const MyProfileUpdateUser = ({ userUpdate }) => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <div class="card lg:max-w-lg header shadow-xl mt-5">
        <div class="card-body flex flex-row gap-5 items-center justify-center">
          <div className="avatar">
            <div class="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
              <img
                src={userUpdate?.img ? userUpdate?.img : user?.photoURL}
                alt="photoURl"
                className="hover:opacity-[0.8] cursor-pointer "
              />
            </div>
          </div>

          <div>
            <h1>
              Name :{" "}
              {userUpdate?.displayName
                ? userUpdate?.displayName
                : user?.displayName || "N/N"}
            </h1>
            <h1 className="my-3">
              Email :{" "}
              <span className="text-success">
                {" "}
                {userUpdate?.email ? userUpdate?.email : user?.email}
              </span>
            </h1>

            <h1 className="my-3">
              Address : {userUpdate?.address ? userUpdate?.address : "N/A"}
            </h1>

            <h1 className="my-3">
              Role :{" "}
              <span className="text-success">
                {userUpdate?.role ? userUpdate?.role : "user"}
              </span>
            </h1>

            <div class="card-actions justify-start">
              {/* here add /dashbaord begin this url because in dashboard i can see this edit-profile route */}
              <Link
                class="btn bt-primary"
                to={`/dashboard/my-profile/edit-profile`}
              >
                Update Profile
              </Link>
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

export default MyProfileUpdateUser;
