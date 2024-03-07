import { Navigate } from "react-router-dom";
import React from "react";

function Adminprotect(props) {
  if (localStorage.getItem("admintoken")) {
    return props.children;
  } else {
    return <Navigate to="/admin" />;
  }
}
export default Adminprotect;
