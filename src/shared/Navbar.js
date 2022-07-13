import React from "react";
import Services from "../pages/Services";
import { NavLink } from "react-router-dom";
import { themeChange } from "theme-change";
import { useEffect } from "react";
import DarkMode from "./DarkMode";
import auth from "../firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import logo from "../assets/logo.png";

const Navbar = ({ children }) => {
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();
  return (
    <div class="drawer drawer-end ">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col ">
        <div class="w-full navbar sticky top-0 z-40 bg-base-100 backdrop-filter backdrop-blur-lg bg-opacity-30  border-b border-gray-200  lg:px-20">
          {pathname.includes("dashboard") && (
            <label
              tabindex="0"
              for="my-drawer-2"
              class="btn btn-ghost lg:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          )}

          <div class="flex-1 px-2 mx-2 items-center">
            <span className="text-2xl text-primary font-bold dark-nav-logo-clr">
              Clean
            </span>
            <span className="text-2xl dark-sub-logo">Co.</span>
          </div>
          <div class="flex-none lg:hidden ">
            <label for="my-drawer-3" class="btn btn-square btn-ghost ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div class="flex-none hidden lg:block ">
            <ul class="menu menu-horizontal gap-x-2">
              <li>
                <NavLink to="/" className="rounded-lg ">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="rounded-lg ">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="rounded-lg ">
                  Services
                </NavLink>
              </li>
              {!user ? (
                <li>
                  <NavLink to="/login" className="rounded-lg ">
                    Login
                  </NavLink>
                </li>
              ) : (
                <li>
                  <button
                    to=""
                    className="rounded-lg btn btn-primary "
                    onClick={() => signOut(auth)}
                  >
                    LogOut
                  </button>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/dashboard" className="rounded-lg ">
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <DarkMode></DarkMode>
              </li>
              {user && (
                <>
                  {" "}
                  <li>
                    <div class="avatar online">
                      <div class="w-8 rounded-full">
                        <img src={user?.photoURL} alt="" />
                      </div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* eit holo divider navbar tai ei khane content thakbe onnanno navbar theke eti alada */}
        {/* Content */}
        {children}
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 header">
          <li>
            <NavLink to="/" className="rounded-lg ">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="rounded-lg ">
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/services" className="rounded-lg ">
              Services
            </NavLink>
          </li>

          {!user ? (
            <li>
              <NavLink to="/login" className="rounded-lg ">
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <button
                to=""
                className="rounded-lg btn btn-primary "
                onClick={() => signOut(auth)}
              >
                LogOut
              </button>
            </li>
          )}

          {user && (
            <li>
              <NavLink to="/dashboard" className="rounded-lg ">
                Dashboard
              </NavLink>
            </li>
          )}

          <li>
            <DarkMode></DarkMode>
          </li>
          {user && (
            <>
              {" "}
              <li>
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img src={user?.photoURL} alt="userPhoto" />
                  </div>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
