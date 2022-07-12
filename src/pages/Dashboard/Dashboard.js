import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import Navbar from "../../shared/Navbar";

import { Outlet, Link } from "react-router-dom";
import Footer from "../../shared/Footer";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Navbar>
        <div class="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex h-[50%] flex-col items-center justify-center">
            {/* <!-- Page content here --> */}
            <h1 className="text-center lg:text-2xl">
              Hey,
              <span className="text-success font-bold tracking-widest">
                {user?.email}
              </span>
              Welcome to Your dashboard
            </h1>
            <Outlet></Outlet>
          </div>
          <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu p-4 overflow-y-auto w-80 header  text-base-content">
              {/* <!-- Sidebar content here --> */}
              <li>
                <Link to="/dashboard/my-profile">My profile</Link>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </Navbar>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
