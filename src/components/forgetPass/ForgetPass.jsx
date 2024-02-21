import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPass } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import LoginForm from "../UserComponents/Login/LoginForm";

function ForgetPass() {
  const navigate = useNavigate();
  const [isOpn, setOpn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const backhandle = (e) => {
    setOpn(true);
    <LoginForm />;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = { email: email };
      if (email === "") {
        toast("Please add email");
      } else {
        setLoading(true);
        await forgotPass(data).then((res) => {
          navigate("/otp", {
            state: {
              type: "forgot",
              email: email,
            },
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isOpn ? (
        <LoginForm onClose={() => setOpn(false)} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] text-shadow-black">
              Enter Your Email
            </label>
            <div className="relative flex flex-col justify-center items-center">
              <input
                type="email"
                name="email"
                id="email"
                className="border p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
                placeholder="Enter an Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-violet-600 h-8 rounded-md w-full flex justify-center items-center gap-2 text-white mt-3"
            >
              Reset Password
            </button>
            {loading && <PropagateLoader className="mt-2" color="#8b44ef" />}
          </div>
          <div className="flex w-full h-fit justify-start items-center text-[13px] text-primary mt-4">
            <span className="cursor-pointer w-fit h-fit flex">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontSize: "20px" }}
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                ></path>
              </svg>
              <span onClick={backhandle}>Back</span>
            </span>
          </div>
        </form>
      )}
      <ToastContainer />
    </>
  );
}

export default ForgetPass;
