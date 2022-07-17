import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase/firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "./SweetAlert.css";

import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [user] = useAuthState(auth);
  console.log(user?.email);
  const [updateLoading, setUpdateLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setUpdateLoading(true);

    console.log(data);

    // // upload image to the imgbb site:
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=829d3a7b3715690cf21c75412d2e4082`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((uploadImage) => {
        if (uploadImage?.success || uploadImage?.status_txt === "Bad Request") {
          // after successfully added image to the imgbb then upload to the databse:
          const img = uploadImage.data?.url;
          const addedProductInfo = {
            name: data?.name,
            img: img,
            price: data?.price,
            stock: data?.stock,
            minimumOrder: data?.minimumOrder,
            textArea: data?.textArea,
            admin: user?.email,
          };
          console.log(addedProductInfo);
          fetch("https://dry-garden-16157.herokuapp.com/add-product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(addedProductInfo),
          })
            .then((res) => res.json())
            .then((addProduct) => {
              if (addProduct) {
                Swal.fire({
                  customClass: {
                    title: "swal2-title",
                  },
                  position: "middle",
                  icon: "success",
                  title: `Successfully added ${data?.name}`,
                  showConfirmButton: false,
                  timer: 1500,
                  color: "red",
                });
              }
              setUpdateLoading(false);
              console.log(addProduct);
            });
        }
      });
  };
  return (
    <div>
      <h1>This is the add product route</h1>
      <div className=" flex items-center h-screen  lg:max-w-lg mx-auto lg:max-w-lg">
        <div class="card lg:max-w-lg header shadow-xl login mt-10">
          <div class="card-body">
            <p class="text-white text-2xl text-center login-text">
              Add Product
            </p>
            <form
              className=" w-full max-w-xs px-5 py-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("name")}
                type="text"
                placeholder="Product name"
                class="input input-bordered w-full max-w-xs input-border-style"
                name="name"
              />

              <p className="mt-3">
                <input
                  {...register("price")}
                  type="number"
                  placeholder="price"
                  class="input input-bordered w-full max-w-xs"
                  name="price"
                />
              </p>
              <p className="mt-3">
                <input
                  {...register("stock")}
                  className="input input-bordered w-full max-w-xs input-border-style mt-5"
                  placeholder="Stock"
                  type="text"
                  class="input input-bordered w-full max-w-xs"
                  name="stock"
                />
              </p>
              <p className="mt-3">
                <input
                  {...register("minimumOrder")}
                  className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none "
                  placeholder="Minimum Order"
                  type="text"
                  class="input input-bordered w-full max-w-xs"
                  name="minimumOrder"
                />
              </p>

              <p className="mt-3">
                <input
                  {...register("image")}
                  className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none mt-5"
                  placeholder="Update Image"
                  type="file"
                  class="input input-bordered w-full max-w-xs"
                  name="image"
                />
              </p>
              <p className="mt-3">
                <textarea
                  {...register("textArea")}
                  class="textarea textarea-primary"
                  placeholder="Bio"
                  name="textArea"
                ></textarea>
              </p>

              <p className="mt-3">
                {" "}
                <button
                  class={
                    updateLoading
                      ? "btn btn-primary text-center  w-full max-w-xs loading"
                      : "btn btn-primary text-center  w-full max-w-xs"
                  }
                >
                  {updateLoading ? "Adding..." : "Add"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddProduct;
