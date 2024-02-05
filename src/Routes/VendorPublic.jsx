import React from "react";
import { Navigate } from "react-router-dom";

function VendorPublic(props) {
  if (localStorage.getItem("tutortoken")) {
    return <Navigate to="/vendor" />;
  } else {
    <Navigate to="/vendor/login" />;
    return props.children;
  }
}

export default VendorPublic;
