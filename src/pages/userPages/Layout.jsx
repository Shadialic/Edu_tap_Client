import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/UserComponents/Layouts/Footer";

function Layout() {
  return (
    <div>
      <div></div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
