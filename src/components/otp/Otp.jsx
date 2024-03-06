import React, { useState, useEffect } from "react";
import meta from "../../assets/images/web.gif";
import { TutorVerifyOtp } from "../../api/VendorApi";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  UserSendingOtp,
  UserVerifyOtp,
  passverifyOTP,
} from "../../api/UserApi";
import { useSelector } from "react-redux";
import PasswordUpdate from "../ForgetPass/passwordUpdate";

function Otp() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const yourData = userInfo.email;
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);
  const tutorEmail = tutorInfo.email;
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [page, setPage] = useState("otp");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const current = location.state;
  let email;
  if (page == "password") {
    email = current.email;
  }

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const resendOTP = (current) => {
    setMinutes(1);
    setSeconds(0);
    if (current.type == "user") {
      const dataOtp = { email: yourData };
      const tutorOtp = UserSendingOtp(dataOtp);
    } else if (current.type == "vendor") {
      const dataOtp = { email: tutorEmail };
      const tutorOtp = UserSendingOtp(dataOtp);
    }
  };
  const backhandle = async (req, res) => {
    navigate("/vendor/signup");
  };
  const handleotp = async (e) => {
    e.preventDefault();
    let otp = "";
    otp += e.target.num1.value;
    otp += e.target.num2.value;
    otp += e.target.num3.value;
    otp += e.target.num4.value;
    otp += e.target.num5.value;
    otp += e.target.num6.value;
    const data = { otp: otp };

    if (otp.length === 6) {
      if (current.type == "forgot") {
        await passverifyOTP(data).then((res) => {
          if (res.status == 200) {
            setPage("password");
          }
        });
      } else if (current.type == "user") {
        try {
          const res = await UserVerifyOtp(data);
          if (res.data.status) {
            toast(res.data.alert);
            navigate("/login");
          } else {
            toast.error(res.data.alert);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else if (current.type == "vendor") {
        await TutorVerifyOtp(data).then((res) => {
          toast(res.data.alert);
          if (res.data.status) {
            toast(
              "Tutor signup successful. Please wait for admin approval before logging in"
            );
            navigate("/vendor/login");
          }
        });
      }
    } else {
      toast("please Enter 6 Digits");
    }
  };

  return (
    <>
      {page === "otp" && (
        <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center items-center w-screen h-screen py-7 px-5">
          <div className="bg-white w-full sm:max-w-[80%] min-h-[100%] overflow-auto rounded-md flex justify-center items-center shadow-xl p-3 gap-5 flex-row">
            <div className="justify-center items-center text-center hidden lg:flex flex-col lg:w-1/2 relative">
              <div className="font-semibold text-lg w-full">
                <span className="font-prompt-semibold text-4xl mt-20">
                  Edu-tap
                </span>
                <img className="rounded-md" src={meta} alt="" />
              </div>
            </div>

            <div className="sm:w-1/2 w-full h-full flex flex-col justify-center items-center">
              <form onSubmit={(e) => handleotp(e)}>
                <div className="flex flex-col items-center justify-center w-full gap-4">
                  <div className="flex flex-col justify-center gap-3 px-5 py-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col items-center gap-3">
                        <label
                          htmlFor="otpFields"
                          className="text-[14px] text-shadow-black"
                        >
                          Verification code
                          <span className="text-red-600 ml-1"></span>
                        </label>
                        <div className="relative flex flex-col justify-center">
                          <div className="flex items-center">
                            <div className="flex justify-center items-center gap-1.5">
                              <input
                                type="text"
                                name="num1"
                                maxlength="1"
                                className="border border-gray-300 p-2.5 text-[14px] w-[30px] h-[30px] rounded-md outline-none shadow-md"
                              />
                              <input
                                type="text"
                                name="num2"
                                maxlength="1"
                                className="border border-gray-300 p-2.5 text-[14px] w-[30px] h-[30px] rounded-md outline-none shadow-md"
                              />
                              <input
                                type="text"
                                name="num3"
                                maxlength="1"
                                className="border border-gray-300 p-2.5 text-[14px] w-[30px] h-[30px] rounded-md outline-none shadow-md"
                              />
                              <input
                                type="text"
                                name="num4"
                                maxlength="1"
                                className="border border-gray-300 p-2.5 text-[14px] w-[30px] h-[30px] rounded-md outline-none shadow-md"
                              />
                              <input
                                type="text"
                                name="num5"
                                maxlength="1"
                                className="border border-gray-300 p-2.5 text-[14px] w-[30px] h-[30px] rounded-md outline-none shadow-md"
                              />
                              <input
                                type="text"
                                name="num6"
                                maxlength="1"
                                className="border border-gray-300 p-2.5 text-[14px] w-[30px] h-[30px] rounded-md outline-none shadow-md"
                              />
                            </div>
                          </div>
                          <div className="flex justify-center items-center bottom-0">
                            {seconds > 0 || minutes > 0 ? (
                              <p>
                                {" "}
                                <span style={{ fontWeight: 600 }}>
                                  {minutes < 10 ? `0${minutes}` : minutes}:
                                  {seconds < 10 ? `0${seconds}` : seconds}
                                </span>
                              </p>
                            ) : (
                              <button
                                className="mt-2"
                                disabled={seconds > 0 || minutes > 0 || loading}
                                style={{
                                  color: loading ? "#DFE3E8" : "#FF5630",
                                }}
                                onClick={() => resendOTP(current)}
                              >
                                Resend OTP
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        className=" bg-violet-600 rounded-md text-white  btn-class w-full flex justify-center items-center gap-2"
                        type="submit"
                      >
                        Confirm
                      </button>
                    </div>
                    <div className="flex w-full h-fit justify-start items-center text-[13px] text-primary">
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {page === "password" && (
        <>
          <PasswordUpdate email={email} />
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default Otp;
