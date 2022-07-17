import React, { useEffect, useState } from "react";

import {
  CardElement,
  stripe,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();

  // for backend's client secret:
  const [clientSecret, setClientSecret] = useState("");
  const { price, address, email, number, name, _id } = product;
  const [transactionId, setTransactionId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    fetch(`https://dry-garden-16157.herokuapp.com/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data?.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (event) => {
    setPaymentLoading(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentLoading(false);
      Swal.fire({
        customClass: {
          title: "swal2-title-danger",
        },
        position: "middle",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
      console.log(error);
    } else {
      // if no error then confirm:
      setPaymentLoading(false);
      const { paymentIntent, error: intentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: name,

              email: email,
            },
          },
        });
      if (intentError) {
        Swal.fire({
          customClass: {
            title: "swal2-title-danger",
          },
          position: "middle",
          icon: "error",
          title: `${intentError?.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        setTransactionId(paymentIntent?.id);

        // after there is no error then updating to the database:
        fetch(`https://dry-garden-16157.herokuapp.com/pay-orders/${_id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            transactionId: paymentIntent?.id,
            productId: _id,
            email: email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              customClass: {
                title: "swal2-title-danger",
              },
              position: "middle",
              icon: "success",
              title: `Congrats! You Successfully Paid`,
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className={
            paymentLoading ? "btn btn-sm mt-5 loading" : "btn btn-sm mt-5"
          }
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          {paymentLoading ? "Paying..." : "Pay"}
        </button>
      </form>

      {transactionId && (
        <p>
          Your transaction id :{" "}
          <span className="text-success">{transactionId}</span>
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
