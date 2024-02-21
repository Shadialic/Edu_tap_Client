import React, { useState } from "react";
import meta from "../../assets/images/web.gif";
import "react-toastify/dist/ReactToastify.css";
import ForgetPass from "../../components/ForgetPass/ForgetPass";
import LoginForm from "../../components/UserComponents/Login/LoginForm";

function Login() {
  const [isOpn, setOpn] = useState(false);

  return (
    <>
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center items-center w-screen h-screen py-7 px-5">
        <div className="bg-white w-full sm:max-w-[80%] min-h-[100%] overflow-auto rounded-md flex justify-center items-center shadow-xl p-3 gap-5 flex-row">
          <div className="justify-center items-center text-center hidden lg:flex flex-col lg:w-1/2 relative">
            <div className="font-semibold text-lg w-full">
              <span className="font-prompt-semibold text-4xl mt-20">
                Edu-tap
              </span>
              <img className="w-full h-full rounded-md" src={meta} alt="" />
            </div>
          </div>
          {!isOpn && (
            <LoginForm
              className="sm:w-1/2 w-full h-full flex flex-col justify-center items-center"
              onClose={() => setOpn(false)}
            />
          )}

          {isOpn && <ForgetPass />}
        </div>
      </div>
    </>
  );
}

export default Login;
