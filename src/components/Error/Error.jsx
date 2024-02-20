import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import error from "../../assets/images/error.png";

function Error() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
      <img className="w-[80%] h-[90%]" src={error} alt="Error" />
    </div>
  );
}

export default Error;
