import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FaStripe } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { SuccessRequest } from "../../api/UserApi";

function LoadStripe({
  clientSecret,
  bugs,
  courseId,
  tutorId,
  userId,
  newOffer,
  courseName,
}) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or Elements not initialized.");
      return;
    }
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });
      if (paymentIntent) {
        const Buydata = {
          paymentstatus: "success",
          amound: paymentIntent.amount,
          date: new Date(),
          userId: userId,
          tutorId: tutorId,
          courseName: courseName,
          courseId: courseId,
        };
        const response = await SuccessRequest(Buydata);
        toast(response.data.message);
        console.log(response, "response when it is sucecss");
        if (response.status === 200) {
          toast.success(response.message, {
            position: "top-right",
            autoClose: 2000,
            style: {
              marginTop: "50px",
            },
          });
          navigate("/success");
        } else {
        }
      }

      if (error) {
        console.error(error);
      } else {
        console.log("Payment successful:", paymentIntent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        className="flex justify-center items-center w-[40%] bg-violet-600 text-white font-prompt ml-4"
        onClick={handleOpen}
      >
        Pay Now {bugs}
      </Button>
      {open && (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
            <div className="flex justify-between">
              <div className="">
                <h5 className="text-blue-gray text-xl font-semibold">
                  Make Your Payment
                </h5>
                <p className="text-gray text-sm">
                  Choose which card you want to connect
                </p>
              </div>

              <button
                className="text-blue-gray focus:outline-none  mt-2"
                onClick={handleOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-row justify-around space-x-72">
              <h1 className="font-prompt">Course Amount</h1>
              <span className="font-prompt font-prompt-semibold">
                {newOffer
                  ? `₹${bugs - (bugs * newOffer) / 100}`
                  : `₹${bugs}.00`}
              </span>
            </div>

            <div className="border-b-2 border-gray-400"></div>
            <div className="mt-12">
              <PaymentElement />
            </div>
            <div
              className="w-auto flex justify-center mt-5"
              onClick={handleSubmit}
            >
              <button className="bg-blue-500 w-44 h-12 text-white font-semibold  font-prompt rounded-md">
                PAY
              </button>
            </div>
            <div className="w-full flex justify-center mt-10 gap-2">
              <FaStripe className="w-6 h-7" />
              <h1>Payments are secure and encrypted</h1>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default LoadStripe;
