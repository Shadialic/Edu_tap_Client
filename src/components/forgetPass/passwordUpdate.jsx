import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import meta from "../../assets/images/web.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePass } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";

const PasswordUpdate = ({ email }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { password: password, email };
      if (password === "") {
        toast("Please add password");
      } else if (!/[a-z]/.test(password)) {
        toast.error("Password must contain at least one lowercase letter");
        return;
      } else if (!/[A-Z]/.test(password)) {
        toast.error("Password must contain at least one uppercase letter");
        return;
      } else if (!/\d/.test(password)) {
        toast.error("Password must contain at least one number");
        return;
      } else {
        await updatePass(data).then((res) => {
          if (res.status === 200) {
            toast("Your Password Updated");
            navigate("/login");
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col ">
                <label
                  htmlFor="password"
                  className="text-[14px] text-shadow-black"
                >
                  Enter a New Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={clicked ? "password" : "text"}
                    placeholder=" Enter a Password"
                    className="border p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                    >
                      {clicked ? (
                        <FaEyeSlash onClick={() => setClicked(false)} />
                      ) : (
                        <FaRegEye onClick={() => setClicked(true)} />
                      )}
                    </svg>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-violet-600 h-8 rounded-md w-full flex justify-center items-center gap-2 text-white mt-3"
              >
                Confirm
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
