import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkingUser } from "../api/UserApi";

function UserProtect(props) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = userInfo.id;
  useEffect(() => {
    const checking = async () => {
      const response = await    (userId);
      if (response.data.status == true) {
        localStorage.removeItem("token");
      }
    };
    checking();
  },[]);
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default UserProtect;
