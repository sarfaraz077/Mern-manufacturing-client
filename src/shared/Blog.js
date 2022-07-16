import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import person1 from "../assets/person 1.png";
import person2 from "../assets/person 2.png";
import person3 from "../assets/person 3.png";
import PageTitle from "./PageTitle";

const Blog = () => {
  // for dynamic day:
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      <PageTitle title={"Blogs"}></PageTitle>
      <Navbar>
        <div class="card lg:max-w-lg  sm:max-w-sm header shadow-xl mx-auto mt-[10%] ">
          <div className="card-body ">
            <div>
              <div className="flex items-center gap-5">
                <div class="avatar">
                  <div class="w-12 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                    <img src={person3} alt="" />
                  </div>
                </div>
                <div>
                  <span className="text-success">Tanvir Rifat</span>
                  <p>
                    Posted On {weekday[new Date().getDay()]},
                    {new Date().getDate()}, {new Date().getFullYear()}
                  </p>
                </div>
              </div>
              <div className="">
                <h3 class="text-center text-xl mt-5 text-success ">
                  How does prototypical inheritance work?
                </h3>
                <p className="mt-5">
                  There is an unnoticed [[Prototype]] property in every object
                  in addition to its methods and attributes. JavaScript's
                  Prototypal Inheritance capability may be used to provide extra
                  methods and properties to objects. Inheritance is a process
                  through which an object may take on the traits and behaviors
                  of another object. The [[Prototype]] of an object may
                  typically be obtained and modified using the
                  Object.getPrototypeOf and Object.setPrototypeOf methods. The
                  __proto__ method is now often used in modern languages to set
                  it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Navbar>

      <div class="card lg:max-w-lg sm:max-w-sm  header shadow-xl mx-auto mt-3">
        <div className="card-body ">
          <div>
            <div className="flex items-center gap-5">
              <div class="avatar">
                <div class="w-12 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                  <img src={person1} alt="" />
                </div>
              </div>
              <div>
                <span className="text-success">Tanvir Rifat</span>
                <p>
                  Posted On {weekday[new Date().getDay()]},
                  {new Date().getDate()}, {new Date().getFullYear()}
                </p>
              </div>
            </div>
            <div className="">
              <h3 class="text-center text-xl mt-5  text-success">
                What are the different ways to manage a state in a React
                application??
              </h3>
              <p className="mt-5">
                The four major forms of state you need to keep track of in your
                React projects are: Local state, Global state, Server state, and
                URL state. A component's local state refers to the data it
                keeps. Managing local state in React is often accomplished via
                the usage of the useState hook. Additionally, for both local and
                global states, useReducer is an option that may be implemented
                in any way. Under the hood, it is quite similar to useState,
                except that it takes a reducer instead of a starting state.
                You'd need local state for things like showing or hiding a modal
                component and keeping track of input data for forms that have
                been disabled. Data that is shared across different components
                is referred to as global state. When data has to be accessed and
                updated across many parts of our program, we need to use global
                state. Authenticated user state is a frequent example of a
                global state. In order to get or update data from an external
                server, you must handle a variety of states, including loading
                and error state.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="card lg:max-w-lg  sm:max-w-sm header shadow-xl mx-auto mt-7">
        <div className="card-body ">
          <div>
            <div className="flex items-center gap-5">
              <div class="avatar">
                <div class="w-12 rounded-full ring ring-error ring-offset-base-100 ring-offset-2">
                  <img src={person2} alt="" />
                </div>
              </div>
              <div>
                <span className="text-error">Tanvir Rifat</span>
                <p>
                  Posted On {weekday[new Date().getDay()]},
                  {new Date().getDate()}, {new Date().getFullYear()}
                </p>
              </div>
            </div>
            <div className="">
              <h3 class="text-center text-xl mt-5 text-error">
                How will you improve the performance of a React Application??
              </h3>
              <p className="mt-5">
                A React application may be made more efficient in a variety of
                ways. As an example, wherever possible, keep state of components
                local. Memorying React components to avoid unwanted re-renders
                is also a good strategy. In addition, dynamic imports in React
                allow for code-splitting (). React's virtualization of windows
                or lists. In React, photos may be loaded in a 'lazy' manner.
                Making Use of Structural Consistency. As many chunk files as
                you'd want
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Blog;
