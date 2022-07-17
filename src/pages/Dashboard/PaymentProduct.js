import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LoginLoding from "../../shared/LoginLoding";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51LJh8kGQAwdAG9Zqzjh4diieHKKXFdWtk8O47EKRGDy8HpehRnFs8SIl8nJpOHlTLnRK8KVzLMsAb38SLmEiJCAd00xUPcQReX"
);

const PaymentProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery(["orders", "id"], () =>
    fetch(`https://dry-garden-16157.herokuapp.com/orders/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <LoginLoding></LoginLoding>;
  }

  return (
    <div>
      <h2 className="text-2xl">
        <div class="card lg:max-w-lg header shadow-xl my-5">
          <div class="card-body">
            <h1>
              Hey! <span className="text-success">{product?.email}</span>
            </h1>
            <p>
              Please pay for purchasing{" "}
              <span className="text-success">{product?.product}</span>
            </p>
            <p>
              Please pay first{" "}
              <small className="text-red-500">${product?.price}</small>
            </p>
          </div>
        </div>

        {/* for payment */}
        <div class="card lg:max-w-lg bg-base-100 shadow-xl my-5">
          <div class="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm product={product} />
            </Elements>
          </div>
        </div>
      </h2>
    </div>
  );
};

export default PaymentProduct;
